import React, {useEffect, useState} from "react";
import Canvas from './Components/Canvas';
import './App.scss';

const App = () => {
  const [close, setClose] = useState();
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setClose(false);
    }, 1200)

    return () => clearTimeout(timer)
  }, [])
  return (
    <div className="App">
      <div className={`instructions-modal ${close === false ? 'fade' : ''}`}
      // style={{display: close === false ? 'block' : 'none'}}
      >
        <button onClick={e => {e.preventDefault(); setClose(true)}} >X</button>
        <h3>Instructions</h3>
        <p>Mobile users, simply swipe the direction you want your snake to go!</p>
        <p>Desktop players can use keyboard arrows.</p>
        <p>Keep trying until you reach the mystery score that will give you 20% off! </p>
      </div>
      <img className="mobile-top-img" src="/assets/tambayan-mobile-top-flower-x2.png"></img>
      <img className="logo" src="/assets/logo-orange.png" alt="Tambayan by Paraluman Flora logo"></img>      
      <Canvas />
      {/* <img className="mobile-bottom-img" src="/assets/tambayan-mobile-bottom-flower-x2.png"></img> */}
    </div>
  );
};

export default App;