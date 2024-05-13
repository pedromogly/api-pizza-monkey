import prismaClient from '../../prisma/index'
import 'express-async-errors'
import { hash } from 'bcryptjs'

//criando interface para receber os parametros obrigatórios la no controllers
interface UserRequest{
    name : string
    username: string
    pass: string
}

class CreateUserService{
    //metodo em ação, um objeto como argumento, usando a tipagem da INTERFACE
    async execute({name, username, pass}: UserRequest){

        if(!username){
            throw new Error("username Vazio")   
        }

        const usernameExists = await prismaClient.user.findFirst({
            where:{
                username: username
            }
        })

        if(usernameExists){
            throw new Error("Username Já existe")
        }

        const passHash = await hash(pass, 10)

        const user = await prismaClient.user.create({
            data:{
                name: name,
                username: username,
                pass: passHash
            },
            //retornar apenas essas informações:
            select:{
                id: true,
                username: true,
                name: true
            }
        })
        
        //retorno das informações para o controller
        return user
    }
}

export {CreateUserService}