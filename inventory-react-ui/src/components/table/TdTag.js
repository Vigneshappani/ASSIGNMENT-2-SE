import React, {Component} from "react";
import AnchorTag from "../Anchortag";

class TdTag extends Component{
    path  = "http://3.236.36.80:4000/upload/"
    constructor(props){
        super(props);
        //console.log(this.props)
    }


    render(){

        
        if(this.props.value && (this.props.value.toString().includes(".png") || this.props.value.toString().includes(".jpeg"))){
            return <td scope="col">
                <img alt={this.props.value} style={{height: 50}} src={this.path+this.props.value}/>
            </td>
        }

        if(this.props.isLinked=="false"){
            return <td scope="col">{this.props.value}</td>
        }
        else{
            return (
            <td scope="col">
                <AnchorTag link={`${this.props.linkPrefix}view/${this.props.value}`} className="" itemValue="View"/>
                <AnchorTag link={`${this.props.linkPrefix}edit/${this.props.value}`} className="ml-2" itemValue="Edit"/>
            </td>
            )
        }
    }
}

export default TdTag;