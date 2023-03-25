import React, {Component} from "react";
import { Route, Switch } from "react-router-dom";
import HeaderNavBar from "../../components/navigation/HeaderNavbar";
import AnchorTag from "../../components/Anchortag";
import DashboardPage from "../../pages/customer/Dashboard";
import InventoryPage from "./inventory/InventoryPage";


class CustomerRootPage extends Component{
    constructor(props){
        super(props);
        this.userRole = "owner";
    }


    render(){
        return (
                <div>
                    <HeaderNavBar></HeaderNavBar>
                    <div className="admin-page mx-auto mt-5">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-2">
                                    <div className="list-group side-navigation">
                                        <AnchorTag link={`${this.props.match.path}/dashboard`} liClassName="" className="list-group-item list-group-item-action" itemValue="Third party API"></AnchorTag>
                                        <AnchorTag link={`${this.props.match.path}/inventory/list`} liClassName="" className="list-group-item list-group-item-action" itemValue="Inventory"></AnchorTag>
                                        {/* <AnchorTag link={`${this.props.match.path}/shop/view`} liClassName="" className="list-group-item list-group-item-action" itemValue="Shop"></AnchorTag>
                                        <AnchorTag link={`${this.props.match.path}/shop/employee/list`} liClassName="" className="list-group-item list-group-item-action" itemValue="Employee"></AnchorTag>
                                        <AnchorTag link={`${this.props.match.path}/shop/product-category/list`} liClassName="" className="list-group-item list-group-item-action" itemValue="Product Category"></AnchorTag>
                                        <AnchorTag link={`${this.props.match.path}/shop/product/list`} className="list-group-item list-group-item-action" itemValue="Product"></AnchorTag>
                                        <AnchorTag link={`${this.props.match.path}/shop/invoice/list`} className="list-group-item list-group-item-action" itemValue="Invoice"></AnchorTag>
                                        <AnchorTag link={`${this.props.match.path}/profile/me`} className="list-group-item list-group-item-action" itemValue="Profile"></AnchorTag>
                                        <AnchorTag link={`${this.props.match.path}/profile/password-reset`} className="list-group-item list-group-item-action" itemValue="Password Reset"></AnchorTag> */}
                                    </div>
                                </div>
                                <div className="col-10">
                                    <Switch>
                                        <Route path={`${this.props.match.path}/dashboard`} component={DashboardPage}/>
                                        <Route path={`${this.props.match.path}/inventory`} component={InventoryPage}/>
                                        {/* <Route path={`${this.props.match.path}/shop`} component={CustomerShopPage}/>
                                        <Route path={`${this.props.match.path}/profile`} component={ProfileBasePage}/> */}
                                    </Switch>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        ) 
    }
}

export default CustomerRootPage;