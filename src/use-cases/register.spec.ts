import { expect, test, describe, it, beforeEach } from 'vitest'
import { RegisterUseCase } from './register'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists'

let inMemoryUsersRepository: InMemoryUsersRepository
let sut: RegisterUseCase

describe('Register Use Case', () => {
    beforeEach(() => {
        inMemoryUsersRepository = new InMemoryUsersRepository()
        sut = new RegisterUseCase(inMemoryUsersRepository);
    })
    it('should be able to register', async () => {
        const user = await sut.execute({
            name: 'JD',
            email: 'jonatas@gmail.com',
            password: '123456'
        })

        expect(user.id).toEqual(expect.any(String))
    })

    it('should hash user password upon registration', async () => {
        const user = await sut.execute({
            name: 'JD',
            email: 'jonatas@gmail.com',
            password: '123456'
        })

        const isPasswordCorrectlyHashed = await compare('123456',user.password)

        expect(isPasswordCorrectlyHashed).toBe(true)
    })

    it('should not be able to register with same email twice', async() => {
        const data = {
            name: 'JD',
            email: 'jonatas@gmail.com',
            password: '123456'
        }

        await sut.execute(data)

        await expect(async () => {
            await sut.execute(data)
        }).rejects.toBeInstanceOf(UserAlreadyExistsError)
    })
})
