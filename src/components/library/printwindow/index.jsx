// @flow
import React, {Component} from "react";
import ReactDOM from 'react-dom';
import { renderToString } from 'react-dom/server'
import Modal from 'react-responsive-modal';
import Button from '../../library/button';
// Images

// Style sheet
import './style.scss';

type Props = {}
 
class PrintWindow extends  Component<Props> {
    CAT_INTERNATIONAL= 'international';
	CAT_NATIONAL= 'national';
    CAT_STATE= 'state';
    externalWindow ;
    constructor(props) {
      super(props);
      // STEP 1: create a container <div>      
      this.externalWindow = null; }
        
      onClose()
      {

      }

    render() {
       const {show} = this.props;
       const {teams} = this.props;
       const {selectedCategory} = this.props;
       let _owner = this;
      return(
        show && 
        <Modal open={show} onClose={this.props.onClose} center closeOnEsc={false} closeOnOverlayClick={false}>
 
        <div id="printContent" className="panel-body table-wrapper table-responsive"  >
                        <h3>ONENESS INTERNATIONAL MUSIC AND DANCE FEST 2019 </h3>
                         {selectedCategory == _owner.CAT_INTERNATIONAL && <h4> REGISTRATION DETAILS -INTERNATIONAL </h4> }
                         {selectedCategory ==_owner.CAT_NATIONAL && <h4> REGISTRATION DETAILS -NATIONAL </h4> }
                         {selectedCategory ==_owner.CAT_STATE && <h4> REGISTRATION DETAILS -STATE </h4> }

                         <div className="panel-body table-wrapper table-responsive">
                         
                                    {
                                    teams && teams.length> 0 && teams.map(function(team, index){
                                            return  <div key={index}>

                                                            <table className="table table-striped table-bordered table-list">
                                                                   <tbody>
                                                                    <tr> 
                                                                        <td>Team :</td>  <td>{(index+1)}</td>
                                                                    </tr>
                                                                    {selectedCategory ==_owner.CAT_INTERNATIONAL &&  <tr> 
                                                                        <td>Country </td>  <td>   {team.country}</td>
                                                                    </tr>}
                                                                   {selectedCategory ==_owner.CAT_NATIONAL &&  <tr> 
                                                                        <td>State   </td>  <td>   {team.state}</td>
                                                                    </tr>
                                                                    }
                                                                    <tr> 
                                                                        <td>Address </td>  <td> {team.university_address}</td>
                                                                    </tr> 
                                                                    <tr> 
                                                                        <td>Email </td>  <td> {team.email}</td>
                                                                    </tr> 
                                                                    <tr> 
                                                                        <td>Phone </td>  <td>  {team.phone}</td>
                                                                    </tr> 
                                                                    <tr> 
                                                                        <td>Art Form </td>  <td>  {team.art_form}</td>
                                                                    </tr> 
                                                                    <tr> 
                                                                        <td>Instruments </td>  <td>  {team.instruments}</td>
                                                                    </tr> 
                                                                    <tr> 
                                                                        <td>Appearing Date </td>  <td>  {team.appearing_date}</td>
                                                                    </tr> 
                                                                    <tr> 
                                                                        <td>Arrival Date  </td>  <td>  {team.arrival_date}</td>
                                                                    </tr> 
                                                                    <tr> 
                                                                        <td>Departure Date  </td>  <td>  {team.departure_date}</td>
                                                                    </tr> 
                                                                   
                                                                    <tr> 
                                                                         <td>Participants </td>
                                                                         <td> 
                                                                            <table>
                                                                                <thead>
                                                                                    <th> Index</th>  
                                                                                    <th> Photo</th>
                                                                                    <th> Name</th>
                                                                                    <th>Gender </th>
                                                                                    <th> Age</th>
                                                                                </thead>
                                                                                <tbody>
                                                                                {
                                                                            team.participants.map(function(participant,key){
                                                                                return (
                                                                                    <tr key={key}>
                                                                                        <td>
                                                                                            {(key+1) }
                                                                                         </td> 
                                                                                         <td >
                                                                                            <div className="photo-container">
                                                                                                            <div className="photo-con" >
                                                                                                                <div className="photo-innercon">
                                                                                                                    <img src={participant.photo} />                         
                                                                                                                </div>
                                                                                                            </div>                                                                                                        
                                                                                            </div>
                                                                                         </td>
                                                                                         <td>
                                                                                            {participant.name}
                                                                                         </td>
                                                                                         <td>
                                                                                           {participant.gender}
                                                                                          </td>
                                                                                          <td>
                                                                                           {participant.age}
                                                                                          </td>
                                                                                    </tr>
                                                                                )

                                                                            })

                                                                         } 
                                                                          </tbody>


                                                                           </table>
                                                                         
                                                                         </td>
                                                                    </tr> 
                                                                    <tr> 
                                                                         <td>Accompanies </td>
                                                                         <td> 
                                                                            <table>
                                                                                <thead>
                                                                                    <th> Index</th>  
                                                                                    <th> Photo</th>
                                                                                    <th> Name</th>
                                                                                    <th> Gender </th>
                                                                                    <th> Age</th>
                                                                                </thead>
                                                                                <tbody>
                                                                                {
                                                                            team.accompanies.map(function(accompani,key){
                                                                                return (
                                                                                    <tr key={key}>
                                                                                        <td>
                                                                                            {(key+1) }
                                                                                         </td> 
                                                                                         <td >
                                                                                            <div className="photo-container">
                                                                                                            <div className="photo-con" >
                                                                                                                <div className="photo-innercon">
                                                                                                                    <img src={accompani.photo} />                         
                                                                                                                </div>
                                                                                                            </div>                                                                                                        
                                                                                            </div>
                                                                                         </td>
                                                                                         <td>
                                                                                            {accompani.name}
                                                                                         </td>
                                                                                         <td>
                                                                                           {accompani.gender}
                                                                                          </td>
                                                                                          <td>
                                                                                           {accompani.age}
                                                                                          </td>
                                                                                    </tr>
                                                                                )

                                                                            })

                                                                         } 
                                                                          </tbody>


                                                                           </table>
                                                                         
                                                                         </td>
                                                                    </tr> 
                                                                   </tbody>
                                                            </table> 

                                                   </div>;
                                        })

                                    }																				
                            
                        </div>
        </div>
        
        <Button name=""  value="PRINT" bgColor={'#c841ac'} onClick={()=>{this.print()}} />
									
        </Modal >
    )
    }
   componentDidUpdate()
    {
    } 

    
    componentDidMount() {
     // STEP 3: open a new browser window and store a reference to it
    
    }
  
    componentWillUnmount() {
      // STEP 5: This will fire when this.state.showWindowPortal in the parent component becomes false
      // So we tidy up by closing the window
      if( this.externalWindow)
      {
        this.externalWindow.close();
      }
      
    }
    print()
    {
         if( document.getElementById('printContent'))
        {
           let content =  document.getElementById('printContent').innerHTML;
           this.externalWindow = window.open('', 'Print', 'height=600,width=800');
           this. externalWindow.document.write('<html><head><title>Print</title>');
           this.externalWindow.document.write( '<link   href="style.css" type="text/css" media="print"/>' );
           this.externalWindow.document.write( `<style>table{border-spacing: 0px;width:100%}td,th{border: 1px solid #000;text-align: left;padding: 5px;}.center-align{text-align: center;}
           .photo-container {position: relative;}
           .photo-con
           {
               min-width: 50px;
               max-width: 50px;
               min-height: 50px;
               max-height: 50px;
               border: 0px solid #000000;
               background-color: #e5e5e5;
               border-radius: 50px;
               margin: 5px;
               overflow: hidden;
           }
           img{ width: 100px;}          
           </style>` );
           this.externalWindow.document.write('</head><body >');
           this.externalWindow.document.write(content);
           this.externalWindow.document.write('</body></html>');
           this.externalWindow.document.close();
           this.externalWindow.focus()
            this.externalWindow.print();
           this.externalWindow.close();
        } 
    }
  }
  export default PrintWindow ;