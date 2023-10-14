
## Smart Contract Management
## Description

This project is a decentralized Ethereum bank application that allows users to deposit and withdraw funds. It is built using Solidity smart contracts, Ethers.js, MetaMask, and Hardhat.

## Getting Started

To get started with this project, you will need to install the following dependencies:

Node.js
npm
MetaMask
Hardhat

### Configure MetaMask to use the Hardhat node 

1. Open the MetaMask extension in your browser.
2. Click on the account icon in the top right corner and select "Settings".
3. In the "Networks" tab, click on "Add Network".
4. Fill in the following details:
   - Network Name: hardhat-test-network
   - RPC URL: http://127.0.0.1:8545/
   - Chain ID: 31337
   - Currency Symbol: GO or ETH
5. Click on "Save" to add the Hardhat network to MetaMask.

### Follow these steps to get the project up and running 
 Inside the project directory, in the terminal type: npm i
2. Open two additional terminals in your VS code
3. In the second terminal type: npx hardhat node
4. In the third terminal, type: npx hardhat run --network localhost scripts/deploy.js
5. Back in the first terminal, type npm run dev to launch the front-end.

After this, the project will be running on your localhost. 
## Typically at http://localhost:3000/


## Usage 

**To use the application, follow these instructions:**

1. After connecting MetaMask to the Hardhat local network, connect your wallet with the application
2. Enter the Amount of ETH  you want to Deposit and the amount of ETH you want to Withdraw.
3. Click the "Deposit"  or "Withdraw" button to initiate the transaction.
4. Confirm the transaction in MetaMask.
5. The transaction details will be logged to the console, and the account balance will be updated.

## Authors

Dhanush km
dhamushkm@gmail.com

## License
This project is licensed under the MIT License - see the LICENSE.md file for details

