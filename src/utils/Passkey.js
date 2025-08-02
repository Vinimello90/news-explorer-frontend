import {
  startAuthentication,
  startRegistration,
} from "@simplewebauthn/browser";

class Passkey {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl;
  }

  _checkResponse(res) {
    return res.ok ? res.json() : Promise.reject({ statusCode: res.status });
  }

  _verifyRegistration(res) {
    return fetch(`${this._baseUrl}/passkeys/register/verify`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(res),
    }).then((res) => this._checkResponse(res));
  }

  _verifyAuthentication(res) {
    return fetch(`${this._baseUrl}/passkeys/authentication/verify`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(res),
    }).then((res) => this._checkResponse(res));
  }

  _getRegistrationOption() {
    return fetch(`${this._baseUrl}/passkeys/register/options`, {
      method: "POST",
      credentials: "include",
    }).then((res) => this._checkResponse(res));
  }

  _getAuthenticationOption(email) {
    return fetch(`${this._baseUrl}/passkeys/authentication/options`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(email),
    }).then((res) => this._checkResponse(res));
  }

  register() {
    return this._getRegistrationOption()
      .then((options) => startRegistration({ optionsJSON: options }))
      .then((res) => this._verifyRegistration(res));
  }

  signIn(email) {
    return this._getAuthenticationOption(email)
      .then((options) => startAuthentication({ optionsJSON: options }))
      .then((res) => this._verifyAuthentication(res));
  }
}

export const passkey = new Passkey({
  baseUrl: "api.newsexplorer.protechadvanced.com",
});
