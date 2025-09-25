import { useEffect, useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import GrandmasterList from './components/GrandmasterList';
import GrandmasterProfile from './components/GrandmasterProfile';

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<GrandmasterList />} />
          <Route path="/:id" element={<GrandmasterProfile />} />
        </Routes>
      </BrowserRouter>
  )
}

export default App
