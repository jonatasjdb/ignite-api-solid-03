import { expect, test, describe, it, beforeEach } from 'vitest'
import { AuthenticateUseCase } from './authenticate'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { InvalidCredentialsError } from './errors/invalid-credentials'
import { hash } from 'bcryptjs'

let inMemoryUsersRepository: InMemoryUsersRepository
let sut: AuthenticateUseCase

describe('Authenticate Use Case', () => {
    beforeEach(() => {
        inMemoryUsersRepository = new InMemoryUsersRepository()
        sut = new AuthenticateUseCase(inMemoryUsersRepository);
    })
    it('should be able to authenticate', async () => {
        await inMemoryUsersRepository.create({
            name: 'JD',
            email: 'jonatas@gmail.com',
            password: await hash('123456', 6)
        })

        const user = await sut.execute({
            email: 'jonatas@gmail.com',
            password: '123456'
        })

        expect(user.id).toEqual(expect.any(String))
    })

    it('should not be able to authenticate with wrong email', async() => {
        await expect(() =>
            sut.execute({
                email: 'jonatas@gmail.com',
                password: '12345'
            })
        ).rejects.toBeInstanceOf(InvalidCredentialsError)
    })

    it('should not be able to authenticate with wrong password', async() => {
        await inMemoryUsersRepository.create({
            name: 'JD',
            email: 'jonatas@gmail.com',
            password: await hash('123456', 6)
        })

        await expect(() =>
            sut.execute({
                email: 'jonatas@gmail.com',
                password: '123123'
            })
        ).rejects.toBeInstanceOf(InvalidCredentialsError)
    })
})
