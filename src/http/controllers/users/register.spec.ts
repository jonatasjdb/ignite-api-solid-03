import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '@/app'

describe('Register (e2e)', function () {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to register', async () => {
    const response = await request(app.server).post('/users').send({
      name: 'Jonatas Dias',
      email: 'jonatas@gmail.com',
      password: '123456',
    })

    expect(response.statusCode).toEqual(201)
  })
})
