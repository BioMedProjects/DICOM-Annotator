import React, { Component, useContext } from 'react';
import axios from 'axios';
import { ImgContext } from './ImgContext';

// const msg = useContext(ImgContext);

export default class FilesUploadComponent extends Component {
    
    constructor(props) {
        super(props);
        const img = 'http://localhost:4000/uploads/pobrane-(3).png'
        this.onFileChange = this.onFileChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onLoad = this.onLoad.bind(this);
        this.state = {
            profileImg: '',
            index:0,
            imgList:[img],
            homeLink: "image"
        }
    }
    onFileChange(e) {
        this.setState({ profileImg: e.target.files[0] })
    }

    onSubmit(e) {
        e.preventDefault()
        const formData = new FormData()
        formData.append('profileImg', this.state.profileImg)
        axios.post("http://localhost:4000/api/user-profile", formData, {
        }).then(res => {
            console.log(res)
        })
    }
    onLoad(e) {
        // e.preventDefault()
        // axios.get('http://localhost:4000/api/', {
        // }).then(res => {
        //     const data = res.data;
        //     console.log(data.users[0].profileImg);
        //     src = data.users[0].profileImg;
        //     this.imgList.push(src)
        // })
        // console.log(src);
        // showImg(src);
        if(this.state.index+1 === this.state.imgList.length){
            this.setState({
                index:0
            }) 
        } else {
                this.setState({
                    index: this.state.index + 1
                })
        }
    }

    x() {
        console.log('aaaa');
    }
    render() {
        return (
            <div className="container">
                <div className="row">
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <input type="file" onChange={this.onFileChange} />
                        </div>
                        <div className="form-group">'
                            <img src={this.state.imgList[this.state.index]} alt=""></img>
                            <button className="btn btn-primary" type="submit">Upload</button>
                            <button className="btn btn-primary" type="submit" onClick={this.onLoad}>Load</button>
                        </div>
                        <div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}