const statusEl = document.getElementById("status");
const loginBtn = document.getElementById("login-btn");

const keycloak = new Keycloak({
    url: CONFIG.KEYCLOAK_URL,
    realm: CONFIG.REALM,
    clientId: CONFIG.CLIENT_ID,
});

keycloak
    .init({
        onLoad: "login-required",        // при заходе проверить активную сессию
        pkceMethod: "S256",         // <-- PKCE
        redirectUri: window.location.href,
    })
    .then((authenticated) => {
        if (authenticated) {
            // Сохраняем токен (п.2 диаграммы) — дальше им ходим на Spring
            sessionStorage.setItem("access_token", keycloak.token);
            statusEl.textContent = "Вы вошли ✔ Переходим в приложение...";
            setTimeout(() => (window.location.href = CONFIG.APP_URL), 600);
        } else {
            statusEl.textContent = "Для продолжения войдите в аккаунт";
            loginBtn.hidden = false;
        }
    })
    .catch(() => {
        statusEl.textContent = "Не удалось связаться с сервером авторизации";
    });

loginBtn.addEventListener("click", () => keycloak.login());

// П.3: пример запроса на ресурс-сервер (Spring):
//
//   const res = await fetch("https://ВАШ_SPRING/api/products", {
//       headers: { Authorization: "Bearer " + sessionStorage.getItem("access_token") }
//   });
//
// Токен обновлять так: await keycloak.updateToken(30) перед запросом.