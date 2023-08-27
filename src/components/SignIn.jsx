import { NavLink } from "react-router-dom";
import { UseSignContext } from "../context/SignContext"
import "../App.css"
import { useNavigate } from 'react-router-dom';
import "../styles/signIn.css"
import {MdStart} from "react-icons/md"

export default function SignIn() {
    const navigate = useNavigate();
    const { getValue, SignIn } = UseSignContext();
    const Sign = () => {
        SignIn()
            .then(() => {
                navigate('/hero')

            })
    }
    return (
        <>
            <div className="container_signin">
                <div className="signIn">
                    <div className="heading_signIn"><h1>Sign In</h1></div>

                    <div className="form_signin">
                        <div className="email">
                            <label htmlFor="">Enter your email</label>
                            <input onChange={(e) => getValue(e)} type="text" name="email" className="email_input" />
                        </div>
                        <div className="password">
                            <label htmlFor="">Enter your password</label>
                            <input onChange={(e) => getValue(e)} type="text" name="password" className="password_input" />
                        </div>
                    </div>
                    <div className="signInDiv">

                        <button className="signin_btn" onClick={Sign}>SignIn</button>
                        <p className="signUp_link">Don&apos;t have an account? <NavLink to="/"><span className="span_signin">Get Started<MdStart></MdStart></span></NavLink></p>
                    </div>
                </div>
            </div>
        </>
    )
}