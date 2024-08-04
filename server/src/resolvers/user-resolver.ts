import { AppDataSource } from "../connection/datasource.js";
import { LoginInput, LoginToken, User, UserInput } from '../types/types.js';
import { Arg, Mutation } from "type-graphql";
import { Repository } from "typeorm";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from "../constants/constants.js";

export class UserResolver{

    private userRepository: Repository<User> = AppDataSource.getRepository(User);

    @Mutation(() => User)
    async createUser(@Arg("userInput") userInput: UserInput): Promise<User>{
        const user = new User();
        user.name = userInput.name;
        user.email = userInput.email;
        const passwordHash = await bcrypt.hash(userInput.password, 10);
        user.password = passwordHash;
        user.role = userInput.role||'ROLE_USER';
        return this.userRepository.save(user);
    }

    @Mutation(() => LoginToken)
    async login(@Arg("loginInput") loginInput: LoginInput): Promise<LoginToken>{
        const user = await this.userRepository.findOne({where: {email: loginInput.email}});
        if(!user){
            throw new Error('User or password not correct');
        }
        const isPasswordCorrect = await bcrypt.compare(loginInput.password, user.password);
        if(!isPasswordCorrect){
            throw new Error('User or password not correct');
        }
        const { id, name, role } = user;
        const accessToken = jwt.sign({id, name, role},JWT_SECRET, {expiresIn: '1h'});
        const refreshToken = jwt.sign({id, name, role},JWT_SECRET, {expiresIn: '7d'});
        return {accessToken, refreshToken};
    }

    @Mutation(() => String)
    async refreshToken(@Arg("refreshToken") refreshToken: string): Promise<string>{
        try {
            const {id,name,role} = jwt.verify(refreshToken, JWT_SECRET);
            const accessToken = jwt.sign({id,name,role},JWT_SECRET, {expiresIn: '1h'});
            return accessToken;
        } catch (error) {
            throw new Error('Invalid refresh token');
        }
    }

}