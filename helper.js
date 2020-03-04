

function emailVerify(email, db) {
  for (userId in db) {
    if (email === db[userId].email) {
      return db[userId];
    }
  }
  return false
};

module.exports = { emailVerify };


