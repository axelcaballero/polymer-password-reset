'use strict';

const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');

const app = express();
app.use(bodyParser.json()); // for Content-Type 'application/json'
app.use(bodyParser.text()); // for Content-Type 'text/plain'
// for Content-Type 'application/x-www-form-urlencoded'
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname));
app.use(cors());

const users = [
  {
    username: 'axel.rivera',
    email: 'axel.rivera@company.com',
    password: 'ps1',
    resetToken: '530c17c1fb8c96752498e120'
  },
  {
    username: 'adam.smith',
    email: 'adam.smith@company.com',
    password: 'ps1'
  }
];

app.get('/rest/users/reset-password/validate', (req, res) => {
  const resetToken = req.query.resetToken;
  const found = users.some(user => user.resetToken === resetToken);

  if (found) {
    res.status(204).send();
  } else {
    res.status(401).send('unauthorized');
  }

});

app.put('/rest/users/reset-password', (req, res) => {
  const item = req.body;
  function findResetToken(user) {
    return user.resetToken === item.resetToken;
  }
  const index = users.findIndex(findResetToken);
  users[index].password = item.newPassword;

  res.status(204).send();
});

app.listen(8083, () => console.log('ready'));