const nodemailer=require('nodemailer')
const Transporter=nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:"bhavish.trehan.s.135@kalvium.community",
        pass:"opswyooztkgedqbm"
    }
    
})
module.exports=Transporter