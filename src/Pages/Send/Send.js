import './Send.scss';
import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export const Send = () => {
  return (
    <div className='box2' id="appointment-section">
      <div className='information_txt'>
        <div className='inf'> 
          Запишитесь в АвтоХаус на диагностику и получите скидку на работы!
        </div>
      </div>

      <Box
        component="form"
        action="https://formspree.io/f/mvgkngpv"
        method="POST"
      >
        <div className="input-row">
          <TextField
            required
            fullWidth
            label="Ваше имя"
            name="name"
            variant="outlined"
          />
          
          <TextField
            required
            fullWidth
            label="Ваш телефон"
            name="phone"
            type="tel"
            variant="outlined"
          />
          
          <TextField
            required
            fullWidth
            label="Ваш email"
            name="email"
            type="email"
            variant="outlined"
          />
        </div>
        
        <TextField
          fullWidth
          label="Сообщение или комментарий"
          name="message"
          multiline
          rows={4}
          variant="outlined"
        />
        
        <input type="hidden" name="_subject" value="Новая заявка с сайта АвтоХаус" />
        <input type="hidden" name="_language" value="ru" />
        
        <div className="button-container">
          <Button
            type="submit"
            variant="contained"
          >
            Отправить заявку
          </Button>
        </div>
      </Box>
    </div>
  );
}