import { ethers } from "ethers";
import Web3Modal from "web3modal";
import axios from "axios";

//INTERNAL IMPORT
import airdrop from "./airdrop.json";
import AmeroToken from "./AmeroToken.json";

export const airdrop_ADDRESS = "0x8be55D5868726172048CC0DA0e1f189cb2de592B";
const airdrop_ABI = airdrop.abi;

//AMEROTOKEN
export const AMEROTOKEN_ADDRESS = "0xeE04ad9EA2ca3Aa6bD7036D33ca21F90dBFd07fF";
const AmeroToken_ABI = AmeroToken.abi;

const fetchContract = (signer, ABI, ADDRESS) =>
  new ethers.Contract(ADDRESS, ABI, signer);

const networks = {
  sepolia: {
    chainId: `0x${Number(11155111).toString(16)}`,
    chainName: "Sepolia Test Network",
    nativeCurrency: {
      name: "SepoliaETH",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrls: ["https://rpc.sepolia.org", "https://ethereum-sepolia-rpc.publicnode.com"],
    blockExplorerUrls: ["https://sepolia.etherscan.io"],
  },
};

export const handleNetworkSwitch = async () => {
  const networkName = "sepolia";
  await changeNetwork({ networkName });
};

const changeNetwork = async ({ networkName }) => {
  try {
    if (!window.ethereum) throw new Error("No crypto wallet found");
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: networks[networkName].chainId }],
    });
  } catch (switchError) {
    if (switchError.code === 4902) {
      try {
        await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              ...networks[networkName],
            },
          ],
        });
      } catch (addError) {
        console.log("Error adding network:", addError.message);
      }
    } else {
      console.log("Error switching network:", switchError.message);
    }
  }
};

export const web3Provider = async () => {
  try {
    if (typeof window !== "undefined" && window.ethereum) {
      return new ethers.BrowserProvider(window.ethereum);
    }
    const web3modal = new Web3Modal();
    const connection = await web3modal.connect();
    return new ethers.BrowserProvider(connection);
  } catch (error) {
    console.log(error);
  }
};

export const AirdropContract = async () => {
  try {
    let provider;
    if (window.ethereum) {
      provider = new ethers.BrowserProvider(window.ethereum);
    } else {
      const web3modal = new Web3Modal();
      const connection = await web3modal.connect();
      provider = new ethers.BrowserProvider(connection);
    }

    const signer = await provider.getSigner();
    const contract = fetchContract(signer, airdrop_ABI, airdrop_ADDRESS);
    return contract;
  } catch (error) {
    console.log(error);
  }
};

export const AmeroTokenContract = async () => {
  try {
    let provider;
    if (window.ethereum) {
      provider = new ethers.BrowserProvider(window.ethereum);
    } else {
      const web3modal = new Web3Modal();
      const connection = await web3modal.connect();
      provider = new ethers.BrowserProvider(connection);
    }

    const signer = await provider.getSigner();
    const contract = fetchContract(signer, AmeroToken_ABI, AMEROTOKEN_ADDRESS);
    return contract;
  } catch (error) {
    console.log(error);
  }
};

export const getBalance = async () => {
  try {
    let provider;
    if (window.ethereum) {
      provider = new ethers.BrowserProvider(window.ethereum);
    } else {
      const web3modal = new Web3Modal();
      const connection = await web3modal.connect();
      provider = new ethers.BrowserProvider(connection);
    }

    const signer = await provider.getSigner();
    return await provider.getBalance(signer.address);
  } catch (error) {
    console.log(error);
  }
};
