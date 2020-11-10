import React, { Component, useContext } from 'react';
import axios from 'axios';

export default function UseImage() {
    const img = 'http://localhost:4000/uploads/pobrane-(3).png'

    // function onLoad(e) {
    //     // e.preventDefault()
    //     // axios.get('http://localhost:4000/api/', {
    //     // }).then(res => {
    //     //     const data = res.data;
    //     //     console.log(data.users[0].profileImg);
    //     //     src = data.users[0].profileImg;
    //     //     this.imgList.push(src)
    //     // })
    //     // console.log(src);
    //     // showImg(src);
    //     if(this.state.index+1 === this.state.imgList.length){
    //         this.setState({
    //             index:0
    //         }) 
    //     } else {
    //             this.setState({
    //                 index: this.state.index + 1
    //             })
    //     }
    // }

    return (
        <div className="container">
        <div className="row">
            <form>
                <div className="form-group">
                    {/* <input type="file" onChange={this.onFileChange} /> */}
                </div>
                <div className="form-group">'
                    <img src='http://localhost:4000/uploads/pobrane-(3).png' alt=""></img>
                    <button className="btn btn-primary" type="submit">Upload</button>
                    {/* <button className="btn btn-primary" type="submit" onClick={onLoad}>Load</button> */}
                </div>
                <div>
                </div>
            </form>
        </div>
    </div>
    )
}
