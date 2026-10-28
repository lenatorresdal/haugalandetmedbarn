import { useRef, useState } from "react";
import { activities, categories } from "./activities.js";
import useFavorites from "./useFavorites.js";
import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import ActivityCard from "./components/ActivityCard.jsx";

function Brand() {
  return (
    <a className="brand" href="#">
      permliv<span>✳</span>
    </a>
  );
}

export default function App() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Alle aktiviteter");
  const [onlySaved, setOnlySaved] = useState(false);
  const [favorites, toggleFavorite] = useFavorites();
  const activitySection = useRef(null);
  const normalizedQuery = query.toLocaleLowerCase("nb");
  const shown = activities.filter(
    (activity) =>
      (category === "Alle aktiviteter" || activity.category === category) &&
      (!onlySaved || favorites.has(activity.id)) &&
      `${activity.title} ${activity.description} ${activity.place} ${activity.category}`
        .toLocaleLowerCase("nb")
        .includes(normalizedQuery),
  );

  function toggleSavedFilter() {
    setOnlySaved((previous) => !previous);
    activitySection.current?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <>
      <header>
        <Brand />
        <nav>
          <a href="#aktiviteter">Finn aktiviteter</a>
          <a href="#om">Om Permliv</a>
          <button
            className="saved"
            aria-pressed={onlySaved}
            onClick={toggleSavedFilter}
            style={{ background: onlySaved ? "#e4eadb" : undefined }}
          >
            ♡ Mine favoritter <span>{favorites.size}</span>
          </button>
        </nav>
      </header>
      <main>
        <Hero />
        <div className="intro-strip">
          <span>✳ For mammaer og pappaer</span>
          <span>♧ Med plass til de minste</span>
          <span>⌁ Lokalt i Haugesund</span>
        </div>
        <section className="explore" id="aktiviteter" ref={activitySection}>
          <div className="heading">
            <div>
              <div className="eyebrow">Ut av huset, inn i fellesskapet</div>
              <h2>Hva har dere lyst til i dag?</h2>
              <p>Finn et tilbud eller en enkel idé til dagen.</p>
            </div>
            <input
              className="search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Søk etter aktivitet eller sted …"
              aria-label="Søk etter aktivitet eller sted"
            />
          </div>
          <div className="filters" aria-label="Aktivitetskategorier">
            {categories.map((item) => (
              <button
                key={item}
                className={`filter ${category === item ? "active" : ""}`}
                aria-pressed={category === item}
                onClick={() => setCategory(item)}
              >
                {item}
              </button>
            ))}
          </div>
          <div className="count" role="status" aria-live="polite">
            {shown.length} {onlySaved ? "favoritter" : "aktiviteter og ideer"} ·
            Haugesund
          </div>
          <div className="grid">
            {shown.length ? (
              shown.map((activity) => (
                <ActivityCard
                  key={activity.id}
                  activity={activity}
                  saved={favorites.has(activity.id)}
                  onToggleFavorite={toggleFavorite}
                />
              ))
            ) : (
              <div className="empty">
                Ingen treff akkurat nå. Prøv en annen kategori eller et annet
                søk.
              </div>
            )}
          </div>
        </section>
        <About />
        <footer>
          <Brand />
          <p>
            Laget for små mennesker og deres store. ♡<br />
            En uavhengig guide til permisjonslivet i Haugesund.
          </p>
        </footer>
      </main>
    </>
  );
}
