const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

// Set the view engine to EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files from the 'public' directory (if needed)
app.use(express.static(path.join(__dirname, 'public')));

// Route for the homepage
app.get('/', (req, res) => {
  res.render('index');
});

// Route for the result page with SSRF and XSS vulnerabilities
app.get(['/result', '/result/'], (req, res) => {
  let username = req.query.username || 'Guest'; // Default to 'Guest' if no username is provided

  let result = 'Flag not available';

  try {
    // Decode URL-encoded input
    const sanitizedInput = decodeURIComponent(username);

    // Check if the input matches the SSRF payload
    if (sanitizedInput === '#{process.mainModule.require("fs").readFileSync("flag.txt", "utf8")}') {
      // Evaluate the payload if it matches
      result = eval(sanitizedInput.replace(/^#\{/, '').replace(/}$/, ''));
    } else {
      // Use the input as the result
      result = sanitizedInput;
    }
  } catch (err) {
    console.error('Error:', err);
  }

  // Render result, ensuring XSS vulnerability
  res.render('result', { result });
});

// Start the server
app.listen(80, () => {
  console.log('Server is running on port 80');
});
