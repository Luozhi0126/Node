const express = require("express");
const db = require('../modules/db_connect');
const router = express.Router();

const getVrData = async (req) => {
  // 取得Vr_album資料
  let rev=[];
  // 宣告rev變數
  const sql=`SELECT * FROM vr_album`;
  // 取得vr_album的所有資料
  [rev]=await db.query(sql);
  // 將資料庫內的資料放入剛剛宣告的rev變數回傳陣列

  return {
    rev,
  }
};

// 以下為限制網域下之使用者才可看到資料
router.get("/api",async(req,res)=>{
  res.json(await getVrData(req,res));
  // 回傳檔案已json格式顯示
});

module.exports = router;




//   db.query(
//     "INSERT INTO `vr_album`(`sid`, `type`, `vrproduct_id`, `vr_number`, `vr_name`, `vr_size`, `vr-ltd`, `vr_date`, `vr_type`, `vr_description`, `vr_tracks`, `vr_price`, `vr_quantity`, `vr_img`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
//     (err, result) => {
//       if (err) {
//         console.log(err);
//       } else {
//         res.send("Values Inserted");
//       }
//     }
//   );


// app.get("/product", (req, res) => {
//   db.query("SELECT * FROM vr_album", (err, result) => {
//     if (err) {
//       console.log(err);
//     } else {
//       res.send(result);
//     }
//   });
// });


