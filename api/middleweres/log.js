 const log = (req, res, next) =>{

    console.log('methode', req.method)
    console.log('url', req.url)
    console.log('time', new Date().toLocaleTimeString())
    next()
}


module.exports = {
    log
}
