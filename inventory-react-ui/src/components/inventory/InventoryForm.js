import React, {Component} from "react";
import AnchorTag from "../../components/Anchortag";

import 'react-dropzone-uploader/dist/styles.css'
import Dropzone from 'react-dropzone-uploader'

class InventoryForm extends Component{
    path  = "http://3.92.81.163:4000/upload/"
    constructor(props){
        super(props);       
        this.state = {_id: '', name: '', quantity: 0, image: '', action: 'add', 
            file: null,
            
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeStatus = this.handleChangeStatus.bind(this);
    }

    handleChange( event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });        
    }

    getOne(id){
        fetch('http://3.92.81.163:4000/item/'+id, {
            method: 'GET', 
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'Authorization': localStorage.getItem('token')
            },
        })
            .then((res) => res.json())
            .then((response) => {
                if(response){
                    this.setState({
                        ['name']: response.name,
                        ['quantity']: response.quantity,
                        ['image']: response.image,
                        ['_id']: response._id,
                    })
                }
            })
            .catch((err) => {
                //console.log(err.message);
            });
    }
    
    async handleSubmit(event) {
        event.preventDefault();

        let method = "POST";
        let url = "http://3.92.81.163:4000/item"
        if(this.state._id){
            method = "PUT";
            url = url + "/"+ this.state._id;
        }

        let body = {
            name: this.state.name,
            image: this.state.image,
            quantity: this.state.quantity
        }

        if(method === 'POST' && this.state.file){
            const formData = new FormData();
            formData.append('file', this.state.file);
            let res = await fetch("http://3.92.81.163:4000/item/upload", {
                method: 'POST',
                body: formData,
                headers: {
                    'Authorization': localStorage.getItem('token')
                },
            });

            let data = await res.json()
            if(data){
                body.image = data.path;
            }       
        }

        fetch(url, {
            method: method,
            body: JSON.stringify(body),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'Authorization': localStorage.getItem('token')
            },
        })
            .then((res) => res.json())
            .then((response) => {
                this.props.history.push("list")
                //console.log(response);
            })
            .catch((err) => {
                this.props.history.push("list")
                //console.log(err.message);
            });
    }
    

    componentDidMount(){
        const path = this.props.location.pathname;
        if(path && path.includes("edit")){
            const id = this.props.match.params.id
            this.setState({
                'action': 'edit'
            })
            this.getOne(id);
        }else if(path && path.includes("view")){
            const id = this.props.match.params.id;
            this.setState({
                'action': 'view'
            })
            this.getOne(id);
        }
    }


    handleChangeStatus = ({ meta, file }, status) => { 
        if(status==='done'){
            this.setState({
                ['file']: file
            })
        }
    }
   
  


    render(){        
        return (
            <div className="admin-content mx-auto">
                <div className="w-100 mb-5">
                    <AnchorTag link="/app/inventory/list" className="btn btn-primary float-right" itemValue="Back to Inventory List"></AnchorTag>
                    <h4>Create Inventory</h4>
                </div>
                <div className="w-75">
                    <form onSubmit={this.handleSubmit}>
                        <div className="container-fluid">
                            <div className="row">
                                {this.state.action ==='add' && <div style={{ width: "500px"}}>                                    
                                    <Dropzone
                                        maxFiles={1}
                                        multiple={true}
                                        onChangeStatus={this.handleChangeStatus}
                                        accept="image/*"
                                    />
                                </div>}

                                {this.state.action !=='add' && <img style={{height: 300}} src={this.path+this.state.image}/>}                                
                                <div className="col-12">
                                    <label>
                                        Name:
                                        <input disabled={this.state.action === 'view'} className="form-control" name="name" type="text" value={this.state.name} onChange={this.handleChange} />
                                    </label>    
                                </div>                             
                                <div className="col-6">
                                    <label>
                                        Quantity:
                                        <input disabled={this.state.action === 'view'}  className="form-control" name="quantity" type="number" value={this.state.quantity} onChange={this.handleChange} />
                                    </label>
                                </div>

                                <div className="col-12 mt-3">
                                    <div className="form-group">
                                        <AnchorTag className="btn btn-warning" itemValue="Back" link="/app/inventory/list"/>
                                        <input disabled={this.state.action === 'view'}  type="submit" className="btn btn-success ml-3" value="Submit"/>
                                    </div>
                                </div>
                            </div>
                        </div>                    
                    </form>
                </div>                
            </div>
        ) 
    }
}

export default InventoryForm;