import { useState } from "react";
import { activities, categories } from "./activities.js";
import useFavorites from "./useFavorites.js";
import About from "./components/About.jsx";
import ActivityCard from "./components/ActivityCard.jsx";
import ContactForm from "./components/ContactForm.jsx";

const municipalities = [
  "Alle steder",
  ...new Set(activities.map((activity) => activity.municipality)),
];

export default function App() {
  const [contactRevision, setContactRevision] = useState(0);

  function openContact() {
    setContactRevision((previous) => previous + 1);
  }
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Alle aktiviteter");
  const [municipality, setMunicipality] = useState("Alle steder");
  const onlySaved = category === "Mine favoritter";
  const [favorites, toggleFavorite] = useFavorites();
  const normalizedQuery = query.trim().toLocaleLowerCase("nb");
  const shown = activities.filter(
    (activity) =>
      (municipality === "Alle steder" ||
        activity.municipality === municipality) &&
      (onlySaved
        ? favorites.has(activity.id)
        : category === "Alle aktiviteter" || activity.category === category) &&
      `${activity.title} ${activity.description} ${activity.place ?? ""} ${activity.locations?.map((location) => location.place).join(" ") ?? ""} ${activity.municipality} ${activity.category}`
        .toLocaleLowerCase("nb")
        .includes(normalizedQuery),
  );

  return (
    <main>
      <header className="introduction">
        <h1>En uavhengig guide til aktiviteter for barn på Haugalandet</h1>
        <p>
          Her finner du en oversikt over små og store opplevelser i nærområdet,
          enten du er i permisjon, har småbarn eller leter etter noe hyggelig å
          gjøre sammen som familie.
        </p>
      </header>
      <section className="explore" id="aktiviteter">
        <div className="heading">
          <h2>Hva har dere lyst til i dag?</h2>
        </div>
        <div
          className="filters"
          role="group"
          aria-label="Aktivitet"
        >
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
        <div
          className="filters"
          role="group"
          aria-label="Sted"
        >
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

        <div
          className="activity-search"
          role="search"
          aria-label="Søk i aktiviteter"
        >
          <label htmlFor="activity-search">
            Søk etter aktivitet eller sted
          </label>
          <input
            id="activity-search"
            className="search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="For eksempel babysang eller Norheim"
            aria-controls="activity-results"
          />
        </div>
        <div
          className="count"
          role="status"
          aria-live="polite"
          aria-atomic="true"
        >
          {shown.length} {shown.length === 1 ? "aktivitet" : "aktiviteter"}
        </div>
        <div className="grid" id="activity-results">
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
              {normalizedQuery &&
                (municipality !== "Alle steder" ||
                  category !== "Alle aktiviteter") && (
                  <button
                    className="filter search-all"
                    onClick={() => {
                      setMunicipality("Alle steder");
                      setCategory("Alle aktiviteter");
                    }}
                  >
                    Søk etter «{query.trim()}» i alle aktiviteter og steder
                  </button>
                )}
            </div>
          )}
        </div>
      </section>
      <About onContact={openContact} />
      {contactRevision > 0 && <ContactForm key={contactRevision} />}
      <footer>
        <span className="brand">Haugalandet med barn</span>
        <a href="#kontakt" onClick={openContact}>
          Kontakt / Send inn tips
        </a>
      </footer>
    </main>
  );
}
