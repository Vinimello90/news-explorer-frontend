import { About } from "./components/About/About";
import { News } from "./components/News/News";

export function Main(props) {
  const {
    setPopup,
    isFreshSearch,
    setIsFreshSearch,
    isLocalData,
    isSearching,
    showResults,
    newsData,
  } = props;

  return (
    <main className="main">
      {showResults && (
        <News
          isLocalData={isLocalData}
          isSearching={isSearching}
          newsData={newsData}
          isFreshSearch={isFreshSearch}
          setIsFreshSearch={setIsFreshSearch}
          setPopup={setPopup}
        />
      )}
      <About />
    </main>
  );
}
