// @flow
import React, {Component} from "react";

import Header from "../../library/header";
import Footer from "../../library/footer"; 
import AddParticipant from "../../forms/addparticipant";
import TeamService from "../../../services/teamservice";
 
// Images

// Style sheet
import './style.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PrintWindow from "../../library/printwindow";
import LocalStorageService from "../../../services/localstorageservice";
import AuthenticationService from "../../../services/authenticatoinservice";
import Utils from "../../../utils/utilityScript";
type Props = {}

type State = {  
 
}
let objTeams = null;
class Dashboard extends Component<Props,State> {

	teams:Array=[];
	CAT_INTERNATIONAL= 'international';
	CAT_NATIONAL= 'national';
	CAT_STATE= 'state';
	totalTeams:Number=0;
	totalTeamsinSelectedCat:Number= 0;
	

	constructor(props: Object) {
		super(props);
		this.state = {selectedCategory:'',showPrint:false};
		objTeams ={international:[],national:[],state:[]}
		this.openTab = this.openTab.bind(this);
		this.getCategory = this.getCategory.bind(this);	 
		this.printBtnClickhandler = this.printBtnClickhandler.bind(this);
		this.logoutHandler = this.logoutHandler.bind(this);
		this.navigateTo = Utils.navigateTo.bind(this);
	}

	async componentDidMount() {
		 if(AuthenticationService.instance.TOKEN =='')
		 {
			this.logoutHandler();
			return ;
		 }

	  	 const teams =  await TeamService.instance.getTeam(AuthenticationService.instance.TOKEN);
	     this.totalTeams = teams.length;
		 this.populateTeams(teams);
		 this.teams = objTeams[this.CAT_INTERNATIONAL];
		 this.totalTeamsinSelectedCat = this.teams.length;
 		 this.setState({selectedCategory: this.CAT_INTERNATIONAL});
	}
	componentWillUnmount() {
	}

	componentWillMount(){
	}

	componentDidUpdate(prevProps, prevState) {

	}
	populateTeams(teams)
	{
		teams.forEach((team)=>{
			 if(team.category=='int' || team.hasOwnProperty('country'))
			 {
				objTeams[this.CAT_INTERNATIONAL].push(team);
			 }
			 else if(team.category=='na' || team.hasOwnProperty('state'))
			 {
				objTeams[this.CAT_NATIONAL].push(team);
			 }
			 else if(team.category == 'st')
			 {
				objTeams[this.CAT_STATE].push(team);
			 }
 		});
	}
	navigateTo(url){
		const { history } = this.props;
        history.push(url);
	}
	getCategory(type)
	{
		let cat:String;
		switch(type)
		{
			case 'int':
				cat=this.CAT_INTERNATIONAL;
			break;
			case 'na':
				cat=this.CAT_NATIONAL;
			break;
			case 'st':
				cat=this.CAT_STATE;
			break;
		 }
		 return cat;
	}
	openTab(evt,type)
	{
	    let i, tabcontent, tablinks;
		tablinks = document.getElementsByClassName("tablinks");		 
		for (i = 0; i < tablinks.length; i++) {
		  tablinks[i].className = tablinks[i].className.replace(" active", "");
	 	}		 
		evt.target.className += " active"; 		 
		this.teams = objTeams[type];
		this.totalTeamsinSelectedCat = this.teams.length;
	  	this.setState({selectedCategory: type});
		console.log('teams :L',  this.teams );
	 }
     printBtnClickhandler()
	 {
	  this.setState({showPrint:true})
	 }
	 PrintWindowClosed()
	 {
		this.setState({showPrint:false}) 
	 }
	 logoutHandler()
	 {
		LocalStorageService.instance.setItem('token','');
		this.navigateTo('/login')  ;
	 }
	render() {		
		const _owner = this; 
		const {selectedCategory} = this.state;	 
		const {showPrint} = this.state;
		return (
			<div className="dashboard-wrapper">
				 <Header baseTheme={'#f18eb1'} totalTeam={this.totalTeams}   backToHome={()=>this.navigateTo('/home')}/>
				 <div className="logout-con"><a href="" onClick={()=>{this.logoutHandler()}}>Logout</a></div>
                 <div className="row  dashboard-con">
							<div className="col-md-1"></div>
							<div className="col-md-10">
										<div className="row tab">
											<div className="col-md-4">
												<div className='teamsCount' style={{color: '#f28eb2'}}>{selectedCategory ==_owner.CAT_INTERNATIONAL && ' Total Teams :'+  _owner.totalTeamsinSelectedCat}</div> 												
												<button className="tablinks" style={{backgroundColor: '#f28eb2'}} onClick={(event)=>{this.openTab(event, 'international')}}>International</button>
											</div>
											<div className="col-md-4">
												<div className='teamsCount' style={{color: '#12b5d8'}}>{selectedCategory ==_owner.CAT_NATIONAL && ' Total Teams :'+  _owner.totalTeamsinSelectedCat}</div> 
												<button className="tablinks" style={{backgroundColor: '#12b5d8'}} onClick={(event)=>{this.openTab(event, 'national')}}>National</button>
											</div>
											<div className="col-md-4">
												<div className='teamsCount' style={{color: '#9eca37'}}>{selectedCategory ==_owner.CAT_STATE && ' Total Teams :'+  _owner.totalTeamsinSelectedCat}</div> 
												<button className="tablinks" style={{backgroundColor: '#9eca37'}}   onClick={(event)=>{this.openTab(event, 'state')}}>State</button>
											</div>
										</div>
										<div className="">

															<div className="panel panel-default panel-table" style={{marginTop: '10px'}}>
																	<div className="panel-heading">
																		<div className="row">
																				<div className="col col-xs-6"><h3  className="panel-title"></h3></div>
																				<div className="col col-xs-6 text-right"><div> <a className="print-btn" onClick={()=>{this.printBtnClickhandler()}}  > <FontAwesomeIcon icon="print" size="2x" color="#000000" ></FontAwesomeIcon></a> </div></div>
																		</div>
																	</div>
																	<div className="panel-body table-wrapper table-responsive">
																	  	<table className="table table-striped table-bordered table-list">
																					<thead>
																						<tr>
																							<th>Index</th>	
																							{selectedCategory ==_owner.CAT_INTERNATIONAL && <th>Country</th> }
																							{selectedCategory ==_owner.CAT_NATIONAL && <th>State</th> }
																						 	<th>Address</th>
																							<th>Art form</th>									 
																						 	<th>Email</th>
																							<th>Mobile No</th>
																							<th>Appearing Date</th>
																							<th>Arrival Date</th>
																							<th>Departure Date</th>
																							<th>Participants</th>
																							<th>Accompanies</th>
																							<th>Video</th>																							
																						</tr> 
																					</thead>
																					 <tbody  >
																							 {
																							 this.teams && this.teams.length> 0 && this.teams.map(function(team, index){
																							  	 return  <tr key={index}>
																											<td>{(index+1)}</td>																											
																											{selectedCategory ==_owner.CAT_INTERNATIONAL && 	<td>{team.country}</td> }
																											{selectedCategory ==_owner.CAT_NATIONAL && 	<td>{team.state}</td> }
																											<td>{team.university_address}</td>
																											<td>{team.art_form}</td>
																											<td>{team.email}</td>
																											<td>{team.phone}</td>
																											<td>{team.appearing_date}</td>
																											<td>{team.arrival_date}</td>
																											<td>{team.departure_date}</td>
																											<td>{team.participants.length}</td>
																											<td>{team.accompanies.length}</td>
																											<td>
																											<a href={team.video}  download>																											 
																											 <FontAwesomeIcon icon="download" size="2x" color="#000000" >Download</FontAwesomeIcon>
																											</a>
																											 </td>																						 
																										</tr>;
																						 	 })

																							 }																				
 																				    </tbody>
																		</table>
																	 

																	</div>
															
															</div>
										
										</div>
							
							</div>
							<div className="col-md-1"></div>
 				 </div>
				 <Footer/>
				 <PrintWindow show={showPrint} teams={this.teams}   selectedCategory={selectedCategory} onClose={()=>{this.PrintWindowClosed()}}/>
			</div>
			 
		)
	}
}

export default Dashboard;