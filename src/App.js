import './App.css'
import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import SortingVisualizer from 'pages/sorting'
import Home from 'pages/home'
import PathfindingVisualizer from 'pages/pathfinding'

function App () {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="pathfinding" element={<PathfindingVisualizer/>} />
        <Route path="sorting" element={<SortingVisualizer />} />
        <Route path="*" element={<h1>404</h1>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
