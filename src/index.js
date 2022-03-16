import React from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import App from './components/App';
import Home from './routes/home'
import Match from './routes/match'

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path='/*' element={<App />}>
        <Route index element={<Home />}/>
        <Route path='match' element={<Match />}/>
      </Route>
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);
