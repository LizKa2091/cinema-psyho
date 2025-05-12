import React, { FC } from 'react';
import './assets/scss/main.scss';
import MainPage from './pages/MainPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import FilmPage from './pages/FilmPage';

const App: FC = () => {
   return (
      <BrowserRouter>
         <Routes>
            <Route path='/' element={<MainPage />} />
            <Route path='/film/:id' element={<FilmPage />} />
         </Routes>
      </BrowserRouter>
   );
}

export default App;