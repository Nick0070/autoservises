import './Servis.scss';
import React from 'react';

export const Servis = () => {
  const images = [
    { src: 'Image/1.svg', caption: ['Диагностика и ремонт', 'электрооборудования'] },
    { src: 'Image/2.svg', caption: ['Ремонт коробок', 'передач'] },
    { src: 'Image/3.svg', caption: ['Ремонт ходовой части', 'и тормозной системы'] },
    { src: 'Image/4.svg', caption: ['Развал', 'схождение'] },
    { src: 'Image/5.svg', caption: ['Ремонт', 'двигателей'] },
    { src: 'Image/6.svg', caption: ['Заправка', 'кондиционеров'] },
    { src: 'Image/7.svg', caption: ['Слесарный', 'ремонт'] },
    { src: 'Image/8.svg', caption: ['Шиномонтаж', 'и балансировка'] },
    { src: 'Image/9.svg', caption: ['Автомойка', ''] }
  ];

  const rows = [];
  for (let i = 0; i < images.length; i += 3) {
    rows.push(images.slice(i, i + 3));
  }

  return (
    <div className='catalog'>
      <div className='name'>Услуги сервисного центра</div>
      <div className='svg'>
        {rows.map((row, rowIndex) => (
          <div className='row' key={rowIndex}>
            {row.map((item, index) => (
              <figure key={index}>
                <img className='fill' src={item.src} alt={`Изображение ${rowIndex * 3 + index + 1}`} />
                <figcaption className='filltext'>
                  {item.caption[0]}<br />
                  {item.caption[1]}
                </figcaption>
              </figure>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}