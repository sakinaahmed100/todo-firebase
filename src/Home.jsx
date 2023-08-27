import { NavLink } from "react-router-dom"
import "./styles//SignUp.css"
import { UseSignContext } from "./context/SignContext"
import 'animate.css';

export default function Home() {
    const { getValue, SignUp } = UseSignContext()
    return (<>
        <div className="main_home">
            <div className="container animate__animated animate__heartBeat">
                <div className="heading_home">Task Tracker</div>
                <div className="form">
                    <form action="">
                        <div className="signupHeading">
                            <p>Sign Up</p>
                        </div>
                        <div className="inputsDiv">
                            <div className="name_phone">
                                <div className="input_div">
                                    <input className="input" onChange={(e) => getValue(e)} type="text" placeholder="full_name" name="full_name" />
                                    <label className="label" htmlFor="">Enter your Full Name</label>
                                </div>
                                <div className="input_div">
                                    <input className="input" onChange={(e) => getValue(e)} type="text" placeholder="phone" name="phone" />
                                    <label className="label" htmlFor="">Enter your Full Name</label>

                                </div>
                            </div>
                            <div className="input_div"><input className="input" onChange={(e) => getValue(e)} type="text" placeholder="email" name="email" />
                                <label className="label" htmlFor="">Enter your Full Name</label>
                            </div>
                            <div className="input_div"><input className="input" onChange={(e) => getValue(e)} type="text" placeholder="password" name="password" />
                                <label className="label" htmlFor="">Enter your Full Name</label>
                            </div>
                        </div>

                    </form>
                    <div className="btn_home">
                        <button className="signUp" onClick={SignUp}> Sign Up</button>
                        <p className="signin">Alredy have an account?</p>
                        <p> <NavLink to="signin"><span>Sign in!</span></NavLink></p>
                    </div>
                </div>
            </div>
        </div>
    </>)
}