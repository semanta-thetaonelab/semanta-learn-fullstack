"use client"
import Image from "next/image";
import { useState } from "react";

export default function Home() {
const [cards,setCards]=useState(); 

const enterCard=()=>{
  

}
  return (
    <div className="h-full w-[100%] relative flex justify-center items-center">
       {/* <pre>
       '.vdas:{
       }'
       &lt;div&gt;&lt;/div&gt;
       </pre> */}
       
       <div className="absolute w-[50px] h-[50px] sm:w-[150px] sm:h-[150px] lg:w-[350px] lg:h-[350px]  bg-lime-300 green-ball" style={{borderRadius:'50%'}}></div>
       <div className="absolute w-[50px] h-[50px] sm:w-[150px] sm:h-[150px] lg:w-[350px] lg:h-[350px]  bg-orange-400 orange-ball" style={{borderRadius:'50%'}}></div>
       <div className="back-blur"></div>
       <div className="w-[99%] h-[97%] relative m-3 p-2 overflow-auto" style={{backgroundColor:'rgba(255, 255, 255, 0.386)',borderRadius:'12px'}}>
         
       </div>
    </div> 
  );
}
