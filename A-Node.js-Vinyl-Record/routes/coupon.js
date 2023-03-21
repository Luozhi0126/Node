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

//取值
const getCouponData = async(req)=>{
  let coupon=[];
  const sql = "SELECT * FROM `coupon` LEFT JOIN `coupon_item` ON `coupon`.`coupon-item_SID`= `coupon_item`.`sid` WHERE `menbership_SID`=5; ";
   [coupon] = await db.query(sql);
  return {
    coupon
  }
}





//listapi
router.get("/api",async(req,res)=>{
res.json(await getCouponData(req,res));
})






module.exports = router;