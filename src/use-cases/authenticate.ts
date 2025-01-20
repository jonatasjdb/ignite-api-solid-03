import UsersRepository from "@/repositories/users-repository";
import { InvalidCredentialsError } from "./errors/invalid-credentials";
import { compare } from "bcryptjs";

interface AuthenticateUseCaseRequest {
    email: string,
    password: string
}

export class AuthenticateUseCase {
    constructor(private usersRepository: UsersRepository) {}

    async execute({email, password}: AuthenticateUseCaseRequest) {
        const user = await this.usersRepository.findByEmail(email)

        if(!user) {
            throw new InvalidCredentialsError();
        }

        const doesPasswordMatches = await compare(password, user.password)

        if(!doesPasswordMatches) {
            throw new InvalidCredentialsError();
        }

        return user
    }
}
