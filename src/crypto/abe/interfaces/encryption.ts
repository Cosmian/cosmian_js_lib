import { PublicKey } from "kms/objects/PublicKey"
import { EncryptedHeader } from "./encrypted_header"
import { AbeEncryptionParameters } from "./encryption_parameters"
import { Policy } from "./policy"

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

  constructor(policy: Policy | Uint8Array, publicKey: PublicKey | Uint8Array) {
    if (policy instanceof Policy) {
      this._policy = policy.toJsonEncoded()
    } else {
      this._policy = policy
    }
    if (publicKey instanceof PublicKey) {
      this._publicKey = publicKey.bytes()
    } else {
      this._publicKey = publicKey
    }
  }
  public abstract renewKey(policy: Uint8Array, publicKey: Uint8Array): void

  public abstract destroyInstance(): void

  /**
   *
   * @param parameters Encryption parameters
   */
  public abstract encryptHybridHeader(
    parameters: AbeEncryptionParameters
  ): EncryptedHeader

  /**
   * Encrypts a hybrid block
   *
   * @param symmetricKey symmetric key
   * @param plaintext data to encrypt
   * @param uid uid used as additional data
   * @param blockNumber
   * @returns the ciphertext if everything succeeded
   */
  public abstract encryptHybridBlock(
    symmetricKey: Uint8Array,
    plaintext: Uint8Array,
    uid: Uint8Array | undefined,
    blockNumber: number | undefined
  ): Uint8Array

  /**
   * Hybrid encrypt wrapper: ABE encrypt then AES encrypt
   *
   * @param attributes
   * @param uid
   * @param plaintext
   * @returns
   */
  public abstract encrypt(
    attributes: string[],
    uid: Uint8Array,
    plaintext: Uint8Array
  ): Uint8Array
}

export interface EncryptionWorkerMessage {
  name: "INIT" | "DESTROY" | "ENCRYPT" | "SUCCESS" | "ERROR"
  error?: string
  value?: any
}
