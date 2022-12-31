import { newMockEvent } from "matchstick-as"
import { ethereum, BigInt, Address } from "@graphprotocol/graph-ts"
import { videoUploaded } from "../generated/blocktube/blocktube"

export function createvideoUploadedEvent(
  videoNumber: BigInt,
  date: BigInt,
  location: string,
  title: string,
  description: string,
  category: string,
  owner: Address
): videoUploaded {
  let videoUploadedEvent = changetype<videoUploaded>(newMockEvent())

  videoUploadedEvent.parameters = new Array()

  videoUploadedEvent.parameters.push(
    new ethereum.EventParam(
      "videoNumber",
      ethereum.Value.fromUnsignedBigInt(videoNumber)
    )
  )
  videoUploadedEvent.parameters.push(
    new ethereum.EventParam("date", ethereum.Value.fromUnsignedBigInt(date))
  )
  videoUploadedEvent.parameters.push(
    new ethereum.EventParam("location", ethereum.Value.fromString(location))
  )
  videoUploadedEvent.parameters.push(
    new ethereum.EventParam("title", ethereum.Value.fromString(title))
  )
  videoUploadedEvent.parameters.push(
    new ethereum.EventParam(
      "description",
      ethereum.Value.fromString(description)
    )
  )
  videoUploadedEvent.parameters.push(
    new ethereum.EventParam("category", ethereum.Value.fromString(category))
  )
  videoUploadedEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )

  return videoUploadedEvent
}
