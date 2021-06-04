import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
  HashRouter,
} from "react-router-dom";
import '../../Utils/css/style.css';
import '../../Utils/css/responsive.css';
import "../../Utils/css/bootstrap.min.css"
import "../../Utils/css/bootstrap-datepicker.css"
import Logo from "../../images/logo.png"
import UserProfile from "../../images/user-profile.png"
// import BigUserProfile from "../../../images/big-user-profile.png"
// import Invoice from "../../../images/invoice.png"
// import Cloudy from "../../../images/cloudy-small.png"
// import teamList from "../../../images/team-list.png"
// import Calender from "../../../images/calender.png"
// import lineBar from "../../../images/line-bar.png"
// import saveTravel from "../../../images/save-travel.png"
// import bullk from "../../../images/bullk.png"
import face from "../../images/Face.png"



function SideMenuComponents(props) {
  const history = useHistory();

  const [userMe, setUser] = useState(null);
  const [user, setUserData] = useState({});

  useEffect(() => {
    // let user = userdata && userdata._id ? true : false;
    // console.log("userMe===>", user);
    setUser(user);
    // console.log("USerData", userdata);
    const userLocal = JSON.parse(localStorage.getItem("user"));
    console.log("userData after login--->", userLocal)
    let userD = userLocal && userLocal._id ? true : false;
    setUser(userD);
    setUserData(userLocal);
  }, []);

  const handleLogout = () => {
    console.log("pruyuuuuuu", props);
    // dispatch(logoutUser(null));
    localStorage.removeItem("user");
    setUserData(null);
    props.history.push("/")
  };


  return (
    <div class="dashboard-side-bar">
      <div class="logo">
        <a href="#"><img src={Logo} alt="" /></a>
      </div>
      <div class="left-menu-section">
        <div class="nav-header">
          <button id="openMenu">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
        <div class="menulist">
          <ul>
            <Link to="/">
              <li><a href="#" class="menu1 active">Team Home</a></li>
            </Link>
            <Link to="/teamroster">
              <li><a href="#" class="menu2">Team Roster</a></li>
            </Link>
            <li><a href="#" class="menu3">Team Schedule</a></li>
            <li><a href="#" class="menu4">Player Availability</a></li>
            <Link to="/teamshop">
              <li><a href="#" class="menu5">Team Shop</a></li>
            </Link>
            <li><a href="#" class="menu6">Score Keeper</a></li>
            <Link to="/playerassignments">
              <li><a href="#" class="menu7">Player Assignment</a></li>
            </Link>
            <li><a href="#" class="menu8">Player Media</a></li>
            <li><a href="#" class="menu9">Player Messages</a></li>
            <Link to="/preferance">
              <li><a href="#" class="menu10">Player Preferences</a></li>
            </Link>
            <li><a href="#" class="menu11">Liability Waiver</a></li>
            <li><a href="#" class="menu12" >Team Payments</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default SideMenuComponents;