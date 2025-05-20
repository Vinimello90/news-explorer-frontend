const dateFrom = new Date(Date.now() - 604800000).toISOString();
const dateNow = new Date().toISOString();

export function getNews(keyword) {
  return fetch(
    `https://nomoreparties.co/news/v2/everything?q=${keyword}&from=${dateFrom}&to=${dateNow}&sortby=relevancy&language=pt&pageSize=100&apiKey=e8f08f2a6b4349fba83b1ead12f0a81f`
  ).then((res) =>
    res.ok ? res.json() : Promise.reject(`Error: ${res.status}`)
  );
}
