import { getPort, getUrl } from './../../config/config.js';
import {callRemote} from './../../remote/remote.js';
import {setHtml} from '../main.js';

function butOn(id){
    let idon = 1;
    if(id==='ctl'){
       idon=2;
    }
    const url =getUrl()+"robot/"+idon;
    const obj ={idon:1,token:'tokenled1'};
    callRemote.render(obj, url, 'GET', callBackLed, "token");// fetch promise   
}
 


//viene chiamata al ritorno della chiamata al backend
function callBackLed(data){
    console.log("data",data)
    setHtml("acceso",data.ms);
   
}
  
export {
  butOn
 
}