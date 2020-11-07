import React from 'react';
import "../App.css";

export default function Canvas() {
    return (
        <div>
            <canvas id="canvas"></canvas>
            <br></br>
            <button type="button" class="btn btn-dark">Label</button>
            <button type="button" class="btn btn-dark">Next</button>
        </div>
    )
}
