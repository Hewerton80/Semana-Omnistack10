import { Schema } from 'mongoose';
import { Document } from "mongoose";

export interface IPoint extends Document{
    type: string;
    coordinates: number[];
}

export const PointSchema: Schema<IPoint> = new Schema({
    type: {
        type: String,
        enum: ['Point'],
    },
    coordinates: {
        type: [Number],
        required: true
    }
})

