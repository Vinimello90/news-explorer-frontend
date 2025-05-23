const dateFrom = new Date(Date.now() - 604800000).toISOString();
const dateNow = new Date().toISOString();

export function getNews(keyword) {
  return fetch(
    `https://nomoreparties.co/news/v2/everything?q=${keyword}&from=${dateFrom}&to=${dateNow}&sortby=relevancy&language=pt&pageSize=100&apiKey=3f4fe407078d4a5e963f9853df91bd6d`
  ).then((res) =>
    res.ok ? res.json() : Promise.reject(`Error: ${res.status}`)
  );
}
