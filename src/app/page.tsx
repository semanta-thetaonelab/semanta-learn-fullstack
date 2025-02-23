"use client"
import React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Login from "./lib/UI-Component/LogIn";
import Signup from "./lib/UI-Component/SignUp";

export default function Home(card: any) {
const [sl,setSl]=useState (true) 

  return (
    <div className="h-[100vh] w-[100%] relative flex justify-center items-center">
      {sl?( 
        <Login openSignup={()=>{setSl(false)}}/>    
):(        
         <Signup openLogin={()=>{setSl(true)}}/> 
 )}

    </div> 
  );
}
