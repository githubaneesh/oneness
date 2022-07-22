// @flow
import React, {Component} from "react";
import topImage from '../../../assets/images/home/top_image.png';
import botomImage from '../../../assets/images/home/bottom_image.png';
// Images

// Style sheet
import './style.scss';
import Utils from "../../../utils/utilityScript";

type Props = {}
 
class Home  extends Component<Props> {
	constructor(props: Object) {
		super(props);
		this.navigateTo = Utils.navigateTo.bind(this);
    }
 
	render() {
		return (
			<div className="home-wrapper">
				 <div className="topImg-container">		
				 <img src={topImage}/>	 
				 </div>
				 <div className="nav-button-container">
					<div className="reg-label"><h4>Register Your Presence</h4></div>
					<div className="nav-button-con">
								<div className="row ">	 
									<div className="col-md-4">
										<div className="nav-button btn_violet" onClick={()=>this.navigateTo('/international')}><label> INTERNATIONAL</label></div>
									  </div> 
									<div className="col-md-4">
											<div className="nav-button btn_blue" onClick={()=>this.navigateTo('/national')}><label> NATIONAL</label></div>
									</div> 
									<div className="col-md-4">
											<div className="nav-button btn_green" onClick={()=>this.navigateTo('/state')}><label> STATE </label></div>
									</div> 
								 </div>
 					</div>

				 
				 </div>
				 <div className="bottomImg-container">
				 <h4>Copyright©Kerala State Youth Welfare Board</h4>
				 	<img src={botomImage}/>
				 </div>

			</div>
		)
	}
}

export default Home;