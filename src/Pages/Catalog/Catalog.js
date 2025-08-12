import React, { useState, useEffect } from 'react';
import './Catalog.scss';
import axios from 'axios';

export const Catalog = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8080/catalog_api/api/get_products.php')
      .then(response => {
        const data = response.data;
        const productsArray = Array.isArray(data) ? data : [];
        
        const formattedProducts = productsArray.map(item => ({
          id: item.id_products || item.id,
          name: item.Name_products || item.name,
          price: item.Price_products || item.price,
          description: item.description_products || item.description,
          image_url: item.Photo_products ? 
            `http://localhost:8080/catalog_api/api/uploads/${item.Photo_products.replace('/uploads/', '')}` : 
            null,
        }));

        setProducts(formattedProducts);
        setLoading(false);
      })
      .catch(error => {
        console.error("Ошибка при загрузке данных:", error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="loading">Загрузка...</div>;
  if (error) return <div className="error">Ошибка: {error}</div>;
  if (!products.length) return <div className="empty">Нет товаров для отображения</div>;

  return (
    <div className="catalog">
      
      <h1 className='name'>Каталог товаров</h1>
      <div className="products">
        {products.map(product => (
          <div key={product.id} className="product">
            <div className="product-image">
              {product.image_url ? (
                <img 
                  src={product.image_url} 
                  alt={product.name}
                  onError={(e) => {
                    e.target.src = 'http://localhost:8080/catalog_api/api/uploads/no-image.jpg';
                  }}
                />
              ) : (
                <div className="no-image">Нет изображения</div>
              )}
            </div>
            <div className="product-details">
              <h2>{product.name}</h2>
              <p className="price">{product.price} ₽</p>
              <p className="description">{product.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};