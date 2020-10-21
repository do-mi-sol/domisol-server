const INSERT_all = "INSERT INTO user SET ?";

const SELECT_userid = "SELECT * FROM user WHERE user_id=? ;";
const SELECT_email = "SELECT * FROM user WHERE email=? ;";
const SELECT_password = "SELECT * FROM user WHERE password=? ;";
const SELECT_userid_password = "SELECT * FROM user WHERE user_id=? and password=?;";
const SELECT_name_email = "SELECT * FROM user WHERE name = ? AND email =?;";
const SELECT_name_email_userid = "SELECT * FROM user WHERE name = ? AND email =? AND user_id = ?;";

const UPDATE_userid = "UPDATE user SET user_id = ? WHERE user_id =?;";
const UPDATE_password = "UPDATE user SET password =? WHERE user_id = ?;";

const DELETE_userid = "DELETE FROM user WHERE user_id = ?;";

const SELECT_allboard = "SELECT board_number, board_title, name, gender, board_date, board_views FROM board";

// board view & numbering
const SELECT_countboard = "SELECT count(*) count FROM board;";
const SELECT_boardnum = "SET @rownum:= ?;";
const SELECT_boardlimit =
    "SELECT @rownum:=@rownum+1 as number, board_title, board_date FROM board ORDER BY board_date DESC LIMIT ?,?";

// boart insert content
const INSERT_board = `INSERT INTO board VALUES (null,?,?,NOW(),?,?,?,?,?,?)`;

// board & comment like sql
const SELECT_boardnumber = `SELECT * FROM board WHERE board_number = ?`;

const SELECT_boardheart = `SELECT board_heart FROM board WHERE board_number =?`;
const UPDATE_boardheart = `UPDATE board SET board_heart = ? WHERE board_number =?`;

const SELECT_commentheart = `SELECT comment_heart FROM comment WHERE comment_number =?`;
const UPDATE_commentheart = `UPDATE comment SET comment_heart = ? WHERE comment_number =?`;

module.exports = {
    INSERT_all,
    INSERT_board,
    SELECT_userid,
    SELECT_email,
    SELECT_password,
    SELECT_userid_password,
    SELECT_name_email,
    SELECT_name_email_userid,
    SELECT_allboard,
    SELECT_countboard,
    SELECT_boardlimit,
    SELECT_boardnum,
    SELECT_boardnumber,
    SELECT_boardheart,
    SELECT_commentheart,
    UPDATE_userid,
    UPDATE_boardheart,
    UPDATE_commentheart,
    UPDATE_password,
    DELETE_userid,
};
