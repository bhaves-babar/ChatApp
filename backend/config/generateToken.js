const express=require('express');
const jwt=require('jsonwebtoken');

const generateToken =(id)=>{
    return jwt.sign({id},'hello',{expiresIn:"1d"});
}
module.exports={generateToken}