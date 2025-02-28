import mongoose from "mongoose";
import { IUser, UserRole } from "./user.interface";
import AppError from "../../errors/appError";
import { StatusCodes } from "http-status-codes";
import User from "./user.model";


const registerUser = async (userData: IUser) =>{
    const session = await mongoose.startSession();
    session.startTransaction();

    try{
        if([UserRole.ADMIN].includes(userData.role)){
            throw new AppError(StatusCodes.NOT_ACCEPTABLE, 'Invalid role. only user access')
        }
        const existingUser = await User.findOne({email: userData.email}).session(session);
        if(existingUser){
            throw new AppError(StatusCodes.NOT_ACCEPTABLE, 'Email is already registered')
        }
        const user = new User(userData);
        const createdUser = await user.save({session});
        // const profile = new Customer({
        //     user: createdUser._id,
        // })
        await session.commitTransaction();
        session.endSession();
        
    } catch (error){
        await session.abortTransaction();
        session.endSession();
        throw error;
    }
}