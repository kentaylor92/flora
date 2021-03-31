import React from "react";
import Canvas from './Components/Canvas';
import './App.scss';

const App = () => {
  return (
    <div className="App">
      <img className="logo" src="/assets/logo-orange.png" alt="Tambayan by Paraluman Flora logo"></img>      
      <Canvas />
    </div>
  );
};

export default App;