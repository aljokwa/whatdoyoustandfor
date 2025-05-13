const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Serve static files
app.use(express.static('./'));

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
}); 