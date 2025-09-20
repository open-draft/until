import { until } from './index.js'

it('resolves with the value returned from the callback', async () => {
  await expect(until(async () => 'value')).resolves.toEqual({
    error: null,
    data: 'value',
  })

  await expect(until(() => Promise.resolve('value'))).resolves.toEqual({
    error: null,
    data: 'value',
  })
})

it('resolves with the error thrown in the callback', async () => {
  await expect(
    until(() => Promise.reject(new Error('error'))),
  ).resolves.toEqual({
    error: new Error('error'),
    data: null,
  })

  await expect(until(() => Promise.reject('custom reason'))).resolves.toEqual({
    error: 'custom reason',
    data: null,
  })
})
