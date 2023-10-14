import React, { useState, useEffect } from "react";
import { ethers } from "ethers";

const contractAddress = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";

const atm_abi = [
 {
  "inputs": [
   {
    "internalType": "uint256",
    "name": "initialBalance",
    "type": "uint256"
   },
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
   },
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
   },
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
   },
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
   },
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
   },
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
   },
  ],
  "name": "withdraw",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
 },
];

const App = () => {
  const [account, setAccount] = useState(undefined);
  const [balance, setBalance] = useState(0);
  const [inputA, setInputA] = useState(0);
  const [inputB, setInputB] = useState(0);
  const [transactionStatus, setTransactionStatus] = useState("");

  useEffect(() => {
    const checkWallet = async () => {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({ method: "eth_accounts" });
        if (accounts.length > 0) {
          setAccount(accounts[0]);
        }
      }
    };

    const getBalance = async () => {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(contractAddress, atm_abi, provider.getSigner());
      const currentBalance = await contract.balance();
      setBalance(currentBalance.toNumber());
    };

    checkWallet();
    getBalance();
  }, []);

  const deposit = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, atm_abi, signer);
      const transaction = await contract.deposit(ethers.utils.parseEther(inputA.toString()), { value: ethers.utils.parseEther(inputA.toString()) });
      await transaction.wait();
      setTransactionStatus("Transaction successful");
      getBalance();
    } catch (error) {
      setTransactionStatus("Transaction failed");
    }
  };

  const withdraw = async () => {
    try {
      // Check the account balance before withdrawing ETH.
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, atm_abi, signer);
      const currentBalance = await contract.balance();
      if (currentBalance < inputB) {
        throw new Error("Insufficient balance");
      }
  
      // Withdraw ETH from the contract.
      const transaction = await contract.withdraw(inputB);
      await transaction.wait();
      setTransactionStatus("Transaction successful");
      getBalance();
    } catch (error) {
      setTransactionStatus("Transaction failed");
    }
  };
  const render = () => {
    if (!account) {
      return <p>Please install Metamask to use this ATM.</p>;
    }

    return (
      <main className="container">
        <header>
          <h1>Welcome!</h1>
          <h2>DHANUSH KM</h2>
        </header>

        <p>Your Account: {account}</p>
        <p>Your Balance: {balance} ETH</p>

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

        <div>
          <p>Transaction Status: {transactionStatus}</p>
        </div>

        <style jsx>{`
          .container {
            text-align: center;
          }
        `}</style>
      </main>
    );
  };

  return render();
};

export default App;
