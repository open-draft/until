/**
 * Gracefully handles a given Promise factory.
 * @example
 * cosnt [error, data] = await until(() => asyncAction())
 */
export const until = async <DataType, ErrorType>(promise: () => Promise<DataType>): Promise<[ErrorType, DataType]> => {
  try {
    const data = await promise()
    return [null, data]
  } catch (error) {
    return [error, null]
  }
}
