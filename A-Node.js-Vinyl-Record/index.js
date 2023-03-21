// 設定開發環境，使用專案的.env。
if(process.argv[2] && process.argv[2]==='production'){
    require('dotenv').config({
      path: './production.env'
    });
  } else {
    require('dotenv').config({
      path: './dev.env'
    });
  }

  

//-----------------------------------------------------------
// 1-1. 引入 express ，是 Node.js 底下的一個前端 + 後端的框架。
const express = require("express");
const Jimp = require("jimp");
const session = require("express-session");
const MysqlStore = require('express-mysql-session')(session);

const moment = require("moment-timezone");
//有時區的功能，但檔案較大，如果沒有要用轉換時區，可以用dayjs就好
const cors = require('cors');
const bcrypt = require("bcryptjs");

// 使用 Multer 處理檔案上傳，建立上傳檔案的模組
const upload = require('./modules/upload-imgs');

// 連線資料庫
const db = require('./modules/db_connect');
const sessionStore = new MysqlStore({},db);



//-----------------------------------------------------------
// 1-2. 建立 web server 物件 (網站伺服器)
const app = express();


app.set('view engine', 'ejs');
// var express = require('express');
// var app = express();
app.use(session({
    saveUninitialized:false,
    resave:false,
    secret:'jdkfksd8934-@_753634jdkssdfg',
    store:sessionStore,
    cookie:{
    // maxAge:1200_000
    }
}));

const corsOptions = {
    // credentials: true,
    origin: function(origin, cb){
      console.log({origin});
      cb(null, true);
    }
  };



// 將 body-parser 設定成頂層 middleware，放在所有路由之前。
// body-parser 是Express 經常使用的中介軟體，用於解析請求的資料(body)
// 若用戶送進來的資料是urlencoded，才會進來做解析。
app.use(express.urlencoded({extended: false}));
app.use(cors());

// 若用戶送進來的資料是json，才會進來做解析。
app.use(express.json());
// set 是設定，use 是接收 http 所有的方法。所以所有方法都會先進入這個頂層 middleware。



//-----------------------------------------------------------
// 1-3. 放後端路由 routes
// 路由是指，當用戶來拜訪時要符合http的方法跟對的路徑，才可以拿到資料。若有相同的路徑，前面會蓋掉後面的。
app.get("/", (req, res) => {
  res.send("會員您好");
});

//routes路由
//app.get('路徑檔名',()=>{})

// app.get('/', (req, res) => {
//   // res.send('hihi歡迎');
//   res.locals.title = '首頁-' + res.locals.title;
//   res.render('main', { name: 'BLACKVinyl'})

// });


// app.get("/sales-json", (req, res) => {
//   const sales = require(__dirname + '/data/sales');
//     //res.json(sales); // 輸出 JSON 的格式
//    //res.render('sales-json', {sales})//輸出JSON格式
//    res.render('sales-json', {sales, title:'業務員資料'})
// })


// app.get("/try-qs", (req, res) => {
//   res.json(req.query)
// })


// app.post(['/try-post','/try-post1'],(req, res) => {
//   res.json({
//     body: req.body,
//     query:req.query
//   })
// })

// app.get('/try-post-form', (req, res) => {
//   res.render('try-post-form',)
// })

// app.post('/try-post-form',(req, res) => {
//   res.render('try-post-form', req.body)
// })

// jimp
//  app.post('/try-upload', [upload.single('avatar'), async (req, res, next)=>{
//   console.log(req.file);
//   if(req.file && req.file.filename){
//     req.file.myAttr = '345';

//     const lenna = await Jimp.read(req.file.path);
//     lenna.resize(256, 256) // resize
//       .quality(60) // set JPEG quality
//       .greyscale() // set greyscale
//       .write(__dirname + '/public/uploads/lena-small-bw.jpg'); // save
//       next();
//   } else {
//     next();
//   }

// }], (req, res) => {
//   // console.log('req.file:', req.file);
//   res.json(req.file);
// });


app.post("/try-uploads",upload.array('photos',5),(req,res)=> {
  res.json({
    body:req.body,
    files:req.files
  })
})
// app.post("/try-upload",upload.single('avatar'),(req,res)=> {
//   res.json(req.file)
// })


 //路徑的參數
// app.get('/p1/:action?/:id?', (req, res) => {
//   res.json(req.params)
// })

//測試:3001/m/0911111111
// app.get(/\/m\/09\d{2}-?\d{3}-?\d{3}$/i,(req,res)=>{
//   let u = req.url.slice(3);
//   u = u.split('?')[0];
//  // u = u.split('-').join('');
//   u = u.replaceAll('-', '');
//   res.send(u);//上面切掉的是為了顯示u
// })


//app.use(require('./routes/admin2'));//router當作middleware

app.use('/admin', require('./routes/admin2'));

// app.get('/try-sess', (req, res) => {
//   req.session.myVar = req.session.myVar || 0;
//   req.session.myVar++;
//   res.json(req.session);
// });


app.get('/try-moment', (req, res) => {
  const fmStr = 'YYYY-MM-DD HH:mm:ss';
  const m1 = moment(); // 取得當下時間
  const m2 = moment('2023-02-29');
   
  res.json({
    body: req.body,
    files: req.files
  });
});



////////////////////////////////////////////////////////////////////////////

app.use('/membership', require('./routes/membership'));
app.use('/coupon', require('./routes/coupon'));
app.use('/wishlist', require('./routes/wishlist'));
app.use('/comment', require('./routes/comment'));
app.use('/orderlist', require('./routes/orderlist'));


//連線 customization_item 資料表
app.get('/customization-item', async (req, res) => {
  //因會回傳 [rows,fields-欄位資訊] 陣列，此處只要限定拿rows的資料，習慣上用中括號來解開陣列拿第一層
  const [rows] = await db.query("SELECT * FROM customization_item");
  res.json(rows);
});
// router 當作 middleware
app.use('/db-customization-item', require('./routes/customization-item'));


// app.get('/customization-material', async (req, res) => {
//   const [rows] = await db.query("SELECT * FROM customization_material");
//   res.json(rows);
// });
app.use('/db-customization-material', require('./routes/customization-material'));

app.use('/db-vr-album', require('./routes/vr-album'));

app.use('/db-all-vr-album', require('./routes/all-vr-album'));

app.use('/db-record-player', require('./routes/record-player'));

app.use('/db-merchandise', require('./routes/merchandise'));

app.use('/db-crowdfunding', require('./routes/crowdfunding'));

app.use('/db-product',require('./routes/product'));
// 商品頁面全
app.use('/db-recordPlayerAll',require('./routes/recordPlayerAll'));
// 唱機頁面全
// app.use('/db-commit',require('./routes/commit'));
// 評論頁面全有問題,回家看
// FIXME:
// 差其他商品



// app.get('/a.html', (req, res) => {
//   res.send('假的啦!');
// }); 因為寫在app.use(express.static('public')); 的前面, 所以跑完就結束;就是個後端做的假靜態內容

app.use(express.static('public'));
// app.use(express.static('node_modules/bootstrap/dist'));


// 自訂404頁面 *** 此段放在所有路由設定的後面 ***
app.use((req, res) => {
  // res.type('text/plain'); 沒有寫就是用html格式
  res.status(404).send(`<h1>抱歉！找不到頁面</h1>
  <p>404 QQ</p>`);
});


//-----------------------------------------------------------
// 1-4. Server 偵聽
//有設定就用設定檔，沒有就用3000。
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`伺服器啟動: ${port}`);
});
