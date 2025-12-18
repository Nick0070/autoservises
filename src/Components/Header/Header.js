import { Button } from '@mui/material';
import './Header.scss';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();

  // Прокрутка к "Записаться"
  const scrollToAppointment = () => {
    const element = document.getElementById('appointment-section');
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  // Прокрутка к "О нас"
  const scrollToAbout = () => {
    const element = document.getElementById('about-section');
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className='header'> 
      <div className='container'> 
        <div className='header_container'>

            <div className='header_left'>
               <a href="/" class="header__logo">
                  <img src='Image/logo.png' alt="logo"/>
               </a>
            </div>

            <div className='header_center'>
              <a href="/about/" className="menu__link"> О компании </a>
              <a href="/catalog" className="menu__link"> Каталог </a>
              <a href="/Servis" className="menu__link"> Услуги сервисного центра </a>
            </div>

             <div className='header_right'>
              <Button className='header_btn'> Записаться</Button>
            </div>


          </div>



      </div>

      {/* <div className='information'> 
        <div className='logo'>
          <img onClick={() => navigate('/')} src='Image/6.png' alt="Логотип АвтоХаус" />
        </div>

        <div className='sdv'>
          <div className='txt'>АвтоХаус</div>
        </div>

        <div className='group'>
            <button  className='button' onClick={() => navigate('/catalog')}>
              Каталог запчастей
            </button>
          <button className='button' onClick={() => navigate('/Servis')} >
            Услуги сервисного центра
          </button>
          <button className='button' onClick={scrollToAbout} >
            О нас
          </button>
        </div>
      </div> */}



      
    </div> 
  );
}

