import React, { useState, useEffect } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useHistory,
    HashRouter,
} from "react-router-dom";

import "./style.css"
import '../../../Utils/css/style.css';
import '../../../Utils/css/responsive.css';
import "../../../Utils/css/bootstrap.min.css"
import "../../../Utils/css/bootstrap-datepicker.css"
import UserProfile from "../../../images/user-profile.png"
import flag from "../../../images/flag.png"
import add from "../../../images/add.png"
import Delect from "../../../images/delect.png"
import pencil from "../../../images/pencil.png"
import SideMenuComponents from "../../../Components/SideMenu"
import Footer from "../../../Components/Footer"
import { Network } from '../../../Services/Api';
import { useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { logoutUser } from "../../../Redux/Actions/auth";
import Subscribe from './Subscribe';




function TeamSchdule(props) {

    const history = useHistory();
    const dispatch = useDispatch()

    const [userMe, setUser] = useState(null);
    const [user, setUserData] = useState({});
    const [schedule, setSchedule] = useState([])
    const [dropdown, setDropdown] = useState([])
    const [teamDropdown, setTeamDropDown] = useState("")

    const [valueDropDown, setValueDropDown] = useState("")
    const [eventType, setEventType] = useState()


    useEffect(() => {
        // let user = userdata && userdata._id ? true : false;
        // //console.log("userMe===>", user);
        dropdownMenu();
        // setUser(user);
        // //console.log("USerData", userdata);
        const userLocal = JSON.parse(localStorage.getItem("user"));
        //console.log("userData after login--->", userLocal)
        let userD = userLocal && userLocal._id ? true : false;
        setUser(userD);
        setUserData(userLocal);
        flagList()
        deleteScheduleData()

        // teamSchedule();

    }, []);

    const handleLogout = () => {
        //console.log("pruyuuuuuu", props);
        // dispatch(logoutUser(null));
        localStorage.removeItem("user");
        setUserData(null);
        props.history.push("/")
    };






    const dropdownMenu = () => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            let header = {
                'authToken': user.authtoken

            }
            //console.log('user',user)

            Network('api/my-team-list?team_manager_id=' + user._id, 'GET', header)
                .then(async (res) => {
                    console.log("dropdown----", res)
                    if (res.response_code == 4000) {
                        dispatch(logoutUser(null))
                        localStorage.removeItem("user");
                        history.push("/")
                        toast.error(res.response_message)
                    }
                    setDropdown(res.response_data);

                    teamSchedule(res.response_data[0]._id);





                })
        }

    }
    const change = (event) => {
        console.log("event", event.target.value)
        setTeamDropDown(event.target.value)
        teamSchedule(event.target.value);
    }





    const teamSchedule = (id) => {
        console.log("id", id)
        const user = JSON.parse(localStorage.getItem('user'));
        console.log("authToken", user.authtoken)
        if (user) {
            let header = {

                'authToken': user.authtoken

            }

            let url = ""
            if (id != undefined) {

                url = 'api/get-game-event-list?manager_id=' + user._id + '&team_id=' + id + '&page=1&limit=10'
            }
            else {
                url = 'api/get-game-event-list?manager_id=' + user._id + '&team_id=' + teamDropdown + '&page=1&limit=10'
            }
            //console.log('user',user)
            Network('api/get-game-event-list?manager_id=' + user._id + '&team_id=' + id + '&page=1&limit=10', 'GET', header)
                .then(async (res) => {
                    console.log("schedule----", res)
                    if (res.response_code == 4000) {
                        dispatch(logoutUser(null))
                        localStorage.removeItem("user");
                        history.push("/")
                        toast.error(res.response_message)
                    }
                    //console.log("doc data----->",res.response_data.docs)
                    setSchedule(res.response_data.docs)


                })
        }
    }
    const flagList = () => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            let header = {
                'authToken': user.authtoken

            }
            //console.log('user',user)

            Network('api/all-flag-list', 'GET', header)
                .then(async (res) => {
                    console.log("flagList----", res)
                    if (res.response_code == 4000) {
                        dispatch(logoutUser(null))
                        localStorage.removeItem("user");
                        history.push("/")
                        toast.error(res.response_message)
                    }



                })
        }
    }


    const deleteScheduleData = (id) => {
        const user = JSON.parse(localStorage.getItem('user'));
        console.log("id-------------->", id)
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': user.authtoken
            },
            body: JSON.stringify({
                "_id": id
            })
        };
        fetch('https://nodeserver.mydevfactory.com:1447/api/delete-assignment', requestOptions)
            .then(response => response.json())
            .then((res) => {
                console.log("delete Schedule data", res)
                if (res.response_code == 4000) {
                    dispatch(logoutUser(null))
                    localStorage.removeItem("user");
                    history.push("/")
                    toast.error(res.response_message)
                }
                teamSchedule()



            })

    }


    //     const EventSet=(setEvent)=>{
    //         // setEventType(e.target.value)
    //         localStorage.setItem("eventType",setEvent)
    //         console.log("eventtype------>",setEvent)
    //    }




    return (

        <div>
            <div class="dashboard-container">
                <div class="dashboard-main">
                    <SideMenuComponents />
                    <div class="dashboard-main-content">
                        <div class="dashboard-head">
                            <div class="teams-select">
                                <button class="create-new-team" onClick={() => history.push("./CreateTeam")}>Create New Teams</button>

                                <select onChange={change} value={teamDropdown == "" ? dropdown[0]?._id : teamDropdown} >
                                    {dropdown.map((dropdown) => {
                                        return (
                                            <option value={dropdown._id}>{dropdown.team_name}</option>
                                        )
                                    })}
                                </select>
                                <select>
                                    <option>Account</option>
                                    <option>Account 2</option>
                                    <option>Account 3</option>
                                </select>

                            </div>

                            <div class="profile-head">
                                <div class="profile-head-name">{user ? user.fname : null}</div>
                                <div class="profile-head-img">
                                    {
                                        user ?
                                            <img src={user.profile_image} alt="" /> :
                                            <img src={UserProfile} alt="" />
                                    }

                                </div>
                            </div>
                            <div class="login-account">
                                <ul>
                                    <li><a href="#" data-toggle="modal" data-target="#myModallogin" onClick={handleLogout}>Logout</a></li>
                                    {/* <li><a href="#" data-toggle="modal" data-target="#myModalregister" onClick={handleLogout}>Logout</a></li> */}
                                </ul>
                            </div>
                        </div>

                        <div class="prefarance-page">
                            <div class="page-header">
                                <h2 class="page-title">Schedule</h2>
                                <div class="streming-head-right">
                                    <div class="stream-tab">
                                        <ul>
                                            <li><a class="active" href="#">List View</a></li>
                                            <li><a href="#" onClick={()=>{
                                                history.push('./ManagerViewCalender')
                                            }}>Calendar View</a></li>

                                        </ul>
                                    </div>

                                    <button class="start-stream-btn" onClick={()=>{history.push("./ManagerTeamAvailability")}}>Select Availability</button>
                                    <button class="start-stream-btn" onClick={()=>{history.push("./preferance")}}>View Preferences</button>
                                    <button class="start-stream-btn" onClick={() => {
                                        history.push("./Subscribe")
                                    }}>Subscribe/ Export</button>
                                </div>
                            </div>
                           
                            <div class="managerDropdownLink">
                                <h3 style={{color:"white"}}>Manager:</h3>
                                <div class="dropdown">
                                    <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false" style={{backgroundColor:"#2C2C2C",border:"none"}}>
                                        New
                                    </button>
                                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1" style={{backgroundColor:"#484848",listStyle:"none",margin:"14px"}}>
                                        <Link to={{ pathname: "/NewEvent", state: "GAME" }} >
                                            <li><a class="dropdown-item" href="#">New Game</a></li></Link>
                                            <Link to={{ pathname: "/NewEvent", state: "EVENT" }} >
                                        <li><a class="dropdown-item" href="#">New Event</a></li></Link>
                                        
                                    </ul>
                                </div>
                                <div class="dropdown">
                                    <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false" style={{backgroundColor:"#2C2C2C",border:"none"}}>
                                        Edit
                                    </button>
                                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1" style={{backgroundColor:"#484848",listStyle:"none",margin:"14px"}}>
                                        <Link to={{ pathname: "/EditLocation", state: "GAME" }} >
                                            <li><a class="dropdown-item" href="#">New Location</a></li></Link>
                                            <Link to={{ pathname: "/EditOponent" , state: "EVENT" }} >
                                        <li><a class="dropdown-item" href="#">New Oponent</a></li></Link>
                                        
                                    </ul>
                                </div>
                                <div class="dropdown">
                                    <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false" style={{backgroundColor:"#2C2C2C",border:"none"}}>
                                        Import
                                    </button>
                                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1" style={{backgroundColor:"#484848",listStyle:"none",margin:"14px"}}>
                                        
                                            <li><a class="dropdown-item" href="#">Import from Schedule</a></li>
                                       
                                        
                                    </ul>
                                </div>
                                {/* <div class="teams-select">
                                    <ul >
                                        <Link to={{ pathname: "/NewEvent", state: "GAME" }} >
                                            <li ><a href="javascript:void(0)"  >New Game</a></li>
                                        </Link>
                                        <Link to={{ pathname: "/NewEvent", state: "EVENT" }} >
                                            <li   ><a href="javascript:void(0)"  >New Event</a></li>
                                        </Link>

                                        <Link to={{ pathname: "/EditLocation" }} >
                                            <li ><a href="#">Edit</a>

                                            </li>
                                        </Link>

                                        <Link to={{ pathname: "/EditOponent" }} >
                                            <li ><a href="#">Edit Oponent</a>

                                            </li>
                                        </Link>
                                        <li><a href="#">Import</a></li>
                                    </ul>


                                </div> */}
                                {/* <ul>
                                    <li><a href="#">Edit</a></li>
                                    <li><a href="#">Import</a></li>
                                </ul> */}
                            </div>
                            <div class="prefarance-box">
                                <div class="team-payment team-assesment">
                                    <table>
                                        <tr>
                                            <th>Game/ Event</th>
                                            <th>Date</th>
                                            <th>Time</th>
                                            <th>Location</th>
                                            <th>Assignments</th>
                                            <th>Volunteer</th>
                                        </tr>
                                        {schedule.map((schedule) => {
                                            return (
                                                <tr>

                                                    <td>
                                                        <div class="flag-prac">
                                                            <img src={schedule.display_icon.image} alt="" style={{ height: "50px", width: "50px", borderRadius: "50%" }} />
                                                            <button class="practice">{schedule.name}</button>

                                                        </div>

                                                    </td>
                                                    <td><span>{schedule.date}</span></td>
                                                    <td>
                                                        <span>{schedule.time.startTime}-{schedule.time.endTime}</span>
                                                    </td>
                                                    <td>
                                                        <span>{schedule.location_details},{schedule.location}</span>
                                                    </td>
                                                    <td>{schedule.assignment}

                                                    </td>
                                                    <td>
                                                        <div class="last-row">
                                                            <p>Avaneesh Shett</p> <button data-toggle="modal" data-target="#assignmentdelect" onClick={() => deleteScheduleData(schedule._id)}><img src={Delect} />
                                                            </button> <button><img src={pencil} /></button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )

                                        })}





                                    </table>
                                </div>
                            </div>
                        </div>
                        <Footer />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TeamSchdule;

