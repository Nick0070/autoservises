
import './Information.scss';
import React from 'react';
// import Button from '@mui/material/Button';
// import ButtonGroup from '@mui/material/ButtonGroup';

export const Information = () => {
   
    return (
      <div className='flex' >
        <div className='st'>
          <div className='txt'> Наши услуги </div>

          <div className='text'>
            <div className='left'>
              <text className='textleft'>
                Продажа автозапчастей,масел, аксессуаров, химии
              </text>
            </div>

            <div className='right'>
              <text className='textright'>
                В наличии более 250 000 наименований запасных частей, масел и аксессуаров.
              </text>
            </div>
          </div>


          {/* <hr className='line'/> */}

          <div className='text'>
            <div className='left'>
               <text className='textleft'>
                  Диагностика и ремонт электрооборудования
                </text>
            </div>

            <div className='right'>
              <text className='textright'>
                   Компьютерная диагностика. Ремонт. Профессиональные работы по замене основных компонентов электрооборудования автомобиля.
              </text>
            </div>
          </div>

          {/* <hr className='line'/> */}

          <div className='text'>
            <div className='left'>
              <text className='textleft'>
                Ремонт двигателя и системы впуска
              </text>
            </div>

            <div className='right'>
              <text className='textright'>
                Ремонт двигателя, замена ГРМ, чистка форсунок, замена свечей зажигания. Удаление катализаторов.
              </text>
            </div>
          </div>

            {/* <hr className='line'/> */}

          <div className='text'>
            <div className='left'>
              <text className='textleft'>
                Ремонт ходовой части и тормозной системы
              </text>
            </div>

            <div className='right'>
              <text className='textright'>
                Диагностика, ремонт. Замена стоек стабилизатора. Рычагов, амортизаторов. Замена тормозной жидкости. Ремонт суппортов. 
              </text>
            </div>
          </div>


          {/* <hr className='line'/> */}

          <div className='text'>
            <div className='left'>
              <text className='textleft'>
                 Регулировка развала-схождение
              </text>
            </div>

            <div className='right'>
              <text className='textright'>
                Регулировка на современном стенде с использованием 3D модели.
              </text>
            </div>
          </div>

          {/* <hr className='line'/> */}


          <div className='text'>
            <div className='left'>
              <text className='textleft'>
                Регламентное ТО. Жидкости и фильтры
              </text>
            </div>

            <div className='right'>
              <text className='textright'>
                  Замена масел, фильтров, технических жидкостей.
              </text>
            </div>
          </div>

          {/* <hr className='line'/> */}


          <div className='text'>
            <div className='left'>
              <text className='textleft'>
                  Кондиционер / климат
              </text>
            </div>

            <div className='right'>
             <text className='textright'>
                Диагностика, Ремонт, Заправка и Антибактериальная обработка кондиционера.
              </text>
            </div>
          </div>
          
          


        </div>
      </div>

    );
}
