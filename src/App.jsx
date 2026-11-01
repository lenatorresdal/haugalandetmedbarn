import { useState } from "react";
import { activities, categories } from "./activities.js";
import useFavorites from "./useFavorites.js";
import About from "./components/About.jsx";
import ActivityCard from "./components/ActivityCard.jsx";

const municipalities = ["Alle steder", ...new Set(activities.map((activity) => activity.municipality))];

function Brand() {
  return (
    <span className="brand">
      Haugalandet med barn
    </span>
  );
}

export default function App() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Alle aktiviteter");
  const [municipality, setMunicipality] = useState("Alle steder");
  const onlySaved = category === "Mine favoritter";
  const [favorites, toggleFavorite] = useFavorites();
  const normalizedQuery = query.toLocaleLowerCase("nb");
  const shown = activities.filter(
    (activity) =>
      (municipality === "Alle steder" || activity.municipality === municipality) &&
      (onlySaved
        ? favorites.has(activity.id)
        : category === "Alle aktiviteter" || activity.category === category) &&
      `${activity.title} ${activity.description} ${activity.place ?? ""} ${activity.locations?.map((location) => location.place).join(" ") ?? ""} ${activity.municipality} ${activity.category}`
        .toLocaleLowerCase("nb")
        .includes(normalizedQuery),
  );

  return (
      <main>
        <section className="explore" id="aktiviteter">
          <div className="heading">
            <div>
              <h2>Hva har dere lyst til i dag?</h2>
              <p>Aktiviteter for deg i foreldrepermisjon – finn lokale tilbud og små opplevelser du kan dele med babyen din.</p>
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
          <div className="filter-label" id="place-filter-label">Sted</div>
          <div className="filters" role="group" aria-labelledby="place-filter-label">
            {municipalities.map((item) => (
              <button
                key={item}
                className={`filter ${municipality === item ? "active" : ""}`}
                aria-pressed={municipality === item}
                onClick={() => setMunicipality(item)}
              >
                {item}
              </button>
            ))}
          </div>
          <div className="filter-label" id="activity-filter-label">Aktivitet</div>
          <div className="filters" role="group" aria-labelledby="activity-filter-label">
            {[...categories, "Mine favoritter"].map((item) => (
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
            {shown.length} {shown.length === 1 ? "aktivitet" : "aktiviteter"}
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
                {onlySaved
                  ? "Ingen favoritter å vise. Lagre aktiviteter med hjertet, eller prøv et annet sted eller søk."
                  : "Ingen treff akkurat nå. Prøv et annet sted, en annen kategori eller et annet søk."}
              </div>
            )}
          </div>
        </section>
        <About />
        <footer>
          <Brand />
          <p>
            Laget for små mennesker og deres store. ♡<br />
            En uavhengig guide til aktiviteter med barn på Haugalandet.
          </p>
        </footer>
      </main>
  );
}
