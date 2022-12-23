import axios from 'axios'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import loader from '../asset/loader.gif'
import { actions } from '../store/store';
import { useDispatch } from 'react-redux';

const Login = () => {
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const [loading, setloading] = useState(false)
   const dispatch=useDispatch()
    const navigate = useNavigate()

    const err = (msg) => {

        toast.error(msg, {
            'position': 'bottom-right',
            'theme': 'colored'
        })
    }

    const validate = () => {
        if (!email) {
            err('provide email')
            return false
        }
        else if (!password) {
            err('provide password')
            return false
        }
        return true
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const v = validate()
        if (v) {
      setloading(true)
                
            const res = await axios.post('http://localhost:8000/api/user/login', { email , password })

            if (res.data.success) {
                setloading(false)
                dispatch(actions.login(res.data.message))
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
            <div className="login">
                <form className="login-form">
                    <label htmlFor="myemail" className="label-input-login">Email</label>
                    <input id='myemail' className='login-input' value={email} autoComplete='off' onChange={(e) => { setemail(e.target.value) }} type='text' placeholder="johndoe@example.com" />
                    <label htmlFor="mypassword" className="label-input-login">Password</label>
                    <input id='mypassword' onChange={(e) => { setpassword(e.target.value) }} className='login-input' valuee={password} type='text' autoComplete='off' placeholder="Top secret" />
                    {loading ? <div className='load reg-input-sub' ><img className='l-i' src={loader} alt='loader' /></div> : <input className='reg-input-sub' value='Submit' onClick={handleSubmit} type='submit' />}
                    <h4 style={{ 'color': 'black', 'fontFamily': 'cursive','textAlign': 'center' }} className='r-h'> Dont have an account ?<Link to='/register' style={{ 'color': '#00ae8c', 'textDecoration': 'none' }}> Register</Link ></h4>
                </form>
            </div>
            <ToastContainer />

        </>
    )
}
export default Login;