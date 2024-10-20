import React, { useState } from 'react'
import {Link} from 'react-router-dom'
function Navbar() {
  const [task,btask] = useState('bg-blue-400')
  const [withd,bwith] = useState('bg-blue-200')
  const [acc,bacc] = useState('bg-blue-200')

  const taskscolor=()=>{
  btask('bg-blue-400')
  bwith('bg-blue-200')
  bacc('bg-blue-200')
  }
  const withcolor=()=>{
    btask('bg-blue-200')
    bwith('bg-blue-400')
    bacc('bg-blue-200')
  }
  const accountcolor=()=>{
    btask('bg-blue-200')
    bwith('bg-blue-200')
    bacc('bg-blue-400')
  }
  return (
    <div>
        <div className='bg-black h-16'>
      <div className='flex justify-center items-center space-x-4'>
        <Link to='/'><div className={`${task} text-black mt-4 font-bold text-md p-2 px-4 rounded border-2 border-white  cursor-pointer`} onClick={taskscolor}>Tasks</div></Link>
        <Link to='/withdraw'><div className={`${withd} text-black mt-4 font-bold text-md p-2 px-2 rounded border-2 border-white  cursor-pointer`} onClick={withcolor}>Withdraw</div></Link>
        <Link to='/account'><div className={`${acc} text-black mt-4 font-bold text-md p-2 px-2 rounded border-2 border-white  cursor-pointer`} onClick={accountcolor}>Account</div></Link>
        </div>

      </div>
    </div>
  )
}

export default Navbar
