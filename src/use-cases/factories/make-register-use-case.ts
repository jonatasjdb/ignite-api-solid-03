import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository"
import { RegisterUseCase } from "../register"

export function makeRegisterUsecase() {
    const prismaUsersRepository = new PrismaUsersRepository()
    return new RegisterUseCase(prismaUsersRepository)
}
