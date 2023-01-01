import Head from "next/head";
import styles from "../styles/Home.module.css";
import "bootstrap/dist/css/bootstrap.css";
import Web3Modal from "web3modal";
import { useEffect, useRef, useState, useMemo } from "react";
import { Player } from "@livepeer/react";
import { ABI, contractAddress } from "../constants";
import { ethers } from "ethers";
import { subgraphQuery } from "../utils";


export default function home({ getProviderOrSigner }) {
  const [videos, setVideos] = useState([]);

  const getVideos = async () => {
    const query = `query {
            videoUploadeds(orderBy: videoNumber, orderDirection: asc) {
              id
              videoNumber
              date
              location
              title
              description
              owner
            }
          }`;

    const data = await subgraphQuery(query);
    setVideos(data.videoUploadeds);
    console.log(data.videoUploadeds);
  };

  useEffect(() => {
    getVideos();
  }, []);

  return (
    <>
      <div className="justify-content-around">
        {videos.map((video) => (
          <div style={{ width: "600px", height: "600px", margin: "20px" }}>
            <Player
              title={video.title}
              playbackId={video.location}
              showPipButton
              showTitle={false}
              aspectRatio="16to16"
              controls={{
                autohide: 3000,
              }}
              theme={{
                borderStyles: { containerBorderStyle: "hidden" },
                radii: { containerBorderRadius: "10px" },
              }}
            />
            {video.location}
            {video.title}
          </div>
        ))}
      </div>
      
      
    </>
  );
}
