import React, {Component} from "react";
import AnchorTag from "../../components/Anchortag";
import Table from "../../components/table/Table";

class UserInfo extends Component{
    constructor(props){
        super(props);
        this.state = {userName: localStorage.getItem('username')}
    }


    componentDidMount(){
        this.setState({['username']: localStorage.getItem('username')})
    }

    render(){
        return (
            <div className="admin-content mx-auto">
                <h4>User Info</h4>

                <span>User Name : </span> {this.state.userName}
            </div>
        ) 
    }
}

export default UserInfo;