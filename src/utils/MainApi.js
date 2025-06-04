import { getToken } from "./token";

class MainApi {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl;
  }

  _checkResponse(res) {
    return res.ok ? res.json(res) : Promise.reject({ statusCode: res.status });
  }

  register(user) {
    return fetch(`${this._baseUrl}/signup`, {
      method: "POST",
      headers: {
        Accept: "aplication/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify(user),
    }).then(this._checkResponse);
  }

  authorize(user) {
    return fetch(`${this._baseUrl}/signin`, {
      method: "POST",
      headers: {
        Accept: "aplication/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify(user),
    }).then(this._checkResponse);
  }

  getCurrentUser() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: {
        Accept: "aplication/json",
        Authorization: `Bearer ${getToken()}`,
      },
    }).then(this._checkResponse);
  }

  getArticles() {
    return fetch(`${this._baseUrl}/articles`, {
      method: "GET",
      headers: {
        Accept: "aplication/json",
        Authorization: `Bearer ${getToken()}`,
      },
    }).then(this._checkResponse);
  }

  createArticle(article) {
    return fetch(`${this._baseUrl}/articles`, {
      method: "POST",
      headers: {
        Accept: "aplication/json",
        "content-type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify(article),
    }).then(this._checkResponse);
  }

  removeArticle(articleId) {
    return fetch(`${this._baseUrl}/articles/${articleId}`, {
      method: "DELETE",
      headers: {
        Accept: "aplication/json",
        Authorization: `Bearer ${getToken()}`,
      },
    }).then(this._checkResponse);
  }
}

export const mainApi = new MainApi({
  baseUrl: "https://api.newsexplorer.protechadvanced.com",
});
