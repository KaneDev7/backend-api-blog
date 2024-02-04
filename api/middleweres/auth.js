const express = require('express')
const jwt = require('jsonwebtoken')
const app = express() 

const authVerification = async (req, res, next) => {
    const authorizationHeader = req.headers.authorization;
    if(!authorizationHeader){
        return res.status(401).json({ message: 'non autorisé'})
    }
    const token = authorizationHeader.split('Bearer')[1]
    
    jwt.verify(token.trim(), process.env.JWT_SECRET,(error, decoded) =>{
        if(error) return res.status(401).json({ message: 'token incorrecte'}) 
        next()  
    })
}

module.exports = {authVerification}



