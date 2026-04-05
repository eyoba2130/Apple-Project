const mysql = require('mysql');
const express = require('express');
const cors = require('cors');

const app = express();

const conn = {
    locahost: 'localhost',
    user: "root",
    password: "",
    database: "mydb"

};
conn = mysql.createConnection(conn);
console.log("Connected to MySQL");

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
