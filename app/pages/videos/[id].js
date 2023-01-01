import Head from "next/head";
import styles from "../../styles/Home.module.css";
import "bootstrap/dist/css/bootstrap.css";
import Web3Modal from "web3modal";
import { useEffect, useRef, useState, useMemo } from "react";
import { Player } from "@livepeer/react";
import { ethers } from "ethers";
import { subgraphQuery } from "../../utils";
import  { useRouter } from "next/router";


export default function Video({ pageDisplay, setPageDisplay}) {
    const router = useRouter();
    return (
        <>{router.query.id}</>
    )  
}