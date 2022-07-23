// @flow
import React, {Component} from "react";
import DatePicker from "react-datepicker";
import {getData} from "country-list";
import topImage from '../../../assets/images/home/top_image.png';
import botomImage from '../../../assets/images/home/bottom_image.png';
import Header from '../../library/header';
import Footer from  "../../library/footer";
import FormHeader from "../../library/form_header";
import DropdownMenu from "../../library/dropdown";
import AddButton from "../../library/addbutton";
import TextArea from "../../library/textarea";
import InputText from "../../library/inputtext";
import Button from "../../library/button";
import AddParticipantForm from "../../forms/addparticipant";
// Images

// Style sheet
import './style.scss';
import "react-datepicker/dist/react-datepicker.css";
import Team from "../../../models/team";
import ParticipantAvatar from "../../library/participant_avatar";
import VideoUploader from "../../library/videouploader";
import Utils from "../../../utils/utilityScript";
import TeamService from "../../../services/teamservice";
import HttpService from "../../../services/httpservice";
import ParticipantService from "../../../services/participantservice";
import AccompaniesService from "../../../services/accompaniesservice";
import Result from "../../library/result_popup";

type Props = {};

let _objForm = null;
class International  extends Component<Props> {
	formSubTitle= "FREE-STYLE DANCE/MUSIC BAND PERFORMANCE CATEGORY";
	countryList
	art_form= ["Select", "Music", "Dance", "Others"];
	// age_group =[{id:1,label:'5-10'},{id:2,label:'11-15'}]


	constructor(props: Object) {
		super(props);
		this.state = { 
			isModalOpen:false,
			formType:'',
			appearing_date: new Date(),
			departure_date: new Date(),
			arrival_date: new Date(),
			showCategory: false,
			refresh:false,
			teamCreated:false
		}
		this.countryList = ["Select", ...getData().map(i=>i.name)];
		_objForm = new Team();
		this.inputTextChangeHandler = this.inputTextChangeHandler.bind(this);
		this.dropDownChangeHandler = this.dropDownChangeHandler.bind(this);
		this.addButtonClick = this.addButtonClick.bind(this);
		this.participantFormClosed = this.participantFormClosed.bind(this);
		this.dateChangeHandler = this.dateChangeHandler.bind(this);
		this.handleFormSubmit = this.handleFormSubmit.bind(this);
		this.onVideoUpload = this.onVideoUpload.bind(this);
		this.deleteClickhandler = this.deleteClickhandler.bind(this);
		this.refresh = this.refresh.bind(this);
		this.successPopupClosed = this.successPopupClosed.bind(this);
		this.navigateTo = Utils.navigateTo.bind(this);
    }

	componentWillUnmount() {
		_objForm = null;
	}

	componentWillMount(){
		_objForm = new Team();
		// _objForm.participants.push({"_id":"5c4c4149d0d5d42bd81fdafb","identity":"5c4c4149d0d5d42bd81fdafa","name":"Ashish","gender":"Male","age":28,"photo":"https://s3.ap-south-1.amazonaws.com/oneness.ksywb/1548501299506-98b92ee1f8080c0c115fae31245d525b1531667220087.png","createdAt":"2019-01-26T11:15:21.400Z","updatedAt":"2019-01-26T11:15:21.400Z","__v":0})
		// _objForm.participants.push({"_id":"5c4c464bd0d5d42bd81fdafd","identity":"5c4c464bd0d5d42bd81fdafc","name":"testt","gender":"Male","age":25,"photo":"https://s3.ap-south-1.amazonaws.com/oneness.ksywb/1548502600254-98b92ee1f8080c0c115fae31245d525b1531667220087.png","createdAt":"2019-01-26T11:36:43.878Z","updatedAt":"2019-01-26T11:36:43.878Z","__v":0})
		// _objForm.participants.push({"_id":"5c4c48e1d0d5d42bd81fdaff","identity":"5c4c48e0d0d5d42bd81fdafe","name":"324234","gender":"Male","age":22,"photo":"https://s3.ap-south-1.amazonaws.com/oneness.ksywb/1548503241650-71468144a610dd79d4a64fdb34720e391533718994079.png","createdAt":"2019-01-26T11:47:45.126Z","updatedAt":"2019-01-26T11:47:45.126Z","__v":0})
	    // _objForm.accompanies.push({"_id":"5c4c49f1d0d5d42bd81fdb03","identity":"5c4c49f1d0d5d42bd81fdb02","name":"Ashish Acc","gender":"Male","age":15,"photo":"https://s3.ap-south-1.amazonaws.com/oneness.ksywb/1548503534201-98b92ee1f8080c0c115fae31245d525b1531667220087.png","createdAt":"2019-01-26T11:52:17.418Z","updatedAt":"2019-01-26T11:52:17.418Z","__v":0})
	}

	componentDidUpdate(prevProps, prevState) {
	}
	refresh(){
		this.setState({refresh:!this.state.refresh})
	}
	successPopupClosed(){
		_objForm = new Team();
		this.setState({teamCreated:false})
	}
	async deleteClickhandler(participant, key)
	{
		_objForm[key] = _objForm[key].filter(item=>item._id != participant._id);
		let deleteParticipant;
		if(key == "participants") {
			deleteParticipant = await ParticipantService.instance.delete(participant._id);
		}else {
			deleteParticipant = await AccompaniesService.instance.delete(participant._id);
		}
		if(deleteParticipant == "success"){
			this.refresh()
		}
	}
	onVideoUpload(path)
	{
		_objForm["video"] = path;
	}
	dropDownChangeHandler(type, event)
	{
		_objForm[type] = event.target.value == "Select"? undefined:event.target.value;
		if(type== "art_form"){
			this.setState({
				showCategory : _objForm[type] == "Others"
			})
		}
		
	}

	inputTextChangeHandler(type, event){
		_objForm[type] = event.target.value;
		console.log(type, event.target.value, _objForm);
	}
	dateChangeHandler(date, type){
		
		const d = date.toLocaleDateString();
		_objForm[type] = d;
		console.log(d);
		this.setState({
			[type]: date
		  })
	}
	
	addButtonClick(type)
	{
		this.setState({isModalOpen:true, formType:type})
	}
	participantFormClosed(data)
	{	
		console.log('participantFormClosed   ',data);
		const popupType = this.state.formType;
		if(data && popupType) {
			_objForm[popupType].push(data);
		}
		this.setState({isModalOpen:false,formType:''})
	}
	getTeamObj(){
		const objSend = Object.assign({}, _objForm);
		const {region} = this.props;
		switch (region) {
			case "international" :
				objSend.country = _objForm.country;
				objSend.category = 'int';
				break;
			case "national" :
				objSend.state = _objForm.state;
				objSend.category = 'na';
				break;
			case "state" :
				objSend.state = _objForm.state;
				objSend.category = 'st';
				break;	
			default:
		}
		objSend.participants = _objForm.participants.map(i=>i._id);
		objSend.accompanies = _objForm.accompanies.map(i=>i._id);
		return objSend;
	}
	isValidEmail(val){
		return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(val);
	}
	isValid(obj){
		let booValid = false;
		const {region} = this.props;
		booValid = obj.email && this.isValidEmail(obj.email) && obj.phone && obj.phone.length > 0 && 
		obj.appearing_date && obj.participants.length>0 && obj.accompanies.length > 0 && obj.university_address && obj.art_form
		switch (region) {
			case "international" :
				return booValid && obj.country && obj.arrival_date && obj.departure_date && obj.video;
			case "national" :
				return booValid && obj.state && obj.arrival_date && obj.departure_date && obj.video;
			default:
				return booValid ;
		}
	}
	async handleFormSubmit()
	{
		const objSend = this.getTeamObj();
		if(this.isValid(objSend)){
			const objSend = this.getTeamObj();
			console.log(objSend);
			const team = await TeamService.instance.create(objSend);
			if(team && team._id){
				console.log("Team Created")
				this.setState({
					teamCreated:true
				})
			}
			return;
		}
		console.log("Data Missing");

	}
	renderCategory(){
		if(_objForm["art_form"] === "Others"){
			return (<div className="field_item">
				<label className="field_label">Category</label>
				<InputText type="text" name="" onChange={(e) => this.inputTextChangeHandler("category", e)} />	
			</div>)
		}
		return null
	}
	renderTransport(){
		const {region} = this.props;
		if(region === "national"){
			return (<div className="field_item">
					<label className="field_label">Preferred Convience</label>
					<InputText type="text" placeholder={"Flight/Train"} name="" onChange={(e) => this.inputTextChangeHandler("transport", e)} />	
				</div>)
		}
		return null
	}
	getParticipantTitle(key){
		return key == "participants"? "Participant": "Accompanist"
	}
	renderAvatar (key){
		const keyName = this.getParticipantTitle(key);
		return _objForm && _objForm[key].length > 0 && _objForm[key].map(item=>{
			return (<ParticipantAvatar refresh={this.state.refresh} key={item._id} item={item} title={keyName} baseTheme={this.props.baseTheme} deleteClick={(p)=>this.deleteClickhandler(p, key)} />)
		})
	}
	renderCountryStateDropDown() {
		const {region} = this.props;
		switch (region) {
			case "international" :
				return (<div className="field_item">
						<label className="field_label">Name of the country<span className="mandatory"><sup>*</sup></span></label>
						<DropdownMenu items={this.countryList}  handleChange={(e) => this.dropDownChangeHandler("country", e)}/>
				</div>)
			case "national" :
				const state_arr = new Array("Select","Andaman & Nicobar", "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chandigarh", "Chhattisgarh", "Dadra & Nagar Haveli", "Daman & Diu", "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jammu & Kashmir", "Jharkhand", "Karnataka", "Kerala", "Lakshadweep", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Orissa", "Pondicherry", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Tripura", "Uttar Pradesh", "Uttaranchal", "West Bengal");

				return (<div className="field_item">
						<label className="field_label">Name of the state<span className="mandatory"><sup>*</sup></span></label>
						<DropdownMenu items={state_arr}  handleChange={(e) => this.dropDownChangeHandler("state", e)}/>
				</div>)
			default:
				return null;
		}
		
	}
	render() {
		 const { isModalOpen, formType, teamCreated } = this.state;
		 const {region, baseTheme} = this.props;
		return (
			<div className="home-wrapper">
				 <Header baseTheme={baseTheme} backToHome={()=>this.navigateTo('/home')}/>
				 <FormHeader title={this.props.formTitle} subtitle={this.formSubTitle} baseTheme={baseTheme} backToHome={()=>this.navigateTo('/home')}/>
				 <div className="row row_margin0"  > 
					 	 <div className="col-md-2"></div>
						  <div className="col-md-8">
						 		 <div className="form_container">
									<h3>PROFORMA DETAILS TO BE FILLED BY OFFICIALS</h3>
									<form>
											{
												this.renderCountryStateDropDown()
											}
											<div className="field_item">
													<div><label className="field_label">Add participating Delegates<span className="mandatory"><sup>*</sup></span></label></div>
													<div className="particiants-col">
														{
															this.renderAvatar("participants")
														}
														<AddButton id="participants" onClick={this.addButtonClick} />

													</div>
											</div>
											<div className="field_item">
													<label className="field_label">Add Accompanists & their details<span className="mandatory"><sup>*</sup></span></label>
													<div className="particiants-col">
														{
															this.renderAvatar("accompanies")
														}
														<AddButton  id="accompanies"  onClick={this.addButtonClick} />

													</div>

											</div>
											{/* <div className="field_item">
													<label className="field_label">Age Group</label>
													<DropdownMenu items={this.age_group}  handleChange={(e) => this.dropDownChangeHandler("age_group", e)}/>

											</div> */}
											<div className="field_item">
													<label className="field_label">Address of University<span className="mandatory"><sup>*</sup></span></label>
													<TextArea rows={10} cols={50} onChange={(e) => this.inputTextChangeHandler("university_address", e)}/>

											</div>
											
											<div className="field_item">
													<label className="field_label">Email<span className="mandatory"><sup>*</sup></span></label>
													<InputText type="email" name="" onChange={(e) => this.inputTextChangeHandler("email", e)} />

											</div>
											<div className="field_item">
													<label className="field_label">Phone<span className="mandatory"><sup>*</sup></span></label>
													<InputText type="number" name="" onChange={(e) => this.inputTextChangeHandler("phone", e)} />

											</div>
											<div className="field_item">
													<label className="field_label">Fax(Optional)</label>
													<InputText type="text" name="" onChange={(e) => this.inputTextChangeHandler("fax", e)} />

											</div>
											<div className="field_item">
													<label className="field_label">Select Art Form<span className="mandatory"><sup>*</sup></span></label>
													<DropdownMenu items={this.art_form}  handleChange={(e) => this.dropDownChangeHandler("art_form", e)}/>
											</div>
											{
												this.state.showCategory && this.renderCategory()
											}
											<div className="field_item">
													<label className="field_label">Name of musical instruments/other equipments to be brought by contingent(Optional)</label>
													<TextArea rows={10} cols={50} onChange={(e) => this.inputTextChangeHandler("instruments", e)}/>

											</div>
											<div className="field_item">
													<div><label className="field_label">Appearing Date<span className="mandatory"><sup>*</sup></span> (MM/DD/YYYY)</label></div>
													<DatePicker
														key='appearing_date'
														minDate={new Date()}
														selected={this.state.appearing_date}
														onChange={(date) => {
																this.dateChangeHandler(date, "appearing_date")
														}}
													/>
											</div>
											{
												this.props.region != "state" && <div className="field_item">
														<VideoUploader onUpload={this.onVideoUpload} baseTheme={this.props.baseTheme} />
												</div>
											}
											
											{
												this.props.region != "state" && <div className="field_item">
														<div><label className="field_label">Provisional Travel Programme</label></div>
														<div className="row travel">
															<div className="col-md-6">
																<div><label className="field_label">Arrival Date (MM/DD/YYYY)</label></div>
																<DatePicker
																key='arrival_date'
																	minDate={new Date()}
																	selected={this.state.arrival_date}
																	onChange={(date, e) => {
																		this.dateChangeHandler(date, "arrival_date")}}
																/>
															</div>
															<div className="col-md-6">
																<div><label className="field_label">Departure Date (MM/DD/YYYY)</label></div>
																<DatePicker
																	minDate={new Date()}
																	selected={this.state.departure_date}
																	onChange={(e) => {this.dateChangeHandler(e, "departure_date")}}
																/>
															</div>
														</div>
												</div>
											}
											{
												this.renderTransport()
											}
											<div className="field_item pull-right">
												
													<Button name=""  value="SUBMIT" bgColor={baseTheme} onClick={this.handleFormSubmit} />
											</div>
									 </form>



								</div>

						  </div>
						  <div className="col-md-2"></div>
				 
				 </div>
				 {
					 isModalOpen && <AddParticipantForm open={isModalOpen} baseTheme={baseTheme} region={region} formType={formType} formTitle={this.getParticipantTitle(formType)} onClose={this.participantFormClosed} />
				 }
				 {
					 teamCreated && <Result open={teamCreated} baseTheme={this.props.baseTheme} onClose={this.successPopupClosed}/>
				 }
				 <Footer/>

			</div>
		)
	}
}

export default International;