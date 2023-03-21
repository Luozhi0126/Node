app.post("/memberRegister",(req,res) => {
    const name = req.body.name;
    const email = req.body.email;
    const mobile = req.body.mobile;
    const password = req.body.password;
    const birthday = req.body.birthday;

    db.query(
        "INSERT INTO membership(name,email,mobile,password,birthday) VALUES (?,?,?,?,?)",
        [name, email, mobile, password, birthday],
        (err,result) => {
            console.log(err);
        }
    );
});

app.post('/login',async(req,res) => {
    const email = req.body.email;
    const password = req.body.password;
    console.log(req.body)
    db.query(
        "SELECT * FROM membership WHERE email =? AND password =?",
        [email, password],
        (err,result) => {
            if (err){
                res.send({err:err});
            }
            if (result.length > 0){
                res.send(result);
                } else {
                res.send({message:"電子信箱或密碼錯誤!"});
            } 
        }
    );
});