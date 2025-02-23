import React, { useState } from "react";
import { Post } from "../apiHelper";
import { useRouter } from "next/navigation";

const Signup=({openLogin}:{openLogin:()=>void})=>{
    const [user,setUser]=useState({name:'',email:'',password:''});
    const [apiError,setApiError]=useState('');
    const overWrite=(key:string,val:any)=>{
       setUser({
        ...user,
        [key]:val
       })
    }
    const router = useRouter();
    
    const handleSignup=async()=>{
        const res =await Post('http://localhost:3000/api/signUp',user);
        if(res.status){
            localStorage.setItem('user',JSON.stringify(res.response?.data));
            router.push('/auth-stack/March-Project');
        }else{
            setApiError(res.response?.message)
        }
    }
    return(
        <div className="w-[310px] bg-white flex flex-col justify-center items-center p-3 rounded-md">
           <b className="text-[28px] mb-3">Sign up</b>

           <p className=" w-[90%] text-left mb-2">Enter full name</p>
           <input type="text" className="w-[90%] px-3 py-1 mb-2 rounded-md" style={{border:' 1px solid #abaaa9'}} onChange={(e)=>overWrite('name',e.target.value)} />

           <p className=" w-[90%] text-left mb-2">Email</p>
           <input type="email" className="w-[90%] px-3 py-1 mb-2 rounded-md" style={{border:' 1px solid #abaaa9'}} onChange={(e)=>overWrite('email',e.target.value)} />

           <p className=" w-[90%] text-left mb-2">Set Passowrd</p>
           <input type="password" className="w-[90%] px-3 py-1 mb-2 rounded-md" style={{border:' 1px solid #abaaa9'}} onChange={(e)=>overWrite('password',e.target.value)}/>
           <div className="w-[90%]">
         {apiError && <p className="text-[10px] my-[2px] text-red-700 ">{apiError}</p>}
        </div>
           <button className="w-[90%] py-2 text-white font-bold bg-cyan-800 cursor-pointer rounded-md" onClick={()=>handleSignup()}>Sign up</button>
           <p className="w-[90%] text-center mb-2">already have account? <span className="w-[90%] text-left mb-2 text-cyan-700 cursor-pointer"
             onClick={()=>openLogin()}
           >let's log in</span></p>
        </div>
    )
}

export default Signup ;