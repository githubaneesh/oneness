// @flow
import React, {Component} from "react";
 
// Images

// Style sheet
import './style.scss';

type Props = {}
 
class DropdownMenu  extends Component<Props> {
    items:Array<any>;
	constructor(props: Object) {
        super(props);
        this.state = {value: ''};
        this.items = this.props.items;
		this.handleChange = this.handleChange.bind(this);
    }

	handleChange(e){
		this.setState({value: e.target.value});
		this.props.handleChange(e);
	}
 	render() {
		return (
            <select value={this.state.value} onChange={this.handleChange}>
                       { this.props.items && this.props.items.map(function(item, index){
                           if(item.id){
                            return  <option value={item.label}  key={item.id} >{item.label }</option> ;
                           }
                         return  <option value={item}  key={item} >{item }</option> ;
                        })} 
            </select>
		)
	}
}

export default DropdownMenu;