import { expect, test, describe, it } from 'vitest'
import { RegisterUseCase } from './register'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists'

describe('Register Use Case', () => {
    it('should be able to register', async () => {
        const inMemoryUsersRepository = new InMemoryUsersRepository()
        const registerUseCase = new RegisterUseCase(inMemoryUsersRepository);

        const user = await registerUseCase.execute({
            name: 'JD',
            email: 'jonatas@gmail.com',
            password: '123456'
        })

        expect(user.id).toEqual(expect.any(String))
    })

    it('should hash user password upon registration', async () => {
        const inMemoryUsersRepository = new InMemoryUsersRepository()
        const registerUseCase = new RegisterUseCase(inMemoryUsersRepository);

        const user = await registerUseCase.execute({
            name: 'JD',
            email: 'jonatas@gmail.com',
            password: '123456'
        })

        const isPasswordCorrectlyHashed = await compare('123456',user.password)

        expect(isPasswordCorrectlyHashed).toBe(true)
    })

    it('should not be able to register with same email twice', async() => {
        const inMemoryUsersRepository = new InMemoryUsersRepository()
        const registerUseCase = new RegisterUseCase(inMemoryUsersRepository);

        const data = {
            name: 'JD',
            email: 'jonatas@gmail.com',
            password: '123456'
        }

        await registerUseCase.execute(data)

        expect(async () => {
            await registerUseCase.execute(data)
        }).rejects.toBeInstanceOf(UserAlreadyExistsError)
    })
})