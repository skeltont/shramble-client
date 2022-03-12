import '../style/Home.css';
import React, { Component } from 'react';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      player_name: '',
      room_code: '',
      room_id: null,
      token: null
    }
  }

  handleNameChange = (e) => {
    this.setState({ player_name: e.target.value });
  }

  handleCodeChange = (e) => {
    this.setState({ room_code: e.target.value })
  }

  handleCreateRoom = (e) => {
    fetch("http://localhost:4000/room", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        room: {
          player_name: this.state.player_name
        }
      })
    }).then((res) => res.json())
      .then(data => {
        this.setState({
          room_id: data['room_id'],
          room_code: data['room_code'],
        })
        sessionStorage.setItem('shrambleToken', data['token'])
      })
      .catch((error) => console.log(error))
  }

  handleJoinRoom = (e) => {
    fetch("http://localhost:4000/join", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': sessionStorage.getItem('shrambleToken')
      },
      body: JSON.stringify({
        room: {
          player_name: this.state.player_name,
          room_code: this.state.room_code
        }
      })
    }).then((res) => res.json())
      .then((data) => this.setState({
        room_id: data['room_id'],
        room_code: data['room_code']
      }))
      .catch((error) => console.log(error))
  }

  render() {
    return (
      <div className="Home body">
        <input type="text" className="input-text" placeholder='Who are you' value={this.state.player_name} onChange={this.handleNameChange} />
        <div>
          <input type="text" className="input-text" placeholder='Enter room code' value={this.state.room_code} onChange={this.handleCodeChange} />
          <button className='button-small' onClick={this.handleJoinRoom}>+</button>
        </div>
        <button className="button-wide" onClick={this.handleCreateRoom}>Create new room</button>
      </div>
    );
  }
}

export default Home;