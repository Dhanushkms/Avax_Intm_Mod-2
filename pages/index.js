import { useState, useEffect } from "react";
import { ethers } from "ethers";

const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

const atm_abi = [
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "initialBalance",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "Deposited",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "previousOwner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "OwnershipTransferred",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "Withdrawn",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "balance",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "deposit",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "withdraw",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

export default function HomePage() {
  const [account, setAccount] = useState(undefined);
  const [balance, setBalance] = useState(0);
  const [inputA, setInputA] = useState(0);
  const [inputB, setInputB] = useState(0);
  const [result, setResult] = useState(0);
  const [currentTime, setCurrentTime] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  const [transactionStatus, setTransactionStatus] = useState("");

  const checkWallet = async () => {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({ method: "eth_accounts" });
      if (accounts.length > 0) {
        setAccount(accounts[0]);
      }
    }
  };

  const getBalance = async () => {
    const provider = new ethers.providers.JsonRpcProvider();
    const contract = new ethers.Contract(contractAddress, atm_abi, provider);
    const currentBalance = await contract.balance();
    setBalance(currentBalance.toNumber());
  };

  const deposit = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, atm_abi, signer);
    try {
      const transaction = await contract.deposit(inputA, { value: inputA });
      await transaction.wait();
      setTransactionStatus("Transaction successful");
      getBalance();
    } catch (error) {
      setTransactionStatus("Transaction failed");
    }
  };

  const withdraw = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, atm_abi, signer);
    try {
      const transaction = await contract.withdraw(inputB);
      await transaction.wait();
      setTransactionStatus("Transaction successful");
      getBalance();
    } catch (error) {
      setTransactionStatus("Transaction failed");
    }
  };

  useEffect(() => {
    checkWallet();
    getBalance();
    const interval = setInterval(() => {
      const date = new Date();
      setCurrentTime(date.toLocaleTimeString());
      setCurrentDate(date.toLocaleDateString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="container">
      <header>
        <h1>Welcome!</h1>
        <h2>DHANUSH KM</h2>
      </header>
      {account ? (
        <div>
          <p>Your Account: {account}</p>
          <p>Your Balance: {balance} ETH </p>

          <input
            type="number"
            placeholder="Enter ETH to deposit"
            value={inputA}
            onChange={(e) => setInputA(e.target.value)}
          />
          <button style={{ backgroundColor: "green" }} onClick={deposit}>
            Deposit ETH
          </button>
          <br />

          <input
            type="number"
            placeholder="Enter ETH to withdraw"
            value={inputB}
            onChange={(e) => setInputB(e.target.value)}
          />
          <button style={{ backgroundColor: "#FF0000" }} onClick={withdraw}>
            Withdraw ETH
          </button>
        </div>
      ) : (
        <p>Please install Metamask to use this ATM.</p>
      )}

      <div>
        <p>Transaction Status: {transactionStatus}</p>
      </div>
      <div>
        <p>Current Date: {currentDate}</p>
        <p>Current Time: {currentTime}</p>
      </div>
      <style jsx>{`
        .container {
          text-align: center;
        }
      `}</style>
    </main>
  );
}
