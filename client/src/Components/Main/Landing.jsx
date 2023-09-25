import React, { useContext, useEffect } from 'react'
import UserContext from "../../context/UserContext"
import {Link, useNavigate} from 'react-router-dom'
import './Main.css'

const Landing = () => {
  const {user} = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate("/");
  }, [user])
  return (
    <div className='mx-auto flex md:space-x-5 space-x-5 items-center p-8 md:p-20 mt-12 h-[93vh] justify-center bg-[#F6F6F6]'>
        <div>
        <Link to='/generator'>
            <button className=' text-2xl bg-[#0C4DA1]  px-5 py-3  text-white rounded-xl font-light'>
                Generate Paper
            </button>
        </Link>
        </div>
        <div>
        <Link to='/upload'>
            <button className='text-2xl border border-[#0C4DA1] border-[1px] px-5 py-3 text-[#0C4DA1] rounded-xl font-light'>Upload Questions</button>
        </Link>
        </div>
        
    </div>
  )
}

export default Landing