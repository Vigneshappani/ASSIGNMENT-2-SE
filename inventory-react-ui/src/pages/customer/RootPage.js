import React, {Component} from "react";
import { Route, Switch } from "react-router-dom";
import HeaderNavBar from "../../components/navigation/HeaderNavbar";
import AnchorTag from "../../components/Anchortag";
import DashboardPage from "../../pages/customer/Dashboard";
import InventoryPage from "./inventory/InventoryPage";
import AuthPage from "../auth/AuthPage";
import UserInfo from "../../components/user/UserInfo";


class CustomerRootPage extends Component{
    constructor(props){
        super(props);
        this.userRole = "owner";

        this.state = {authPage: true, logged: false}
        this.setAuth  = this.setAuth.bind(this);
        this.setLogged  = this.setLogged.bind(this);
    }

    setAuth(state= false){
        this.setState({
            ['authPage'] : state
        })
    }

    setLogged(state= false){
        this.setAuth(!state);
        this.setState({
            ['logged'] : state
        })
    }

    componentDidMount(){
        let token = localStorage.getItem("token");
        if(token){
            this.setLogged(true);
        }
    }


    render(){
        return (
                <div>
                    <HeaderNavBar setLogged={this.setLogged} logged={this.state.logged} setAuth={this.setAuth}></HeaderNavBar>
                    <div className="admin-page mx-auto mt-5">
                        <div className="container-fluid">
                            {!this.state.authPage && <div className="row">
                                <div className="col-2">
                                    <div className="list-group side-navigation">
                                        <AnchorTag link={`${this.props.match.path}/dashboard`} liClassName="" className="list-group-item list-group-item-action" itemValue="Third party API"></AnchorTag>
                                        <AnchorTag link={`${this.props.match.path}/inventory/list`} liClassName="" className="list-group-item list-group-item-action" itemValue="Inventory"></AnchorTag>                                       
                                        <AnchorTag link={`${this.props.match.path}/user`} liClassName="" className="list-group-item list-group-item-action" itemValue="User Info"></AnchorTag>                                       
                                    </div>
                                </div>
                                <div className="col-10">
                                    <Switch>
                                        <Route path={`${this.props.match.path}/dashboard`} component={DashboardPage}/>
                                        <Route path={`${this.props.match.path}/inventory`} component={InventoryPage}/>                                  
                                        <Route path={`${this.props.match.path}/user`} component={UserInfo}/>                                  
                                    </Switch>                                    
                                </div>
                            </div>}
                            {this.state.authPage && <AuthPage setLogged={this.setLogged}/>}
                        </div>
                    </div>
                </div>
        ) 
    }
}

export default CustomerRootPage;