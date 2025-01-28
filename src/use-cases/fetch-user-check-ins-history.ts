import CheckInsRepository from '@/repositories/check-ins-repository'

interface FetchUserCheckInsHistoryRequest {
  userId: string
  page: number
}

export class FetchUserCheckInsHistoryUseCase {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({ userId, page }: FetchUserCheckInsHistoryRequest) {
    return await this.checkInsRepository.findManyByUserId(userId, page)
  }
}
