import React, {useState, useMemo} from 'react';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Canvas from './components/Canvas.js' 
import { ImgContext, DicomContext } from './components/ImgContext'


function App() {
  const [value, setValue] = useState('');
  const [dicom, setDicom] = useState('');

  const providerValue = useMemo(() => ({value,setValue}), [value, setValue]);
  const providerValueDicom = useMemo(() => ({dicom,setDicom}), [dicom, setDicom]);
  

  return (
    <div>
      <div>
     </div>
      <h1>DICOM Annotation APP</h1>
      <br></br>
       <DicomContext.Provider value={providerValueDicom}>
         <ImgContext.Provider value={providerValue}>
          <Canvas/>
          <br></br>
         </ImgContext.Provider>
       </DicomContext.Provider>
    </div>
  );
}

export default App;
