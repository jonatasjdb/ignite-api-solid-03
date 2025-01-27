import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { GetUserProfileUseCase } from "./get-user-profile";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

let usersRepository: InMemoryUsersRepository
let sut: GetUserProfileUseCase

describe('Get User Profile Use Case', () => {
    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository()
        sut = new GetUserProfileUseCase(usersRepository)
    })

    it('should be able to get user profile', async() => {
        const createdUser = await usersRepository.create({
            name: 'Jônatas',
            email: 'jonatas@gmail.com',
            password: '123456'
        })

        const user = await sut.execute({
            userId: createdUser.id
        })

        expect(user.name).toEqual('Jônatas')
    })

    it('should not be able to get user profile with wrong id', async() => {
        await expect(() =>
            sut.execute({
                userId: 'non-exiting-id'
            })
        ).rejects.toBeInstanceOf(ResourceNotFoundError)
    })
})
