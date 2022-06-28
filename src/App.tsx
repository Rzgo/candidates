import React from 'react';
import './App.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Main } from './pages/Main';
import { Header } from './common/Header';
import { AllСandidates } from './pages/AllСandidates';

const App: React.FC = (): JSX.Element => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/all_candidates" element={<AllСandidates />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
