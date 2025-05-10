import React, { FC } from 'react';
import './assets/scss/main.scss';
import MainPage from './pages/MainPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import FilmItem from './components/UI/FilmItem';

const App: FC = () => {
   return (
      <BrowserRouter>
         <Routes>
            <Route path='/' element={<MainPage />} />
            <Route path='/film/:id' element={<FilmItem />} />
         </Routes>
      </BrowserRouter>
   );
}

export default App;