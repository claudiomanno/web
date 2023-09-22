const express = require('express');
const bodyParser = require('body-parser')
let exec   = require('child_process').exec;
let Gpio   = require('onoff').Gpio;
const app  = express();
const path = require("path");
const cors = require('cors');

const ip = require("ip");

console.log("dentro");
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));
console.log("express.static(path.join(__dirname, 'public')) : ", path.join(__dirname, 'public'));
app.use('/stylesheets/fontawesome', express.static(__dirname + '/node_modules/@fortawesome/fontawesome-free/'));

app.get('/', (req, res) => {
    if (req.url.indexOf("/external/") === 0 || req.url.indexOf("/css/") === 0 || req.url.indexOf("/media/") === 0
            || req.url.indexOf("/js/") === 0 || req.url.indexOf(".js") === 0 || req.url.indexOf(".css") === 0
            || req.url.indexOf(".map") === 0) {
            res.setHeader("Cache-Control", "public, max-age=2592000");
            res.setHeader("Expires", new Date(Date.now() + 2592000000).toUTCString());
    }

    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

//http://192.168.1.13:3100/test
//espone sulla pagina html il comando cat 
app.get('/test',(req,res)=> {
    const ipAddress = req.socket.remoteAddress;
    exec('cat server.js', (err, output) => {
         
        //una volta che il comando è eseguito viene chiamata la callback
        if (err) {
            // log  errore
            console.error("non posso eseguire il comando : ", err)
            res.send("Hello Express "+ err);
             
        }
        // stampo sulla console del browser il risultato del comando cat
        console.log("Output: \n", output);
        //response su pagina html
        res.send("Hello Express "+ ipAddress+"\n"+output);
    })
    

});


app.get('/robot/:id',(req,res)=> {
    executeOpen('ls ./',ctlOpen1);

    function ctlOpen1(msg){
        res.status(200).json({
            status: 200,
            msgc: "Operazione :"+msg,
            ms: "status :"+msg,
            record: "ok"
        });
    }
   
});

function executeOpen(command, callback) {
    let ris = '';
    //unexportPins()
try{
    let cmd = exec(command, function (error, stdout, stderr) {
          //console.log('error: ' + error, 'stdout : '+ stdout, "stderr: "+stderr);
          callback(stdout);
    });
}catch(e){
  callback(e);
}
}
//login

app.post('/login',(req,res)=>{
    console.log("login");
   const data = req.body;
  
   if(req.body.username.trim()==='ia' && req.body.password.trim() === 'llm'){
      
       res.status(200).json({
           status: 200,
           msgc: "login eseguito correttamente :"+req.body.username,
           ms: "login eseguito correttamente :"+req.body.username,
           username:req.body.username,
           record: "ok",
       });
   }else{
      
       res.status(401).json({
           status: 401,
           msgc: "Accesso negato per l'utente : "+req.body.username,
           ms: "Accesso negato per l'utente : "+req.body.username,
           username:req.body.username,
           record: "ko",
       });
   }
});

app.listen(3100,()=>{
    console.log("server attivo ip : http://"+ip.address()+":3100/");
});