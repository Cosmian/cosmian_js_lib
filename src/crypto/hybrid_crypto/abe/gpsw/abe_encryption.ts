/* tslint:disable:max-classes-per-file */
import {
    webassembly_destroy_encryption_cache,
    webassembly_create_encryption_cache,
    webassembly_encrypt_hybrid_header_using_cache,
    webassembly_encrypt_hybrid_header,
    webassembly_encrypt_hybrid_block
} from "../../../../../wasm_lib/abe/abe_gpsw"
import { logger } from "../../../../utils/logger"

export abstract class EncryptionParameters { }

export class EncryptedHeader {
    private _symmetricKey: Uint8Array
    private _encryptedSymmetricKey: Uint8Array
    private _encryptedSymmetricKeySizeAsArray: Uint8Array

    public get encryptedSymmetricKey(): Uint8Array {
        return this._encryptedSymmetricKey
    }
    public set encryptedSymmetricKey(value: Uint8Array) {
        this._encryptedSymmetricKey = value
    }

    public get symmetricKey(): Uint8Array {
        return this._symmetricKey
    }
    public set symmetricKey(value: Uint8Array) {
        this._symmetricKey = value
    }

    public get encryptedSymmetricKeySizeAsArray(): Uint8Array {
        return this._encryptedSymmetricKeySizeAsArray
    }
    public set encryptedSymmetricKeySizeAsArray(value: Uint8Array) {
        this._encryptedSymmetricKeySizeAsArray = value
    }

    constructor(symmetricKey: Uint8Array, encryptedSymmetricKey: Uint8Array) {
        this._symmetricKey = symmetricKey
        this._encryptedSymmetricKey = encryptedSymmetricKey

        // Convert symmetric key length to 4-bytes array
        const arr = new ArrayBuffer(4);
        const view = new DataView(arr);
        view.setUint32(0, this._encryptedSymmetricKey.length, false);
        this._encryptedSymmetricKeySizeAsArray = new Uint8Array(arr, 0)
    }
}

export abstract class HybridEncryption {
    private _publicKey: Uint8Array
    private _policy: Uint8Array

    public get policy(): Uint8Array {
        return this._policy
    }
    public set policy(value: Uint8Array) {
        this._policy = value
    }

    public set publicKey(value: Uint8Array) {
        this._publicKey = value
    }
    public get publicKey(): Uint8Array {
        return this._publicKey
    }

    constructor(policy: Uint8Array, publicKey: Uint8Array) {
        this._policy = policy
        this._publicKey = publicKey
    }

    public abstract destroyInstance(): void

    /**
     *
     * @param parameters Encryption parameters
     */
    public abstract encryptHybridHeader(parameters: EncryptionParameters): EncryptedHeader

    /**
     * Encrypts a hybrid block
     *
     * @param symmetricKey symmetric key
     * @param plaintext data to encrypt
     * @param uid uid used as additional data
     * @param blockNumber
     * @returns the ciphertext if everything succeeded
     */
    public abstract encryptHybridBlock(symmetricKey: Uint8Array, plaintext: Uint8Array, uid: Uint8Array | undefined, blockNumber: number | undefined): Uint8Array
}

export class AbeEncryptionParameters extends EncryptionParameters {
    // ABE attributes as a string: for example: "Department::FIN, Security Level::Confidential"
    private _attributes: string
    // UID is an integrity parameter
    private _uid: Uint8Array

    constructor(attributes: string, uid: Uint8Array) {
        super()
        this._attributes = attributes
        this._uid = uid
    }

    public get attributes(): string {
        return this._attributes
    }
    public set attributes(value: string) {
        this._attributes = value
    }

    public get uid(): Uint8Array {
        return this._uid
    }
    public set uid(value: Uint8Array) {
        this._uid = value
    }
}


/**
 * This class exposes the ABE primitives.
 *
 */
export class AbeHybridEncryption extends HybridEncryption {

    private _cache: number


    constructor(policy: Uint8Array, publicKey: Uint8Array) {
        super(policy, publicKey)
        // Create encryption cache. This number is linked to the public key and policy
        this._cache = webassembly_create_encryption_cache(policy, publicKey)
    }

    /**
     * Destroy encryption cache
     */
    public destroyInstance() {
        logger.log(() => "DestroyInstance Abe")
        webassembly_destroy_encryption_cache(this._cache)
    }

    /**
     * Generate and encrypt a symmetric key using the public key and policy in cache. Must return ciphertext value if everything went well
     * This function is using a cache to store the public key and ABE policy.
     *
     * @param parameters ABE encryption parameters
     * @returns an encrypted header witch contains the clear and encrypted symmetric key
     */
    public encryptHybridHeader(parameters: AbeEncryptionParameters): EncryptedHeader {
        // logger.log(() => "cache: " + this._cache)
        const encryptedHeaderBytes = webassembly_encrypt_hybrid_header_using_cache(this._cache, parameters.attributes, parameters.uid)
        const encryptedHeaderSizeAsArray = encryptedHeaderBytes.slice(0, 4);

        // Create a buffer
        const buf = new ArrayBuffer(4);
        // Create a data view of it
        const view = new DataView(buf);
        // set bytes
        encryptedHeaderSizeAsArray.forEach((b, i) => {
            view.setUint8(i, b);
        });

        // Read the bits as a float; note that by doing this, we're implicitly
        // converting it from a 32-bit float into JavaScript's native 64-bit double
        const symmetricKeySize = view.getUint32(0);

        const encryptedHeader = new EncryptedHeader(
            encryptedHeaderBytes.slice(4, 4 + symmetricKeySize),
            encryptedHeaderBytes.slice(4 + symmetricKeySize, encryptedHeaderBytes.length));
        return encryptedHeader;
    }

    /**
     * Generate and encrypt a symmetric key using the public key and policy in cache. Must return ciphertext value if everything went well
     *
     * @param publicKey the master public key
     * @param policy the policy serialized
     * @param attributes ABE attributes used for encryption
     * @param uid header integrity param
     * @returns ciphertext ABE value
     */
    public encryptHybridHeaderNoCache(publicKey: Uint8Array, policy: Uint8Array, attributes: string, uid: Uint8Array): Uint8Array {
        return webassembly_encrypt_hybrid_header(policy, publicKey, attributes, uid)
    }

    /**
     * Encrypts a AES256-GCM block
     *
     * @param symmetricKey AES key
     * @param plaintext encrypted data
     * @param uid uid used as additional data
     * @param blockNumber
     * @returns the cleartext if everything succeeded
     */
    public encryptHybridBlock(symmetricKey: Uint8Array, plaintext: Uint8Array, uid: Uint8Array | undefined, blockNumber: number | undefined): Uint8Array {
        return webassembly_encrypt_hybrid_block(
            symmetricKey,
            uid,
            blockNumber,
            plaintext)
    }

    /**
     * Hybrid encrypt wrapper: ABE encrypt then AES encrypt
     *
     * @param attributes
     * @param uid
     * @param plaintext
     * @returns
     */
    public encrypt(attributes: string, uid: Uint8Array, plaintext: Uint8Array): Uint8Array {
        logger.log(() => "encrypt for attributes: " + attributes)
        logger.log(() => "encrypt for uid: " + uid)
        logger.log(() => "encrypt for plaintext: " + plaintext)

        // Encrypted value is composed of: HEADER_LEN | HEADER | AES_DATA
        const encryptionParameters = new AbeEncryptionParameters(attributes, uid)
        const hybridHeader = this.encryptHybridHeader(encryptionParameters)
        logger.log(() => "encrypt: symmetricKey:" + hybridHeader.symmetricKey)
        logger.log(() => "encrypt: encryptedSymmetricKeySizeAsArray:" + hybridHeader.encryptedSymmetricKeySizeAsArray)
        const ciphertext = this.encryptHybridBlock(hybridHeader.symmetricKey, plaintext, uid, 0)

        logger.log(() => "encrypt: header size : " + hybridHeader.encryptedSymmetricKeySizeAsArray)
        logger.log(() => "encrypt: encrypted symmetric key : " + hybridHeader.encryptedSymmetricKey)
        logger.log(() => "encrypt: symmetric key : " + hybridHeader.symmetricKey)
        logger.log(() => "encrypt: ciphertext : " + ciphertext)

        // Encrypted value is composed of: HEADER_LEN (4 bytes) | HEADER | AES_DATA
        const encryptedData = new Uint8Array(hybridHeader.encryptedSymmetricKeySizeAsArray.length + hybridHeader.encryptedSymmetricKey.length + ciphertext.length)
        encryptedData.set(hybridHeader.encryptedSymmetricKeySizeAsArray)
        encryptedData.set(hybridHeader.encryptedSymmetricKey, hybridHeader.encryptedSymmetricKeySizeAsArray.length)
        encryptedData.set(ciphertext, hybridHeader.encryptedSymmetricKeySizeAsArray.length + hybridHeader.encryptedSymmetricKey.length)
        return encryptedData
    }

    /**
     * Bench ABE encryption using a cache and without cache
     *
     * @param publicKey the master public key
     * @param policy the policy serialized
     * @param attributes ABE attributes used for encryption
     * @param uid header integrity param
     * @returns timings for encryption without cache and with cache
     */
    public benchEncryptHybridHeader(attributes: string, uid: Uint8Array): number[] {
        const loops = 100
        let startDate = new Date().getTime()
        for (let i = 0; i < loops; i++) {
            webassembly_encrypt_hybrid_header(this.policy, this.publicKey, attributes, uid)
        }
        let endDate = new Date().getTime()
        const msNoCache = (endDate - startDate) / (loops)
        logger.log(() => "webassembly-JS avg time (no cache): " + msNoCache + "ms")

        // With cache
        const cache = webassembly_create_encryption_cache(this.policy, this.publicKey)
        startDate = new Date().getTime()
        for (let i = 0; i < loops; i++) {
            webassembly_encrypt_hybrid_header_using_cache(cache, attributes, uid)
        }
        endDate = new Date().getTime()
        const msCache = (endDate - startDate) / (loops)
        logger.log(() => "webassembly-JS avg time (with cache): " + msCache + "ms")
        webassembly_destroy_encryption_cache(cache)

        return [msNoCache, msCache]
    }
}

export type EncryptionWorkerMessage = {
    name:
    'INIT' |
    'DESTROY' |
    'ENCRYPT' |
    'SUCCESS' |
    'ERROR',
    error?: string
    value?: any
}
