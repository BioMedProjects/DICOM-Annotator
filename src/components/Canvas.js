import React, { useRef, useEffect, useState, useContext } from 'react';
import { ImgContext } from './ImgContext';

export default function Canvas() {   
    
    const msg = useContext(ImgContext);

    const canvasRef = useRef(null)
    const contextRef = useRef(null)
    const [isDrawing, setIsDrawing] = useState(false)

    useEffect(() => {
        const canvas = canvasRef.current;
        canvas.width = 256 *2;//window.innerWidth * 2;
        canvas.height = 256 *2;//window.innerHeight * 2;
        canvas.style.width = '256px' //`${window.innerWidth}px`;
        canvas.style.height = '256px'// `${window.innerHeight}px`;
    
        const context = canvas.getContext("2d")
        context.scale(2,2)
        context.lineCap = "round"
        context.strokeStyle = "black"
        context.lineWidth = 5
        contextRef.current = context;
      }, [])
    
      const startDrawing = ({nativeEvent}) => {
        const {offsetX, offsetY} = nativeEvent;
        contextRef.current.beginPath()
        contextRef.current.moveTo(offsetX, offsetY)
        setIsDrawing(true)
      }
    
      const finishDrawing = () => {
       contextRef.current.closePath()
       setIsDrawing(false)
      }
    
      const draw = ({nativeEvent}) => {
        if(!isDrawing){
          return
        }
        const {offsetX, offsetY} = nativeEvent;
        contextRef.current.lineTo(offsetX, offsetY)
        contextRef.current.stroke()
      }
    function clear() {
        contextRef.current.clearRect(0, 0, 256, 256);
    }

    return (
    <div>
        <canvas
        onMouseDown={startDrawing}
        onMouseUp={finishDrawing}
        onMouseMove={draw}
        ref={canvasRef}
      />
      <hr></hr>
        <button type="button" class="btn btn-primary" onClick={clear}>Clear</button>
        {/* <button type="button" class="btn btn-primary" onClick={label}>Label</button> */}
        <div>{msg}</div> 
    </div>
    );
}

