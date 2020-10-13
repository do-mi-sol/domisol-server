const INSERT_all = "INSERT INTO user SET ?";
const SELECT_userid = "SELECT * FROM user WHERE user_id=? ;";
const SELECT_userid_password = "SELECT * FROM user WHERE user_id=? and password=?;";
const UPDATE_userid = "UPDATE user SET user_id = ? WHERE user_id =? AND password = ?;";
const UPDATE_userpassword = "UPDATE user SET password =? WHERE user_id = ? AND password = ?;";

module.exports = {
    INSERT_all,
    SELECT_userid,
    SELECT_userid_password,
    UPDATE_userid,
    UPDATE_userpassword,
};
