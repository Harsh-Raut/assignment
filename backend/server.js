const express = require('express');
const mongoose = require('mongoose');
const app = express();
const initializeRoute = require('./routes/initialize');
const port = process.env.PORT || 3001;
mongoose.connect('mongodb://localhost:27017/my-db', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.json());

// Define routes
app.use('/api', initializeRoute);
app.use('/api/transactions', require('./routes/transactions'));
app.use('/api/statistics', require('./routes/statistics'));
app.use('/api/charts', require('./routes/charts'));
// app.use('/api/pie-chart', require('./routes/pieChart'));
app.use('/api/combined', require('./routes/combined'));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
