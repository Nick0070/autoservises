import React, { useState, useEffect } from 'react';
import './See_bd.scss';
import axios from 'axios';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export const See_bd = () => {
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({
    id_products: '',
    Name_products: '',
    description_products: '',
    price_products: '',
    photo_products: ''
  });
  const [isEditMode, setIsEditMode] = useState(false);

  // Получение товаров из базы данных
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:8080/catalog_api/api/get_products.php');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  // Обработчики модального окна
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setIsEditMode(false);
    setCurrentProduct({
      id_products: '',
      Name_products: '',
      description_products: '',
      price_products: '',
      photo_products: ''
    });
  };

  // Обработчик изменения полей формы
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentProduct(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Добавление/редактирование товара
  const handleSubmit = async () => {
    try {
      if (isEditMode) {
        await axios.put('http://localhost:8080/catalog_api/api/get_products.php', currentProduct);
      } else {
        await axios.post('http://localhost:8080/catalog_api/api/get_products.php', currentProduct);
      }
      fetchProducts();
      handleClose();
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  // Редактирование товара
  const handleEdit = (product) => {
    setCurrentProduct(product);
    setIsEditMode(true);
    handleClickOpen();
  };

  // Удаление товара
  const handleDelete = async (id) => {
    if (window.confirm('Вы уверены, что хотите удалить этот товар?')) {
      try {
        await axios.delete('http://localhost:8080/catalog_api/api/get_products.php', { 
          data: { id_products: id } 
        });
        fetchProducts();
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  return (
    <div className='see_bd'>
      <div className='button_see'>
        <Button 
          className='button_sdvig' 
          variant="contained" 
          size="medium"
          onClick={handleClickOpen}
        >
          Добавить товар
        </Button>
      </div>

      {/* Таблица с товарами */}
      <TableContainer component={Paper} sx={{ marginTop: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Название</TableCell>
              <TableCell>Описание</TableCell>
              <TableCell>Цена</TableCell>
              <TableCell>Фото</TableCell>
              <TableCell>Действия</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id_products}>
                <TableCell>{product.id_products}</TableCell>
                <TableCell>{product.Name_products}</TableCell>
                <TableCell>{product.description_products}</TableCell>
                <TableCell>{product.price_products}</TableCell>
                <TableCell>
                  {product.photo_products && (
                    <img 
                      src={product.photo_products} 
                      alt={product.Name_products} 
                      style={{ height: '50px' }} 
                    />
                  )}
                </TableCell>
                <TableCell>
                  <Button 
                    variant="outlined" 
                    color="primary"
                    onClick={() => handleEdit(product)}
                    sx={{ marginRight: 1 }}
                  >
                    Редактировать
                  </Button>
                  <Button 
                    variant="outlined" 
                    color="error"
                    onClick={() => handleDelete(product.id_products)}
                  >
                    Удалить
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Модальное окно для добавления/редактирования */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          {isEditMode ? 'Редактировать товар' : 'Добавить новый товар'}
        </DialogTitle>
        <DialogContent>
          <Box
            component="form"
            sx={{
              '& .MuiTextField-root': { marginBottom: 2, width: '100%' },
            }}
          >
            <TextField
              name="Name_products"
              label="Название товара"
              value={currentProduct.Name_products}
              onChange={handleInputChange}
              required
            />
            <TextField
              name="description_products"
              label="Описание товара"
              value={currentProduct.description_products}
              onChange={handleInputChange}
              multiline
              rows={4}
            />
            <TextField
              name="price_products"
              label="Цена"
              type="number"
              value={currentProduct.price_products}
              onChange={handleInputChange}
              required
            />
            <TextField
              name="photo_products"
              label="URL фотографии"
              value={currentProduct.photo_products}
              onChange={handleInputChange}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Отмена</Button>
          <Button onClick={handleSubmit} variant="contained">
            {isEditMode ? 'Обновить' : 'Добавить'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};