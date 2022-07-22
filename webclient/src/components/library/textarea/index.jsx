// @flow
import React, {Component} from "react";
 
// Images

// Style sheet
import './style.scss';

type Props = {}
 
class TextArea  extends Component<Props> {
	constructor(props: Object) {
		super(props);
    }

	componentDidMount() {
	}

	componentWillUnmount() {
	}

	componentWillMount(){
	}

	componentDidUpdate(prevProps, prevState) {
	}

 
 
	render() {
		return (
            <textarea rows={this.props.rows} cols={this.props.cols} onChange={this.props.onChange}   > </textarea>

		)
	}
}

export default TextArea;