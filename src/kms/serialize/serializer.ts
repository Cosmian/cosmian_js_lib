import { TTLV } from "./Ttlv"
import "reflect-metadata"
import { METADATA_KEY, PropertyMetadata } from "../decorators/interface"
import { TtlvType } from "./TtlvType"
import { hexEncode } from "../../utils/utils"
import { KmipStruct } from "../json/KmipStruct"

/**
 * Convert the JSON representation of a TTLV back into a TTLV object
 *
 * @param {object} value  the KMIP object
 * @returns {TTLV} a TTLV.
 */
export function toTTLV(value: KmipStruct): TTLV {
  // there is no metadata available for the top level object
  // so we use the class name as name.
  // The top level object is always a structure
  return _toTTLV(value, {
    name: value.tag,
    type: TtlvType.Structure,
  })
}

/**
 *
 * @param {object} value  the KMIP object
 * @param  {PropertyMetadata} metadata of the property
 * @returns {TTLV} a TTLV
 */
function _toTTLV(value: Object, metadata: PropertyMetadata): TTLV {
  // The JSON representation of a TTLV
  // is always a dictionary or an array

  if (typeof value !== "object") {
    throw new Error(
      `Serializer: unknown type ${typeof value} for value: ${JSON.stringify(
        value,
        null,
        2,
      )}`,
    )
  }

  if (typeof metadata.toTtlv !== "undefined") {
    return metadata.toTtlv(value)
  }

  if (Array.isArray(value)) {
    return processArray(value, metadata)
  }

  return processDictionary(value, metadata)
}

/**
 *
 * @param {object} value  the KMIP array
 * @param  {PropertyMetadata} metadata of the array
 * @returns {TTLV} a TTLV
 */
function processArray(value: Object, metadata: PropertyMetadata): TTLV {
  const array = value as Object[]
  const children: TTLV[] = []
  // same metadata for all children of the array which are all of the same type
  // but make it a structure
  const childMetadata = Object.assign({}, metadata, {
    type: TtlvType.Structure,
  })
  for (const child of array) {
    children.push(_toTTLV(child, childMetadata))
  }
  return new TTLV(
    // there should always be meta data descriptions for arrays
    Reflect.get(metadata, "name"),
    TtlvType.Structure,
    children,
  )
}

/**
 *
 * @param {object} value  the KMIP dictionary
 * @param  {PropertyMetadata} metadata of the dictionary
 * @returns {TTLV} a TTLV
 */
function processDictionary(value: Object, metadata: PropertyMetadata): TTLV {
  // process all object properties as new TTLVs
  const children: TTLV[] = parseChildren(value)

  const name: string = metadata.name
  const type: TtlvType = metadata.type

  // handle the special case of Choices: there is only
  // one child which name is identical to that of the parent
  // We need to flatten that to the type of the child
  // Example: LinkedObjectIdentifier
  if (type === TtlvType.Choice) {
    return children[0]
  }

  return new TTLV(name, type, children)
}

/**
 *
 * @param {object} value  the KMIP object which children must be parsed
 * @returns {TTLV} the children as TTLV
 */
function parseChildren(value: Object): TTLV[] {
  const childrenMetadata: { [propertyName: string]: PropertyMetadata } =
    Reflect.getMetadata(METADATA_KEY, value)

  const children: TTLV[] = []
  for (const pn of Object.getOwnPropertyNames(value)) {
    // Skip tag since it's a default property with the classname inside it we don't
    // need to fetch it from the response.
    if (pn === "tag") continue

    const propertyName = pn as keyof typeof value

    // skip processing a property which has an undefined value
    let childValue: any = value[propertyName]
    if (typeof childValue === "undefined") {
      continue
    }

    // recover the Metadata for that property
    const childMetadata: PropertyMetadata = childrenMetadata[propertyName]
    if (typeof childMetadata === "undefined") {
      console.error(
        `Serializer: child Metadata is not defined for ${propertyName} in `,
        childrenMetadata,
      )
      throw new Error(
        `Serializer: child Metadata is not defined for ${propertyName}`,
      )
    }
    const childName = childMetadata.name
    const childType = childMetadata.type

    if (childType === TtlvType.Ignore) {
      continue
    }
    if (
      childType === TtlvType.Structure ||
      childType === TtlvType.StructuresArray ||
      childType === TtlvType.Choice
    ) {
      // it is a structure, recursively process the child
      const child = _toTTLV(childValue, childMetadata)
      children.push(child)
      continue
    }

    if (childType === TtlvType.Enumeration) {
      childValue = childMetadata.classOrEnum[childValue]
    } else if (childType === TtlvType.ByteString) {
      // childValue = Buffer.from(childValue).toString("hex")
      childValue = hexEncode(childValue)
    } else if (childType === TtlvType.DateTimeExtended) {
      childValue = childValue.extendedDate
    } else if (childType === TtlvType.Interval) {
      childValue = childValue.timeInMilliSeconds
    } else if (childType === TtlvType.DateTime) {
      childValue = childValue.DateTime
    } else if (childType === TtlvType.LongInteger) {
      // childValue = childValue
    } else if (childType === TtlvType.Integer) {
      // childValue = childValue
    } else if (childType === TtlvType.BigInteger) {
      childValue = childValue.bytes
    } else if (childType === TtlvType.TextString) {
      // childValue = childValue
    } else {
      console.error(`Serializer: unknown TTLV type: ${childType}`)
      throw new Error(`Serializer: unknown TTLV type: ${childType}`)
    }

    children.push(new TTLV(childName, childType, childValue))
  }
  return children
}
