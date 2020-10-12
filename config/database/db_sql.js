const INSERT_all = "INSERT INTO user SET ?";
const SELECT_userid = "SELECT * FROM user WHERE user_id=? ;"
const SELECT_userid_password = "SELECT * FROM user WHERE user_id=? and password=?;"

module.exports = {
  INSERT_all,
  SELECT_userid,
  SELECT_userid_password
};
