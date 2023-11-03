"use client"

import React from 'react'
import { userSessionIfNull } from '@/libs/auth'
import { useSession, signIn, signOut } from "next-auth/react"
import Dropzones from '@/components/features/dropzone';
import Customezone from '@/components/features/custome_dropzone/customezone';


function index() {
    const {data:session,status} = useSession();
    console.log(session , status);

  return (
    <div className='max-w-5xl m-auto flex  justify-center flex-col min-h-screen space-y-3'>
     <div className='w-full text-center '> <div className='text-7xl font-semibold flex w-5/6 mx-auto  justify-center items-center min-h-[120px] mb-8 '>File Conversion place center </div></div>
    {/* <Dropzones /> */}
    <Customezone />
    </div>
  )
}

export default index