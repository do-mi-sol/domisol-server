const { delete } = require("../routes/comment");

const pool = require("../config/database/db_connect");
const SQL = require("../config/database/db_sql");

const { errorMsg } = require("../utils/myMessage");

module.exports={
    comments:(req,res,next)=>{
        //프론트에서 요청하면 디비에있던 댓글 정보를 넘겨준다.
        try{
            const [comment_data]=await pool.query(SQL.SELECT_allcomment, [user_id])

            req.comment = comment_data[0]
        }catch(commentsERR){
            errorMsg(res,commentsERR)
        }
    },

    write:()=>{

    },

    delete:()=>{

    }
}