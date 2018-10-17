const tracer = require('dd-trace').init({ service: 'node-express', // shows up as Service in Datadog UI
                                        hostname: 'agent', // references the `agent` service in docker-compose.yml
                                        env: 'datad0g.com',
                                        plugins: true,
                                        sampleRate: 1});
                                        //debug: true}) // useful for seeing request/response and any logs

const axios = require('axios');
const redis = require('redis');
const client = redis.createClient('redis://demo-redis:6379');
// create an api/search route
exports.search = (req, res) => {
  // Extract the query from url and trim trailing spaces
  const query = (req.query.query).trim();
  // Build the Wikipedia API url
  const searchUrl = `https://en.wikipedia.org/w/api.php?action=parse&format=json&section=0&page=${query}`;
  // Try fetching the result from Redis first in case we have it cached
  return client.get(`wikipedia:${query}`, (err, result) => {
    // If that key exist in Redis store
    if (result) {
      const resultJSON = JSON.parse(result);
      return res.status(200).json(resultJSON);
    } else { // Key does not exist in Redis store
      // Fetch directly from Wikipedia API
      return axios.get(searchUrl)
        .then(response => {
          const responseJSON = response.data;
          // Save the Wikipedia API response in Redis store
          client.setex(`wikipedia:${query}`, 3600, JSON.stringify({ source: 'Redis Cache', ...responseJSON, }));
          // Send JSON response to client
          return res.status(200).json({ source: 'Wikipedia API', ...responseJSON, });
        })
        .catch(err => {
          return res.json(err);
        });
    }
  });
};
