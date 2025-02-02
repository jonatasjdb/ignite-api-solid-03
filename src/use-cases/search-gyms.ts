import GymsRepository from '@/repositories/gyms-repository'

interface SearchGymsUseCaseRequest {
  query: string
  page: number
}

export class SearchGymsUseCase {
  constructor(private gymsRepository: GymsRepository) {}

  async execute({ page, query }: SearchGymsUseCaseRequest) {
    return await this.gymsRepository.searchMany(query, page)
  }
}
