import { createReactClient } from "@livepeer/react";
import { studioProvider } from "livepeer/providers/studio";

const LivePeerClient = createReactClient({
  provider: studioProvider({ apiKey: "4c4bdab7-6a86-4308-967f-0d74c0d7896d" }),
});

export default LivePeerClient;
