import { Router } from 'express';
import { UserService } from './user.service';

const userService = new UserService()
const router = Router();

router.get('/user', userService.getAllUsers);
//busca todos users em um raio de 10km
router.get('/user/near', userService.getAllUsersByLocationAndTechs);
router.post('/user', userService.createUser);

export default router;



