
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

            <div className='fon'>
              <div className='container'>
                <div className='prelude__container'>
                  <div className='prelude__mass'>
                    <div className='prelude_title'>
                      <div className='lozyng'>
                        Ремонт с комфортом – для вас и вашей машины  
                      </div>
                      <div className='loz'> 
                        С любовью АвтоХаус!
                      </div>
                      
                      <div className='button_title_line'>
                        <button className='button_title' onClick={scrollToAppointment}>О компании</button>
                        <button className='button_title2' onClick={scrollToAppointment}>Каталог</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>


              <div className='fon2'>

              
              </div>


          
      </div>

    );
}







