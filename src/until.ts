/**
 * Gracefully handles a given Promise factory.
 * @example
 * const [error, data] = await until(() => asyncAction())
 */
export const until = async <
  ErrorType extends any = Error,
  DataType extends any = unknown,
>(
  promise: () => Promise<DataType>,
): Promise<
  { error: ErrorType; data: null } | { error: null; data: DataType }
> => {
  try {
    const data = await promise().catch((error) => {
      throw error
    })
    return { error: null, data }
  } catch (error) {
    return { error, data: null }
  }
}
