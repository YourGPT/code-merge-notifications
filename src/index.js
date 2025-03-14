/**
 * GitHub Merge Checklist Bot
 * 
 * Main server file
 */
const serverless = require("serverless-http");
const express = require('express');
const routes = require('./routes');
const config = require('./config');

// Create Express app
const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api', routes);

// Default route
app.get('/', (req, res) => {
  res.status(200).json({
    //  name: 'GitHub Merge Checklist Bot',
    //  description: 'A bot that generates checklists based on previous commits when merging to master or development branches, and notifies teams on Discord.',
    working: true

  });
});

// Start server
const PORT = config.server.port;
console.log("config", config)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Webhook URL: http://your-server-url/api/webhook/github`);
}); 

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Promise Rejection:', reason);
  console.error('Promise:', promise);
});

module.exports = app;
module.exports.handler = serverless(app);