export type AsyncTuple<
  ErrorType extends any = Error,
  DataType extends any = unknown,
> =
  | {
      error: ErrorType
      data: null
    }
  | { error: null; data: DataType }

/**
 * Gracefully handles a given Promise factory.
 * @template ErrorType The type of the error promise may throw.
 * @template DataType The type of the data promise may return.
 * @param promise function that returns a promise.
 * @example
 * const { error, data } = await until<UserFetchError, User>(() => fetchUser(id))
 */
export const until = async <
  ErrorType extends any = Error,
  DataType extends any = unknown,
>(
  promise: () => Promise<DataType>,
): Promise<AsyncTuple<ErrorType, DataType>> => {
  try {
    const data = await promise().catch((error: ErrorType) => {
      throw error
    })
    return { error: null, data }
  } catch (error) {
    return { error: error as ErrorType, data: null }
  }
}
