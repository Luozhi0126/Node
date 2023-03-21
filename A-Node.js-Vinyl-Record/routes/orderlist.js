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


//歷史訂單取值
const getOrderlistData = async(req)=>{
  let orderlist=[];
  const sql = `SELECT * FROM orders JOIN order_details ON orders.sid=order_details.orders_sid WHERE orders.membership_sid=5`;
   [orderlist] = await db.query(sql);
  return {
    orderlist,
  }
}


//listapi
router.get("/api",async(req,res)=>{
res.json(await getOrderlistData(req,res));
})



module.exports = router;