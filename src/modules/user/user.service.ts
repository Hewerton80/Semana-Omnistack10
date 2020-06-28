import { Request, Response } from "express";
import { GitHubService } from "../../services/gitbub/github.service";
import { User } from "./user.schema";
import { IPoint } from "../point/point.schema";
import { parseStringAsArray } from "../../utilts/parseStringAsArray";

const githubService = new GitHubService();
export class UserService{
/**
 * 
 *https://docs.mongodb.com/manual/reference/operator/query/
 *
 */

    async getAllUsers(req: Request, res: Response){
        try{
            const users = await User.find();
            return res.status(200).json(users);
        }
        catch(err){
            console.log(err);
            return res.status(500).json(err);
        }
    }
    async getAllUsersByLocationAndTechs(req: Request, res: Response){
        const { latidude, longitude, techs } = req.query;
        try{
            const users = await User.find({
              
                location: {
                    $near:{
                        $geometry: {
                            type:  'Point',
                            coordinates: [latidude, longitude]
                        },
                        $maxDistance:10000
                    }
                },
                techs: {
                    $in: parseStringAsArray(String(techs))
                }
            });
            return res.status(200).json(users);
        }
        catch(err){
            console.log(err);
            return res.status(500).json(err);
        }
    }
    async createUser(req: Request, res: Response){
        const { github_username, techs , longitude, latitude} = req.body;
        console.log(github_username, techs , longitude, latitude);
        try{
            const userAlreadyExists = await User.findOne({github_username})
            if(userAlreadyExists){
                return res.status(400).json({msg: 'Já existe um usuário cadastrado com esse github_name'})
            }
            const response = await githubService.getUser(github_username);
            if(response && response.message ===  "Request failed with status code 404"){
                return res.status(404).json(response);
            }
            const { name, avatar_url, bio } = response;
            const location: any = {
                type: 'Point',
                coordinates: [longitude, latitude],
            }
            const user = await User.create({
                github_username,
                name, 
                avatar_url, 
                bio,
                techs: parseStringAsArray(techs),
                location
            })
            return res.status(200).json(user);
        }
        catch(err){
            console.log(err);
            return res.status(500).json(err);
        }
    }
    
}