export function validateRegistration(values) {
    const errors = {};
    if (!values.username.trim()) errors.username = 'Введите логин';
    else if (values.username.length < 3) errors.username = 'Логин должен содержать не менее 3 символов';
    if (!values.email.trim()) errors.email = 'Введите Email';
    else if (!/^[a-z\d!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z\d!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z\d](?:[a-z\d-]*[a-z\d])?\.)+[a-z\d](?:[a-z\d-]*[a-z\d])?$/i.test(values.email)) {
        errors.email = 'Введите корректный Email, например name@example.ru';
    }
    if (!values.password) errors.password = 'Введите пароль';
    else if (Array.from(values.password).length < 8 || !/\p{L}/u.test(values.password) || !/[0-9]/.test(values.password)) {
        errors.password = 'Пароль должен содержать не менее 8 символов, буквы и цифры';
    }
    if (!values['password-confirm']) errors['password-confirm'] = 'Подтвердите пароль';
    else if (values.password !== values['password-confirm']) errors['password-confirm'] = 'Пароли не совпадают';
    return errors;
}

export function setupRegistration(form, { request = fetch, navigate = (url) => location.assign(url), storage } = {}) {
    const fields = ['username', 'email', 'password', 'password-confirm'];
    const errorBox = form.querySelector('#registration-error');
    const button = form.querySelector('[type="submit"]');
    const showErrors = (errors) => {
        for (const name of fields) {
            form.querySelector(`#error-${name}`).textContent = errors[name] || '';
            form.elements.namedItem(name).setAttribute('aria-invalid', String(Boolean(errors[name])));
        }
    };
    form.noValidate = true;
    form.addEventListener('input', (event) => {
        if (!fields.includes(event.target.name)) return;
        const values = Object.fromEntries(new FormData(form));
        const errors = validateRegistration(values);
        for (const name of [event.target.name, ...(event.target.name === 'password' ? ['password-confirm'] : [])]) {
            form.querySelector(`#error-${name}`).textContent = errors[name] || '';
            form.elements.namedItem(name).setAttribute('aria-invalid', String(Boolean(errors[name])));
        }
    });
    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        if (button.disabled) return;
        errorBox.hidden = true;
        const errors = validateRegistration(Object.fromEntries(new FormData(form)));
        showErrors(errors);
        if (Object.keys(errors).length) {
            form.elements.namedItem(Object.keys(errors)[0]).focus();
            return;
        }
        let returnUrl;
        try { returnUrl = (storage ?? sessionStorage).getItem('solyanka.authReturnUrl'); } catch { /* Native fallback below. */ }
        if (!returnUrl) {
            // Keep Keycloak in charge when the original authentication URL is unavailable.
            HTMLFormElement.prototype.submit.call(form);
            return;
        }
        button.disabled = true;
        form.setAttribute('aria-busy', 'true');
        try {
            const response = await request(form.action, {
                method: 'POST', body: new URLSearchParams(new FormData(form)),
                credentials: 'same-origin', redirect: 'manual',
            });
            if (response.type === 'opaqueredirect') {
                // A new OIDC request on the application consumes the newly created SSO session.
                // Never fetch the cross-origin callback: its authorization code belongs to the browser.
                const destination = new URL(returnUrl);
                destination.searchParams.set('registration', 'success');
                navigate(destination.href);
                return;
            }
            if (!response.ok) throw new Error('Registration unavailable');
            const page = new DOMParser().parseFromString(await response.text(), 'text/html');
            const nextForm = page.querySelector('#kc-register-form');
            if (!nextForm) throw new Error('Unexpected registration response');
            form.action = nextForm.action;
            const serverErrors = {};
            for (const name of fields) serverErrors[name] = nextForm.querySelector(`#error-${name}`)?.textContent.trim();
            showErrors(serverErrors);
            const globalError = page.querySelector('.alert-error, .alert-danger, .pf-m-danger');
            if (globalError) errorBox.textContent = globalError.textContent.trim();
            errorBox.hidden = !globalError && Object.values(serverErrors).some(Boolean);
            form.querySelector('[aria-invalid="true"]')?.focus();
        } catch {
            errorBox.textContent = 'Ошибка регистрации на сервере. Попробуйте ещё раз.';
            errorBox.hidden = false;
        } finally {
            button.disabled = false;
            form.removeAttribute('aria-busy');
        }
    });
}

const registrationForm = document.querySelector('#kc-register-form');
if (registrationForm) setupRegistration(registrationForm);
