import React from "react";
import Canvas from './Components/Canvas';
import './App.scss';

const App = () => {
  return (
    <div className="App">
      <img className="mobile-top-img" src="/assets/tambayan-mobile-top-flower-x2.png"></img>
      <img className="logo" src="/assets/logo-orange.png" alt="Tambayan by Paraluman Flora logo"></img>      
      <Canvas />
      <img className="mobile-bottom-img" src="/assets/tambayan-mobile-bottom-flower-x2.png"></img>
    </div>
  );
};

export default App;