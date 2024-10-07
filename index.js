// where my node app starts
var express = require('express');
var app = express();
var cors = require('cors');

// enable CORS for remote testing by FCC
app.use(cors({optionsSuccessStatus: 200}));

// Serve static files from 'public' folder
app.use(express.static('public'));

// Serve homepage
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// First API endpoint to test
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// Timestamp Microservice endpoint
app.get("/api/:date?", function (req, res) {
  let date;

  // If no date is provided, return the current date
  if (!req.params.date) {
    date = new Date();
  } else {
    // Check if the date is a number (unix timestamp)
    if (!isNaN(req.params.date)) {
      // Convert to integer if it's a valid Unix timestamp
      date = new Date(parseInt(req.params.date));
    } else {
      // Otherwise, treat it as a date string
      date = new Date(req.params.date);
    }
  }

  // Check if the date is valid
  if (date.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }

  // Return both unix and utc formats
  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
