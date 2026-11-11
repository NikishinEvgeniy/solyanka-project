// Keep only the application's return address, never credentials or tokens.
try {
    const destination = new URL(location.href).searchParams.get('redirect_uri');
    if (destination) {
        const url = new URL(destination);
        if (['http:', 'https:'].includes(url.protocol)) {
            url.search = '';
            url.hash = '';
            sessionStorage.setItem('solyanka.authReturnUrl', url.href);
        }
    }
} catch { /* Registration still works through the native Keycloak form. */ }
