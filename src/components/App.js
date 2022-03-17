import { Component } from 'react';
import { Helmet } from 'react-helmet'

import '../style/App.scss';

import { Outlet } from 'react-router-dom'

class App extends Component {
  render () {
    return (
      <div className="App">
        <Helmet>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet" />
        </Helmet>
        <header className="App-header">
          {/* Put Menu icon here */}
          <div>-</div>
          <div className="title">
            Shramble
          </div>
        </header>
        <div className='content'>
          <Outlet />
        </div>
      </div>
    );
  }
}

export default App;
