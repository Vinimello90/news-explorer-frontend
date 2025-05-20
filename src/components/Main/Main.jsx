import { About } from "./components/About/About";
import { News } from "./components/News/News";

export function Main(props) {
  const { isSearching, showResults, newsData } = props;

  return (
    <main className="main">
      {showResults && <News isSearching={isSearching} newsData={newsData} />}
      <About />
    </main>
  );
}
