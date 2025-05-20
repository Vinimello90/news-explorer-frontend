export function getNews(keyword) {
  return fetch(
    `https://nomoreparties.co/news/v2/everytdhing?q=${keyword}&language=pt&sortby=relevance&sortby=publishedat&apiKey=e8f08f2a6b4349fba83b1ead12f0a81f`
  ).then((res) =>
    res.ok ? res.json() : Promise.reject(`Error: ${res.status}`)
  );
}
