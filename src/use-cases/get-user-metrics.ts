import CheckInsRepository from '@/repositories/check-ins-repository'

interface GetUserMetricsUseCaseRequest {
  userId: string
}

export class GetUserMetricsUseCase {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({ userId }: GetUserMetricsUseCaseRequest) {
    return await this.checkInsRepository.countByUserId(userId)
  }
}
