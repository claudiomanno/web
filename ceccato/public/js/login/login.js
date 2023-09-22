import { getPort, getUrl } from './../../config/config.js';
import {setHtml, getDiv, changeMain} from '../main.js';
import {callRemote} from './../../remote/remote.js';

function sendLogin(id){
    console.log(id);

    const obj= getDatiForm();// ricavo i dati dal form
    if(obj.password==='' || obj.username === ''){
        setHtml("esitologin", "i campi username e password sono obbligatori");
        return;
    }
    console.log( obj);
    const url =getUrl()+"login/";
    callRemote.render(obj, url, 'POST', callBack, "token");// fetch promise

    function callBack(dat){
        console.log("rx: ", dat);
       
        const alert   = getDiv('alert');
        const alert1  = getDiv('alert1');

        alert.style.display="";
        alert1.innerHTML=dat.record+" : "+dat.msgc;
        
        if(dat.record === "ok"){
            setHtml("logo", " Benvenuto "+dat.username);
            localStorage.setItem('username', dat.username);
            
        }else{
            setHtml("logo","Eseguire l'accesso ");
        }
        
        setHtml("esitologin", dat.msgc);
        
        setTimeout(function(){
            alert.style.display="none";
            // alertOff();
            setTimeout(function(){
                changeMain('home');
            },1000)
        }, 3000);
    }
}
function getDatiForm() {
    var elements = document.getElementById("form_app").elements;
    var obj ={};
    for(var i = 0 ; i < elements.length ; i++){
        var item = elements[i].id;
        //if(elements[i].value !== ""){
             if(elements[i].type === "text" || elements[i].type === "password"){
                obj[item] = elements[i].value;
             } 
        //} 
    }
    console.log(obj);
    console.log(JSON.stringify(obj));
   // document.getElementById("demo").innerHTML = JSON.stringify(obj);
   return obj;
}
export{
    sendLogin
}
