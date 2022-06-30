/**
 * Copyright Cosmian 2021 -
 */

import { TransformStream, Transformer } from "web-streams-polyfill"
import { CoverCryptHybridDecryption } from "../../crypto/hybrid_crypto/abe/cover_crypt/decryption"
import { ClearTextHeader } from "../../crypto/hybrid_crypto/hybrid_crypto"
import { logger } from "../../utils/logger"

class CoverCryptDecryptionTransformer implements Transformer<Uint8Array, Uint8Array> {

    private uid: Uint8Array

    private hybridCrypto: CoverCryptHybridDecryption

    private header: ClearTextHeader | undefined

    private blockNumber: number

    constructor(privateKey: Uint8Array, uid: Uint8Array) {
        this.uid = uid
        this.hybridCrypto = new CoverCryptHybridDecryption(privateKey)
    }

    /**
    * A function that is called immediately during creation of the {@link TransformStream}.
    */
    start(_controller: TransformStreamDefaultController<Uint8Array>): Promise<void> {
        console.log("decryption transformer start")
        this.header = undefined
        this.blockNumber = 0
        return Promise.resolve()
    }

    /**
    * A function called when a new chunk originally written to the writable side is ready to be transformed.
    */
    transform(chunk: Uint8Array, controller: TransformStreamDefaultController<Uint8Array>): Promise<void> {
        return new Promise((resolve, reject) => {

            console.log("decryption transformer transform " + chunk.length + " bytes")

            if (typeof this.header === 'undefined') {
                // first block, this is the header
                this.header = this.hybridCrypto.decryptHybridHeader(chunk)
                return resolve()
            }

            const block = this.hybridCrypto.decryptHybridBlock(this.header.symmetricKey, chunk, this.uid, this.blockNumber)
            controller.enqueue(block)
            return resolve()
        })
    }

    flush(controller: TransformStreamDefaultController<Uint8Array>): void | PromiseLike<void> {
        logger.log(() => "decryption transformer flush")
        controller.terminate()
    }

}

export class CoverCryptDecryptionTS extends TransformStream {
    constructor(privateKey: Uint8Array, uid: Uint8Array) {
        super(new CoverCryptDecryptionTransformer(privateKey, uid))
    }

}