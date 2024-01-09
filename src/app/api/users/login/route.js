import { connect } from "@/helpers/dbConfig.js";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export async function POST(request) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;
    console.log(reqBody);

    //check if user already exists
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: "User does not exist" },
        { status: 400 }
      );
    }

    //compare passwords
    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 400 }
      );
    }

    //create token data
    const tokenData = {
      id: user._id,
      email: user.email,
      username: user.username,
    };

    //create token
    const token = await jwt.sign(tokenData, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    //send token
    const response = NextResponse.json({
      message: "Login successful",
      success: true,
    });

    response.cookies.set("token", token, {
      httpOnly: true,
    });

    return response;
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
