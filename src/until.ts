/**
 * Gracefully handles a given Promise factory.
 * @example
 * const [error, data] = await until(() => asyncAction())
 */
export const until = async <DataType = unknown, ErrorType = Error>(promise: () => Promise<DataType>): Promise<[ErrorType, DataType]> => {
  try {
    const data = await promise().catch((error) => {
      throw error
    })
    return [null, data]
  } catch (error) {
    return [error, null]
  }
}
