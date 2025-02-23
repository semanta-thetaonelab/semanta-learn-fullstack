import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "../../../../utils/dbConnect";
import User from "@/app/lib/models/User";
import mongoose from "mongoose";

export async function POST(req:NextRequest) {
    try {
       await dbConnect();
      const { name,email, password } = await req.json();
      const existing = await User.findOne({email});
      if(existing?.email){
        return new Response(JSON.stringify({ message: "Email already used" }), { status: 400 });
      }else{
        const newUser = new User({
            name,
            email,
            password,
          });
        
          await newUser.save();
          mongoose.connection.close();
  
          return new Response(JSON.stringify({ message: "User add successfully",data:newUser }), { status: 200 });
      }
    } catch (error) {
      return new Response(JSON.stringify({ message: "Internal server error" }), { status: 500 });
    }
  }