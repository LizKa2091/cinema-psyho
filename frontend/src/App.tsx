import React, { FC } from 'react';
import './assets/scss/main.scss';
import MainPage from './pages/MainPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const App: FC = () => {
   return (
      <BrowserRouter>
         <Routes>
            <Route path='/' element={<MainPage />} />
         </Routes>
      </BrowserRouter>
   );
}

export default App;