import React, { Component } from 'react';
import axios from 'axios';

export class Images extends Component {
    state = {
        index:0,
        imgList: this.props.uri,
    }
    componentDidMount = () => {
        axios.get('http://localhost:4000/api/', {
        }).then(res => {
            const data = res.data;
            console.log(data.users[0].profileImg);
        })
    }
    render() {
        console.log(this.props.uri)
        this.props.uri = 'haaaa';
        return (
            <div className="container">
                <div className="row">
                        <div className="form-group">'
                            <button className="btn btn-primary" type="submit">Upload</button>
                            <button className="btn btn-primary" type="submit">Load</button>
                        </div>
                        <div>
                        </div>
                </div>
            </div>
        )
    }
}
    // constructor(props) {
    //     super(props);
    //     const img = 'http://localhost:4000/uploads/pobrane-(3).png'
    //     this.onFileChange = this.onFileChange.bind(this);
    //     this.onSubmit = this.onSubmit.bind(this);
    //     this.onLoad = this.onLoad.bind(this);
    //     this.state = {
    //         profileImg: '',
    //         index:0,
    //         imgList:[img], 
    //         homeLink: "image"
    //     }
    // }
    // onFileChange(e) {
    //     this.setState({ profileImg: e.target.files[0] })
    // }

    // onSubmit(e) {
    //     e.preventDefault()
    //     const formData = new FormData()
    //     formData.append('profileImg', this.state.profileImg)
    //     axios.post("http://localhost:4000/api/user-profile", formData, {
    //     }).then(res => {
    //         console.log(res)
    //     })
    // }
    // onLoad(e) {
    //     e.preventDefault()
    //     axios.get('http://localhost:4000/api/', {
    //     }).then(res => {
    //         const data = res.data;
    //         console.log(data.users[0].profileImg);
    //         this.imgList.push(data.users[0].profileImg)
    //     })

    //     if(this.state.index + 1 === this.state.imgList.length){
    //         this.setState({
    //             index:0
    //         }) 
    //     } else {
    //             this.setState({
    //                 index: this.state.index + 1
    //             })
    //     }
    // }

    // componentDidMount() {
    //     this.onLoad();
    // }
