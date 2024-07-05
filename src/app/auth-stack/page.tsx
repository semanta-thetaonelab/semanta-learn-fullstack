"use client"
import Image from "next/image";
import React, { useEffect, useState } from "react";



const Home = () => {
  const [cards, setCards] = useState<JSX.Element[]>([]);

  useEffect(() => {
    enterCard();
  }, []);

  const enterCard = () => {
    for (let i = 0; i < 12; i++) {
      setTimeout(() => {
        const cardElement = (
          <div
            className="w-[350px] h-[250px] bg-white m-5"
            style={{ borderRadius: '12px' }}
            key={Math.random()}
          ></div>
        );
        setCards((prev) => [...prev, cardElement]);
      }, 100 * i);
    }
  };

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
        {cards.map((item, index) => (
          <React.Fragment key={index}>{item}</React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Home;
