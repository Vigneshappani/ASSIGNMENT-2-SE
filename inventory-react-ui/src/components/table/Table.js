import React, {Component} from "react";
import TableHead from "./TableHead";
import TdTag from "./TdTag"


class Table extends Component{
    constructor(props){
        super(props);
        this.deleteById = this.deleteById.bind(this);
    }

    deleteById(id){
        this.props.deleteById(id);
    }

    renderAction(data){
        if(this.props.allowAction){
            return <TdTag deleteById={this.deleteById} value={data["_id"]} isLinked="true" linkPrefix={this.props.actionLinkPrefix}></TdTag>
        }
    }


    render(){
        return (
            <table className={this.props.className}>
                <TableHead columnList={this.props.columnList}></TableHead>
                <tbody>
                    {
                        this.props.tableData.map((data, index) => {
                            return (
                            <tr key={index}>
                                {this.renderAction(data)}
                                {
                                    Object.keys(data).map((key, index) => {
                                        if(!key.includes("_")){
                                            return <TdTag key={index} value={data[key]} isLinked="false"></TdTag>
                                        }
                                    })
                                }                                
                            </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        ) 
    }
}

Table.defaultProps = {
    allowAction: true
}

export default Table;