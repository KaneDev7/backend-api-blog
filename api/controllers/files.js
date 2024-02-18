
const path = require('path')
const fs = require('fs')


const deleteImg = (imgName) => {
    const dir = path.join(__dirname,'..','..','client/public/images/' ) 

    fs.unlink(dir + imgName, (err) => {
        if (err) {
            console.log(err)
            return
        }
        console.log(`image ${imgName} supprimé avec succée` )
    })

}

module.exports = { deleteImg }