import { Schema, model, Document } from 'mongoose';
import { PointSchema, IPoint } from '../point/point.schema';

export interface IUser extends Document{
    name: string;
    github_username: string;
    bio: string;
    avatar_url: string;
    techs: string[];
    location: IPoint
}

const UserSchema = new Schema({
    name: String,
    github_username: String,
    bio: String,
    avatar_url: String,
    techs: [String],
    location: {
        type: PointSchema,
        index: '2dsphere',
    }
})

export const User =  model<IUser>('User',UserSchema)