import axios from 'axios'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify'
import { useState } from 'react'
import {useNavigate } from 'react-router-dom'
import loader from '../asset/loader.gif'
import { useDispatch } from 'react-redux';

const Raise = () => {
    const [title, settitle] = useState('')
    const [name, setname] = useState('')
    const [upiid, setupiid] = useState('')
    const [fund, setfund] = useState('')
    const [image, setimage] = useState('')
    const [selectedimage, setselectedimage] = useState('')

    const [loading, setloading] = useState(false)
   const dispatch=useDispatch()
    const navigate = useNavigate()

    const imagehandler = (e) => {
        const file = e.target.files[0]
        setimage(file)
        const Reader = new FileReader()
        Reader.readAsDataURL(file)
        Reader.onload = () => {
          setselectedimage(Reader.result)
        }
      }


    const err = (msg) => {

        toast.error(msg, {
            'position': 'bottom-right',
            'theme': 'colored'
        })
    }

    const validate = () => {
        if (!title) {
            err('provide title')
            return false
        }
        else if (!name) {
            err('provide name')
            return false
        }
        else if (!upiid) {
            err('provide upi id')
            return false
        }
        else if (!fund) {
            err('provide fund')
            return false
        }
        else if (!selectedimage) {
            err('provide image')
            return false
        }
        return true
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const v = validate()
        if (v) {
      setloading(true)
                
            const res = await axios.post('http://localhost:8000/api/user/newfund', { heading:title,file:selectedimage,name,fund,upiid })
    console.log(res)
            if (res.data.success) {
                toast.success('Fund Raised Successfully ', {
                    'position': 'bottom-right',
                    'theme': 'colored'
                })
              }
              else {
                err(res.data.message)
                setloading(false)
              }
        }

    }


  return (
   <>
     <div className="raise">
                <form className="l-form">
                     <label htmlFor="mypassword" className="label-input-login">Name</label>
                    <input id='mypassword' onChange={(e) => { setname(e.target.value) }} className='login-input' value={name} type='text' autoComplete='off' placeholder="John Doe" />
                    <label htmlFor="myemail" className="label-input-login">Title</label>
                    <input id='myemail' className='login-input' value={title} autoComplete='off' onChange={(e) => { settitle(e.target.value) }} type='text' placeholder="John Doe is sick ....." />
                    <label htmlFor="myemail" className="label-input-login">Fund</label>
                    <input id='myemail' className='login-input' value={fund} autoComplete='off' onChange={(e) => { setfund(e.target.value) }} type='number' placeholder="Rs 2000" />
                    <label htmlFor="myemail" className="label-input-login">Upi Id </label>
                    <input id='myemail' className='login-input' value={upiid} autoComplete='off' onChange={(e) => { setupiid(e.target.value) }} type='text' placeholder="johndoe@example.com" />
                    <input required id='myprofile' onChange={imagehandler} type='file' name='myfile' />
                     {loading ? <div className='load reg-input-sub' ><img className='l-i' src={loader} alt='loader' /></div> : <input className='reg-input-sub' value='Submit' onClick={handleSubmit} type='submit' />}
                   
                </form>
            </div>
            <ToastContainer />

   </>
  )
}

export default Raise;