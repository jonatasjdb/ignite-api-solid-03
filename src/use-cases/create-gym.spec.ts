import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { CreateGymUseCase } from './create-gym'

describe('Create Gym Use Case', () => {
  let gymsRepository: InMemoryGymsRepository
  let sut: CreateGymUseCase
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new CreateGymUseCase(gymsRepository)

    await gymsRepository.create({
      id: 'gym-01',
      title: 'Acad JS',
      description: '',
      latitude: -19.8592796,
      longitude: -43.9436715,
    })

    vi.useFakeTimers()
  })
  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to create gym', async () => {
    const gym = await sut.execute({
      title: 'JavaScript Gym',
      description: null,
      phone: null,
      latitude: -19.9507174,
      longitude: -43.9751522,
    })

    expect(gym.id).toEqual(expect.any(String))
  })
})
