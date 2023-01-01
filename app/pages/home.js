import Head from "next/head";
import styles from "../styles/Home.module.css";
import "bootstrap/dist/css/bootstrap.css";
import Web3Modal from "web3modal";
import { useEffect, useRef, useState, useMemo } from "react";
import { Player } from "@livepeer/react";
import { ABI, contractAddress } from "../constants";
import { ethers } from "ethers";
import { subgraphQuery } from "../utils";
import Link from 'next/link'


export default function home({ setPageDisplay }) {
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

    let data = await subgraphQuery(query);
    let data2 = [...data.videoUploadeds]
    setVideos(data2);
    console.log(data2);
  };

  useEffect(() => {
    getVideos();
  }, []);

  return (
    <>
      <div className="d-flex flex-row flex-wrap justify-content-around" style={{flexWrap: "wrap"}}>
        {videos.map((video) => (
          <div style={{ width: "360px", height: "400px", marginTop: "7px", cursor: "pointer" }}>
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
            <Link href='/videos/[id]' as={'/videos/' + video.location}>{video.title}</Link>
          </div>
        ))}
      </div>
      
      
    </>
  );
}