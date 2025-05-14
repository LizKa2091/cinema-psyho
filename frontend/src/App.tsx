import React, { FC } from 'react';
import './assets/scss/main.scss';
import Home from './pages/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Film from './pages/Film';
import MainLayout from './components/layout/MainLayout';
import Profile from './pages/Profile';

const App: FC = () => {
   return (
      <BrowserRouter>
         <MainLayout>
            <Routes>
               <Route path='/' element={<Home />} />
               <Route path='/film/:id' element={<Film />} />
               <Route path='/profile' element={<Profile />} />
            </Routes>
         </MainLayout>
      </BrowserRouter>
   );
}

export default App;