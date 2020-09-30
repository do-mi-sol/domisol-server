let mysql = require("mysql")
let db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "domisol!",
    database: "domisol_test",
})
db.connect()
module.exports = db

// module.exports = {
//   host: "localhost",
//   user: "root",
//   password: "gmldus98!",
//   database: "testDB",
// };

// module.exports = {
//     host: "localhost",
//     user: "root",
//     password: "domisol!",
//     database: "domisol_test",
// }
