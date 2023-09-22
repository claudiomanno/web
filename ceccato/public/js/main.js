import {  butOn } from './robot/robot.js';
import {sendLogin} from './login/login.js';
import NavBar from './toolbar/navBar.js';

window.onload = function Main(){
    
    window.localStorage.clear();
   
    setInit(getPage1Page2IdLogin(), getDiv('alert'));
    
    setTimeout(function(){
        removeLoader();
    }, 1000);

    function removeLoader(){
        const wrapperLoader = getDiv('wrapper-loader');
        wrapperLoader.style.display = "none";
    }
    
    getDiv('on').onclick = e => {
        e.preventDefault();
        e.stopImmediatePropagation();
        butOn();
    }
   
    
    
    getDiv('send').onclick = e => {
            e.preventDefault();
            e.stopImmediatePropagation();
            console.log("e.target.name : ", e.target.id);
            sendLogin(e.target.id);
    }
    
    function setInit(pagesLogin, alert){
        pagesLogin.page1.style.display   = "none";
        pagesLogin.idlogin.style.display = "none";
        alert.style.display   = "none";
    }
    
    const setNavBar = async () => {
        const navbar = await NavBar.render();
        getDiv('idnav').innerHTML = navbar;
        await NavBar.after_render();
    };
    setNavBar();
}
// end Main


function getDiv(id){
    return document.getElementById(id);
}
function setHtml(id,value){
    getDiv(id).innerHTML=value;
}
function getPage1Page2IdLogin(){
    const page1= getDiv('page-1');
    const page2= getDiv('page-2');
    const idlogin= getDiv('idlogin');
    return {
        page1:page1,
        page2:page2,
        idlogin:idlogin
    }
}
function changeMain(nomeitem){
        
    if(nomeitem ==="home" || nomeitem ==='login'){
    //
    }else{
        if(localStorage.getItem('username') === "" || localStorage.getItem('username')=== null){
            setAlert("bisogna autenticarsi !!");
            setHtml("logo","Eseguire l'accesso ");
            return;
        }
    }
    
    const pagesLogin = getPage1Page2IdLogin();

    switch(nomeitem){

        case 'home' :
            pagesLogin.page2.style.display = "";
            pagesLogin.page1.style.display = "none";
            pagesLogin.idlogin.style.display = "none";
            
        break;

        case 'robot' :
            pagesLogin.page2.style.display = "none";
            pagesLogin.idlogin.style.display = "none";
            pagesLogin.page1.style.display = "";
          //  butOn('ctl');
        break;  
            
       
            
        case 'login' :
            pagesLogin.page2.style.display = "none";
            pagesLogin.page1.style.display = "none";
            pagesLogin.idlogin.style.display = "";
        break;    
        default:
            setAlert("scelta non valida !!");
    }
}

function setAlert(value){

    const alert   = getDiv('alert');
    alert.style.display="";

    getDiv('alert1').innerHTML=value;

    setTimeout(function(){
        alert.style.display="none";
    }, 2000);
}

export{
    setHtml,
    getDiv,
    changeMain
}