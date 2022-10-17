import { TTLV } from "../serialize/Ttlv"
import { TtlvType } from "../serialize/TtlvType"

export interface PropertyMetadata {
  name: string
  type: TtlvType
  classOrEnum?: any

  toTtlv?: (instance: any) => TTLV

  fromTtlv?: (propertyName: string, ttlv: TTLV, parentInstance: any) => any
}

export const METADATA_KEY = Symbol("propertyMetadata")
