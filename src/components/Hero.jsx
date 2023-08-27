import { UseMyContext } from "../context/context"
import "../styles/Hero.css"
import { IoIosAddCircle } from "react-icons/io"
import { AiFillDelete } from "react-icons/ai"
import { FiDelete, FiMenu } from "react-icons/fi"
import { BiSolidEditAlt } from "react-icons/bi"
import { MdOutlineSystemUpdateAlt } from "react-icons/md"
import "../App.css"
import { UseSignContext } from "../context/SignContext"
import { NavLink } from "react-router-dom"
import { CgProfile } from "react-icons/cg"
import { useState } from "react"
import {RxCross2} from "react-icons/rx"

export default function Hero() {
    const { Update, DeleteAll, Edit, Delete, Send, getVal, mainState } = UseMyContext()
    const { dataMap, username, roll, edit, noInput } = mainState
    // let {menu}=mainState
    const { LogOut, state } = UseSignContext();
    mainState.uid = state.uid
    console.log(state.info, state.uid);
    const [menu, setMenu] = useState(false);

    const SET_MENU = () => {
      setMenu(!menu);
    };
    // const SET_MENU = () => {
    //     console.log(menu);
    //     menu = !menu
    // }
    return (
        <>
            <div className="hero">

                <div className="container_hero">
                    <div className="heading">
                        <h1>
                            Task Tracker
                        </h1>
                        <div className="navBtn">
                            <button className="logOut" onClick={LogOut}>Log Out</button>
                            <NavLink to="/profile"><button className="profile"><CgProfile></CgProfile></button></NavLink>
                        </div>

                        <div className="hamBurger"> {menu ? (<button><FiMenu onClick={SET_MENU}></FiMenu></button>) :
                         (<div className="list_cross"><RxCross2 className="cross" onClick={SET_MENU}></RxCross2>
                         <ul className="navList">
                            <li> <button className="logOut" onClick={LogOut}>Log Out</button></li>
                            <li><NavLink to="/profile"><button className="profile"><CgProfile></CgProfile></button></NavLink></li>
                         </ul>
                        </div>)}</div>

                    </div>


                    <div className="main">
                        <section>
                            <div className="user_display">
                                {/* <p>Capture your thoughts <span className="userName">{state.info.full_name.split(" ")[0]}</span> – add a note!</p> */}
                            </div>

                            <div className="inputBtn">
                                <div>
                                    <input className="username" onChange={(e) => getVal(e)} value={username} name='username' type="text" placeholder='Title..' />
                                    <input className="roll" onChange={(e) => getVal(e)} value={roll} name='roll' type="text" placeholder='Remember to..When is it due?' />
                                </div>
                                <div className="buttons">
                                    {!edit ?
                                        (<button className="add" onClick={Send}> <IoIosAddCircle></IoIosAddCircle></button>) :
                                        (<button className="update" onClick={() => Update()}><MdOutlineSystemUpdateAlt></MdOutlineSystemUpdateAlt></button>)
                                    }
                                </div>
                            </div>

                            {noInput ? (<p className="empty">Take Notes</p>) : null}
                            {dataMap.length !== 0 ? <button className="dltAll" onClick={DeleteAll}><AiFillDelete></AiFillDelete>Clear Notes</button> : null}


                        </section>
                        <div className={dataMap.length === 0 ? "noData" : "list"}>
                            {dataMap.length === 0 ?
                                (<div>  <p>No tasks to display.</p>
                                    <p>Add new tasks to get started!</p></div>) :
                                (dataMap.map((e) => {
                                    return (

                                        <div className="card" key={e.key}>
                                            <div className="text">
                                                <p className="title">{e.innerKey}</p>
                                                <p className="detail">{e.innerValue}</p>
                                            </div>
                                            <div className="btns">
                                                <button className="delete" onClick={() => Delete(e)}><FiDelete></FiDelete></button>
                                                {!e.edit ?
                                                    (<button className="edit" onClick={() => Edit(e)}><BiSolidEditAlt></BiSolidEditAlt></button>)
                                                    : (<span>updating</span>)}
                                            </div>
                                        </div>
                                    )
                                }))
                            }

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}