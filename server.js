const express = require('express');
const app = express();
const PORT = 3000; // Hard-coded port as per instructions

// Import Mongoose and database configuration
const mongoose = require('mongoose');
const dbConfig = require('./config/database.config.js');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("Successfully connected to the database");
}).catch(err => {
  console.log('Could not connect to the database. Exiting now...', err);
  process.exit();
});

// START Import authentication routes
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);
// END Import authentication routes

// START Import note routes
const noteRoutes = require('./routes/noteRoutes');
app.use('/api/notes', noteRoutes);
// END Import note routes

app.get('/', (req, res) => {
  res.send('Hello from Note-Taking App Backend!');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});