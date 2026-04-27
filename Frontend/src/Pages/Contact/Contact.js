
import './Contact.scss';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ClassNames } from '@emotion/react';

export const Contact = () => {
   
    useEffect(() => {
        // Инициализация Яндекс карты после загрузки компонента
        const script = document.createElement('script');
        script.src = "https://api-maps.yandex.ru/2.1/?lang=ru_RU";
        script.async = true;
        script.onload = () => {
            if (window.ymaps) {
                window.ymaps.ready(init);
            }
        };
        document.body.appendChild(script);

        function init() {
            if (!window.ymaps) return;
            
            var myMap = new window.ymaps.Map('map', {
                center: [50.671494, 36.558351], //координаты
                zoom: 16,
                controls: [],
                height: '100%'
            });
            
            myMap.controls.add('zoomControl', { //линейка-зум
                float: 'none',
                position: {
                    right: 20,
                    top: 80
                }
            });
            
            if(window.innerWidth < 992) { // запрет перетаскивания на мобилах
                myMap.behaviors.disable('drag');
            }
            
            myMap.geoObjects.add(
                new window.ymaps.Placemark([50.671494, 36.558351],
                {
                    balloonContent: 'Автохаус»<br>Белгородская обл., Белгородский р-н, пгт. Северный',
                },
                {
                    preset: 'islands#icon',
                    iconColor: '#E95821'
                }
            ));
        }

        return () => {
            // Очистка скрипта при размонтировании компонента
            const script = document.querySelector('script[src="https://api-maps.yandex.ru/2.1/?lang=ru_RU"]');
            if (script) {
                document.body.removeChild(script);
            }
        };
    }, []);

    return (
        <div className='contacts'>
            <div className="about_header">
                <h1>Контакты</h1>
                <div className="breadcrumbs">
                    <Link to="/">Главная</Link>
                    <span> / </span>
                    <span className="active">Контакты</span>
                </div>
            </div>

        <div className="container">
            <div className="contact__mass">
              <div className="contact__title"> Автохаус</div>
              <div className="contact__content">
                <div className="contact__address">
                  <div className="contact__address-property">Наш адрес:</div>
                  <div className="contact__address-val"> 308010, Белгородская обл., Белгородский р-н, пгт. Северный	</div>
                </div>
                <div className="contact__bond">
          <div className="contact__bond-set">
                  <div className="contact__bond-unit" >
              <div className="contact__bond-property">Приёмная:</div>
                    <a href="" className="contact__bond-phone">(****) **-**-**</a>
                          <a href="" className="contact__bond-mail">nlychyov@mail.ru</a>
                  </div>
                  <div className="contact__bond-unit" >
              <div className="contact__bond-property">Бухгалтерия:</div>
                    <a href="" className="contact__bond-phone">(****) **-**-**</a>
                          <a href="" className="contact__bond-mail">nlychyov@mail.ru</a>
                  </div>
                  <div className="contact__bond-unit">
              <div className="contact__bond-property">Отдел кадров:</div>
              <a href="" className="contact__bond-phone">(****) **-**-**</a>
                          <a href="" className="contact__bond-mail">nlychyov@mail.ru</a>
                  </div>
                  <div className="contact__bond-unit" >
              <div className="contact__bond-property">Отдел по работе с клиентами:</div>
                    <a href="" className="contact__bond-phone">(****) **-**-**</a>
                          <a href="" className="contact__bond-mail">nlychyov@mail.ru</a>
                  </div>
                  <div className="contact__bond-unit" >
              <div className="contact__bond-property">Отдел закупок и ВЭД:</div>
                    <a href="" className="contact__bond-phone">(****) **-**-**</a>
                          <a href="" className="contact__bond-mail">nlychyov@mail.ru</a>
                  </div>
                  <div className="contact__bond-unit" >
              <div className="contact__bond-property">Отдел транспортной логистики:</div>
              <a href="" className="contact__bond-phone">(****) **-**-**</a>
                          <a href="" className="contact__bond-mail">nlychyov@mail.ru</a>
                  </div>
          </div>
        </div>			
      </div>
      </div>
    </div>
                        
              <div className="contact__map">
                  <div id="map" style={{ height: '500px', width: '100%' }}></div>
              </div>
              
      </div>
    );
}