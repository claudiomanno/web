import {getDiv, changeMain} from './../main.js';

let NavBar = {
    render: async () => {
      let view =
        /*html*/
        `
        <div id="logo" >
            Eseguire l'accesso
            <!-- Logo -->
            <!-- <img class="classnamex" src="./../img/Redi-logo-colorir4.png" alt="" /> -->
        </div>
        <div id="menu" class="chiudi dropdown-content">
            <!-- nav>ul>li*3>a{link $} -->
            <nav class="navbar">
                <ul>
                    <li class="home">
                        <a  href="#" name="home" id="home">Home
                            <i id="home" class='fa fa-home' style='font-size:16px'></i>
                        </a>
                    </li>
                    <li class="logina">
                        <a href="#" name="login" id="login">Login
                            <i  id="login" class='fas fa-address-book' style='font-size:16px'></i>
                        </a>
                    </li>
                    <li class="luce"><a href="#" name="robot" id="robot">Robot
                        <i id="robot" class='fa fa-cog' style='font-size:16px'></i>
                        </a>
                    </li>
                  
                    
                </ul>
            </nav>
            </div>
            <!-- creo il button per smartphone -->
            <div id="menu-icon">
                <!-- creo hamburger -->
                <span id="barra-1"></span>
                <span id="barra-2"></span>
                <span id="barra-3"></span>
            </div>`;
    return view;
  },
  after_render: async () => {
    console.log('call after render of NavBar');
    const menu    = getDiv('menu');
    const icon    = getDiv('menu-icon');
    icon.addEventListener('click', toggleMenu)

    function toggleMenu() {
       
        icon.classList.toggle('trasforma')
        menu.classList.toggle('chiudi')
        menu.classList.toggle('attiva')
    }
     menu.onclick = e => {
         
        if(e.target.nodeName === 'A' || e.target.nodeName === 'I') {
            e.preventDefault();
            e.stopImmediatePropagation();

            // console.log("evento menu : ", e.target.name);

            if(e.target.nodeName === 'I'){
                changeMain(e.target.id);
            }else{
                changeMain(e.target.name);
            }
            toggleMenu();
        }
    }

    function setLogin() {
      console.log('setLogin');
    }
  },
};
export default NavBar;