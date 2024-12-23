"use client"
import { useRouter } from "next/navigation";

import React, { useEffect, useState } from "react";



const Fiber = () => {
   



  return (
    <div className="h-full w-[100%] relative flex justify-center items-start">
      <div
        className="absolute w-[50px] h-[50px] sm:w-[150px] sm:h-[150px] lg:w-[350px] lg:h-[350px] bg-lime-300 green-ball"
        style={{ borderRadius: '50%' }}
      ></div>
      <div
        className="absolute w-[50px] h-[50px] sm:w-[150px] sm:h-[150px] lg:w-[350px] lg:h-[350px] bg-orange-400 orange-ball"
        style={{ borderRadius: '50%' }}
      ></div>
      <div className="back-blur"></div>
      <div
        className="w-[99%] h-[97%] relative m-3 p-2 overflow-auto flex justify-evenly items-center flex-wrap"
        style={{ backgroundColor: 'rgba(255, 255, 255, 0.386)', borderRadius: '12px' }}
      >
        {/* {cards.map((item, index) => (
          <React.Fragment key={index}>{item}</React.Fragment>
        ))} */}
      </div>
    </div>
  );
};

export default Fiber;