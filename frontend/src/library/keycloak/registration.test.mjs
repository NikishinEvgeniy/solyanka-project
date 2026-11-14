import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { validateRegistration } from './solyanka/login/resources/js/registration.js'

const valid = { email: 'user+tag@example.ru', username: 'chef', password: 'Recipe12', 'password-confirm': 'Recipe12' }
test('valid registration', () => assert.deepEqual(validateRegistration(valid), {}))
test('all fields required', () => assert.equal(Object.keys(validateRegistration({})).length, 4))
for (const email of ['user', 'user@domain', 'user@@domain.ru', 'user@-domain.ru', 'user name@example.ru']) {
  test(`invalid email: ${email}`, () => assert.ok(validateRegistration({ ...valid, email }).email))
}
for (const password of ['Abc1234', 'abcdefgh', '12345678', 'абвгдеж1']) {
  test(`invalid password: ${password}`, () => assert.ok(validateRegistration({ ...valid, password }).password))
}
test('uppercase letters accepted', () => assert.equal(validateRegistration({ ...valid, password: 'ABCDEFG1', 'password-confirm': 'ABCDEFG1' }).password, undefined))
test('confirmation mismatch', () => assert.ok(validateRegistration({ ...valid, 'password-confirm': 'different1' })['password-confirm']))
test('username length', () => assert.ok(validateRegistration({ ...valid, username: 'ab' }).username))
test('realm enforces password and uniqueness', () => {
  const realm = JSON.parse(readFileSync(new URL('../../../../docker/solyanka-realm.json', import.meta.url)))
  assert.equal(realm.registrationAllowed, true)
  assert.equal(realm.registrationEmailAsUsername, false)
  assert.equal(realm.duplicateEmailsAllowed, false)
  assert.match(realm.passwordPolicy, /length\(8\)/)
  assert.match(realm.passwordPolicy, /digits\(1\)/)
  assert.match(realm.passwordPolicy, /regexPattern/)
  for (const user of realm.users ?? []) {
    for (const credential of user.credentials ?? []) {
      if (credential.type === 'password' && credential.value) {
        assert.equal(validateRegistration({ ...valid, password: credential.value, 'password-confirm': credential.value }).password, undefined,
          `Imported password for ${user.username} must satisfy realm policy`)
      }
    }
  }
})
