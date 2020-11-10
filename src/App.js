import React, {createContext} from 'react';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Canvas from './components/Canvas.js'
import UseImage from './components/UseImage.js'
import { ImgContext } from './components/ImgContext'
function App() {
  return (
    <div>
      <h1>DICOM Annotation APP</h1>
      <br></br>
      <ImgContext.Provider value="hello from context">
        <Canvas></Canvas>
        <br></br>
        <UseImage></UseImage>
      </ImgContext.Provider>
    </div>
  );
}

export default App;
