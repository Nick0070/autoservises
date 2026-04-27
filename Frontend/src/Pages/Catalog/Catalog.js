
// import React, { useState, useEffect, useRef } from 'react';
// import './Catalog.scss';
// import axios from 'axios';
// import { Link } from 'react-router-dom';

// export const Catalog = () => {
//   const [products, setProducts] = useState([]);
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [imageErrors, setImageErrors] = useState({});
//   const [activeCategory, setActiveCategory] = useState('all');
//   const [activeManufacturer, setActiveManufacturer] = useState('all');
  
//   // Отдельные стейты для каждого dropdown
//   const [isCategoryOpen, setIsCategoryOpen] = useState(false);
//   const [isManufacturerOpen, setIsManufacturerOpen] = useState(false);
  
//   // Отдельные refs для каждого dropdown
//   const categoryDropdownRef = useRef(null);
//   const manufacturerDropdownRef = useRef(null);

//   const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

//   const categories = [
//     { id: 'all', name: 'По видам товаров' },
//     { id: 'oil', name: 'Моторные масла' },
//     { id: 'bulb', name: 'Автомобильные лампы' },
//     { id: 'battery', name: 'Аккумуляторы' }
//   ];

//   // Список производителей для каждого типа товара
//   const manufacturersByCategory = {
//     oil: [
//       { id: 'all', name: 'Все производители' },
//       { id: 'Shell', name: 'Shell' },
//       { id: 'Mobil', name: 'Mobil' },
//       { id: 'Castrol', name: 'Castrol' },
//       { id: 'Liqui Moly', name: 'Liqui Moly' },
//       { id: 'Motul', name: 'Motul' }
//     ],
//     bulb: [
//       { id: 'all', name: 'Все производители' },
//       { id: 'Philips', name: 'Philips' },
//       { id: 'Osram', name: 'Osram' },
//       { id: 'Bosch', name: 'Bosch' },
//       { id: 'Koito', name: 'Koito' }
//     ],
//     battery: [
//       { id: 'all', name: 'Все производители' },
//       { id: 'Varta', name: 'Varta' },
//       { id: 'Bosch', name: 'Bosch' },
//       { id: 'Exide', name: 'Exide' },
//       { id: 'Mutlu', name: 'Mutlu' },
//       { id: 'Topla', name: 'Topla' }
//     ]
//   };

//   // Получаем текущий список производителей в зависимости от выбранной категории
//   const getCurrentManufacturers = () => {
//     if (activeCategory === 'all') {
//       return [{ id: 'all', name: 'Сначала выберите категорию' }];
//     }
//     return manufacturersByCategory[activeCategory] || [{ id: 'all', name: 'Все производители' }];
//   };

//   const manufacturers = getCurrentManufacturers();

//   // Закрытие при клике вне dropdown
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (categoryDropdownRef.current && !categoryDropdownRef.current.contains(event.target)) {
//         setIsCategoryOpen(false);
//       }
//       if (manufacturerDropdownRef.current && !manufacturerDropdownRef.current.contains(event.target)) {
//         setIsManufacturerOpen(false);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   // Сброс производителя при смене категории
//   useEffect(() => {
//     setActiveManufacturer('all');
//     setIsManufacturerOpen(false);
//   }, [activeCategory]);

//   // Загрузка товаров
//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         setLoading(true);

//         let url = `${API_BASE_URL}/catalog_api/api/get_products.php`;
//         if (activeCategory !== 'all') {
//           url = `${API_BASE_URL}/catalog_api/api/get_products.php/category/${activeCategory}`;
//         }

//         const response = await axios.get(url);
//         const data = response.data;

//         const productsArray = Array.isArray(data) ? data : [];

//         const formattedProducts = productsArray.map(item => ({
//           id: item.id,
//           name: item.name,
//           price: item.price,
//           description: item.description,
//           category: item.category,
//           type: item.type,
//           manufacturer: extractManufacturer(item.name),
//           image_url: item.image_url || null
//         }));

//         setProducts(formattedProducts);
//         setError(null);

//       } catch (error) {
//         setError(`Ошибка загрузки: ${error.message}`);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, [API_BASE_URL, activeCategory]);

//   // Извлечение производителя из названия товара
//   const extractManufacturer = (productName) => {
//     if (!productName) return 'unknown';
    
//     const manufacturers = ['Shell', 'Mobil', 'Castrol', 'Liqui Moly', 'Motul', 
//                            'Philips', 'Osram', 'Bosch', 'Koito', 'Varta', 
//                            'Exide', 'Mutlu', 'Topla'];
    
//     for (const manufacturer of manufacturers) {
//       if (productName.toLowerCase().includes(manufacturer.toLowerCase())) {
//         return manufacturer;
//       }
//     }
//     return 'other';
//   };

//   // Применение фильтров
//   const applyFilters = () => {
//     let filtered = [...products];
    
//     // Фильтр по категории
//     if (activeCategory !== 'all') {
//       filtered = filtered.filter(product => {
//         const productType = product.type || product.category;
//         return productType === activeCategory;
//       });
//     }
    
//     // Фильтр по производителю
//     if (activeManufacturer !== 'all' && activeCategory !== 'all') {
//       filtered = filtered.filter(product => 
//         product.manufacturer === activeManufacturer
//       );
//     }
    
//     setFilteredProducts(filtered);
//   };

//   // Применяем фильтры при изменении товаров, категории или производителя
//   useEffect(() => {
//     applyFilters();
//   }, [products, activeCategory, activeManufacturer]);

//   const handleImageError = (productId) => {
//     setImageErrors(prev => ({
//       ...prev,
//       [productId]: true
//     }));
//   };

//   const formatPrice = (price) => {
//     if (!price) return 'Цена не указана';
//     return `${Number(price).toFixed(2)} ₽`;
//   };

//   if (loading) return <div className="catalog">Загрузка...</div>;
//   if (error) return <div className="catalog">{error}</div>;

//   return (
//     <div className="catalog">

//       <div className="about_header">
//         <h1>Каталог</h1>
//         <div className="breadcrumbs">
//           <Link to="/">Главная</Link> / <span>Каталог</span>
//         </div>
//       </div>

//       <div className='drop'>

//         {/* Первый DROPDOWN - Категории */}
//         <div className="category-dropdown" ref={categoryDropdownRef}>
//           <div 
//             className="dropdown-button"
//             onClick={() => setIsCategoryOpen(!isCategoryOpen)}
//           >
//             <span>
//               {categories.find(c => c.id === activeCategory)?.name}
//             </span>
//             <span className={`arrow ${isCategoryOpen ? "open" : ""}`}>
//               ▼
//             </span>
//           </div>

//           {isCategoryOpen && (
//             <div className="dropdown-menu">
//               {categories.map(cat => (
//                 <div
//                   key={cat.id}
//                   className={`dropdown-item ${activeCategory === cat.id ? "active" : ""}`}
//                   onClick={() => {
//                     setActiveCategory(cat.id);
//                     setIsCategoryOpen(false);
//                   }}
//                 >
//                   {cat.name}
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Второй DROPDOWN - Производители (показывается только если выбрана не 'all') */}
//         {activeCategory !== 'all' && (
//           <div className="category-dropdown" ref={manufacturerDropdownRef}>
//             <div 
//               className="dropdown-button"
//               onClick={() => {
//                 if (activeCategory !== 'all') {
//                   setIsManufacturerOpen(!isManufacturerOpen);
//                 }
//               }}
//               style={{ opacity: activeCategory === 'all' ? 0.5 : 1 }}
//             >
//               <span>
//                 {manufacturers.find(m => m.id === activeManufacturer)?.name || 'Выберите производителя'}
//               </span>
//               <span className={`arrow ${isManufacturerOpen ? "open" : ""}`}>
//                 ▼
//               </span>
//             </div>

//             {isManufacturerOpen && activeCategory !== 'all' && (
//               <div className="dropdown-menu">
//                 {manufacturers.map(man => (
//                   <div
//                     key={man.id}
//                     className={`dropdown-item ${activeManufacturer === man.id ? "active" : ""}`}
//                     onClick={() => {
//                       if (man.id !== 'all' || activeCategory !== 'all') {
//                         setActiveManufacturer(man.id);
//                         setIsManufacturerOpen(false);
//                       }
//                     }}
//                   >
//                     {man.name}
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         )}

//       </div>

//       {/* Результаты фильтрации */}
//       {filteredProducts.length === 0 ? (
//         <div className="no-products">
//           {activeCategory === 'all' 
//             ? 'Выберите категорию для просмотра товаров' 
//             : activeManufacturer !== 'all' 
//               ? `Нет товаров производителя ${manufacturers.find(m => m.id === activeManufacturer)?.name} в категории ${categories.find(c => c.id === activeCategory)?.name}`
//               : 'Нет товаров в выбранной категории'}
//         </div>
//       ) : (
//         <>

          
//           <div className="products">
//             {filteredProducts.map(product => (
//               <div key={product.id} className="product">

//                 <div className="product-image">
//                   {!imageErrors[product.id] && product.image_url ? (
//                     <img
//                       src={product.image_url}
//                       alt={product.name}
//                       onError={() => handleImageError(product.id)}
//                     />
//                   ) : (
//                     <div className="no-image">Нет изображения</div>
//                   )}
//                 </div>

//                 <div className="product-details">
//                   <h2>{product.name}</h2>
//                   <p className="price">{formatPrice(product.price)}</p>
//                   <p className='description'>{product.description}</p>
                  
//                   <Link to={`/product/${product.id}`} className="details-button">
//                     Подробнее
//                   </Link>
//                 </div>

//               </div>
//             ))}
//           </div>
//         </>
//       )}
//     </div>
//   );
// };
















// import React, { useState, useEffect, useRef } from 'react';
// import './Catalog.scss';
// import axios from 'axios';
// import { Link } from 'react-router-dom';

// export const Catalog = () => {
//   const [products, setProducts] = useState([]);
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [imageErrors, setImageErrors] = useState({});
//   const [activeCategory, setActiveCategory] = useState('all');
//   const [activeManufacturer, setActiveManufacturer] = useState('all');
//   const [sortOrder, setSortOrder] = useState('default'); // 'default', 'asc', 'desc'
  
//   // Отдельные стейты для каждого dropdown
//   const [isCategoryOpen, setIsCategoryOpen] = useState(false);
//   const [isManufacturerOpen, setIsManufacturerOpen] = useState(false);
//   const [isSortOpen, setIsSortOpen] = useState(false);
  
//   // Отдельные refs для каждого dropdown
//   const categoryDropdownRef = useRef(null);
//   const manufacturerDropdownRef = useRef(null);
//   const sortDropdownRef = useRef(null);

//   const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

//   const categories = [
//     { id: 'all', name: 'По видам товаров' },
//     { id: 'oil', name: 'Моторные масла' },
//     { id: 'bulb', name: 'Автомобильные лампы' },
//     { id: 'battery', name: 'Аккумуляторы' }
//   ];

//   // Опции сортировки
//   const sortOptions = [
//     { id: 'default', name: 'По умолчанию' },
//     { id: 'asc', name: 'Цена по увеличению' },
//     { id: 'desc', name: 'Цена по убыванию' }
//   ];

//   // Список производителей для каждого типа товара
//   const manufacturersByCategory = {
//     oil: [
//       { id: 'all', name: 'Все производители' },
//       { id: 'Shell', name: 'Shell' },
//       { id: 'Mobil', name: 'Mobil' },
//       { id: 'Castrol', name: 'Castrol' },
//       { id: 'Liqui Moly', name: 'Liqui Moly' },
//       { id: 'Motul', name: 'Motul' }
//     ],
//     bulb: [
//       { id: 'all', name: 'Все производители' },
//       { id: 'Philips', name: 'Philips' },
//       { id: 'Osram', name: 'Osram' },
//       { id: 'Bosch', name: 'Bosch' },
//       { id: 'Koito', name: 'Koito' }
//     ],
//     battery: [
//       { id: 'all', name: 'Все производители' },
//       { id: 'Varta', name: 'Varta' },
//       { id: 'Bosch', name: 'Bosch' },
//       { id: 'Exide', name: 'Exide' },
//       { id: 'Mutlu', name: 'Mutlu' },
//       { id: 'Topla', name: 'Topla' }
//     ]
//   };

//   // Получаем текущий список производителей в зависимости от выбранной категории
//   const getCurrentManufacturers = () => {
//     if (activeCategory === 'all') {
//       return [{ id: 'all', name: 'Сначала выберите категорию' }];
//     }
//     return manufacturersByCategory[activeCategory] || [{ id: 'all', name: 'Все производители' }];
//   };

//   const manufacturers = getCurrentManufacturers();

//   // Закрытие при клике вне dropdown
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (categoryDropdownRef.current && !categoryDropdownRef.current.contains(event.target)) {
//         setIsCategoryOpen(false);
//       }
//       if (manufacturerDropdownRef.current && !manufacturerDropdownRef.current.contains(event.target)) {
//         setIsManufacturerOpen(false);
//       }
//       if (sortDropdownRef.current && !sortDropdownRef.current.contains(event.target)) {
//         setIsSortOpen(false);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   // Сброс производителя при смене категории
//   useEffect(() => {
//     setActiveManufacturer('all');
//     setIsManufacturerOpen(false);
//   }, [activeCategory]);

//   // Сброс сортировки при смене категории
//   useEffect(() => {
//     setSortOrder('default');
//   }, [activeCategory]);

//   // Загрузка товаров
//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         setLoading(true);

//         let url = `${API_BASE_URL}/catalog_api/api/get_products.php`;
//         if (activeCategory !== 'all') {
//           url = `${API_BASE_URL}/catalog_api/api/get_products.php/category/${activeCategory}`;
//         }

//         const response = await axios.get(url);
//         const data = response.data;

//         const productsArray = Array.isArray(data) ? data : [];

//         const formattedProducts = productsArray.map(item => ({
//           id: item.id,
//           name: item.name,
//           price: item.price,
//           description: item.description,
//           category: item.category,
//           type: item.type,
//           manufacturer: extractManufacturer(item.name),
//           image_url: item.image_url || null
//         }));

//         setProducts(formattedProducts);
//         setError(null);

//       } catch (error) {
//         setError(`Ошибка загрузки: ${error.message}`);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, [API_BASE_URL, activeCategory]);

//   // Извлечение производителя из названия товара
//   const extractManufacturer = (productName) => {
//     if (!productName) return 'unknown';
    
//     const manufacturers = ['Shell', 'Mobil', 'Castrol', 'Liqui Moly', 'Motul', 
//                            'Philips', 'Osram', 'Bosch', 'Koito', 'Varta', 
//                            'Exide', 'Mutlu', 'Topla'];
    
//     for (const manufacturer of manufacturers) {
//       if (productName.toLowerCase().includes(manufacturer.toLowerCase())) {
//         return manufacturer;
//       }
//     }
//     return 'other';
//   };

//   // Применение фильтров и сортировки
//   const applyFilters = () => {
//     let filtered = [...products];
    
//     // Фильтр по категории
//     if (activeCategory !== 'all') {
//       filtered = filtered.filter(product => {
//         const productType = product.type || product.category;
//         return productType === activeCategory;
//       });
//     }
    
//     // Фильтр по производителю
//     if (activeManufacturer !== 'all' && activeCategory !== 'all') {
//       filtered = filtered.filter(product => 
//         product.manufacturer === activeManufacturer
//       );
//     }
    
//     // Сортировка по цене
//     if (sortOrder === 'asc') {
//       filtered.sort((a, b) => a.price - b.price);
//     } else if (sortOrder === 'desc') {
//       filtered.sort((a, b) => b.price - a.price);
//     }
//     // При sortOrder === 'default' сортировка не применяется (сохраняется порядок из API)
    
//     setFilteredProducts(filtered);
//   };

//   // Применяем фильтры при изменении товаров, категории, производителя или сортировки
//   useEffect(() => {
//     applyFilters();
//   }, [products, activeCategory, activeManufacturer, sortOrder]);

//   const handleImageError = (productId) => {
//     setImageErrors(prev => ({
//       ...prev,
//       [productId]: true
//     }));
//   };

//   const formatPrice = (price) => {
//     if (!price) return 'Цена не указана';
//     return `${Number(price).toFixed(2)} ₽`;
//   };

//   if (loading) return <div className="catalog">Загрузка...</div>;
//   if (error) return <div className="catalog">{error}</div>;

//   return (
//     <div className="catalog">

//       <div className="about_header">
//         <h1>Каталог</h1>
//         <div className="breadcrumbs">
//           <Link to="/">Главная</Link> / <span>Каталог</span>
//         </div>
//       </div>

//       <div className='drop'>

//         {/* Первый DROPDOWN - Категории */}
//         <div className="category-dropdown" ref={categoryDropdownRef}>
//           <div 
//             className="dropdown-button"
//             onClick={() => setIsCategoryOpen(!isCategoryOpen)}
//           >
//             <span>
//               {categories.find(c => c.id === activeCategory)?.name}
//             </span>
//             <span className={`arrow ${isCategoryOpen ? "open" : ""}`}>
//               ▼
//             </span>
//           </div>

//           {isCategoryOpen && (
//             <div className="dropdown-menu">
//               {categories.map(cat => (
//                 <div
//                   key={cat.id}
//                   className={`dropdown-item ${activeCategory === cat.id ? "active" : ""}`}
//                   onClick={() => {
//                     setActiveCategory(cat.id);
//                     setIsCategoryOpen(false);
//                   }}
//                 >
//                   {cat.name}
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Второй DROPDOWN - Производители (показывается только если выбрана не 'all') */}
//         {activeCategory !== 'all' && (
//           <div className="category-dropdown" ref={manufacturerDropdownRef}>
//             <div 
//               className="dropdown-button"
//               onClick={() => {
//                 if (activeCategory !== 'all') {
//                   setIsManufacturerOpen(!isManufacturerOpen);
//                 }
//               }}
//               style={{ opacity: activeCategory === 'all' ? 0.5 : 1 }}
//             >
//               <span>
//                 {manufacturers.find(m => m.id === activeManufacturer)?.name || 'Выберите производителя'}
//               </span>
//               <span className={`arrow ${isManufacturerOpen ? "open" : ""}`}>
//                 ▼
//               </span>
//             </div>

//             {isManufacturerOpen && activeCategory !== 'all' && (
//               <div className="dropdown-menu">
//                 {manufacturers.map(man => (
//                   <div
//                     key={man.id}
//                     className={`dropdown-item ${activeManufacturer === man.id ? "active" : ""}`}
//                     onClick={() => {
//                       if (man.id !== 'all' || activeCategory !== 'all') {
//                         setActiveManufacturer(man.id);
//                         setIsManufacturerOpen(false);
//                       }
//                     }}
//                   >
//                     {man.name}
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         )}

//         {/* Третий DROPDOWN - Сортировка по цене */}
//         <div className="category-dropdown" ref={sortDropdownRef}>
//           <div 
//             className="dropdown-button"
//             onClick={() => setIsSortOpen(!isSortOpen)}
//           >
//             <span>
//               {sortOptions.find(o => o.id === sortOrder)?.name || 'Сортировка'}
//             </span>
//             <span className={`arrow ${isSortOpen ? "open" : ""}`}>
//               ▼
//             </span>
//           </div>

//           {isSortOpen && (
//             <div className="dropdown-menu">
//               {sortOptions.map(option => (
//                 <div
//                   key={option.id}
//                   className={`dropdown-item ${sortOrder === option.id ? "active" : ""}`}
//                   onClick={() => {
//                     setSortOrder(option.id);
//                     setIsSortOpen(false);
//                   }}
//                 >
//                   {option.name}
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//       </div>

//       {/* Результаты фильтрации */}
//       {filteredProducts.length === 0 ? (
//         <div className="no-products">
//           {activeCategory === 'all' 
//             ? 'Выберите категорию для просмотра товаров' 
//             : activeManufacturer !== 'all' 
//               ? `Нет товаров производителя ${manufacturers.find(m => m.id === activeManufacturer)?.name} в категории ${categories.find(c => c.id === activeCategory)?.name}`
//               : 'Нет товаров в выбранной категории'}
//         </div>
//       ) : (
//         <>
//           <div className="products">
//             {filteredProducts.map(product => (
//               <div key={product.id} className="product">

//                 <div className="product-image">
//                   {!imageErrors[product.id] && product.image_url ? (
//                     <img
//                       src={product.image_url}
//                       alt={product.name}
//                       onError={() => handleImageError(product.id)}
//                     />
//                   ) : (
//                     <div className="no-image">Нет изображения</div>
//                   )}
//                 </div>

//                 <div className="product-details">
//                   <h2>{product.name}</h2>
//                   <p className="price">{formatPrice(product.price)}</p>
//                   <p className='description'>{product.description}</p>
                  
//                   <Link to={`/product/${product.id}`} className="details-button">
//                     Подробнее
//                   </Link>
//                 </div>

//               </div>
//             ))}
//           </div>
//         </>
//       )}
//     </div>
//   );
// };


import React, { useState, useEffect, useRef } from 'react';
import './Catalog.scss';
import axios from 'axios';
import { Link } from 'react-router-dom';

export const Catalog = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageErrors, setImageErrors] = useState({});
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeManufacturer, setActiveManufacturer] = useState('all');
  const [sortOrder, setSortOrder] = useState('default');
  const [searchQuery, setSearchQuery] = useState(''); 
  
  // Отдельные стейты для каждого dropdown
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isManufacturerOpen, setIsManufacturerOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  
  // Отдельные refs для каждого dropdown
  const categoryDropdownRef = useRef(null);
  const manufacturerDropdownRef = useRef(null);
  const sortDropdownRef = useRef(null);
  const searchInputRef = useRef(null);

  const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

  const categories = [
    { id: 'all', name: 'По видам товаров' },
    { id: 'oil', name: 'Моторные масла' },
    { id: 'bulb', name: 'Автомобильные лампы' },
    { id: 'battery', name: 'Аккумуляторы' }
  ];

  // Опции сортировки
  const sortOptions = [
    { id: 'default', name: 'По умолчанию' },
    { id: 'asc', name: 'Цена по увеличению' },
    { id: 'desc', name: 'Цена по убыванию' }
  ];

  // Список производителей для каждого типа товара
  const manufacturersByCategory = {
    oil: [
      { id: 'all', name: 'Все производители' },
      { id: 'Shell', name: 'Shell' },
      { id: 'Mobil', name: 'Mobil' },
      { id: 'Castrol', name: 'Castrol' },
      { id: 'Liqui Moly', name: 'Liqui Moly' },
      { id: 'Motul', name: 'Motul' }
    ],
    bulb: [
      { id: 'all', name: 'Все производители' },
      { id: 'Philips', name: 'Philips' },
      { id: 'Osram', name: 'Osram' },
      { id: 'Bosch', name: 'Bosch' },
      { id: 'Koito', name: 'Koito' }
    ],
    battery: [
      { id: 'all', name: 'Все производители' },
      { id: 'Varta', name: 'Varta' },
      { id: 'Bosch', name: 'Bosch' },
      { id: 'Exide', name: 'Exide' },
      { id: 'Mutlu', name: 'Mutlu' },
      { id: 'Topla', name: 'Topla' }
    ]
  };

  // Получаем текущий список производителей в зависимости от выбранной категории
  const getCurrentManufacturers = () => {
    if (activeCategory === 'all') {
      return [{ id: 'all', name: 'Сначала выберите категорию' }];
    }
    return manufacturersByCategory[activeCategory] || [{ id: 'all', name: 'Все производители' }];
  };

  const manufacturers = getCurrentManufacturers();

  // Закрытие при клике вне dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (categoryDropdownRef.current && !categoryDropdownRef.current.contains(event.target)) {
        setIsCategoryOpen(false);
      }
      if (manufacturerDropdownRef.current && !manufacturerDropdownRef.current.contains(event.target)) {
        setIsManufacturerOpen(false);
      }
      if (sortDropdownRef.current && !sortDropdownRef.current.contains(event.target)) {
        setIsSortOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Сброс производителя при смене категории
  useEffect(() => {
    setActiveManufacturer('all');
    setIsManufacturerOpen(false);
  }, [activeCategory]);

  // Сброс сортировки при смене категории
  useEffect(() => {
    setSortOrder('default');
  }, [activeCategory]);

  // Сброс поиска при смене категории
  useEffect(() => {
    setSearchQuery('');
  }, [activeCategory]);

  // Загрузка товаров
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        let url = `${API_BASE_URL}/catalog_api/api/get_products.php`;
        if (activeCategory !== 'all') {
          url = `${API_BASE_URL}/catalog_api/api/get_products.php/category/${activeCategory}`;
        }

        const response = await axios.get(url);
        const data = response.data;

        const productsArray = Array.isArray(data) ? data : [];

        const formattedProducts = productsArray.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          description: item.description,
          category: item.category,
          type: item.type,
          manufacturer: extractManufacturer(item.name),
          image_url: item.image_url || null
        }));

        setProducts(formattedProducts);
        setError(null);

      } catch (error) {
        setError(`Ошибка загрузки: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [API_BASE_URL, activeCategory]);

  // Извлечение производителя из названия товара
  const extractManufacturer = (productName) => {
    if (!productName) return 'unknown';
    
    const manufacturers = ['Shell', 'Mobil', 'Castrol', 'Liqui Moly', 'Motul', 
                           'Philips', 'Osram', 'Bosch', 'Koito', 'Varta', 
                           'Exide', 'Mutlu', 'Topla'];
    
    for (const manufacturer of manufacturers) {
      if (productName.toLowerCase().includes(manufacturer.toLowerCase())) {
        return manufacturer;
      }
    }
    return 'other';
  };

  // Применение фильтров, сортировки и поиска
  const applyFilters = () => {
    let filtered = [...products];
    
    // Сортировка по категории
    if (activeCategory !== 'all') {
      filtered = filtered.filter(product => {
        const productType = product.type || product.category;
        return productType === activeCategory;
      });
    }
    
    // Фильтр по производителю
    if (activeManufacturer !== 'all' && activeCategory !== 'all') {
      filtered = filtered.filter(product => 
        product.manufacturer === activeManufacturer
      );
    }
    
    // Поиск по названию и описанию
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(query) ||
        (product.description && product.description.toLowerCase().includes(query))
      );
    }
    
    // фильтрация по цене
    if (sortOrder === 'asc') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortOrder === 'desc') {
      filtered.sort((a, b) => b.price - a.price);
    }

    // При sortOrder === 'default' сортировка не применяется (сохраняется порядок из API)
    
    setFilteredProducts(filtered);
  };

  // Применяем фильтры при изменении товаров, категории, производителя, сортировки или поиска
  useEffect(() => {
    applyFilters();
  }, [products, activeCategory, activeManufacturer, sortOrder, searchQuery]);

  const handleImageError = (productId) => {
    setImageErrors(prev => ({
      ...prev,
      [productId]: true
    }));
  };

  const formatPrice = (price) => {
    if (!price) return 'Цена не указана';
    return `${Number(price).toFixed(2)} ₽`;
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const clearSearch = () => {
    setSearchQuery('');
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  if (loading) return <div className="catalog">Загрузка...</div>;
  if (error) return <div className="catalog">{error}</div>;

  return (
    <div className="catalog">

      <div className="about_header">
        <h1>Каталог</h1>
        <div className="breadcrumbs">
          <Link to="/">Главная</Link> / <span>Каталог</span>
        </div>
      </div>

      <div className='filters-container'>
        <div className='dropdowns-wrapper'>
          {/* Первый DROPDOWN - Категории */}
          <div className="category-dropdown" ref={categoryDropdownRef}>
            <div 
              className="dropdown-button"
              onClick={() => setIsCategoryOpen(!isCategoryOpen)}
            >
              <span>
                {categories.find(c => c.id === activeCategory)?.name}
              </span>
              <span className={`arrow ${isCategoryOpen ? "open" : ""}`}>
                ▼
              </span>
            </div>

            {isCategoryOpen && (
              <div className="dropdown-menu">
                {categories.map(cat => (
                  <div
                    key={cat.id}
                    className={`dropdown-item ${activeCategory === cat.id ? "active" : ""}`}
                    onClick={() => {
                      setActiveCategory(cat.id);
                      setIsCategoryOpen(false);
                    }}
                  >
                    {cat.name}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Второй DROPDOWN - Производители (показывается только если выбрана не 'all') */}
          {activeCategory !== 'all' && (
            <div className="category-dropdown" ref={manufacturerDropdownRef}>
              <div 
                className="dropdown-button"
                onClick={() => {
                  if (activeCategory !== 'all') {
                    setIsManufacturerOpen(!isManufacturerOpen);
                  }
                }}
                style={{ opacity: activeCategory === 'all' ? 0.5 : 1 }}
              >
                <span>
                  {manufacturers.find(m => m.id === activeManufacturer)?.name || 'Выберите производителя'}
                </span>
                <span className={`arrow ${isManufacturerOpen ? "open" : ""}`}>
                  ▼
                </span>
              </div>

              {isManufacturerOpen && activeCategory !== 'all' && (
                <div className="dropdown-menu">
                  {manufacturers.map(man => (
                    <div
                      key={man.id}
                      className={`dropdown-item ${activeManufacturer === man.id ? "active" : ""}`}
                      onClick={() => {
                        if (man.id !== 'all' || activeCategory !== 'all') {
                          setActiveManufacturer(man.id);
                          setIsManufacturerOpen(false);
                        }
                      }}
                    >
                      {man.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Третий DROPDOWN - Сортировка по цене */}
          <div className="category-dropdown" ref={sortDropdownRef}>
            <div 
              className="dropdown-button"
              onClick={() => setIsSortOpen(!isSortOpen)}
            >
              <span>
                {sortOptions.find(o => o.id === sortOrder)?.name || 'Сортировка'}
              </span>
              <span className={`arrow ${isSortOpen ? "open" : ""}`}>
                ▼
              </span>
            </div>

            {isSortOpen && (
              <div className="dropdown-menu">
                {sortOptions.map(option => (
                  <div
                    key={option.id}
                    className={`dropdown-item ${sortOrder === option.id ? "active" : ""}`}
                    onClick={() => {
                      setSortOrder(option.id);
                      setIsSortOpen(false);
                    }}
                  >
                    {option.name}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Поиск */}
        <div className="search-wrapper">
          <div className="search-container">
            <input
              ref={searchInputRef}
              type="text"
              className="search-input"
              placeholder="Поиск товаров..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
            {searchQuery && (
              <button className="search-clear" onClick={clearSearch}>
                ✕
              </button>
            )}
            <div className="search-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.5 14H14.71L14.43 13.73C15.41 12.59 16 11.11 16 9.5C16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-0.59 4.23-1.57L14 14.71V15.5L19 20.49L20.49 19L15.5 14zM9.5 14C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" fill="currentColor"/>
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Результаты фильтрации */}
      {filteredProducts.length === 0 ? (
        <div className="no-products">
          {searchQuery ? (
            `По запросу "${searchQuery}" ничего не найдено`
          ) : activeCategory === 'all' 
            ? 'Выберите категорию для просмотра товаров' 
            : activeManufacturer !== 'all' 
              ? `Нет товаров производителя ${manufacturers.find(m => m.id === activeManufacturer)?.name} в категории ${categories.find(c => c.id === activeCategory)?.name}`
              : 'Нет товаров в выбранной категории'}
        </div>
      ) : (
        <>
          {searchQuery && (
            <div className="search-info">
              Найдено товаров: {filteredProducts.length} по запросу "{searchQuery}"
            </div>
          )}
          <div className="products">
            {filteredProducts.map(product => (
              <div key={product.id} className="product">

                <div className="product-image">
                  {!imageErrors[product.id] && product.image_url ? (
                    <img
                      src={product.image_url}
                      alt={product.name}
                      onError={() => handleImageError(product.id)}
                    />
                  ) : (
                    <div className="no-image">Нет изображения</div>
                  )}
                </div>

                <div className="product-details">
                  <h2>{product.name}</h2>
                  <p className="price">{formatPrice(product.price)}</p>
                  <p className='description'>{product.description}</p>
                  
                  <Link to={`/product/${product.id}`} className="details-button">
                    Подробнее
                  </Link>
                </div>

              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};