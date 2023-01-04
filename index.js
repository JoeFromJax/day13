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

        // Create the cell element for the NFT name
        const nameCell = document.createElement("td");
        nameCell.innerHTML = nft.name;

        // Create the cell element for the NFT balance
        const balanceCell = document.createElement("td");
        balanceCell.innerHTML = nft.balance;

        // Create the cell element for the NFT image
        const imageCell = document.createElement("td");

        // Create the img element
        const img = document.createElement("img");
        img.src = nft.imageUrl;
        img.alt = nft.name;

        // Append the img element to the cell element
        imageCell.appendChild(img);

        // Append the cell elements to the row element
        row.appendChild(nameCell);
        row.appendChild(balanceCell);
        row.appendChild(imageCell);

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
    
