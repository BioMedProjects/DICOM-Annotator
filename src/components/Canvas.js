import React, { useRef, useEffect, useState, useContext } from 'react';
import { ImgContext, TrueContext } from './ImgContext';
import axios from 'axios';

// const fetchData = () => {
//   return axios.get('http://localhost:4000/api/')
//   .then(( {data}) => {
//     console.log(data);
//     return data;
//   })
//   .catch(err => {
//     console.error(err);
//   });
// }
// const postData = (value) => {
//   const formData = new FormData()
//   formData.append('isLabeled', true)
//   formData.append('label', "String")
//   formData.append('dicomImg', value)
//   axios.post('http://localhost:4000/api/post-dicom', formData, {
//   }).then(res => {
//     console.log(res)
//   })
// }
export default function Canvas() {

  const { value, setValue } = useContext(ImgContext);
  const { image, setImage } = useContext(TrueContext);
  const canvasRef = useRef(null)
  const contextRef = useRef(null)
  const [isDrawing, setIsDrawing] = useState(false)
  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = 256 * 2;//window.innerWidth * 2;
    canvas.height = 256 * 2;//window.innerHeight * 2;
    canvas.style.width = '256px' //`${window.innerWidth}px`;
    canvas.style.height = '256px'// `${window.innerHeight}px`;
    const context = canvas.getContext("2d")
    context.scale(2, 2)
    context.lineCap = "round"
    context.strokeStyle = "black"
    context.lineWidth = 5
    contextRef.current = context;
  }, [])

  useEffect(() => {
    // console.log(value, "TO JEST VALUE")
    showImage();
  }, [value])
  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.beginPath()
    contextRef.current.moveTo(offsetX, offsetY)
    setIsDrawing(true)
  }

  const finishDrawing = () => {
    contextRef.current.closePath()
    setIsDrawing(false)
  }

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) {
      return
    }
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY)
    contextRef.current.stroke()
  }

  const showImage = () => {
    const image = new Image();
    image.src = value;
    // image.src = 'http://localhost:4000/uploads/pobrane-(3).png'
    image.setAttribute('crossorigin', 'anonymous');
    image.onload = function(){
      contextRef.current.drawImage(image, 0, 0, 256, 256)
      // console.log(value);
    }
  }
  const clear = () => {
    contextRef.current.clearRect(0, 0, 256, 256);
  }

  const save = () => {
    let dataURI = canvasRef.current.toDataURL();
    // console.log(dataURI);
    setValue(dataURI);
    // saveApi();
    // postData(value)
    setImage(true)
    clear()
  }
  return (
    <div>
      <button type="button" class="btn btn-primary" onClick={showImage} >Start</button>
      <br></br>
      <br></br>
      <canvas
        onMouseDown={startDrawing}
        onMouseUp={finishDrawing}
        onMouseMove={draw}
        ref={canvasRef}
      />
      <hr></hr>
      <div className ="inputDescriber">
      <label>Label Part</label>
      <input  class="form-control" id="inputDescriber" placeholder="What part of the body did you label?"/>
      </div>
      <div className ="buttonDiv">
        <button type="button" class="btn btn-primary" onClick={clear}>Clear</button>
      </div>
      <div className ="buttonDiv">
        <button type="button" class="btn btn-primary" onClick={showImage}>Label</button>
      </div>
      <div className ="buttonDiv">
        <button type="sumbit" class="btn btn-primary" onClick={save}>Next</button>
      </div>
    </div>
  );
}

