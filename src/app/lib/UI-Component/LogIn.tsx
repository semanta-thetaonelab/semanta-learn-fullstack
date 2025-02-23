import React, { useState } from "react";
import { Post } from "../apiHelper";
import { useRouter } from "next/navigation";

const Login=({openSignup}:{openSignup:()=>void})=>{
    const [user,setUser]=useState({email:'',password:''});
    const [apiError,setApiError]=useState('');
    const overWrite=(key:string,val:any)=>{
       setUser({
        ...user,
        [key]:val
       })
    }
    const router=useRouter();
    const handelLogin=async()=>{
        const res =await Post('http://localhost:3000/api/login',user);
        if(res.status){
            localStorage.setItem('user',JSON.stringify(res.response?.data));
            router.push('/auth-stack/March-Project');
        }else{
            setApiError(res.response?.message)
        }
      }
    return(
        <div className="w-[310px] h-[310px] bg-white flex flex-col justify-center items-center p-3 rounded-md">
        <b className="text-[28px] mb-3">Log in</b>
        <p className=" w-[90%] text-left mb-2">Email</p>
        <input type="email" className="w-[90%] px-3 py-1 mb-2 rounded-md" style={{border:' 1px solid #abaaa9'}} onChange={(e)=>overWrite('email',e.target.value)}/>
        <p className=" w-[90%] text-left mb-2">Password</p>
        <input type="password" className="w-[90%] px-3 py-1 mb-2 rounded-md" style={{border:' 1px solid #abaaa9'}} onChange={(e)=>overWrite('password',e.target.value)} />
        <div className="w-[90%]">
         {apiError && <p className="text-[10px] my-[2px] text-red-700 ">{apiError}</p>}
        </div>
        <button className="w-[90%] py-2 text-white font-bold bg-cyan-800 cursor-pointer rounded-md"
         onClick={()=>handelLogin()}
        >Log in</button>
        <p className="w-[90%] text-center mb-2">don't have account? <span className="w-[90%] text-left mb-2 text-cyan-700 cursor-pointer"
          onClick={()=>openSignup()}
        >sign up</span></p>
     </div>
    )
}

export default Login ;