"use client"
import React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home(card: JSX.Element) {
const [sl,setSl]=useState (true) 
const router=useRouter();
// useEffect(()=>{
//   setTimeout(()=>{
//     router.push('/auth-stack')
//   },3000)
// })
  return (
    <div className="h-full w-[100%] relative flex justify-center items-center">
      {sl?(        <div className="w-[310px] h-[310px] bg-white flex flex-col justify-center items-center p-3">
           <b className="text-[20px] mb-3">Log in</b>
           <p className=" w-[90%] text-left mb-2">Email</p>
           <input type="email" className="w-[90%] bg-slate-400 px-3 py-1 mb-2"></input>
           <p className=" w-[90%] text-left mb-2">Password</p>
           <input type="password" className="w-[90%] bg-slate-400 px-3 py-1 mb-3"></input>
           <button className="w-[90%] py-3 text-white font-bold bg-cyan-800 cursor-pointer">Log in</button>
           <p className="w-[90%] text-center mb-2">don't have account? <span className="w-[90%] text-left mb-2 text-cyan-700 cursor-pointer"
             onClick={()=>setSl(false)}
           >sign up</span></p>
        </div>):(        
          
          <div className="w-[310px] h-[310px] bg-white flex flex-col justify-center items-center p-3">
           <b className="text-[20px] mb-3">Sign up</b>
           <p className=" w-[90%] text-left mb-2">Email</p>
           <input type="email" className="w-[90%] bg-slate-400 px-3 py-1 mb-2"></input>
           <p className=" w-[90%] text-left mb-2">Set Passowrd</p>
           <input type="password" className="w-[90%] bg-slate-400 px-3 py-1 mb-3"></input>
           <button className="w-[90%] py-3 text-white font-bold bg-cyan-800 cursor-pointer">Sign up</button>
           <p className="w-[90%] text-center mb-2">already have account? <span className="w-[90%] text-left mb-2 text-cyan-700 cursor-pointer"
             onClick={()=>setSl(true)}
           >let's log in</span></p>
        </div>)}

    </div> 
  );
}
