const db = require("./db");

function dataUser(callback) {
  const users = "SELECT * FROM items";
  db.quuery(users, (err, result) => {
    if (err) {
      callback(err);
    }
    callback(null, result);
  });
}

module.exports = { dataUser };
