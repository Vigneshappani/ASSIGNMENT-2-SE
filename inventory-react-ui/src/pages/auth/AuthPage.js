import React, {Component} from "react";
import './main.css'

class AuthPage extends Component{

    constructor(props){
        super(props);
        this.state = {username: '', password: ''}
        this.login = this.login.bind(this);
        this.register = this.register.bind(this);
    }

    login(){
        fetch('http://3.215.180.226:4000/auth/login', {
            method: 'POST',
            body: JSON.stringify({email: this.state.username, password: this.state.password }), 
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'Authorization': localStorage.getItem('token')
            },
        })
            .then((res) => res.json())
            .then((response) => {
                if(response){                
                   localStorage.setItem("token", response.token);
                   localStorage.setItem("username", this.state.username);
                   this.props.setLogged(true);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }

    register(){
        fetch('http://3.215.180.226:4000/auth/reister', {
            method: 'POST',
            body: JSON.stringify({email: this.state.username, password: this.state.password }), 
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'Authorization': localStorage.getItem('token')
            },
        })
            .then((res) => res.json())
            .then((response) => {
                if(response){
                   console.log(response);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }

    render(){
        return (
            <div className="admin-page mx-auto mt-5 con">
                <h2>Login / Register</h2>
                <div className="form">
                    <div className="input-container">
                        <label>Username </label>
                        <input onChange={e => this.setState({['username']: e.target.value})} type="text" name="username" value={this.state.username} required />
                    </div>
                    <div className="input-container">
                        <label>Password </label>
                        <input onChange={e => this.setState({['password']: e.target.value})} type="password" name="password" value={this.state.password} required />
                    </div>
                    <div className="button-container">
                        <button onClick={this.login} >Login</button>
                        <button onClick={this.register} style={{marginLeft: 10}}>Register</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default AuthPage;