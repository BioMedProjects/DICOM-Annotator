import React, {useState, useMemo, useEffect} from 'react';
import axios from 'axios';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Canvas from './components/Canvas.js' 
import { ImgContext, TrueContext, NameContex  } from './components/ImgContext'

const fetchData = () => {
  return axios.get('http://localhost:4000/api/')
  .then(( {data}) => {
    console.log(data);
    return (data);
  })
  .catch(err => {
    console.error(err);
  });
}
const postData = (value) => {
  const formData = new FormData()
  formData.append('isLabeled', true)
  formData.append('label', "String")
  formData.append('dicomImg', value)
  axios.post('http://localhost:4000/api/post-dicom', formData, {
  }).then(res => {
    console.log(res)
  })
}

function App() {
  const [value, setValue] = useState('');
  const [image, setImage] = useState(false);
  const [nameField, setName] = useState('');
  const providerValue = useMemo(() => ({value,setValue}), [value, setValue]);
  const providerValueImage = useMemo(() => ({image,setImage}), [image,setImage]);
  const providerValueName = useMemo(() => ({nameField, setName}), [nameField, setName]);
  //const [ visible, setVisible ] = useState(false);
  // useEffect(() => {
  //   fetchData().then(data =>{
  //     console.log(data)
  //     setValue(data.dicoms[0].dicomImg)
  //     // setImage(true)
  //   })
  // }, [])
    
  useEffect(() => {
    fetchData().then(data => {
      console.log(data, "to jest data")
      setValue(data.dicoms[3].dicomImg)
    })
    
    // console.log(data.dicoms[2].dicomImg)

  }, [])
  useEffect(() =>{
    if(image === true) {
      postData(value)
    } else {
      console.log("No changes")
    }
  }, [image])

  
  return (
    <div>
      <div>
     </div>
      <h1>DICOM Annotation APP</h1>
      <br></br>
      <NameContex.Provider value = {providerValueName}>
       <TrueContext.Provider value={providerValueImage}>
         <ImgContext.Provider value={providerValue}>
          <Canvas/>
          <br></br>
         </ImgContext.Provider>
       </TrueContext.Provider>
      </NameContex.Provider>
    </div>
  );
}

export default App;
