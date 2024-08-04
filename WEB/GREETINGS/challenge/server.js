const express = require('express');
const path = require('path');
const app = express();

// Set the view engine to EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Route for the homepage
app.get('/', (req, res) => {
  	res.render('index');
});

// Route for the result page with XSS vulnerability
app.get(['/result', '/result/'], (req, res) => {
	const username = req.query.username || 'Guest'; // Default to 'Guest' if no username is provided
 
	let result;
	try {
		result = eval(username);
	} catch (err) {
    		result = `Error evaluating input: ${err.message}`; // Detailed error message
  	}
 	// Render result, ensuring XSS vulnerability
	res.render('result', { result: username });
});

// Start the server
app.listen(80, () => {
	console.log('Server is running on port 80');
});

