// here is for the old contract 
// const PreTokenCA = "0x2729422a3D4c6235c20d400cE92298C48A86DBDD";
// const PreTokenABI = [{ "inputs": [], "stateMutability": "nonpayable", "type": "constructor" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "balances", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "buyPreSale", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [], "name": "claimPreSale", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "rate", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "tokenAmount", "type": "uint256" }], "name": "sellPreSale", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "token", "outputs": [{ "internalType": "contract IERC20", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }]
// here is for the new contract
const PreTokenCA = "0x20EcBde72d16D35C5D8CeFb8440971DEdf2E2BCE";
const PreTokenABI = [{ "inputs": [{ "internalType": "address", "name": "_tokenAddress", "type": "address" }, { "internalType": "uint256", "name": "_endtime", "type": "uint256" }], "stateMutability": "nonpayable", "type": "constructor" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "balances", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "buyPreSale", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [], "name": "claimPreSale", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [], "name": "endtime", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "rate", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "tokenAmount", "type": "uint256" }], "name": "sellPreSale", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "token", "outputs": [{ "internalType": "contract IERC20", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_newEndtime", "type": "uint256" }], "name": "updateEndtime", "outputs": [], "stateMutability": "nonpayable", "type": "function" }]
const connectBtn = document.getElementById("connect-btn");
const disconnectBtn = document.getElementById("disconnect-btn");
const walletAddressSpan = document.getElementById("wallet-address-span");
// const walletBalanceSpan = document.getElementById("wallet-balance-span");
const buyBtn = document.getElementById("buy-btn");
let provider;
let signer;
let PreTokenContract;


async function connectWallet() {
    if (!window.ethereum) {
        alert("Metamask is not installed on this browser");
        return;
    }

    provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);

    signer = await provider.getSigner();
    connectBtn.style.display = "none";
    // disconnectBtn.style.display = "block";

    PreTokenContract = new ethers.Contract(PreTokenCA, PreTokenABI, signer);
    if (!PreTokenContract) {
        alert("token contract was not found");
        return;
    }
    await getAddress();
    // await getUpdatedBalances();
    // const walletAddress = await signer.getAddress();
    // console.log("Connected wallet address:", walletAddress);
}

document.getElementById("connect-btn").addEventListener("click", connectWallet);

function disconnectWallet() {
    window.location.reload();
}
async function getAddress() {
    if (!provider || !signer) {
        alert("Wallet not connected.");
        return;
    }
    const address = await signer.getAddress();
    walletAddressSpan.textContent = address;
    // console.log("Connected wallet address:", address);
    ;
    // console.log("Connected wallet address:", address);
    return address;


}

// async function getUpdatedBalances() {
//     if (!provider || !signer) {
//         return;
//     }

//     const walletAddress = await signer.getAddress();
//     const weiBalance = await provider.getBalance(walletAddress);
//     const ethBalance = ethers.utils.formatEther(weiBalance);
//     walletBalanceSpan.textContent = ethBalance.toString() + " ETH";

// }
async function buyPreSale() {
    const ethInput = document.getElementById("ethAmount").value;
    const ethAmount = ethers.utils.parseEther(ethInput);

    // Ensure provider and signer are available
    // For example, they could be global variables or passed into the function
    if (!provider || !signer) {
        alert("Wallet not connected.");
        return;
    }

    // Instantiate the contract here
    const contract = new ethers.Contract(PreTokenCA, PreTokenABI, signer);
    const tx = await contract.buyPreSale({ value: ethAmount });
    await tx.wait();
    alert("Tokens bought successfully!");


}
document.getElementById("buy-btn").addEventListener("click", buyPreSale);



