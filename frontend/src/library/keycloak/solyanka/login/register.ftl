<#import "template.ftl" as layout>
<#macro field name label type autocomplete>
  <div class="registration-field">
    <label for="${name}">${msg(label)}</label>
    <input id="${name}" name="${name}" type="${type}" autocomplete="${autocomplete}" required
      <#if type != 'password'>value="${(register.formData[name])!''}"</#if>
      aria-invalid="${messagesPerField.existsError(name)?c}" aria-describedby="error-${name}" />
    <span id="error-${name}" class="registration-error" aria-live="polite"><#if messagesPerField.existsError(name)>${kcSanitize(messagesPerField.get(name))?no_esc}</#if></span>
  </div>
</#macro>
<@layout.registrationLayout displayMessage=true; section>
  <#if section = "header">
    ${msg("registerTitle")}
  <#elseif section = "form">
    <form id="kc-register-form" action="${url.registrationAction}" method="post" novalidate>
      <@field name="email" label="email" type="email" autocomplete="email" />
      <@field name="username" label="username" type="text" autocomplete="username" />
      <@field name="password" label="password" type="password" autocomplete="new-password" />
      <@field name="password-confirm" label="passwordConfirm" type="password" autocomplete="new-password" />
      <p class="registration-hint">${msg("registrationPasswordHint")}</p>
      <p id="registration-error" class="registration-error" role="alert"></p>
      <button id="register-submit" type="submit">${msg("doRegister")}</button>
      <p class="registration-login"><a href="${url.loginUrl}">${msg("registrationLoginLink")}</a></p>
    </form>
    <script type="module" src="${url.resourcesPath}/js/registration.js"></script>
  </#if>
</@layout.registrationLayout>
