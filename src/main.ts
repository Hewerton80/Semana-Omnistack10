import "reflect-metadata";
import * as express from 'express';
import * as cors from 'cors'
import { connect } from 'mongoose'
import routes from './modules/user/user.controller'

class App{
    private app = express();

    constructor(){
        this.middlewares();
        this.routes();
        this.connect();
        this.init();
    }

    middlewares(){
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: false}));
    }
    
    routes(){
        this.app.use(routes)
    }
    
    connect(){
        connect('mongodb://localhost:27017/geolocation_db',{
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
            .then(() => console.log('connection mongo ok!'))
            .catch(err=> console.log(err))
    }
    init(){
            
        this.app.listen(3001,()=>console.log('server listing in http://localhost:3001'))
    }

}

new App();





