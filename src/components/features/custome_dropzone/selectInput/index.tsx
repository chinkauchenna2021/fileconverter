import React from 'react'
import * as SC from '@/components/features/custome_dropzone/selectInput/style'
import { FiFolderPlus } from "react-icons/fi";
import { FaDropbox , FaGoogleDrive } from "react-icons/fa";
// FaDropbox
type Props = {}

function SelectInput({}: Props) {
  return (
      <SC.SelectBar className="min-w-[420px] h-[70px] rounded-md hover:cursor-pointer hover:shadow-lg hover:shadow-black">
           <div className='w-full h-full flex justify-center items-center'>
                  <div className='w-3/6 h-full flex justify-center items-center text-white font-medium capitalize text-xl'>choose file</div>
                  <div className='w-3/6 flex justify-evenly h-5/6 px-2 gap-1'>
                  <div className='w-full  h-[100%] justify-center flex items-center'><FiFolderPlus size={26}  className="text-white" /></div>
                  <div className='w-full  h-[100%]  justify-center flex items-center hover:bg-[rgba(0,0,0,0.05)]'><FaDropbox size={26}  className="text-white" /></div>
                  <div  className='w-full h-[100%] justify-center flex items-center'><FaGoogleDrive size={26}  className="text-white" /></div>
                  </div>

           </div>

      </SC.SelectBar>
  )
}

export default SelectInput