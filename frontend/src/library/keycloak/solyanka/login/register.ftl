<#import "template.ftl" as layout>
<@layout.registrationLayout displayMessage=messagesPerField.exists('global'); section>
    <#if section = "header">
        ${msg("registerTitle")}
    <#elseif section = "form">
        <form id="kc-register-form" action="${url.registrationAction}" method="post">
            <p id="registration-error" role="alert" hidden>${msg("registrationServerError")}</p>
            <#list ['email', 'username', 'password', 'password-confirm'] as field>
                <#assign labels = {'email':'email', 'username':'username', 'password':'password', 'password-confirm':'passwordConfirm'}>
                <div class="registration-field">
                    <label for="${field}">${msg(labels[field])}</label>
                    <input id="${field}" name="${field}" required
                        type="<#if field?starts_with('password')>password<#elseif field == 'email'>email<#else>text</#if>"
                        autocomplete="<#if field?starts_with('password')>new-password<#else>${field}</#if>"
                        <#if field == 'email' || field == 'username'>value="${(register.formData[field])!''}" maxlength="255"</#if>
                        <#if field == 'username'>minlength="3"</#if>
                        <#if field == 'password'>minlength="8" aria-describedby="password-hint error-${field}"<#else>aria-describedby="error-${field}"</#if>
                        aria-invalid="${messagesPerField.existsError(field)?c}">
                    <span id="error-${field}" class="registration-field-error ${properties.kcInputErrorMessageClass!}" aria-live="polite"><#if messagesPerField.existsError(field)>${kcSanitize(messagesPerField.get(field))?no_esc}</#if></span>
                </div>
            </#list>
            <p id="password-hint">${msg("registrationPasswordHint")}</p>
            <button id="kc-register" type="submit">${msg("doRegister")}</button>
            <a class="auth-switch" href="${url.loginUrl}">${msg("registrationBackToLogin")}</a>
        </form>
        <script type="module" src="${url.resourcesPath}/js/registration.js"></script>
    </#if>
</@layout.registrationLayout>
