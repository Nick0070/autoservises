import './App.scss';
import { MainLayout } from './Components/Layouts/Layouts';
import { Main } from './Pages/Main/Main';
import { Information } from './Pages/Information/Information';
import { Advantages } from './Pages/Advantages/Advantages';
import { BrowserRouter, Route, Routes, Outlet } from 'react-router-dom';
import { Send } from './Pages/Send/Send';
import { Catalog } from './Pages/Catalog/Catalog';
import { Servis } from './Pages/Servis/Servis';
import { Admin } from './Pages/Admin/Admin';

function App() {
  return (
    <div className='style'>
      <BrowserRouter>
        <Routes>
          {/* Маршруты с MainLayout */}
          <Route element={<MainLayout><Outlet /></MainLayout>}>
            <Route index element={
              <>
                <Main />
                <Information />
                <Send />
                <Advantages />
              </>
            } />
            <Route path='/catalog' element={<Catalog />} />
            <Route path='/Servis' element={<Servis />} />
          </Route>

          {/* Админ-панель без MainLayout */}
          <Route path='/wp-admin' element={<Admin />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;