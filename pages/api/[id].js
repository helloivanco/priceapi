import Cors from 'cors';
import axios from 'axios';

// Initializing the cors middleware
const cors = Cors({
  methods: ['GET', 'HEAD'],
});

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

async function gecko_price(crypto_id) {
  var url1 = 'https://api.coingecko.com/api/v3/simple/price?ids=';

  // append crypto_id to our url so we can tell the API that we want prices
  //   only for that id
  var full_url = url1 + crypto_id + '&vs_currencies=usd';

  const res = await axios.get(full_url);

  // return the first (should be only) price from data
  // extract the value in the dictionary with a key of 'price_usd'
  return Math.round(res.data[crypto_id]['usd'], 3);
}

async function handler(req, res) {
  // Run the middleware
  await runMiddleware(req, res, cors);

  const { id } = req.query;

  const price = await gecko_price(id);
  // Rest of the API logic
  res.json({ price: `$${price}` });
}

export default handler;
