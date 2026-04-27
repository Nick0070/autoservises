import './Footer.scss';
import React from 'react';


export default function () {

    return (
     
       <div className="footer">
                <div className="container">
                  <div className="footer__container">
                    <div className="footer__set">
                      <div className="footer__left">
                            <a href="/" >
                              <img src='Image/logo.png' alt="logo" className="footer__logo"/>
                            </a>
                            <div className="footer__copyright">© 2026 Все права защищены.</div>
                      </div>
                      <div className="footer__center">
                        <ul className="footer__menu">
                            <li className="footer__menu-item"><a href="/Company" className="footer__menu-link">О компании</a></li>
                            <li className="footer__menu-item"><a href="/catalog" className="footer__menu-link">Каталог</a></li>
                            <li className="footer__menu-item"><a href="/Servis" className="footer__menu-link">Услуги сервисного центра</a></li>
                            <li className="footer__menu-item"><a href="/Contact" className="footer__menu-link">Контакты</a></li>
                        </ul>
                      </div>
                        <div className="footer__right">
                          <a href="" className="footer__phone">+7 (***) ***-**-**</a>
                          <a href="" className="footer__mail">nlychyov@mail.ru</a>
                            <div className="footer__address">
                              <div className="footer__address-property">Наш адрес:</div>
                              <div className="footer__address-val">308010, Белгородская область, м. р-н Белгородский, г.п. поселок Северный, пгт. Северный </div>
                            </div>
                        </div>
                    </div>
                  </div>
                </div>
        </div>
    );
}




