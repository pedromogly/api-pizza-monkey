import prismaClient from "../../prisma"
import 'express-async-errors'
import { compare } from "bcryptjs"
import {sign} from 'jsonwebtoken'

interface ReqLogin {
    username: string
    pass: string
}

class AuthUserService{
    async execute({username, pass}: ReqLogin){
        const user = await prismaClient.user.findFirst({
            where:{
                username:username
            }
        })
        if(!user){
            throw new Error("User/Password Incorreto")
        }

        const passMatch = await compare(pass, user.pass)
        if(!passMatch){
            throw new Error("User/Password Incorreto")
        }

        //geracao de token
        const token = sign({
            name: user.name,
            username: user.username
        },process.env.SECRET,
        {
            subject: user.id,
            expiresIn: '6h'
        })

        return {
            id: user.id,
            name: user.name,
            username: user.username,
            token: token
        }
    }
}

export default AuthUserService