import { AsyncTuple, until } from './until'

describe('until', () => {
  describe('given a callback function that returns a value', () => {
    let result: AsyncTuple

    beforeAll(async () => {
      result = await until(() => Promise.resolve('value'))
    })

    it('should return explicit null as the error', () => {
      expect(result.error).toBe(null)
    })

    it('should return data', () => {
      expect(result.data).toEqual('value')
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
      const { error } = await run()
      expect(error).toEqual(customError)
    })

    it('should return explicit null as data', async () => {
      const { data } = await run()
      expect(data).toBe(null)
    })
  })

  describe('given a Promise that rejects', () => {
    let result: AsyncTuple

    beforeAll(async () => {
      result = await until(() => Promise.reject(new Error('Error message')))
    })

    it('should return the rejected error', () => {
      expect(result.error).toBeInstanceOf(Error)
      expect(result.error).toHaveProperty('message', 'Error message')
    })

    it('should return explicit null as data', () => {
      expect(result.data).toBeNull()
    })
  })
})
