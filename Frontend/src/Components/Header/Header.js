
// import { Button } from '@mui/material';
// import './Header.scss';
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// export default function Header() {
//   const navigate = useNavigate();
//   const [openModal, setOpenModal] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [formData, setFormData] = useState({
//     fullName: '',
//     email: '',
//     phone: '',
//     comment: ''
//   });

//   // Открытие модального окна
//   const handleOpenModal = () => {
//     setOpenModal(true);
//   };

//   // Закрытие модального окна
//   const handleCloseModal = () => {
//     setOpenModal(false);
//     setFormData({
//       fullName: '',
//       email: '',
//       phone: '',
//       comment: ''
//     });
//     setIsSubmitting(false);
//   };

//   // Обработка изменения полей формы
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   // Отправка формы на Formspree
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     try {
//       const response = await fetch('https://formspree.io/f/mvgkngpv', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Accept': 'application/json'
//         },
//         body: JSON.stringify({
//           name: formData.fullName,
//           email: formData.email,
//           phone: formData.phone,
//           message: formData.comment,
//           _subject: 'Новая заявка с сайта АвтоХаус',
//           _language: 'ru'
//         })
//       });

//       if (response.ok) {
//         alert('Спасибо! Ваша заявка принята. Мы свяжемся с вами в ближайшее время.');
//         handleCloseModal();
//       } else {
//         console.error('Formspree error:', await response.json());
//         alert('Произошла ошибка при отправке. Пожалуйста, попробуйте позже или свяжитесь с нами по телефону.');
//       }
//     } catch (error) {
//       console.error('Network error:', error);
//       alert('Ошибка сети. Пожалуйста, проверьте подключение к интернету и попробуйте снова.');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };


//   return (
//     <div className='header'> 
//       <div className='container'> 
//         <div className='header_container'>
//           <div className='header_left'>
//             <a href="/" className="header__logo">
//               <img src='Image/logo.png' alt="logo"/>
//             </a>
//           </div>

//           <div className='header_center'>
//             <a href="/Company" className="menu__link"> О компании </a>
//             <a href="/catalog" className="menu__link"> Каталог </a>
//             <a href="/Servis" className="menu__link"> Услуги сервисного центра </a>
//             <a href="/Contact" className="menu__link"> Контакты </a>
//           </div>

//           <div className='header_right'>

//               <Button className='header_btn' onClick={handleOpenModal}> Записаться</Button>
//           </div>
//         </div>
//       </div>

//       {/* Модальное окно для записи */}
//       {openModal && (
//         <div className="modal-overlay" onClick={handleCloseModal}>
//           <div className="modal-content" onClick={e => e.stopPropagation()}>
//             <form onSubmit={handleSubmit}>
//               <h2 className="modal-title">
//                 Запись на сервис
//               </h2>
              
//               <div className="form-group">
//                   <label htmlFor="fullName">ФИО *</label>
//                 <input
//                   type="text"
//                   id="fullName"
//                   name="fullName"
//                   value={formData.fullName}
//                   onChange={handleInputChange}
//                   required
//                   disabled={isSubmitting}
//                   className="form-input"
//                />
//               </div>

//               <div className="form-group">
//                 <label htmlFor="email">Email *</label>
//                 <input
//                   type="email"
//                   id="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleInputChange}
//                   required
//                   disabled={isSubmitting}
//                   className="form-input"
//                 />
//               </div>

//               <div className="form-group">
//                 <label htmlFor="phone">Телефон *</label>
//                 <input
//                   type="tel"
//                   id="phone"
//                   name="phone"
//                   value={formData.phone}
//                   onChange={handleInputChange}
//                   required
//                   disabled={isSubmitting}
//                   placeholder="+7 (999) 999-99-99"
//                   className="form-input"
//                 />
//               </div>

//               <div className="form-group">
//                 <label htmlFor="comment">Комментарий</label>
//                 <textarea
//                   id="comment"
//                   name="comment"
//                   value={formData.comment}
//                   onChange={handleInputChange}
//                   rows={3}
//                   disabled={isSubmitting}
//                   className="form-textarea"
//                 />
//               </div>
//               <button 
//                   type="submit" 
//                   disabled={isSubmitting}
//                   className="btn-submit"
//                 >
//                   {isSubmitting ? 'Отправка...' : 'Отправить'}
//                 </button>
//               <div className="modal-buttons">
//                 <button 
//                   type="button" 
//                   onClick={handleCloseModal}
//                   disabled={isSubmitting}
//                   className="btn-cancel"
//                 >
//                   Отмена
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

import { Button } from '@mui/material';
import './Header.scss';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    comment: ''
  });

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 991);
      if (window.innerWidth > 991) {
        setIsBurgerOpen(false);
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isBurgerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isBurgerOpen]);

  const toggleBurgerMenu = () => {
    setIsBurgerOpen(!isBurgerOpen);
  };

  const closeBurgerMenu = () => {
    setIsBurgerOpen(false);
  };

  const handleOpenModal = () => {
    setOpenModal(true);
    closeBurgerMenu();
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      comment: ''
    });
    setIsSubmitting(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('https://formspree.io/f/mvgkngpv', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          message: formData.comment,
          _subject: 'Новая заявка с сайта АвтоХаус',
          _language: 'ru'
        })
      });

      if (response.ok) {
        alert('Спасибо! Ваша заявка принята. Мы свяжемся с вами в ближайшее время.');
        handleCloseModal();
      } else {
        console.error('Formspree error:', await response.json());
        alert('Произошла ошибка при отправке. Пожалуйста, попробуйте позже или свяжитесь с нами по телефону.');
      }
    } catch (error) {
      console.error('Network error:', error);
      alert('Ошибка сети. Пожалуйста, проверьте подключение к интернету и попробуйте снова.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='header'> 
      <div className='container'> 
        <div className='header_container'>
          <div className='header_left'>
            <a href="/" className="header__logo">
              <img src='Image/logo.png' alt="logo"/>
            </a>
          </div>

          {/* Десктопное меню */}
          {!isMobile && (
            <div className='header_center'>
              <a href="/Company" className="menu__link"> О компании </a>
              <a href="/catalog" className="menu__link"> Каталог </a>
              <a href="/Servis" className="menu__link"> Услуги сервисного центра </a>
              <a href="/Contact" className="menu__link"> Контакты </a>
            </div>
          )}

          {/* Десктопная кнопка */}
          {!isMobile && (
            <div className='header_right'>
              <Button className='header_btn' onClick={handleOpenModal}> Записаться</Button>
            </div>
          )}

          {/* Мобильная кнопка бургер-меню */}
          {isMobile && (
            <div className='header_mobile_right'>
              <button 
                className={`burger-menu ${isBurgerOpen ? 'active' : ''}`} 
                onClick={toggleBurgerMenu}
                aria-label="Меню"
              >
                <span></span>
                <span></span>
                <span></span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Мобильное меню */}
      {isMobile && isBurgerOpen && (
        <>
          <div className="mobile-menu-overlay" onClick={closeBurgerMenu}></div>
          <div className="mobile-menu">
            <nav className="mobile-menu-nav">
              <a href="/Company" className="mobile-menu__link" onClick={closeBurgerMenu}>
                О компании
              </a>
              <a href="/catalog" className="mobile-menu__link" onClick={closeBurgerMenu}>
                Каталог
              </a>
              <a href="/Servis" className="mobile-menu__link" onClick={closeBurgerMenu}>
                Услуги сервисного центра
              </a>
              <a href="/Contact" className="mobile-menu__link" onClick={closeBurgerMenu}>
                Контакты
              </a>
              <Button 
                className='mobile-menu__btn' 
                onClick={handleOpenModal}
              > 
                Записаться
              </Button>
            </nav>
          </div>
        </>
      )}

      {/* Модальное окно */}
      {openModal && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <form onSubmit={handleSubmit}>
              <h2 className="modal-title">
                Запись на сервис
              </h2>
              
              <div className="form-group">
                <label htmlFor="fullName">ФИО *</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required
                  disabled={isSubmitting}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  disabled={isSubmitting}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Телефон *</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  disabled={isSubmitting}
                  placeholder="+7 (999) 999-99-99"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="comment">Комментарий</label>
                <textarea
                  id="comment"
                  name="comment"
                  value={formData.comment}
                  onChange={handleInputChange}
                  rows={3}
                  disabled={isSubmitting}
                  className="form-textarea"
                />
              </div>
              
              <div className="modal-buttons">
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="btn-submit"
                >
                  {isSubmitting ? 'Отправка...' : 'Отправить'}
                </button>
                <button 
                  type="button" 
                  onClick={handleCloseModal}
                  disabled={isSubmitting}
                  className="btn-cancel"
                >
                  Отмена
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}