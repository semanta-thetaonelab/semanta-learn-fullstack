"use client"
import Image from "next/image";
import React from "react";
import { useEffect, useState } from "react";

export default function Home(card: JSX.Element) {
const [cards,setCards]=useState<JSX.Element[]>([]); 

useEffect(()=>{
  enterCard()
},[1])
const enterCard = () => {
  const card = (
    <div className="w-[300px] h-[200px] bg-white m-5" style={{borderRadius:'12px'}} key={Math.random()}></div>
  );
  for (let i = 0; i < 6; i++) {
    setTimeout(() => {
      setCards((prev:any) => [...prev, card]);
    }, 100 * i);
  }
};
  return (
    <div className="h-full w-[100%] relative flex justify-center items-start">
       {/* <pre>
       '.vdas:{
       }'
       &lt;div&gt;&lt;/div&gt;
       </pre> */}
       
       <div className="absolute w-[50px] h-[50px] sm:w-[150px] sm:h-[150px] lg:w-[350px] lg:h-[350px]  bg-lime-300 green-ball" style={{borderRadius:'50%'}}></div>
       <div className="absolute w-[50px] h-[50px] sm:w-[150px] sm:h-[150px] lg:w-[350px] lg:h-[350px]  bg-orange-400 orange-ball" style={{borderRadius:'50%'}}></div>
       <div className="back-blur"></div>
       <div className="w-[99%] h-[97%] relative m-3 p-2 overflow-auto flex justify-evenly items-center flex-wrap" style={{backgroundColor:'rgba(255, 255, 255, 0.386)',borderRadius:'12px'}}>
       {cards.map((item, index) => (
          <React.Fragment key={index}>{item}</React.Fragment>
        ))}
       </div>
    </div> 
  );
}
