const express = require('express')
const session = require('express-session')
const bodyParser=require('body-parser')
const app = express()
const port = 3000

var path=require('path');

var login="vinicius";
var password = "vinicius";

app.use(session({secret:"nsdiovffdnvdlfnvbfgblgfkbn"}));
app.use(bodyParser.urlencoded({extended:true}));
app.engine('html',require('ejs').renderFile);
app.set('view engine','html');
app.use('/public',express.static(path.join(__dirname,'public')));
app.set('views',path.join(__dirname,'/views'));

app.post('/',(req,res)=>{
    if (req.body.password==password && req.body.login==login){
        req.session.login=login;
        res.render('logado');
    }
    else
    {
        res.render('index');
    }
}
)
app.get('/',(req,res)=>{
    if(req.session.login){
        res.render('logado');
        console.log("o meu usuario logado é: "+req.session.login);
    }
    else
    {
        res.render('index');
    }
})


// app.get('/logado',(req,res)=>{
//     console.log("tentando deslogar");
//     req.session.destroy();
//         res.render('index');
    
// }
// )

app.get('/logado', function(req, res, next) {
    // remove the req.user property and clear the login session
    req.logout();
  
    // destroy session data
    req.session = null;
  
    // redirect to homepage
    res.redirect('/');
  });




app.listen(port,()=>{
    console.log('servidor rodando');
})