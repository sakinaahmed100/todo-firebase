import { NavLink } from "react-router-dom";
import { UseSignContext } from "../context/SignContext";
import "../styles/profile.css"
export default function Profile() {
const {state,getVal, Update}=UseSignContext();
const { info}=state
console.log(info,state);
return(
    <>
<div className="profile_body">

<div className="profile_div">
    <h1 className="profile_heading">Profile</h1>
    <div className="form_profile">
        <input className="input_profile" type="text" name="full_name" placeholder="name" value={state.info.full_name} onChange={(e)=>getVal(e)}/>
        {/* <input className="input_profile" type="text" name="password_" placeholder="password" /> */}
        <input className="input_profile" type="text" name="phone" placeholder="phone" value={state.info.phone} onChange={(e)=>getVal(e)}/>
        <input className="input_profile" disabled type="text" name="email" placeholder="email" value={state.info.email} onChange={(e)=>getVal(e)}/>
   <button className="update_profile" onClick={Update}>Update</button>
    
    </div>
    <NavLink to="/hero"><button className="home_profile" >Back to Home</button></NavLink>
    <NavLink  to="/signin"><button className="log_profile" >Log Out</button></NavLink>
</div>
</div>

    </>
)
}