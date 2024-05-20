import { Router, Request, Response} from 'express'

import { CreateUserController } from './controllers/users/CreateUsersController'
import { AuthUserController } from './controllers/users/AuthUserController'
import { DetailUserController } from './controllers/users/DetailUsarController'

import { isAuth } from './middlewares/isAuth'

const router = Router()

router.get('/teste', (req: Request,res: Response)=>{
    throw new Error('Macaco ta errando')
})

//rota que chama o controle de criação de usuários
router.post('/cad', new CreateUserController().handle)

router.post('/session',new AuthUserController().handle)

router.get('/me', isAuth, new DetailUserController().handle)

export {router}