import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { AuthenticateUseCase } from '@/use-cases/authenticate'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials'

export async function authenticate(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })
  const { email, password } = registerBodySchema.parse(request.body)
  try {
    const prismaUsersRepository = new PrismaUsersRepository()
    const registerUseCase = new AuthenticateUseCase(prismaUsersRepository)

    await registerUseCase.execute({
      email,
      password,
    })
  } catch (error) {
    if(error instanceof InvalidCredentialsError){
        return reply.status(400).send({message: error.message})
    }

    throw error
  }
  return reply.status(200).send()
}
