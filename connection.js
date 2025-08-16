var mysql = require("mysql");
var util = require("util")

var conn = mysql.createConnection({
    host:"bs451v8prn0isgpwvd7r-mysql.services.clever-cloud.com",
    user:"ud5wch3g7kvzassf",
    password:"fNqOcfXi1ORQiAglNNWE",
    database:"bs451v8prn0isgpwvd7r"
})

var exe =  util.promisify(conn.query).bind(conn)

module.exports = exe;
