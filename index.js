import { Alchemy, Network } from "alchemy-sdk";

const settings = {
  apiKey: "D5jtQTYVyu9_tx2jInmHBWIcmoUogGch",
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

function main() {
  return new Promise((resolve, reject) => {
    const walletAddress = document.getElementById('wallet-address').value;
    alchemy.nft.getNftsForOwner(walletAddress)
      .then(nfts => {
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
        resolve();
      })
      .catch(error => reject(error));
  });
}

function fetchNFTs() {
  main()
    .then(() => {
      // Get token balances
      return alchemy.core.getTokenBalances(walletAddress);
    })
    .then(balances => {
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
        return alchemy.core.getTokenMetadata(token.contractAddress)
          .then(metadata => {
            // Compute token balance in human-readable format
            balance = balance / Math.pow(10, metadata.decimals);
            balance = balance.toFixed(2);
  
            // Print name, balance, and symbol of token
            console.log(`${i++}. ${metadata.name}: ${balance} ${metadata.symbol}`);
          });
      }
    })
    .catch(error => console.error(error));
}

const button = document.getElementById('submit-button');
button.addEventListener('click', fetchNFTs);