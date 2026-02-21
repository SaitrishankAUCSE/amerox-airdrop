const { Client } = require('ssh2');

const conn = new Client();
const content = `import { ethers } from "ethers";
import Web3Modal from "web3modal";
import axios from "axios";

//INTERNAL IMPORT
import airdrop from "./airdrop.json";
import AmeroToken from "./AmeroToken.json";

export const airdrop_ADDRESS = "0xD88F8D2DD591015A7eeF1240d0f65371642B6469";
const airdrop_ABI = airdrop.abi;

//AMEROTOKEN
export const AMEROTOKEN_ADDRESS = "0xF38FEc358cca216a55512B315e0a93E212732eF6";
const AmeroToken_ABI = AmeroToken.abi;

const fetchContract = (signer, ABI, ADDRESS) =>
  new ethers.Contract(ADDRESS, ABI, signer);

const networks = {
  bsc: {
    chainId: \`0x\${Number(56).toString(16)}\`,
    chainName: "Binance Smart Chain Mainnet",
    nativeCurrency: {
      name: "BNB",
      symbol: "BNB",
      decimals: 18,
    },
    rpcUrls: ["https://bsc-dataseed.binance.org/"],
    blockExplorerUrls: ["https://bscscan.com/"],
  },
};

export const handleNetworkSwitch = async () => {
  const networkName = "bsc";
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
    if (typeof window !== "undefined" && window.ethereum) {
      provider = new ethers.BrowserProvider(window.ethereum);
    } else {
      const web3modal = new Web3Modal();

      const connectionPromise = web3modal.connect();
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Web3Modal connection timeout")), 3000)
      );

      const connection = await Promise.race([connectionPromise, timeoutPromise]);
      provider = new ethers.BrowserProvider(connection);
    }

    const accounts = await provider.listAccounts();
    let signer;
    if (accounts.length > 0) {
      signer = await provider.getSigner();
    } else {
      signer = provider;
    }

    const contract = fetchContract(signer, airdrop_ABI, airdrop_ADDRESS);
    return contract;
  } catch (error) {
    console.log(error);
  }
};

export const AmeroTokenContract = async () => {
  try {
    let provider;
    if (typeof window !== "undefined" && window.ethereum) {
      provider = new ethers.BrowserProvider(window.ethereum);
    } else {
      const web3modal = new Web3Modal();

      const connectionPromise = web3modal.connect();
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Web3Modal connection timeout")), 3000)
      );

      const connection = await Promise.race([connectionPromise, timeoutPromise]);
      provider = new ethers.BrowserProvider(connection);
    }

    const accounts = await provider.listAccounts();
    let signer;
    if (accounts.length > 0) {
      signer = await provider.getSigner();
    } else {
      signer = provider;
    }

    const contract = fetchContract(signer, AmeroToken_ABI, AMEROTOKEN_ADDRESS);
    return contract;
  } catch (error) {
    console.log(error);
  }
};

export const getBalance = async () => {
  try {
    let provider;
    if (typeof window !== "undefined" && window.ethereum) {
      provider = new ethers.BrowserProvider(window.ethereum);
    } else {
      const web3modal = new Web3Modal();

      // Add a 3-second timeout to prevent infinite hanging on mobile dapps
      const connectionPromise = web3modal.connect();
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Web3Modal connection timeout")), 3000)
      );

      const connection = await Promise.race([connectionPromise, timeoutPromise]);
      provider = new ethers.BrowserProvider(connection);
    }

    const accounts = await provider.listAccounts();
    let signer;
    if (accounts.length > 0) {
      signer = await provider.getSigner();
      return await provider.getBalance(signer.address); // Correct way to get balance of signer
    } else {
      return 0;// return 0 if no signer
    }
  } catch (error) {
    console.log(error);
  }
};
`;

conn.on('ready', () => {
    console.log('Client :: ready');
    // Overwrite constants.js in both potential locations
    const shellCommand = `
        chmod 777 /var/www/amerox/context /var/www/amerox/amerox/context &&
        cat <<'EOF' > /var/www/amerox/context/constants.js
${content}
EOF
        cat <<'EOF' > /var/www/amerox/amerox/context/constants.js
${content}
EOF
        cd /var/www/amerox && npm run build && pm2 restart all
    `;
    conn.exec(shellCommand, (err, stream) => {
        if (err) throw err;
        stream.on('data', (data) => process.stdout.write(data))
            .stderr.on('data', (data) => process.stderr.write(data))
            .on('close', (code) => {
                console.log('Task Complete with code ' + code);
            });
    });
    conn.exec('head -n 20 /var/www/amerox/context/constants.js', (err, stream) => {
        if (err) throw err;
        stream.on('data', (data) => console.log('STDOUT: ' + data))
            .stderr.on('data', (data) => console.log('STDERR: ' + data))
            .on('close', () => {
                conn.end();
            });
    });
}).connect({
    host: '187.77.92.116',
    port: 22,
    username: 'root',
    password: 'Amerox337733.'
});
