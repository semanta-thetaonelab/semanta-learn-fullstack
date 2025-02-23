import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "../../../../utils/dbConnect";
import User from "@/app/lib/models/User";
import mongoose from "mongoose";

export async function POST(req:NextRequest) {
    try {
       await dbConnect();
      const { email, password } = await req.json();
      const user = await User.findOne({email});

      if(!user){
        return new Response(JSON.stringify({ message: "User not exist" }), { status: 400 });
      }else if(user.password !== password ){
        return new Response(JSON.stringify({ message: "Wrong password" }), { status: 400 });
      }else{
        mongoose.connection.close();
        return new Response(JSON.stringify({ message: "Login successful",data:user }), { status: 200 });
      }
    } catch (error) {
      console.log(error);
      return new Response(JSON.stringify({ message: "Internal server error" }), { status: 500 });
    }
  }