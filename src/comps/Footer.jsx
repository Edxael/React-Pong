import React from 'react';

class Footer extends React.Component {
  render() {
    const cont1 = { padding: "20px 20% 10px 20%" }
    return(
      <div style={cont1}>
        <p>Here is one very simple code of the game pong, written in React.js / JavaScript, this still work in progress, for that reason you might find some bugs, better code comming soon.</p>
        <p>This game is functional, and and you can play it today...</p>
    </div>
    )
  }
}

export default Footer;
