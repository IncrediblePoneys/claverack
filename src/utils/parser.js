export const accountUrlToInstanceUrl = accountUrl => accountUrl.split('/').slice(0, -1).join('/')
