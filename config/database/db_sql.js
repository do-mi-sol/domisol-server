// const signup_SAVE = "INSERT INTO user (user_id, email, password, name, gender,age) VALUES ()";
const signup_SAVE = "INSERT INTO user SET ?";

module.exports = {
  signup_SAVE,
};
