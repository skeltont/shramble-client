import { useState } from 'react';
import { Helmet } from 'react-helmet'
import { Outlet } from 'react-router-dom'

import '../style/App.scss';

import RoomCode from '../components/common/RoomCode.tsx'

export default function App() {
  const [roomCode, setRoomCode] = useState('')

  return (
    <div className="App">
      <Helmet>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        {/* <link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet" /> */}
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
      </Helmet>
      <header className='App-header'>
        <div>
          <div>
            <i className="gg-menu"></i>
          </div>
          <div className="title">
            Shramble
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', padding: '5px'}}>
          <RoomCode value={roomCode} />
        </div>
      </header>
      <div className='content'>
        <Outlet context={[roomCode, setRoomCode]} />
      </div>
    </div>
  );
}
