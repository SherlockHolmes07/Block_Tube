import Head from "next/head";
import styles from "../styles/Home.module.css";
import "bootstrap/dist/css/bootstrap.css";
import Web3Modal from "web3modal";
import { providers, Contract } from "ethers";
import { useEffect, useRef, useState, useMemo } from "react";
import { createAsset, useCreateAsset, useLivepeerProvider } from "@livepeer/react";
import { Player } from '@livepeer/react';
import { ABI, contractAddress } from "../constants";
import { ethers } from "ethers";


export default function Upload( {getProviderOrSigner} ) {
  const provider = useLivepeerProvider();

  const [video, setVideo] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("general");
  const [save, setSave] = useState(false);
  const [hideCreateButton, setHideCreateButton] = useState(false);



  const {
    mutate: createAsset,
    data: assets,
    status,
    progress,
    error,
  } = useCreateAsset(
    video
      ? {
          sources: [{ name: video.name, file: video }],
        }
      : null,
  );


  const progressFormatted = useMemo(
    () =>
      progress?.[0].phase === 'failed'
        ? 'Failed to process video.'
        : progress?.[0].phase === 'waiting'
        ? 'Waiting'
        : progress?.[0].phase === 'uploading'
        ? `Uploading: ${Math.round(progress?.[0]?.progress * 100)}%`
        : progress?.[0].phase === 'processing'
        ? `Processing: ${Math.round(progress?.[0].progress * 100)}%`
        : null,
    [progress],
  );


  const saveVideo = async () => {
     const signer = await getProviderOrSigner(true);
      const contract = new ethers.Contract(contractAddress, ABI, signer);
      console.log("started");
      const tx = await contract.uploadVideo(assets[0].playbackId,title, description, category);
      await tx.wait();
      console.log(tx);
  }



  return (
    <div>
        
      <div className="d-flex justify-content-end">
        <input type="file" id="upload" hidden  onChange={(e) => setVideo(e.target.files[0])}/>
        <label for="upload"><span id="boot-icon" className="bi bi-upload bs-linebreak" style={{fontSize: "30px", color: "#00010E", opacity: "0.8", webkitTextStrokeWidth: "3.8px",  border: "dashed", borderRadius: "10%", padding: "9px", backgroundColor: "rgb(255, 255, 255)", cursor: "pointer"}}></span>
        </label>
      </div>

      <span className="d-flex justify-content-end mt-3  fw-semibold">
      {video && <div>{video.name}</div>}
      </span>
      
      <label className="fw-semibold">Title</label>
      <input type="text" className="form-control" placeholder="Title" onChange={(e) => setTitle(e.target.value)}/>

      <label className="fw-semibold mt-4">Description</label>
      <textarea className="form-control" placeholder="Description" onChange={
        (e) => setDescription(e.target.value)
      } rows="4"></textarea>

      <label className="fw-semibold mt-4">Category</label>
      <select className="form-select mb-4" style={{ cursor: "pointer" }} aria-label="Default select example" onChange={(e) => setCategory(e.target.value)}>
        <option value="general">General</option>
        <option value="music">Music</option>
        <option value="sports">Sports</option>
        <option value="gaming">Gaming</option>
        <option value="news">News</option>
        <option value="education">Education</option>
        <option value="movies">Movies</option>      
      </select>

      <button
        className="btn btn-success p-2 fw-semibold mt-5"
        hidden={hideCreateButton}
        disabled={status === 'loading' || !createAsset || !video || title.trim() === "" || description.trim() === "" }
        onClick={() => {
          createAsset?.();
          setSave(true);
          setHideCreateButton(true);
        }}
      >
        Create Video
      </button>


      


      {assets?.map((asset) => (
        <div key={asset.id} className="fw-semibold">
          <div>
            <div>Asset Name: {asset?.name}</div>
            <div>Playback URL: {asset?.playbackUrl}</div>
            <div>IPFS CID: {asset?.storage?.ipfs?.cid ?? 'None'}</div>
          </div>


          <div style={{ width: "500px", height: "400px", marginTop: "7px"}}>
      <Player
      title={asset?.name}
      playbackId={asset?.playbackId}
      showPipButton
      showTitle={false}
      aspectRatio="16to9"
      controls={{
        autohide: 3000,
      }}
      autoPlay
      muted
      theme={{
        borderStyles: { containerBorderStyle: 'hidden' },
        radii: { containerBorderRadius: '10px' },
      }}
      
      />
      </div>

        </div>

        
      ))}
 
      {error && <div>{error.message}</div>}   

      {progressFormatted && <div class="alert alert-primary" role="alert">{progressFormatted}</div>}


      {save && !progressFormatted && <button className="btn btn-success p-2 fw-semibold mb-5" onClick={() => {saveVideo(); setSave(false)}} style={{width: "200px"}}>Save Video</button>}

      

    </div>
  );
}
