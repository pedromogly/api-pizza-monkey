import {Response,Request} from 'express'

import {CreateUserService} from '../../services/users/CreateUsersService'

//feito em classe para estruturar
class CreateUserController{
    //criado o metodo handle, que é praticamente um req e res de um router.tal(req,res)=>{etc..}
    async handle(req: Request, res: Response){
        //descontroi aqui
        const {name, username, pass} = req.body
        //aqui eu instacio o serviço que faz a criação de login, armazenar numa variavel
        const createUser = new CreateUserService()
        //agora estou passando os argumentos para o metodo execute lá da classe CreateUserService()
        //importante frizar, que aqui está entrando as informações para começar o serviço
        //mas quem define a tipagem é o proprio serviço
        //IMPORTANTE SER ASSINCRONO
        const user = await createUser.execute({name, username, pass})
        // ----Classe CreateUserService.execute Em ação! (vai la ler) ---- 

        //retornar de volta pro usuário o trabalho de cadastro
        return res.json(user)
    }
}

export { CreateUserController }