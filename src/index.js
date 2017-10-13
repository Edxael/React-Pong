import React from 'react';
import ReactDOM from 'react-dom';
import Game from './comps/Game.jsx';
import Header from './comps/Header.jsx';
import Footer from './comps/Footer.jsx';
import logo from './comps/img/logo.svg';
import './App.css';

const GatherComp = () => {
  const GatherStl = { paddingTop: "15px", textAlign: "center", marginRight: "20%", marginLeft: "20%", marginTop: "1%", backgroundColor: "#ffffff", border: "1px solid black", opacity: "0.8" }
  return (
    <div>
      <div style={GatherStl} >
        <img src={logo} className="App-logo" alt="logo" />
        <Header />
        <Game />
        <Footer />
      </div>
    </div>
  )
}

ReactDOM.render(<GatherComp />, document.getElementById("root"));
