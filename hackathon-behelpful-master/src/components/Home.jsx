import React from 'react'
import Navbar from './Navbar'
import poor from '../asset/poor.jpg'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function Home() {
  const auth = useSelector((state) => state);
  const navigate=useNavigate()
  return (
    <div className='home'>
    <Navbar />
    <div className='back'>
      <div className='p_1'>
       <h3> Giving is not about making a donation ,</h3>
       <h4> its about making a difference</h4>
      <div>
     {auth.isloggedin===true ? null :<button className='bec_fundr' onClick={()=>{navigate('/register')}}>Register to become fund raiser !</button>}
        <button className='donate_now'>Donate Now</button>
      </div> 
     
      </div>
      <div className='p_2'>
        <img src={poor} alt="poor"/>

</div>
    

    </div>
    </div>
  )
}

export default Home 