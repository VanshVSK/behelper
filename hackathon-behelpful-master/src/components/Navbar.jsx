import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { GiHamburgerMenu ,GiCrossMark} from "react-icons/gi";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import {actions} from "../store/store.js"

function Navbar() {
  const [cross,setcross]=useState(false);
  const auth = useSelector((state) => state);
  const navigate=useNavigate()
  console.log(auth)

  const dispatch=useDispatch()

  const logouthandler=async()=>{
    const res=await axios.post("http://localhost:8000/api/user/logout");
    if(res.data.success===true){
      dispatch(actions.logout());
      navigate('/login')
    }
  }

  return (
    <div className="nav">
    <div className="part-1">
      BE
      <div className='x'>
      HELPFUL
      </div>
    </div>
    <div className="part-2">

   <ul className="uno">
   <Link className="mem" to="/" >HOME</Link>
  <Link className="mem" to="/about" >ABOUT</Link>
   {auth.isloggedin===true ?<Link className="becfund" to="/register" >RAISE FUND</Link>:<Link className="becfund" to="/register" >BECOME FUNDRAISER</Link>}
   {auth.isloggedin===true  ?<li className='log' onClick={()=>{logouthandler()}}>LOGOUT</li> : <li className='log' onClick={()=>{navigate('/login')}}>LOGIN</li>}
   </ul>
   <div className='ham'>
    {!cross?<GiHamburgerMenu className='hamburger'  onClick={ ()=>{setcross(true)}}/>:<GiCrossMark className='cross' onClick={()=>{setcross(false);}}/>}
   </div>
    </div>
    {cross===true?<div className='modal'>
      <ul className='modal-div'>
      <Link className="mem" to="/" >Home</Link>
  <Link className="mem" to="/about" >About</Link>
   <Link className="mem" to="/testimonials" >Testimonials</Link>
   <Link className="mem" to="/partners" >Partners</Link>
  <Link className="mem" to="/solutions">Solutions</Link>
  <a className="mem" href="https://www.notion.so/Careers-at-SKYWARE-814b8d25f5a6407c845319c57fbab63a" target="_blank"  rel="noreferrer" >Career</a>
  <Link className="log" to="/contact">Contact</Link>
      </ul>
    </div>:null}
    </div>
  )
}
export default Navbar;