import { GenericUniqueIdentifierResponse } from "../responses/GenericUniqueIdentifierResponse"
import { KmsRequest } from ".."

export class Destroy implements KmsRequest<GenericUniqueIdentifierResponse> {
  __response: GenericUniqueIdentifierResponse | undefined
  tag = "Destroy"

  uniqueIdentifier: string

  constructor(uniqueIdentifier: string) {
    this.uniqueIdentifier = uniqueIdentifier
  }
}
