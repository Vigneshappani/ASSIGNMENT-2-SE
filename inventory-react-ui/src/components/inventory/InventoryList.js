import React, {Component} from "react";
import AnchorTag from "../../components/Anchortag";
import Table from "../../components/table/Table";

class InventoryList extends Component{
    constructor(props){
        super(props);
        this.state = {tableData: [], columnList: ["Action", "Image", "Name", "Quantity", ]}
        this.deleteById = this.deleteById.bind(this);
    }

    componentDidMount(){
        this.getData();
    }


    deleteById(id){
        fetch('http://localhost:4000/item/'+id, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'Authorization': localStorage.getItem('token')
            },
        })
            .then((res) => res.json())
            .then((response) => {this.getData()})
            .catch((err) => {
                //console.log(err.message);
            });
    }

    getData(){
        fetch('http://localhost:4000/item', {
            method: 'GET',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'Authorization': localStorage.getItem('token')
            },
        })
            .then((res) => res.json())
            .then((response) => {
                let data = response.map(d => {
                    return {                 
                        image: d.image,       
                        name: d.name,
                        quantity: d.quantity,                        
                        _id: d._id,
                    }
                })
                //console.log(data);
                this.setState({['tableData']: data})
            })
            .catch((err) => {
                //console.log(err.message);
            });
    }

    render(){
        return (
            <div className="admin-content mx-auto">
                <div className="w-100 mb-5">
                    <AnchorTag link="/app/inventory/create" className="btn btn-sm btn-warning float-right" itemValue="Create Inventory"></AnchorTag>
                    <h4>Inventory List</h4>
                </div>     
                <Table deleteById={this.deleteById} className="table table-striped" columnList={this.state.columnList} tableData={this.state.tableData} actionLinkPrefix=""></Table>
            </div>
        ) 
    }
}

export default InventoryList;