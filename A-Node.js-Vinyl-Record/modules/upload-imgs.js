//建立上傳檔案的模組 1/12上午10:30上課內容
//multer 使用 storage(儲存) 和 fileFilter(過濾上傳的檔案)

const multer = require("multer");


//require會拿到物件，用{ v4: uuidv4 }解構設定只拿v4的值，重新命名為uuidv4。
const { v4: uuidv4 } = require("uuid");


// 定義允許上傳的檔案附檔名
const extMap = {
  //mimetype(媒體類別) 對應到 附檔名
  "image/jpeg": ".jpg",
  "image/png": ".png",
  // "image/gif": ".gif",
};


//做檔案篩選，這是自行定義的FC，有檔案上傳時才會呼叫此FC。
//cb是指callback function，被呼叫時會接收三個東西：
// 1.req：指的是 upload.single('avatar')
// 2.file：指的是 req.file
// 3.cb：指的是 (req, file, cb) => { cb(null, !!extMap[file.mimetype]);}
const fileFilter = (req, file, cb) => {
  //將 [file.mimetype] 當作 key 丟給 extMap，如果有對應到就拿到附檔名，沒有對應到就拿到undefined。
  //用！！轉換成布林值，不是undefined就拿到 trust，undefined則拿到 false。
  //第一個參數是放「錯誤訊息」的地方，這邊沒有要放錯誤所以先寫null。
  cb(null, !!extMap[file.mimetype]);
};


//經過上方的fileFilter拿到trust後才會到這裡
//storage 要透過 multer.diskStorage 這個方法，給的設定是一個物件
//destination是指要存在哪個資料夾，filename是指檔名要叫什麼
//上方兩者裡面的 req 跟 file 是同樣的東西，只有cb不同。
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __dirname + "/../public/uploads");
  },
  filename: (req, file, cb) => {
    const ext = extMap[file.mimetype]; //拿到檔案的附檔名
    const fid = uuidv4(); //拿到主檔名
    cb(null, fid + ext);  //拿到主檔名+附檔名
  },
});



//匯出
module.exports = multer({ fileFilter, storage });
