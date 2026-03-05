
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
            <div className="container">
                <div className="odds__container">
                    <div className="odds__header">
                        <div className="odds__title">Надёжность, подтверждённая фактами </div>
                        <div className="odds__title2">Производство, дистрибуция, логистика и сопровождение — единая система качества и ответственности.</div>
                    </div>
                    
                    <div className="odds__row">
                              <div className="odds__box" id="bx_1373509569_408">
                                <div className="odds__item">
                                  <img src="/Image/clients.svg" className="odds__icon"/>
                                    <div className="odds__name">1000+ КЛИЕНТОВ И ПАРТНЁРОВ ПО ВСЕЙ РОССИИ</div>
                                    <div className="odds__text">Обслуживаем автопарки и транспортные предприятия любого масштаба — от частных автопарков до федеральных логистических сетей.</div>
                                </div>
                              </div>

                              <div className="odds__box" id="bx_1373509569_407">
                                <div className="odds__item">
                                    <img src="/Image/20let.svg"  className="odds__icon"/>
                                    <div className="odds__name">20+ ЛЕТ В ОТРАСЛИ</div>
                                    <div className="odds__text">На рынке с 2004 года: комплексно поддерживаем автомастерские — подбираем и внедряем эффективные решения.</div>
                                </div>
                            </div>

                            <div className="odds__box" id="bx_1373509569_18">
                                <div className="odds__item">
                                    <img src="/Image/4000m.svg"  className="odds__icon"/>
                                    <div className="odds__name">4000 М² — ПРОИЗВОДСТВЕННО-СКЛАДСКОЙ КОМПЛЕКС</div>
                                    <div className="odds__text">Автосервис, диагностический центр и склад запчастей на одной площадке. Сквозной контроль на всех этапах обслуживания и хранения.</div>
                                </div>
                            </div>
                                </div>
                    
              
                                 <div className="odds__row">
                                      <div className="odds__box" id="bx_1373509569_17">
                                      <div className="odds__item">
                                          <img src="/Image/nayk.svg" alt="НАУЧНО-ТЕХНОЛОГИЧЕСКАЯ БАЗА" class="odds__icon"/>
                                          <div className="odds__name">НАУЧНО-ТЕХНОЛОГИЧЕСКАЯ БАЗА</div>
                                          <div className="odds__text">Разработанные и протестированные решения подтвердили свою эффективность на практике — при внедрении на предприятиях агропромышленного комплекса.</div>
                                      </div>
                                  </div>

                                <div className="odds__box" id="bx_1373509569_16">
                                      <div className="odds__item">
                                          <img src="/Image/komp.svg"  className="odds__icon"/>
                                          <div className="odds__name">КОМПЛЕКСНАЯ ПОДДЕРЖКА</div>
                                          <div className="odds__text">Создаём персонализированные программы применения наших продуктов, адаптированные под конкретные цели и условия работы предприятия клиента.</div>
                                      </div>
                                  </div>

                                   <div className="odds__box" id="bx_1373509569_15">
                                      <div className="odds__item">
                                          <img src="/Image/log.svg"  class="odds__icon"/>
                                          <div className="odds__name">ФЕДЕРАЛЬНАЯ ЛОГИСТИКА</div>
                                          <div className="odds__text">Доставка в любой регион России с соблюдением сроков. Собственный автопарк с температурным контролем и трекингом поставок</div>
                                      </div>
                                  </div>
                                            </div>

                            <div className="odds_spisok">  
                              <div className="odds_name">
                                  <ul className="features-list">
                                      <li className="feature-item">Российское производство</li>
                                      <li className="feature-item">Импортозамещение</li>
                                      <li className="feature-item">Техсопровождение</li>
                                      <li className="feature-item">Логистика под контролем</li>
                                      <li className="feature-item">Научный подход</li>
                                  </ul>
                              </div>
                          </div>
                </div>
            </div>

          </div>
          
      </div>

    );
}







