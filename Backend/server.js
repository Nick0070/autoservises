// // const express = require('express');
// // const cors = require('cors');
// // const { Pool } = require('pg');
// // require('dotenv').config();

// // const app = express();
// // const port = process.env.PORT || 8080;

// // // Middleware
// // app.use(cors());
// // app.use(express.json());
// // app.use('/uploads', express.static('uploads'));

// // // Настройка подключения к PostgreSQL
// // const pool = new Pool({
// //   user: process.env.DB_USER || 'postgres',
// //   password: process.env.DB_PASSWORD || '',
// //   host: process.env.DB_HOST || 'localhost',
// //   port: process.env.DB_PORT || 5432,
// //   database: process.env.DB_NAME || 'postgres',
// // });

// // // Проверка подключения
// // pool.connect((err, client, release) => {
// //   if (err) {
// //     console.error('❌ Ошибка подключения к PostgreSQL:', err.stack);
// //   } else {
// //     console.log('✅ Успешно подключено к PostgreSQL');
// //     release();
// //   }
// // });

// // // API endpoint для получения товаров
// // app.get('/catalog_api/api/get_products.php', async (req, res) => {
// //   try {
// //     const query = `
// //       SELECT 
// //         id_products as id,
// //         Name_products as name,
// //         Price_products as price,
// //         description_products as description,
// //         Photo_products as image_url
// //       FROM products
// //       ORDER BY id_products
// //     `;
    
// //     const result = await pool.query(query);
    
// //     const products = result.rows.map(product => ({
// //       id: product.id,
// //       name: product.name,
// //       price: parseFloat(product.price),
// //       description: product.description || 'Описание отсутствует',
// //       image_url: product.image_url ? 
// //         `http://localhost:${port}/uploads/${product.image_url.replace('/uploads/', '')}` : 
// //         null,
// //     }));
    
// //     res.json(products);
// //     console.log(`✅ Отправлено ${products.length} товаров`);
// //   } catch (error) {
// //     console.error('❌ Ошибка при получении товаров:', error);
// //     res.status(500).json({ error: error.message });
// //   }
// // });

// // // Запуск сервера
// // app.listen(port, () => {
// //   console.log(`
// //   🚀 Сервер запущен!
// //   📡 Адрес: http://localhost:${port}
// //   📊 API Endpoint: http://localhost:${port}/catalog_api/api/get_products.php
// //   `);
// // });

// // // Корректное завершение
// // process.on('SIGINT', async () => {
// //   console.log('\n🛑 Закрываю соединения...');
// //   await pool.end();
// //   console.log('✅ Соединения с БД закрыты');
// //   process.exit(0);
// // });


// const express = require('express');
// const cors = require('cors');
// const { Pool } = require('pg');
// require('dotenv').config();
// const path = require('path');
// const fs = require('fs'); // Добавьте для проверки файлов

// const app = express();
// const port = process.env.PORT || 8080;

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Важно: ПРАВИЛЬНАЯ раздача статических файлов
// // Папка uploads должна быть в корне проекта Backend
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// // Проверка существования папки uploads
// const uploadsDir = path.join(__dirname, 'uploads');
// if (!fs.existsSync(uploadsDir)) {
//   console.log('⚠️ Папка uploads не существует, создаю...');
//   fs.mkdirSync(uploadsDir, { recursive: true });
//   console.log('✅ Папка uploads создана');
// } else {
//   console.log('✅ Папка uploads существует');
//   const files = fs.readdirSync(uploadsDir);
//   console.log(`📁 Файлы в uploads: ${files.length > 0 ? files.join(', ') : 'нет файлов'}`);
// }

// // Настройка подключения к PostgreSQL
// const pool = new Pool({
//   user: process.env.DB_USER || 'postgres',
//   password: process.env.DB_PASSWORD || '',
//   host: process.env.DB_HOST || 'localhost',
//   port: process.env.DB_PORT || 5432,
//   database: process.env.DB_NAME || 'postgres',
// });

// // Проверка подключения
// pool.connect((err, client, release) => {
//   if (err) {
//     console.error('❌ Ошибка подключения к PostgreSQL:', err.stack);
//   } else {
//     console.log('✅ Успешно подключено к PostgreSQL');
//     release();
//   }
// });

// // API endpoint для получения товаров
// app.get('/catalog_api/api/get_products.php', async (req, res) => {
//   try {
//     const query = `
//       SELECT 
//         id_products as id,
//         Name_products as name,
//         Price_products as price,
//         description_products as description,
//         Photo_products as image_filename
//       FROM products
//       ORDER BY id_products
//     `;
    
//     const result = await pool.query(query);
    
//     // Получаем локальный IP для формирования URL
//     const localIp = getLocalIp();
    
//     const products = result.rows.map(product => {
//       let imageUrl = null;
      
//       // Если есть имя файла и это не NULL
//       if (product.image_filename && product.image_filename.trim() !== '') {
//         // Очищаем имя файла от возможных путей
//         let filename = product.image_filename;
//         if (filename.includes('/')) {
//           filename = filename.split('/').pop();
//         }
        
//         // Формируем полный URL для изображения
//         imageUrl = `http://${localIp}:${port}/uploads/${filename}`;
        
//         // Проверяем существование файла (опционально)
//         const filePath = path.join(__dirname, 'uploads', filename);
//         if (!fs.existsSync(filePath)) {
//           console.log(`⚠️ Файл не найден: ${filename}`);
//           imageUrl = null; // Если файла нет, не показываем ссылку
//         } else {
//           console.log(`✅ Файл найден: ${filename}`);
//         }
//       }
      
//       return {
//         id: product.id,
//         name: product.name,
//         price: parseFloat(product.price),
//         description: product.description || 'Описание отсутствует',
//         image_url: imageUrl,
//       };
//     });
    
//     console.log(`✅ Отправлено ${products.length} товаров`);
//     products.forEach(p => {
//       console.log(`  - ${p.name}: ${p.image_url || 'нет изображения'}`);
//     });
    
//     res.json(products);
//   } catch (error) {
//     console.error('❌ Ошибка при получении товаров:', error);
//     res.status(500).json({ error: error.message });
//   }
// });

// // Функция для получения локального IP
// function getLocalIp() {
//   const { networkInterfaces } = require('os');
//   const nets = networkInterfaces();
  
//   for (const name of Object.keys(nets)) {
//     for (const net of nets[name]) {
//       if (net.family === 'IPv4' && !net.internal) {
//         return net.address;
//       }
//     }
//   }
//   return 'localhost';
// }

// // Запуск сервера
// app.listen(port, '0.0.0.0', () => {
//   console.log(`
//   🚀 Сервер запущен!
//   📡 Локально: http://localhost:${port}
//   📡 В сети: http://${getLocalIp()}:${port}
//   📊 API: http://${getLocalIp()}:${port}/catalog_api/api/get_products.php
//   🖼️  Изображения: http://${getLocalIp()}:${port}/uploads/
//   `);
// });

// // Корректное завершение
// process.on('SIGINT', async () => {
//   console.log('\n🛑 Закрываю соединения...');
//   await pool.end();
//   console.log('✅ Соединения с БД закрыты');
//   process.exit(0);
// });


const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
require('dotenv').config();
const path = require('path');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(express.json());

// Раздача статических файлов
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Проверка существования папки uploads
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  console.log('⚠️ Папка uploads не существует, создаю...');
  fs.mkdirSync(uploadsDir, { recursive: true });
  console.log('✅ Папка uploads создана');
} else {
  console.log('✅ Папка uploads существует');
  const files = fs.readdirSync(uploadsDir);
  console.log(`📁 Файлы в uploads: ${files.length > 0 ? files.join(', ') : 'нет файлов'}`);
}

// Настройка подключения к PostgreSQL
const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || '',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'postgres',
});

// Проверка подключения
pool.connect((err, client, release) => {
  if (err) {
    console.error('❌ Ошибка подключения к PostgreSQL:', err.stack);
  } else {
    console.log('✅ Успешно подключено к PostgreSQL');
    release();
  }
});

// API endpoint для получения всех товаров из объединенной таблицы product
app.get('/catalog_api/api/get_products.php', async (req, res) => {
  try {
    const query = `
      SELECT 
        p.id_product,
        p.id_oil,
        p.id_bulb,
        p.id_batteries,
        o.company AS oil_company,
        o.article AS oil_article,
        o.viscosity AS oil_viscosity,
        o.type AS oil_type,
        o.size AS oil_size,
        o.photo AS oil_photo,
        o.information AS oil_information,
        o.price AS oil_price,
        b.company AS bulb_company,
        b.article AS bulb_article,
        b.plinth AS bulb_plinth,
        b.information AS bulb_information,
        b.photo AS bulb_photo,
        b.price AS bulb_price,
        bt.company AS battery_company,
        bt.article AS battery_article,
        bt.type AS battery_type,
        bt.volume AS battery_volume,
        bt.information AS battery_information,
        bt.photo AS battery_photo,
        bt.price AS battery_price
      FROM product p
      LEFT JOIN oil o ON p.id_oil = o.id_oil
      LEFT JOIN bulb b ON p.id_bulb = b.id_bulb
      LEFT JOIN batteries bt ON p.id_batteries = bt.id_batteries
      ORDER BY p.id_product
    `;
    
    const result = await pool.query(query);
    
    // Получаем локальный IP для формирования URL
    const localIp = getLocalIp();
    
    const products = result.rows.map(item => {
      // Определяем тип товара и формируем название
      let name = '';
      let price = null;
      let photo = null;
      let information = '';
      let category = '';
      
      // Если это масло (id_oil не NULL)
      if (item.id_oil) {
        category = 'Моторное масло';
        name = [item.oil_company, item.oil_article, item.oil_viscosity]
          .filter(Boolean)
          .join(' ');
        price = item.oil_price;
        photo = item.oil_photo;
        information = item.oil_information;
      }
      // Если это лампа (id_bulb не NULL)
      else if (item.id_bulb) {
        category = 'Автомобильная лампа';
        name = [item.bulb_company, item.bulb_article, `цоколь: ${item.bulb_plinth}`]
          .filter(Boolean)
          .join(' ');
        price = item.bulb_price;
        photo = item.bulb_photo;
        information = item.bulb_information;
      }
      // Если это аккумулятор (id_batteries не NULL)
      else if (item.id_batteries) {
        category = 'Автомобильный аккумулятор';
        name = [item.battery_company, item.battery_article, item.battery_type, item.battery_volume]
          .filter(Boolean)
          .join(' ');
        price = item.battery_price;
        photo = item.battery_photo;
        information = item.battery_information;
      }
      
      // Формируем URL изображения
      let imageUrl = null;
      if (photo && photo !== 'NULL' && photo !== 'null' && photo.trim() !== '') {
        let filename = photo;
        if (filename.includes('/')) {
          filename = filename.split('/').pop();
        }
        
        imageUrl = `http://${localIp}:${port}/uploads/${filename}`;
        
        const filePath = path.join(__dirname, 'uploads', filename);
        if (!fs.existsSync(filePath)) {
          console.log(`⚠️ Файл не найден: ${filename} (товар ID: ${item.id_product})`);
          imageUrl = null;
        }
      }
      
      return {
        id: item.id_product,
        name: name || 'Товар без названия',
        price: price ? parseFloat(price) : 0,
        description: information || 'Описание отсутствует',
        image_url: imageUrl,
        category: category,
        type: item.id_oil ? 'oil' : (item.id_bulb ? 'bulb' : 'battery')
      };
    });
    
    console.log(`✅ Отправлено ${products.length} товаров`);
    products.forEach(p => {
      console.log(`  - [${p.category}] ${p.name}: ${p.image_url || 'нет изображения'}`);
    });
    
    res.json(products);
  } catch (error) {
    console.error('❌ Ошибка при получении товаров:', error);
    res.status(500).json({ error: error.message });
  }
});

// Дополнительный endpoint для получения товаров по категории
app.get('/catalog_api/api/get_products.php/category/:type', async (req, res) => {
  const { type } = req.params;
  
  let condition = '';
  if (type === 'oil') condition = 'p.id_oil IS NOT NULL';
  else if (type === 'bulb') condition = 'p.id_bulb IS NOT NULL';
  else if (type === 'battery') condition = 'p.id_batteries IS NOT NULL';
  else {
    return res.status(400).json({ error: 'Неверная категория. Используйте: oil, bulb, battery' });
  }
  
  try {
    const query = `
      SELECT 
        p.id_product,
        p.id_oil,
        p.id_bulb,
        p.id_batteries,
        o.company AS oil_company,
        o.article AS oil_article,
        o.viscosity AS oil_viscosity,
        o.type AS oil_type,
        o.size AS oil_size,
        o.photo AS oil_photo,
        o.information AS oil_information,
        o.price AS oil_price,
        b.company AS bulb_company,
        b.article AS bulb_article,
        b.plinth AS bulb_plinth,
        b.information AS bulb_information,
        b.photo AS bulb_photo,
        b.price AS bulb_price,
        bt.company AS battery_company,
        bt.article AS battery_article,
        bt.type AS battery_type,
        bt.volume AS battery_volume,
        bt.information AS battery_information,
        bt.photo AS battery_photo,
        bt.price AS battery_price
      FROM product p
      LEFT JOIN oil o ON p.id_oil = o.id_oil
      LEFT JOIN bulb b ON p.id_bulb = b.id_bulb
      LEFT JOIN batteries bt ON p.id_batteries = bt.id_batteries
      WHERE ${condition}
      ORDER BY p.id_product
    `;
    
    const result = await pool.query(query);
    const localIp = getLocalIp();
    
    const products = result.rows.map(item => {
      let name = '';
      let price = null;
      let photo = null;
      let information = '';
      
      if (item.id_oil) {
        name = [item.oil_company, item.oil_article, item.oil_viscosity].filter(Boolean).join(' ');
        price = item.oil_price;
        photo = item.oil_photo;
        information = item.oil_information;
      } else if (item.id_bulb) {
        name = [item.bulb_company, item.bulb_article, `цоколь: ${item.bulb_plinth}`].filter(Boolean).join(' ');
        price = item.bulb_price;
        photo = item.bulb_photo;
        information = item.bulb_information;
      } else if (item.id_batteries) {
        name = [item.battery_company, item.battery_article, item.battery_type, item.battery_volume].filter(Boolean).join(' ');
        price = item.battery_price;
        photo = item.battery_photo;
        information = item.battery_information;
      }
      
      let imageUrl = null;
      if (photo && photo !== 'NULL' && photo !== 'null' && photo.trim() !== '') {
        let filename = photo.split('/').pop();
        imageUrl = `http://${localIp}:${port}/uploads/${filename}`;
      }
      
      return {
        id: item.id_product,
        name: name || 'Товар без названия',
        price: price ? parseFloat(price) : 0,
        description: information || 'Описание отсутствует',
        image_url: imageUrl,
        category: type
      };
    });
    
    res.json(products);
  } catch (error) {
    console.error('Ошибка:', error);
    res.status(500).json({ error: error.message });
  }
});

// Функция для получения локального IP
function getLocalIp() {
  const { networkInterfaces } = require('os');
  const nets = networkInterfaces();
  
  for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
      if (net.family === 'IPv4' && !net.internal) {
        return net.address;
      }
    }
  }
  return 'localhost';
}

// Запуск сервера
app.listen(port, '0.0.0.0', () => {
  console.log(`
  🚀 Сервер запущен!
  📡 Локально: http://localhost:${port}
  📡 В сети: http://${getLocalIp()}:${port}
  📊 API (все товары): http://${getLocalIp()}:${port}/catalog_api/api/get_products.php
  📊 API (масла): http://${getLocalIp()}:${port}/catalog_api/api/get_products.php/category/oil
  📊 API (лампы): http://${getLocalIp()}:${port}/catalog_api/api/get_products.php/category/bulb
  📊 API (аккумуляторы): http://${getLocalIp()}:${port}/catalog_api/api/get_products.php/category/battery
  🖼️  Изображения: http://${getLocalIp()}:${port}/uploads/
  `);
});

// Корректное завершение
process.on('SIGINT', async () => {
  console.log('\n🛑 Закрываю соединения...');
  await pool.end();
  console.log('✅ Соединения с БД закрыты');
  process.exit(0);
});