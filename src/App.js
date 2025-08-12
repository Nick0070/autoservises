import './App.scss';
import { MainLayout } from './Components/Layouts/Layouts'
import { Main } from './Pages/Main/Main'
import { Information } from './Pages/Information/Information'
import { Advantages } from './Pages/Advantages/Advantages'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Send } from './Pages/Send/Send'
import { Catalog } from './Pages/Catalog/Catalog'
import { Servis } from './Pages/Servis/Servis'

function App() {
  return (
    <div className='style'>
      <BrowserRouter>
        <MainLayout>
          <Routes>
            <Route path="/" element={
              <>
                <Main />
                <Information />
                <Send />
                <Advantages />
              </>
            } />
            <Route path='/catalog' element={<Catalog />} />
            <Route path='/' element={"/"} />
            <Route path='/Servis' element={<Servis />} />
          </Routes>
        </MainLayout>
      </BrowserRouter>
    </div>
  );
}

export default App;