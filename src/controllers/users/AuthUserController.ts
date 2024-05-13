import {Response,Request} from 'express'

import AuthUserService from '../../services/users/AuthUserService'

class AuthUserController{
    async handle(req:Request,res:Response){
        const {username, pass} = req.body

        const userAuth = new AuthUserService
        const user = await userAuth.execute({username,pass})


        return res.json(user)
    }
}

export {AuthUserController}