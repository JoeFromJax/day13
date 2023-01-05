import axios from "axios";

const submitButton = document.getElementById("submit-button");
const addressInput = document.getElementById("address-input");
const container = document.createElement("div");
container.classList.add("nft-images-container");
const table = document.createElement("table");
const loadingIndicator = document.createElement("div");
loadingIndicator.classList.add("loading-indicator");

function showLoadingIndicator() {
  container.innerHTML = "";
  container.appendChild(loadingIndicator);
}

function hideLoadingIndicator() {
  container.removeChild(loadingIndicator);
}

function clearTable() {
  while (table.firstChild) {
    table.removeChild(table.firstChild);
  }
}

function displayError(error) {
  container.innerHTML = "";
  const errorMessage = document.createElement("p");
  errorMessage.innerHTML = error;
  container.appendChild(errorMessage);
}

submitButton.addEventListener("click", function () {
  if (!addressInput.value) {
    return displayError("Please enter a valid wallet address.");
  }

  showLoadingIndicator();
  clearTable();

  const apiKey = "D5jtQTYVyu9_tx2jInmHBWIcmoUogGch";
  const baseURL = `https://eth-mainnet.g.alchemy.com/nft/v2/${apiKey}/getNFTs/`;
  const ownerAddr = addressInput.value;

  var config = {
    method: "get",
    url: `${baseURL}?owner=${ownerAddr}`,
   };
 
  axios(config)
    .then(function (response) {
      console.log(response.data);

      for (const nft of response.data.ownedNfts) {
        // Create a row element for each NFT
        const row = document.createElement("tr");
        if (typeof response.data.ownedNfts !== 'undefined' && response.data.ownedNfts instanceof Array) {
          // ownedNfts property exists and is an array
        } else {
          // ownedNfts property is not an array or does not exist
        }
        if (nft.hasOwnProperty('title') && nft.hasOwnProperty('balance') && nft.hasOwnProperty('imageUrl')) {
          // NFT object has the expected properties
        } else {
          // NFT object is missing one or more of the expected properties
        }
        if (nft.imageUrl && typeof nft.imageUrl === "string") {
          const img = document.createElement("img");
          img.src = nft.imageUrl;
          img.alt = nft.title;
          // append the img element to the DOM
        } else {
          // display a placeholder image or handle the error
        }
        // Create the cell element for the NFT title
        const titleCell = document.createElement("td");
        titleCell.innerHTML = nft.title;

        // Create the cell element for the NFT balance
        const balanceCell = document.createElement("td");
        balanceCell.innerHTML = nft.balance;

        //creates image Cell
        const imageCellElement = document.createElement("div");
        imageCellElement.classList.add('img-cell');

      console.log(nft.media[0].raw);
      const imgElement = document.createElement('img');
      imgElement.classList.add('img');
      
      
      let urlImage = nft.media[0].gateway;

      if (urlImage && urlImage.startsWith("ipfs://")) {
        urlImage = "https://ipfs.io/ipfs/" + urlImage.slice(8);
      }
      
      
      imgElement.src = urlImage;
      imgElement.onerror = function() {
        // Display placeholder image
        this.src = 'https://png.pngtree.com/png-vector/20190223/ourmid/pngtree-vector-picture-icon-png-image_695350.jpg';
      }; 

        // Append the img element to the image cell element
        imageCellElement.appendChild(imgElement);

        // Append the cell elements to the row element
        row.appendChild(titleCell);
        row.appendChild(balanceCell);
        row.appendChild(imageCellElement);


        // Append the row element to the table element
        table.appendChild(row);
      }

          // Append the table element to the container element
          container.appendChild(table);

          hideLoadingIndicator();
        })
        .catch(function (error) {
          console.error(error);
          displayError("An error occurred while fetching NFTs.");
          hideLoadingIndicator();
        });
    });
    
    // Append the container element to the document
    document.body.appendChild(container);