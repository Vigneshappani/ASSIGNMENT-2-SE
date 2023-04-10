import React, {Component} from "react";
import { Link } from "react-router-dom";
import NavLiTag from "../navigation/NavListTag";


class HeaderNavBar extends Component{
    constructor(props){
        super(props);
        this.userRole = "admin";
        if(this.userRole == "admin"){
            this.navbarText = "Inventory Management"
        }
        else{
            this.navbarText = "Inventory Management"
        }
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
    }

    logout(){        
        localStorage.clear();
        this.props.setLogged(false);
        this.props.setAuth(true);
    }

    login(){
        this.props.setAuth(true);        
    }


    render(){
            return (
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <Link className="navbar-brand px-3" to="/">{this.navbarText}</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ml-auto">
                            {!this.props.logged && <span onClick={this.login} style={{color: 'white', paddingTop: 8,  cursor: 'pointer'}}>Login</span>}
                            {this.props.logged && <span onClick={this.logout} style={{color: 'white', paddingTop: 8, marginLeft: 5, cursor: 'pointer'}}>Logout</span>}
                        </ul>
                    </div>
                </nav>
            )
        
    }
}

export default HeaderNavBar;