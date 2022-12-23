import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import loader from '../asset/loader.gif'


const Register = () => {
  const [username, setusername] = useState('')
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')

  const [loading, setloading] = useState(false)
  const navigate = useNavigate()

  const err = (msg) => {

    toast.error(msg, {
      'position': 'bottom-right',
      'theme': 'colored'
    })
  }
  

  const handlevalidate = () => {
    if (!username || !email || !password ) {
      err('provide all details')
      return false;
    }

    if (password.length < 8) {
      err('password must be greater than 8 characters')
      return false;
    }
    return true
  }

  const submithandler = async (e) => {
    e.preventDefault();

    const val = handlevalidate();
    if (val) {
      setloading(true)

      const out = {
        username,
        email,
        password
      }
      const res = await axios.post('http://localhost:8000/api/user/register', out)
      if (res.data.success) {
        setloading(false)
        navigate('/')
      }
      else {
        err(res.data.message)
        setloading(false)
      }
    }

  }
  return (

    <>

      <div className="register">
        <form className="reg-form">
          <label htmlFor="myname" className="label-input-reg">Name</label>
          <input id='myname' className='login-input' autoComplete='off' value={username} onChange={(e) => { setusername(e.target.value) }} type='text' placeholder="john doe" />
          <label htmlFor="myemail" className="label-input-reg">Email</label>
          <input id='myemail' className='login-input' autoComplete='off' value={email} onChange={(e) => { setemail(e.target.value) }} type='text' placeholder="johndoe@example.com" />
          <label htmlFor="mypassword" className="label-input-reg">Password</label>
          <input id='mypassword' className='reg-input' autoComplete='off' value={password} onChange={(e) => { setpassword(e.target.value) }} type='text' placeholder="Top secret" />
          {loading ? <div className='load reg-input-sub' ><img className='l-i' src={loader} alt='loader' /></div> : <input className='reg-input-sub' value='Submit' onClick={submithandler} type='submit' />}
          <h4 style={{ 'color': 'black', 'fontFamily': 'cursive', 'textAlign': 'center' }} className='r-h'> Already have an account ?<Link to='/login' style={{ 'color': '#00ae8c', 'textDecoration': 'none' }}> Login</Link ></h4>
        </form>
      </div>
      <ToastContainer />
    </>
  )
}
export default Register;