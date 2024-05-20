import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface Payload{
    sub: string  //tipar o retorno do subject do jwt - vem a id do usuário
}
export function isAuth(req: Request, res: Response, next: NextFunction){
    console.log('Verificando Token...')
    
    const authToken = req.headers.authorization
    if(!authToken){
        return res.status(401).end()
    }
    
    const [, token] = authToken.split(" ")

    try{
        const {sub} = verify(token, process.env.SECRET) as Payload
        req.user_id = sub
        return next()
    }catch{
        return res.status(401).end()
    }

    
}
