import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { BigInt, Address } from "@graphprotocol/graph-ts"
import { videoUploaded } from "../generated/schema"
import { videoUploaded as videoUploadedEvent } from "../generated/blocktube/blocktube"
import { handlevideoUploaded } from "../src/blocktube"
import { createvideoUploadedEvent } from "./blocktube-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let videoNumber = BigInt.fromI32(234)
    let date = BigInt.fromI32(234)
    let location = "Example string value"
    let title = "Example string value"
    let description = "Example string value"
    let category = "Example string value"
    let owner = Address.fromString("0x0000000000000000000000000000000000000001")
    let newvideoUploadedEvent = createvideoUploadedEvent(
      videoNumber,
      date,
      location,
      title,
      description,
      category,
      owner
    )
    handlevideoUploaded(newvideoUploadedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("videoUploaded created and stored", () => {
    assert.entityCount("videoUploaded", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "videoUploaded",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "videoNumber",
      "234"
    )
    assert.fieldEquals(
      "videoUploaded",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "date",
      "234"
    )
    assert.fieldEquals(
      "videoUploaded",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "location",
      "Example string value"
    )
    assert.fieldEquals(
      "videoUploaded",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "title",
      "Example string value"
    )
    assert.fieldEquals(
      "videoUploaded",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "description",
      "Example string value"
    )
    assert.fieldEquals(
      "videoUploaded",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "category",
      "Example string value"
    )
    assert.fieldEquals(
      "videoUploaded",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "owner",
      "0x0000000000000000000000000000000000000001"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
