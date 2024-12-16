import React from 'react';
import {Route, Routes} from "react-router-dom";
import BookStatusPieChart from "../pages/BookStatusPieChart"
import { HashRouter } from 'react-router-dom';
import App from '../App';
import BookDataTable from '../pages/BookTable';
import StudentsDataTable from '../pages/StudentsTable';
import LoginPage from '../pages/LoginPage'



function RootNavigation() {
  return (
    <HashRouter>
      <Routes>
      <Route path='/' element={<App/>}/>
      <Route path='/book-status-analysis' element={<BookStatusPieChart/>}/>
      <Route path='/book-data'  element={<BookDataTable/>}/>
      <Route path='/student-data' element={<StudentsDataTable/>}/>
      <Route path='/login' element={<LoginPage/>}/>
      </Routes>
    </HashRouter>
  );
}

export default RootNavigation;
