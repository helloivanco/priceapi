# Takes data from Coingecko for use in Google Sheets

## Price Data
Paste this into the Tools >> Script Editor
(replace YOURAPIURL with your deployed url)
```
function priceapi(crypto_id){
  var full_url = 'https://YOURAPIURL/api/'+ crypto_id;
  var response = UrlFetchApp.fetch(full_url);
  var data = JSON.parse(response.getContentText());
  return data['price'];
}

```
To get the price in a cell (replace "COINGECKO_COIN_ID" with "Bitcoin", etc.)

```
=priceapi("COINGECKO_COIN_ID")
```

## Image

In a cell use
(replace YOURAPIURL with your deployed url)
```
=image("https://YOURAPIURL/api/image/COINGECKO_COIN_ID")
```

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
