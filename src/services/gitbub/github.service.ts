import apiGitHub from './api';

export class GitHubService{
    async getUser(githubUserName: string): Promise<any>{
        try{
            const { data } = await apiGitHub.get(`/users/${githubUserName}`);
            return data;
        }
        catch(err){
            return err;
            
        }
    }
}