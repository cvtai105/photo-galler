import './App.css';
import React from 'react';
import { createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import { createBrowserRouter } from 'react-router-dom';
import PhotoList from './components/PhotoList';
import PhotoDetail from './components/PhotoDetail';
import Layout from './layouts/main';

const routes = createRoutesFromElements(  
  <>
    <Route path="/" element={<Layout/>}>
      <Route path="/" element={<PhotoList />} />,
      <Route path="/photos" element={<PhotoList />} />,
      <Route path="/photos/:id" element={<PhotoDetail />} />
    </Route>
  </>
);

const router = createBrowserRouter(routes);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
