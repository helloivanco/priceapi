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

async function gecko_image(crypto_id) {
  var url1 = 'https://api.coingecko.com/api/v3/coins/';

  // append crypto_id to our url so we can tell the API that we want prices
  //   only for that id
  var full_url = url1 + crypto_id;

  const res = await axios.get(full_url);

  // return the first (should be only) price from data
  // extract the value in the dictionary with a key of 'price_usd'
  return res.data['image']['large'];
}

async function handler(req, res) {
  // Run the middleware
  await runMiddleware(req, res, cors);

  const { id } = req.query;

  const image = await gecko_image(id);
  // Rest of the API logic
  res.redirect(image);
}

export default handler;
