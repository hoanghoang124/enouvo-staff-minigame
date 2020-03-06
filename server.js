// //Install express server
const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

app.use(cors());
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  next();
});
app.options('*', cors());
// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/enouvo-staff-minigame'));

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname + '/dist/enouvo-staff-minigame/index.html'));
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);
