const express=require('express');
const db = require('../modules/db_connect');
const router=express.Router();

const commentData = async (req) => {
    let comit=[];
    const sql=`SELECT * FROM comment`;
    [comit]=await db.query(sql);
    
    return{
        comit,
    }
};

router.get("/api",async(req,res)=>{
    res.set('Access-Control-Allow-Origin','http://localhost:3001');
    res.json(await commentData(req,res));

;})