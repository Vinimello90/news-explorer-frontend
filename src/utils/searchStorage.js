export function setNewsStorage(searchResult) {
  localStorage.setItem("latestResults", JSON.stringify(searchResult));
}

export function getNewsStorage() {
  return localStorage.getItem("latestResults");
}
