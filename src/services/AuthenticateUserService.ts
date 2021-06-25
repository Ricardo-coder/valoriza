import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import { getCustomRepository } from 'typeorm'
import { UsersRepositories } from '../repositories/UsersRepositories'

interface IAuthenticateRequest {
  email: string;
  password: string;
}

export class AuthenticateUserService {
  async execute ({ email, password }: IAuthenticateRequest) {
    const usersRepository = getCustomRepository(UsersRepositories)

    const user = await usersRepository.findOne({ email })

    if (!user) throw new Error('Email/Password incorrect')

    const passwordMatch = await compare(password, user.password)

    if (!passwordMatch) throw new Error('Email/Password incorrect')

    const token = sign(
      { email: user.email },
      '18abb4747aefe043d916e7455db35f93',
      {
        subject: user.id,
        expiresIn: '1d'
      }
    )

    return token
  }
}
