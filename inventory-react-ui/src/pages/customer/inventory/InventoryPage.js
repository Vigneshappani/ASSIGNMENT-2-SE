import React, {Component} from "react";
import { Route, Switch } from "react-router-dom";

import InventoryList from "../../../components/inventory/InventoryList";
import InventoryForm from "../../../components/inventory/InventoryForm";


class InventoryPage extends Component{
    constructor(props){
        super(props);
    }


    render(){
        return (
            <div className="w-100">
            <Switch>
                <Route exact path={`${this.props.match.path}/list`} component={InventoryList}/>
                <Route exact path={`${this.props.match.path}/create`} component={InventoryForm}/>
                <Route exact path={`${this.props.match.path}/view/:id`} component={InventoryForm}/>
                <Route exact path={`${this.props.match.path}/edit/:id`} component={InventoryForm}/>
            </Switch>
            
        </div>
        ) 
    }
}

export default InventoryPage;