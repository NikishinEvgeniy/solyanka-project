// The original authorization request contains the client redirect URI.
const registrationReturn = new URL(window.location.href).searchParams.get('redirect_uri')
if (registrationReturn) {
  const target = new URL(registrationReturn)
  if (['http:', 'https:'].includes(target.protocol)) {
    target.pathname = '/'
    target.search = '?registration=success'
    target.hash = ''
    sessionStorage.setItem('solyanka.registrationReturn', target.href)
  }
}
