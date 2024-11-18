// Ensure Web3 is loaded
if (typeof window.ethereum !== 'undefined') {
    console.log('MetaMask is installed!');
} else {
    alert('Please install MetaMask to use this application.');
}

// Connect Wallet
const connectWalletButton = document.getElementById('connectWallet');
connectWalletButton.addEventListener('click', async () => {
    try {
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        console.log('Connected account:', accounts[0]);
        alert(`Connected: ${accounts[0]}`);
    } catch (error) {
        console.error(error);
    }
});

// Interact with Smart Contract
const loadContractButton = document.getElementById('loadContract');
loadContractButton.addEventListener('click', async () => {
    const contractAddress = document.getElementById('contractAddress').value;

    if (!contractAddress) {
        alert('Please enter a valid contract address.');
        return;
    }

    // ABI and contract setup
    const abi = await fetch('./contract/abi.json').then((res) => res.json());
    const web3 = new Web3(window.ethereum);
    const contract = new web3.eth.Contract(abi, contractAddress);

    try {
        const name = await contract.methods.name().call();
        const symbol = await contract.methods.symbol().call();

        document.getElementById('contractInfo').innerHTML = `
            <p>Contract Name: ${name}</p>
            <p>Contract Symbol: ${symbol}</p>
        `;
    } catch (error) {
        console.error('Error interacting with contract:', error);
        alert('Failed to fetch contract details. Ensure the contract address and ABI are correct.');
    }
});
