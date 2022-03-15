const { request } = require('express')
const { Router } =  require('express')
const router = Router()
const bodyParser = require('body-parser');
const { required } = require('nodemon/lib/config');
const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
const crypto=require('crypto')

var urlencodedParser = bodyParser.urlencoded({extended:false})

router.get('/', (req,res)=> {
    res.render('index')
})

router.post('/register', urlencodedParser,(req,res)=>{
    const login = req.body.login
    const password =  req.body.password
    
    var cryptPassword =  crypto.createHash("sha1").update(password).digest()

    // let user = {
    //     login: login,
    //     password: cryptPassword.toString('hex')
    // };

    let user = {
        login: login,
        password: password
    };

    var xhr = new  XMLHttpRequest();
    var body = JSON.stringify(user);
    xhr.open("POST", 'https://helloworldprojectt.herokuapp.com/v1/authorization',false);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send(body);

    console.log(xhr.status)
    console.log(cryptPassword.toString('hex'))

    if (xhr.status == 200)
        res.render('nextPage')
    else
        res.render('exeption');

})

module.exports = router