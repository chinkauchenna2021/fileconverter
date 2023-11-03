import React from 'react'
import { BsPlusCircleDotted} from "react-icons/bs";


type Props = {
    onDrop:(e: React.DragEvent<HTMLDivElement>) =>void,
    onDragover:(e: React.DragEvent<HTMLDivElement>)=>void,
    isDropped:boolean
}

function Coverzone({onDragover , onDrop , isDropped }: Props) {
  return (
    <>
     { isDropped? 
   <div onDrop={(e)=>onDrop(e)} onDragOverCapture={(e)=>onDragover(e)}  className='absolute w-full h-screen  flex justify-center items-center top-0 left-0 z-40' style={{backgroundColor:"rgba(0,0,0,0.8"}}><BsPlusCircleDotted size={100} className="text-white font-thin"  /></div>
     :
     ""
    }
    </>
  )
}

export default Coverzone