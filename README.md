# day13

We know how to place event handlers on HTML elements in our javascript, and then listen for them, and fire arbitrary code when that happens.

We will use this now, and learn somethign new: how to make HTTP requests.

Remember - when you make changes to `index.js`, you need to run `npm run build` to run browserify to create your bundle, `bundle.js`, for the browser!

And also remember - you need to run `npm install` after forking and cloning this repo, to install all the dependencies!

Assignment:

Use the Axios library via NPM, and the free Alchemy API (or Moralis, Quicknode, Infura, etc) to fetch NFTs and ERC20 tokens for a given address. User should input their address into a input box in HTML, and click a button, then start the request and display the images, metadata, and ERC20s on the page.

We need:

- a HTML input element of type text on the page
- a HTML button element to click to fetch the ERC20s/NFTs
- a HTML div element to put the results
- some HTML header elements, like "All ERC20 Tokens" and "All NFTs"
- the javascript code that places an event listener on the button, and when clicked, gets the `.value` of the HTML input element with the user's address in it, so we can use the address!
  and then, for each ERC20s and NFTs:

- a loop over the axios response data to iterate over the actual NFT's,
- to create some HTML elements IN javascript and insert them into the page in the relevant section. if NFTs, like an image element with the image of the NFT, and a header element with the name of the NFT, a span for the description, maybe the Opensea floor price? if ERC20s, the symbol and the amount?
- and finally some CSS to style it!
