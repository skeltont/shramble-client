import React, { Component } from 'react';

class CreateMatch extends Component {
  render() {
    return (
      <div>
        owner
      </div>
    )
  }
}

class JoinMatch extends Component {
  render() {
   return (
     <div>
       player
     </div>
   )
  }
}

class NewMatch extends Component {
  constructor(props) {
    super(props);

    this.state = {}
  }

  renderNewMatch () {
    if (this.props.owner) {
      return <NewMatch />
    }
    return <JoinMatch />
  }

  render() {
    return (
      <div className="NewMatch body">
        {this.renderNewMatch()}
      </div>
    );
  }
}

export default NewMatch;