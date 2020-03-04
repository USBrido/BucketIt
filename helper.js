

function emailVerify(email, database) {
  for (userId in db) {
    if (email === db[userId].email) {
      return db[userId];
    }
  }
  return false
};

module.exports = { emailVerify };


