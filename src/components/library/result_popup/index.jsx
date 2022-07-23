import React, { Component } from "react";
import { Link } from "react-router-dom";
import Modal from 'react-responsive-modal';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import "./style.scss";
type Props = {
  
};

 
 
class Result extends Component<Props> {
 
  constructor(props: Object) {
    super(props);
    this.state = {
     }
   }
   
  render(){
    const {baseTheme, onClose, open} = this.props;
	  return(
      <Modal open={open} onClose={onClose} center closeOnEsc={false} closeOnOverlayClick={false}>
          <div className="form-container" style={{color:baseTheme}}>
                <FontAwesomeIcon icon={faThumbsUp} size="3x" color={baseTheme} />  
                <h1>Registration Successfully Completed</h1>                             
                <h4>We will get back to you soon</h4>      
          </div>
     </Modal>
    );
  }
}

export default Result;