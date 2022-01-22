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

async function gecko_history(crypto_id, formattedDate) {
  var base_url = 'https://api.coingecko.com/api/v3/coins/';

  var full_url = base_url + crypto_id + '/history?date=' + formattedDate;

  const res = await axios.get(full_url);

  return res.data['market_data']['current_price']['usd'];
}

async function handler(req, res) {
  // Run the middleware
  await runMiddleware(req, res, cors);

  const { id, date } = req.query;

  var chunks = date.split('-');
  var formattedDate = chunks[1] + '-' + chunks[0] + '-' + chunks[2];

  let price = await gecko_history(id, formattedDate);
  // Rest of the API logic
  res.json({ price: `$${price}`, formattedDate: `${formattedDate}` });
}

export default handler;
