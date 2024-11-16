import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

const express = require('express');
const cors = require('cors');
const sql = require('mssql');
const config = require('./dbConfig');
const app = express();
app.use(cors());
app.use(express.json());
sql.connect(config, (err) => {
  if (err) console.log(err);
  else console.log('Connected to SQL Server');
});

app.post('/login', async(req, res) => {
const { username, password } = req.body;
try {
  const result = await sql.query`INSERT INTO Users(username,
  password) VALUES (${username}, ${password})`;
  res.send({ message: 'You are logged in' });
} catch(err) {
  console.log(err);
  res.status(500).send('Error saving to the database');
}
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
