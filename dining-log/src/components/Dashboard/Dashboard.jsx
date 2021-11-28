import React, { useState } from 'react';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      dietary_restrictions: ''
    };
  }

  render() {
    return(
      <h2>Your Profile</h2>
    )
  }
}

export default Dashboard;