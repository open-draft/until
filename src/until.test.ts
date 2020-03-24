import { until } from './until'

describe('until', () => {
  describe('given a callback function that returns a value', () => {
    let payload: [Error, string]

    beforeAll(async () => {
      payload = await until(() => Promise.resolve('value'))
    })

    it('should return explicit null as the error', () => {
      const [error] = payload
      expect(error).toBe(null)
    })

    it('should return data', () => {
      const [, data] = payload
      expect(data).toEqual('value')
    })
  })

  describe('given a callback function that throws an exception', () => {
    const customError = new Error('Error message')

    const run = () => {
      return until(() => {
        throw customError
      })
    }

    it('should not throw when called', () => {
      expect(run).not.toThrow()
    })

    it('should return caught error as error', async () => {
      const [error] = await run()
      expect(error).toEqual(customError)
    })

    it('should return explicit null as data', async () => {
      const [, data] = await run()
      expect(data).toBe(null)
    })
  })

  describe('given a Promise that rejects', () => {
    let payload: [Error, string]

    beforeAll(async () => {
      payload = await until(() => Promise.reject(new Error('Error message')))
    })

    it('should return the rejected error', () => {
      const [error] = payload
      expect(error).toBeInstanceOf(Error)
      expect(error).toHaveProperty('message', 'Error message')
    })

    it('should return explicit null as data', () => {
      const [, data] = payload
      expect(data).toBeNull()
    })
  })
})
