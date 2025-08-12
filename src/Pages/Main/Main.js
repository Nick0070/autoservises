
import './Main.scss';
import React from 'react';
import { useNavigate } from 'react-router-dom';
// import Button from '@mui/material/Button';
// import ButtonGroup from '@mui/material/ButtonGroup';

export const Main = () => {
    const navigate = useNavigate();


    // Прокрутка к "Записаться"
    const scrollToAppointment = () => {
      const element = document.getElementById('appointment-section');
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    };


    return (

      <div>
          <div className='lozyng'>
          Ремонт с комфортом – для вас и вашей машины  
          </div>

          <div className='loz'>
            С любовью АвтоХаус!
          </div>
          <button className='btn2'  onClick={scrollToAppointment}> Записаться </button>
         
        
      <div className="main">      
      {/* Блок Автозапчасти */}
      <div className="box dark">
        <div className="text">
          <h2>Автозапчасти</h2>
          <p>Подберем запчасть по лучшей цене</p>
          <button className="button" onClick={() => navigate('/catalog')} >Подробнее</button>
        </div>
        <img className="image" src="image/zap.jpg" alt="Автозапчасти" />
      </div>

      {/* Блок Автосервис */}
      <div className="box grey">
        <div className="text">
          <h2>Автосервис</h2>
          <p>Ответственный ремонт авто для хороших людей</p>
          <button className="button">Подробнее</button>
        </div>
        <img className="image" src="image/repair.jpg" alt="Автосервис" />
      </div>
    </div>
    </div>

    );
}
