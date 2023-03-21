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



//我的最愛取值
const getWishlistData = async(req)=>{
  let wish=[];
  const sql = "SELECT * FROM `temporary_order`left join `pre_products` ON `temporary_order`.`product_sid`=`pre_products`.`pre_number_id` WHERE `temporary_order`.`membership_sid`=5; ";
   [wish] = await db.query(sql);
  return {
    wish
  }
}

//listapi
router.get("/api",async(req,res)=>{
res.json(await getWishlistData(req,res));
})




module.exports = router;