const express = require("express");
const moment = require("moment-timezone");
const db = require('../modules/db_connect')//處理檔案上傳，建立上傳檔案
const upload = require('../modules/upload-imgs')

const router = express.Router();

router.use((req, res, next)=>{
  /*若重這邊則登入後才能繼續作業
  if(! req.session.admin){
    return res.redirect('/login');
  }
  */
  next();
});


//編輯取值
const getMemberData = async(req)=>{
  let member=[];
  const sql = `SELECT * FROM membership where sid=5`;
   [member] = await db.query(sql);
  return {
    member,
  }
}


//listapi
router.get("/api",async(req,res)=>{
  res.json(await getMemberData(req,res));
})



// //編輯-會員編輯
// router.put("/edit/:sid", upload.none(), async (req, res) => {
//   const sid = req.params.sid;
//   let {name, email, mobile, birthday, address} = req.body;

//   // TODO: 檢查表單各欄位的資料

//   if(! moment(birthday).isValid()){
//     birthday = null;
//   } else {
//     birthday = moment(birthday).format('YYYY-MM-DD');
//   }

//   const sql ="UPDATE `membership` SET `name`=?,`email`=?,`password`=?,`gender`=?,`birthday`=?,`mobile`=?,`city`=?,`area`=?,`address`=?,`sub_sid`=? WHERE `sid`=?";
//   const [result] = await db.query(sql, [name, email,password,gender, birthday,mobile,city,area,address,sub_sid, sid]);

//   res.json({
//     success: !! result.changedRows,
//     formData: req.body,
//     result
//   })
// });




module.exports = router;