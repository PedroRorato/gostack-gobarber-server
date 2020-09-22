import { getRepository } from 'typeorm';
import { compare, hash } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import User from '../models/User';

interface RequestDTO {
    email: string;
    password: string;
}

interface Response {
    user: User;
    token: string;
}

class AuthenticateUserService {
    public async execute({ email, password }: RequestDTO): Promise<Response> {
        const userRepository = getRepository(User);

        const user = await userRepository.findOne({ where: { email } });

        if (!user) {
            throw new Error('Incorrect email/password combination.');
        }

        const passwordMatched = await compare(password, user.password);

        if (!passwordMatched) {
            throw new Error('Incorrect email/password combination.');
        }

        const token = sign({}, 'bd6df45cc953a8c91720de91a448c3b7', {
            subject: user.id,
            expiresIn: '1d',
        });

        return { user, token };
    }
}

export default AuthenticateUserService;
