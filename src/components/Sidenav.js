import React from 'react'
import { IoSettingsOutline,IoExitOutline } from "react-icons/io5";
import { AiOutlineMessage } from "react-icons/ai";
import { BsHandbag } from "react-icons/bs";
import { MdOutlineInventory2 } from "react-icons/md";
import { GoPeople } from "react-icons/go";
import { PiDiamondsFourThin } from "react-icons/pi";
import { FiHeadphones, FiGift} from "react-icons/fi";
import { Link, useLocation } from 'react-router-dom';
function Sidenav() {
  const location = useLocation();
  const path = location.pathname.split('/').filter((path) => path);

  return (
    <div className='bg-white w-[88px] h-full justify-between top-0 fixed z-0 '>
      <div className='flex-col mt-2 w-full'>
        <Link to='/'><img
        className='w-[49px] h-[49px] top-[15px] mx-[18px] gap-0 text-center' 
        src='https://s3-alpha-sig.figma.com/img/c869/9fa7/84dc3eec0ac6bdc3c143cb31241afff8?Expires=1731888000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=mzMC9xoWn-u500nBouDozbRpliAH3WU~5wFp6op8it-8Ji3W05v4Nm0QbKfgVa2MvP2fjsLBThdkCN5mGZ3ctIDUCSLlF9UyLJNXer5OhMicWYUV~dIVam5I9CZybb4NN84jGXBmY-ZPLozCZP~EpGFeLi5najtNOPMGuM5EDzBxkgclZd3ez8h8xoxYqKicBX6FZ-P3RB9D8g3d613VPEAiHhOkgun4fVgg7vPM7YqTY6u-7rFFN51OBeTRlh~MzdXm7YmGmeR3oWaYkR6huGTB~EjnRfpvstbe2ob-It2tWxXmCa82CIDZ5D528rumrxFspYACytOS0M2m0weX6g__'/>
        </Link>
        <PiDiamondsFourThin
        className='text-center w-full mt-16  cursor-pointer sticky h-5 transition-transform hover:scale-125'/>
        <AiOutlineMessage
        className='text-center w-full mt-5  cursor-pointer sticky h-5 transition-transform hover:scale-125'/>
        <MdOutlineInventory2
         className={` text-center w-full border-x-4rounded-3xl mt-5  cursor-pointer sticky h-9 py-2 transition-transform hover:scale-125 `}/>
        <Link to="/inventionary">
  <div
    className={`w-full mt-5 cursor-pointer sticky h-10 flex justify-center items-center transition-transform hover:scale-125 ${
      path === '/inventionary' ? 'bg-cyan-500 !important' : ''
    }`}
  >
    <BsHandbag className="h-5" />
  </div>
</Link>

        <GoPeople
        className='text-center w-full mt-5 cursor-pointer  sticky h-5 transition-transform hover:scale-125'/>
        <IoSettingsOutline
        className='mt-5 text-center w-full  cursor-pointer sticky h-5 transition-transform hover:scale-125'/>
        
      </div>
      <div className='mt-20 text-center w-full '>
        <FiHeadphones
         className='mt-5 w-full  cursor-pointer sticky h-5 transition-transform hover:scale-125'/>
         <FiGift
         className='mt-5 text-center w-full  cursor-pointer sticky h-5 transition-transform hover:scale-125'/>
         <IoExitOutline
         className='mt-5 text-center w-full  cursor-pointer sticky h-5 transition-transform hover:scale-125'/>
         
         </div>
    </div>
  )
}

export default Sidenav
