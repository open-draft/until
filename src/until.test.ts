import { until } from './until'

describe('until', () => {
  describe('given a callback function that returns a value', () => {
    const run = () => until(() => Promise.resolve('value'))

    it('should return explicit null as the first argument', async () => {
      const [error] = await run()
      expect(error).toBe(null)
    })

    it('should return a data as the second argument', async () => {
      const [, data] = await run()
      expect(data).toEqual('value')
    })
  })

  describe('given a callback function that throws an exception', () => {
    const customError = new Error('Error message')

    const run = () =>
      until(() => {
        throw customError
      })

    it('should not throw when called', () => {
      expect(run).not.toThrow()
    })

    it('should return caught error as the first argument', async () => {
      const [error] = await run()
      expect(error).toEqual(customError)
    })

    it('should return explicit null as the second argument', async () => {
      const [, data] = await run()
      expect(data).toBe(null)
    })
  })
})
