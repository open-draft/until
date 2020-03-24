# `until`

Gracefully handle a Promise using async/await.

## Getting started

### Install

```bash
npm install @open-draft/until
```

### Use

```js
import { until } from '@open-draft/until'

async function(id) {
  const [error, user] = await until(() => fetchUser(id))

  if (error) {
    return handleError(error)
  }

  return user
}
```

### Usage with TypeScript

```ts
import { until } from '@open-draft/until'

interface User {
  firstName: string
  age: number
}

interface UserFetchError {
  type: 'FORBIDDEN' | 'NOT_FOUND'
  message?: string
}

async function(id: string) {
  const [error, user] = await until<User, UserFetchError>(() => fetchUser(id))

  if (error) {
    handleError(error.type, error.message)
  }

  return user.firstName
}
```
