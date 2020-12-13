import React, { useRef, useEffect, useState, useContext } from 'react';
import { ImgContext, DicomContext } from './ImgContext';
import axios from 'axios';


const fetchDicomList = () => {
  let unlabeledImages = [];
  return axios.get('http://127.0.0.1:8000/dicom_annotator/list_dicoms')
  .then(( {data}) => {
    for (let record in data) {
      if(! data[record].is_labeled){
        unlabeledImages.push(data[record]);
      }
    }
    return (unlabeledImages);
  })
  .catch(err => {
    console.error(err);
  });
}

export default function Canvas(props) {

  
  const [isDisabled, setDisabled] = useState(false);
  const { value, setValue } = useContext(ImgContext);
  const { dicom, setDicom } = useContext(DicomContext);
  const canvasRef = useRef(null)
  const contextRef = useRef(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [label, setLabel] = useState('')

  const dicomToPng = async(url) => {
    return await axios.get('http://127.0.0.1:8000/dicom_annotator/get_image' + url)
    .then(( {data}) => {
      // console.log(Object.values(data.[0].[0]));
      setDicom(data.dicom)
      setValue(data.png)
      console.log(data)
    })
    .catch(err => {
      console.error(err);
    });
  }
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
    fetchDicomList().then(data => {
      if(data.length == 1) {
        setValue('stop.png')
        setDisabled(true);
      }
      console.log(data[0].picture)
      dicomToPng(data[0].picture)
    })
  }, [])
  
  useEffect(() => {
      console.log(value)
      showImage()
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
    console.log(value)
    // tworzenie pliku png, np: http://127.0.0.1:8000/dicom_annotator/get_image/image-00000_CT.png
    image.src = `http://127.0.0.1:8000/media/converted_to_png/` + value;
    // image.src
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
  
  const nextBtn = () => {
    console.log(value)
    console.log(dicom)
    updateImage(value)
  }

  const updateImage = async() => {
    let base64String = document.getElementById("canvas").toDataURL("image/png")
                        .replace("image/png", "image/octet-stream");

    fetch('http://localhost:8000/dicom_annotator/save_labeled_image/' + value, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': getCookie('csrftoken'),
      },
      body: JSON.stringify(base64String)
    })

    //tutaj tez mozna zrobic update labela i is_labeled dicoma w bazie: method: 'PUT'
    // np.: http://127.0.0.1:8000/dicom_annotator/update_dicom/glowa.dcm -> podajemy nazwe pliku, label i is_labeled=true
    await axios.put('http://127.0.0.1:8000/dicom_annotator/update_dicom/' + dicom , { label: {label}, is_labeled: 'true' });
    // await axios.put('http://127.0.0.1:8000/dicom_annotator/update_dicom/breast.dcm', { label: 'breast', is_labeled: 'false' });
  }

  return (
    <div>
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
      <form>
      <div className="inputDescriber">
          <label>What part of the body did you label?</label>
          <input className="form-control" id="inputDescriber" placeholder="Arm, leg etc." type="text" value={label} onInput= {e => setLabel(e.target.value)} required/>
        </div>
        <div className="buttonDiv">
          <button type="button" className="btn btn-primary" onClick={clear}>Clear</button>
        </div>
        <div className="buttonDiv">
          <button disabled={isDisabled} type="submit" className="btn btn-primary" onClick={ () => { nextBtn() } }>Next</button>
        </div>
      </form>
    </div>
  );
}

