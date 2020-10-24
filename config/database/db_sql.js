//user
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

//board
// board view & numbering
const SELECT_countboard = "SELECT count(*) count FROM board;";
const SELECT_boardlimit = `SELECT * , @rownum:=@rownum +1 AS count FROM ( SELECT A.*
    FROM (
         SELECT board.board_number,
                board.board_title,
                board.board_box,
                board.board_date,
                board.board_filename,
                board.board_views,
                user.user_id,
                user.name,
                user.gender
        FROM board LEFT JOIN user ON (board.user_id = user.user_id) ORDER BY board.board_date
        ) AS A, (SELECT @rownum:=0) R ) AS B ORDER BY count DESC LIMIT ?,?;`;
const UPDATE_boardviews = `UPDATE board SET board_views =? WHERE board_number = ?`;

// boart insert content
const INSERT_board = `INSERT INTO board VALUES (null,?,?,?,NOW(),?,?);`;

// board detail
const SELECT_boardnumber = "SELECT * FROM board WHERE board_number = ?";

// board heart
const SELECT_boardheart = "SELECT * FROM board_heart WHERE board_number = ?;";
const DELETE_boardheart = `DELETE FROM board_heart WHERE board_number=? AND user_id = ?`;
const SELECT_boardheartCount = `SELECT count(*) count FROM board_heart WHERE board_number =?`;
const INSERT_boardheart = `INSERT INTO board_heart VALUES(null,?,?)`;

//comment
const INSERT_allcomment = "INSERT INTO comment VALUES (null,?,?,?,NOW());";

const SELECT_allcomment = "SELECT * FROM comment WHERE board_number = ?;";

const DELETE_comment = "DELETE FROM comment WHERE user_id = ?;";

const SELECT_commentheart = `SELECT * FROM comment_heart WHERE comment_number =? AND board_number=? ANd user_id = ?`;
const DELETE_commentheart = `DELETE FROM comment_heart WHERE comment_number=? AND board_number =? ANd user_id = ?`;
const SELECT_commentheartCount = `SELECT count(*) count FROM comment_heart WHERE comment_number =? AND board_number =?`;
const INSERT_commentheart = `INSERT INTO comment_heart VALUES(null,?,?,?)`;

// best board
const SELECT_bestboard = `SELECT D.*, @rownum:=@rownum+1 AS count FROM (SELECT C.*, count(*) AS heartnum
FROM (
    SELECT
           A.board_number,
           A.board_title,
           A.board_box, A.board_date,
           A.board_filename,
           A.board_views,
           A.user_id
    FROM board AS A INNER JOIN board_heart AS B ON (A.board_number = B.board_number)
    ) AS C,(SELECT @rownum:=0) R GROUP BY board_number ORDER BY heartnum
) AS D ORDER BY count DESC LIMIT ?,?`;

module.exports = {
    INSERT_all,
    INSERT_allcomment,
    INSERT_board,
    INSERT_boardheart,
    INSERT_commentheart,
    SELECT_allboard,
    SELECT_allcomment,
    SELECT_bestboard,
    SELECT_boardheart,
    SELECT_boardheartCount,
    SELECT_boardlimit,
    SELECT_boardnumber,
    SELECT_commentheart,
    SELECT_commentheartCount,
    SELECT_countboard,
    SELECT_email,
    SELECT_name_email,
    SELECT_name_email_userid,
    SELECT_password,
    SELECT_userid,
    SELECT_userid_password,
    UPDATE_boardviews,
    UPDATE_password,
    UPDATE_userid,
    DELETE_boardheart,
    DELETE_comment,
    DELETE_commentheart,
    DELETE_userid,
};
