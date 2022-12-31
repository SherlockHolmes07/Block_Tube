import { videoUploaded as videoUploadedEvent } from "../generated/blocktube/blocktube"
import { videoUploaded } from "../generated/schema"

export function handlevideoUploaded(event: videoUploadedEvent): void {
  let entity = new videoUploaded(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.videoNumber = event.params.videoNumber
  entity.date = event.params.date
  entity.location = event.params.location
  entity.title = event.params.title
  entity.description = event.params.description
  entity.category = event.params.category
  entity.owner = event.params.owner

  entity.save()
}
