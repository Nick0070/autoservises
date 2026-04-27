import './App.scss';
import { MainLayout } from './Components/Layouts/Layouts';
import { Main } from './Pages/Main/Main';
import { Information } from './Pages/Information/Information';

import { BrowserRouter, Route, Routes, Outlet } from 'react-router-dom';
import { Send } from './Pages/Send/Send';
import { Catalog } from './Pages/Catalog/Catalog';
import { Servis } from './Pages/Servis/Servis';
import { Admin } from './Admin_pages/Admin/Admin';
import { See_bd } from './Admin_pages/See_bd/See_bd';
import { Contact } from './Pages/Contact/Contact';
import { Company } from './Pages/Company/Company';


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
                {/* <Send />
                */}
            
              </>
            } />
            
            <Route path='/catalog' element={<Catalog />} />
            <Route path='/Servis' element={<Servis />} />
             <Route path='/Company' element={<Company />} />
              <Route path='/Contact' element={<Contact />} />
          </Route>

          {/* Админ-панель без MainLayout */}



          
          <Route path='/wp-admin' element={<Admin />} />
          <Route path='/See_bd' element={<See_bd />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;