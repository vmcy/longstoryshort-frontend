const tokenKey = 'oauth2_access_token'
const tokenExpiryKey = 'oauth2_access_token_expiry'

export const authService = {
  async getAccessToken() {
    let token = localStorage.getItem(tokenKey)
    if (!token || authService.isTokenExpired()) {
      token = await authService.refreshToken()
    }
    return token
  },

  async refreshToken() {
    const response = await fetch(
      'https://longstoryshort.auth.ap-southeast-1.amazoncognito.com/oauth2/token',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          grant_type: 'client_credentials',
          client_id: '690lj2ek627eauqk895fsk2366',
          client_secret: 'h80tp6h11235orempk32gp807iq5kn0busfqtqcr3n1qtomq58a',
          scope: 'longstoryshort-identifier/write longstoryshort-identifier/read',
        }),
      },
    )

    if (!response.ok) throw new Error('Failed to refresh token')

    const data = await response.json()
    const token = data.access_token
    const expiresIn = data.expires_in
    const expireTimestamp = ((Date.now() / 1000) | 0) + expiresIn

    localStorage.setItem(tokenKey, token)
    localStorage.setItem(tokenExpiryKey, expireTimestamp)

    return token
  },

  isTokenExpired() {
    const tokenExpiryTimestamp = localStorage.getItem(tokenExpiryKey)
    const currentTimestamp = (Date.now() / 1000) | 0

    if (currentTimestamp >= tokenExpiryTimestamp) {
      return true
    }

    return false
  },

  logout() {
    localStorage.removeItem(tokenKey)
    localStorage.removeItem(tokenExpiryKey)
  },
}
