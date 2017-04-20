export const accountUrlToInstanceUrl = accountUrl => accountUrl.split('/').slice(0, -1).join('/')
export const avatarUrl = function (account) {
  if(account.avatar.startsWith('/')) {
    return account.url.split('/@')[0] + account.avatar
  }
  return account.avatar
}
