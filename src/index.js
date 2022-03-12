import React from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import './style/index.css';

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

/*
  where I left off:
    - user can create a room and themselves as the owner
    - user can join a room via a code and create themselves as a user.
      - need to find a way to check if they already exist in that room, maybe update their name
        if they have a token?

  where I want to go:
    - use a token that the user holds onto? to identify them on rejoin
    - work on screen to set stake and create contests

  future goals:
    - screen to choose contestant
    - screen to select winner
    - screen to see standings (continue if owner)
*/