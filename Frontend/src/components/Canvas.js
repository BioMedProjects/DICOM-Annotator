import React, { useRef, useEffect, useState, useContext } from 'react';
import { ImgContext, NameContex, TrueContext } from './ImgContext';
//import axios from 'axios';

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
export default function Canvas(props) {

  const { value, /*setValue*/ } = useContext(ImgContext);
  const { /*image,*/ /*setImage*/ } = useContext(TrueContext);
  const { nameField, setName } = useContext(NameContex);
  const canvasRef = useRef(null)
  const contextRef = useRef(null)
  const [isDrawing, setIsDrawing] = useState(false)
  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = 512 * 2;//window.innerWidth * 2;
    canvas.height = 512 * 2;//window.innerHeight * 2;
    canvas.style.width = '512px' //`${window.innerWidth}px`;
    canvas.style.height = '512px'// `${window.innerHeight}px`;
    const context = canvas.getContext("2d")
    context.scale(2, 2)
    context.lineCap = "round"
    context.strokeStyle = "red"
    context.lineWidth = 5
    contextRef.current = context;
  }, [])

  useEffect(() => {
     //console.log(value, "TO JEST VALUE")
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
    // image.src = value;
    fetch("http://127.0.0.1:8000/dicom_annotator/list_dicoms/")
            .then( data => data.json())
            .then( data => {
                console.log(data)
            })
    // tworzenie pliku png, np: http://127.0.0.1:8000/dicom_annotator/get_image/image-00000_CT.png
    image.src = `http://127.0.0.1:8000/media/converted_to_png/image-00000_CT.png`
    image.setAttribute('crossorigin', 'anonymous');
    image.onload = function(){
      contextRef.current.drawImage(image, 0, 0, 512, 512)
      // console.log(value);
    }
  }
  const clear = () => {
    contextRef.current.clearRect(0, 0, 512, 512);
    showImage()
  }

  /*
  const save = () => {
    let dataURI = canvasRef.current.toDataURL();
    // console.log(dataURI);
    setValue(dataURI);
    // saveApi();
    // postData(value)
    setImage(true)
    clear()
  }*/


  let getCookie = (name) => {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
  }
  

  function updateImage (imageName) {
    let base64String = document.getElementById("canvas").toDataURL("image/png")
                        .replace("image/png", "image/octet-stream");

    fetch('http://localhost:8000/dicom_annotator/save_labeled_image/' + imageName, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': getCookie('csrftoken'),
      },
      body: JSON.stringify(base64String)
    })

    //tutaj tez mozna zrobic update labela i is_labeled dicoma w bazie: method: 'PUT'
    // np.: http://127.0.0.1:8000/dicom_annotator/update_dicom/glowa.dcm -> podajemy nazwe pliku, label i is_labeled=true
  }

  return (
    <div>
      <button type="button" className="btn btn-primary" onClick={showImage} >Start</button>
      <br></br>
      <br></br>
      <canvas
        onMouseDown={startDrawing}
        onMouseUp={finishDrawing}
        onMouseMove={draw}
        ref={canvasRef}
        id="canvas"
      />
      <hr></hr>
        <div className="inputDescriber">
          <label>What part of the body did you label?</label>
          <input className="form-control" id="inputDescriber" placeholder="Arm, leg etc." type="text" value={nameField} onInput= {e => setName(e.target.value)}/>
        </div>
        <div className="buttonDiv">
          <button type="button" className="btn btn-primary" onClick={clear}>Clear</button>
        </div>
        <div className="buttonDiv">
          <button type="sumbit" className="btn btn-primary" onClick={ () => { updateImage('image-00000_CT.png') } }>Next</button>
        </div>
    </div>
  );
}

