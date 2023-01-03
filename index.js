import { Alchemy, Network } from "alchemy-sdk";

const settings = {
  apiKey: "D5jtQTYVyu9_tx2jInmHBWIcmoUogGch",
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

async function main() {
  const walletAddress = document.getElementById('wallet-address').value;
  const nfts = await alchemy.nft.getNftsForOwner(walletAddress);
  const nftDiv = document.getElementById('nfts');
  nftDiv.innerHTML = ''; // Clear existing NFTs
  for (const nft of nfts.ownedNfts) {
    // Create an img element for the NFT
    const img = document.createElement('img');
    img.src = nft.thumbnail;
    img.alt = nft.title;
    // Append the img element to the NFT div
    nftDiv.appendChild(img);
  }

  // Get token balances
  const balances = await alchemy.core.getTokenBalances(walletAddress);
  // Remove tokens with zero balance
  const nonZeroBalances = balances.tokenBalances.filter((token) => {
    return token.tokenBalance !== '0';
  });
  console.log(`Token balances of ${walletAddress}:`);
  // Counter for SNo of final output
  let i = 1;

  // Loop through all tokens with non-zero balance
  for (const token of nonZeroBalances) {
    // Get balance of token
    let balance = token.tokenBalance;
    // Get metadata of token
    const metadata = await alchemy.core.getTokenMetadata(token.contractAddress);

    // Compute token balance in human-readable format
    balance = balance / Math.pow(10, metadata.decimals);
    balance = balance.toFixed(2);

    // Print name, balance, and symbol of token
    console.log(`${i++}. ${metadata.name}: ${balance} ${metadata.symbol}`);
  }
}

async function fetchNFTs() {
  await main();
}

const button = document.getElementById('submit-button');
button.addEventListener('click', fetchNFTs);