import anonymization_wasm from "./pkg/anonymization/cloudproof_anonymization_bg.wasm"
import { setAnonymizationInit } from "./anonymization/anonymization"

import ecies_wasm from "./pkg/ecies/cloudproof_ecies_bg.wasm"
import { setEciesInit } from "./ecies/ecies"

import cover_crypt_wasm from "./pkg/cover_crypt/cloudproof_cover_crypt_bg.wasm"
import { setCoverCryptInit } from "./cover_crypt/cover_crypt"

import findex_wasm from "./pkg/findex/cloudproof_findex_bg.wasm"
import { setFindexInit } from "./findex/findex"

import fpe_wasm from "./pkg/fpe/cloudproof_fpe_bg.wasm"
import { setFpeInit } from "./fpe/fpe"

export * from "./anonymization/anonymization"
export * from "./ecies/ecies"
export {
  CoverCryptMasterKey,
  type CoverCryptKeyGeneration,
} from "./cover_crypt/key_generation"
export { type CoverCryptHybridDecryption } from "./cover_crypt/decryption"
export { type CoverCryptHybridEncryption } from "./cover_crypt/encryption"
export * from "./cover_crypt/cover_crypt"
export * from "./cover_crypt/interfaces/access_policy"
export * from "./cover_crypt/interfaces/encrypted_header"
export * from "./cover_crypt/interfaces/encryption_parameters"
export * from "./cover_crypt/interfaces/plaintext_header"
export * from "./cover_crypt/interfaces/policy"
export * from "./findex/findex"
export * from "./findex/findex_cloud"
export * from "./fpe/fpe"
export { logger } from "./utils/logger"
export {
  hexDecode,
  hexEncode,
  sanitizeString,
  deserializeList,
  toBeBytes,
} from "./utils/utils"

export * from "./kms/kms"
export * from "./kms/kmip"
export * from "./kms/requests/Create"
export * from "./kms/requests/CreateKeyPair"
export * from "./kms/requests/Destroy"
export * from "./kms/requests/Get"
export * from "./kms/requests/Import"
export * from "./kms/requests/ReKeyKeyPair"
export * from "./kms/requests/Revoke"
export * from "./kms/responses/GenericKeyPairResponse"
export * from "./kms/responses/GenericUniqueIdentifierResponse"
export * from "./kms/responses/GetResponse"
export * from "./kms/structs/object_attributes"
export * from "./kms/structs/types"
export * from "./kms/structs/object_data_structures"
export * from "./kms/structs/objects"

// @ts-expect-error @ts-ignore-error
setAnonymizationInit(() => anonymization_wasm())

// @ts-expect-error @ts-ignore-error
setCoverCryptInit(() => cover_crypt_wasm())

// @ts-expect-error @ts-ignore-error
setEciesInit(() => ecies_wasm())

// @ts-expect-error @ts-ignore-error
setFindexInit(() => findex_wasm())

// @ts-expect-error @ts-ignore-error
setFpeInit(() => fpe_wasm())
