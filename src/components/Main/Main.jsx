import { About } from "./components/About/About";
import { NewsCardList } from "./components/NewsCardList/NewsCardList";

export function Main() {
  return (
    <main className="main">
      <NewsCardList />
      <About />
    </main>
  );
}
