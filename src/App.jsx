import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { activities, categories } from "./activities.js";
import { ageGroups, isAllAges, matchesAge } from "./ageFilters.js";
import { activityViews, matchesView } from "./participation.js";
import useFavorites from "./useFavorites.js";
import useUrlFilters from "./useUrlFilters.js";
import About from "./components/About.jsx";
import ActivityCard from "./components/ActivityCard.jsx";
import ActivityGrid from "./components/ActivityGrid.jsx";
import ContactForm from "./components/ContactForm.jsx";
import CoastalIllustration from "./components/CoastalIllustration.jsx";

const municipalities = [
  "Alle steder",
  ...[...new Set(activities.map((activity) => activity.municipality))].sort((a, b) => a.localeCompare(b, "nb")),
];

export default function App() {
  const resultsHeading = useRef(null);
  const restoreResultsFocus = useRef(false);
  const agePicker = useRef(null);

  function closeAgePicker(restoreFocus = false) {
    if (!agePicker.current?.open) return;
    agePicker.current.open = false;
    if (restoreFocus) agePicker.current.querySelector("summary").focus();
  }

  useEffect(() => {
    function onPointerDown(event) {
      if (!agePicker.current?.contains(event.target)) closeAgePicker();
    }
    function onKeyDown(event) {
      if (event.key === "Escape" && agePicker.current?.open) {
        event.preventDefault();
        closeAgePicker(true);
      }
    }
    document.addEventListener("pointerdown", onPointerDown, true);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown, true);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  useLayoutEffect(() => {
    if (restoreResultsFocus.current) {
      resultsHeading.current?.focus();
      restoreResultsFocus.current = false;
    }
  });

  function clearFilter(action) {
    restoreResultsFocus.current = true;
    action();
  }

  const [contactRevision, setContactRevision] = useState(0);

  function openContact() {
    setContactRevision((previous) => previous + 1);
  }
  const [{ view, category, municipality, onlySaved, selectedAges }, setFilter] = useUrlFilters();
  const setView = (value) => setFilter("view", value);
  const setCategory = (value) => setFilter("category", value);
  const setMunicipality = (value) => setFilter("municipality", value);
  const setOnlySaved = (value) => setFilter("onlySaved", value);
  const setSelectedAges = (value) => setFilter("selectedAges", value);
  const selectedAgeGroups = ageGroups.filter((group) => selectedAges.includes(group.value));

  function toggleAge(value) {
    setSelectedAges((previous) => previous.includes(value)
      ? previous.filter((age) => age !== value)
      : [...previous, value]);
  }
  const [favorites, toggleFavorite] = useFavorites();
  const [favoriteNotice, setFavoriteNotice] = useState(null);
  const favoriteCount = activities.filter((activity) => favorites.has(activity.id)).length;

  useEffect(() => {
    if (!favoriteNotice) return;
    const timer = setTimeout(() => setFavoriteNotice(null), 3500);
    return () => clearTimeout(timer);
  }, [favoriteNotice]);

  function handleToggleFavorite(id) {
    const title = activities.find((activity) => activity.id === id).title;
    setFavoriteNotice({ text: favorites.has(id)
      ? `${title} er fjernet fra Mine favoritter.`
      : `${title} er lagret i Mine favoritter.` });
    toggleFavorite(id);
  }

  const filtered = activities.filter(
    (activity) =>
      (municipality === "Alle steder" ||
        activity.municipality === municipality) &&
      (!onlySaved || favorites.has(activity.id)) &&
      (category === "Alle aktiviteter" || activity.category === category),
  );

  const ageMatches = filtered
    .filter((activity) => selectedAges.length === 0 || selectedAgeGroups.some((group) => matchesAge(activity, group)))
    .sort((a, b) => selectedAges.length === 0 ? 0 : Number(isAllAges(a)) - Number(isAllAges(b)));
  const shown = ageMatches.filter((activity) => matchesView(activity, view));
  const otherViewCount = ageMatches.length - shown.length;
  const unknownAge = selectedAges.length === 0 ? [] : filtered.filter((activity) => !activity.ageRange && matchesView(activity, view));
  const activeFilters = [
    ...selectedAgeGroups.map((group) => ({ label: group.label, clear: () => toggleAge(group.value) })),
    ...(municipality !== "Alle steder" ? [{ label: municipality, clear: () => setMunicipality("Alle steder") }] : []),
    ...(category !== "Alle aktiviteter" ? [{ label: category, clear: () => setCategory("Alle aktiviteter") }] : []),
    ...(onlySaved ? [{ label: "Mine favoritter", clear: () => setOnlySaved(false) }] : []),
  ];

  function resetFilters() {
    setView("all");
    setSelectedAges([]);
    setMunicipality("Alle steder");
    setCategory("Alle aktiviteter");
    setOnlySaved(false);
  }

  return (
    <main>
      <a className="skip-link" href="#results-heading" onClick={() => resultsHeading.current?.focus()}>Hopp til aktiviteter</a>
      <header className="introduction">
        <CoastalIllustration />
        <h1>Haugalandet <span>med barn</span></h1>
        <p>
          Her finner du en oversikt over små og store opplevelser i nærområdet,
          enten du er i permisjon, har småbarn eller leter etter noe hyggelig å
          gjøre sammen som familie.
        </p>
      </header>
      <section className="explore" id="aktiviteter">
        <div className="heading">
          <h2>Hva har dere lyst til å finne på?</h2>
          <p>Finn noe å gjøre sammen, eller planlegg en fast aktivitet.</p>
        </div>
        <div className="activity-views" role="group" aria-label="Type tilbud">
          {activityViews.map((item) => (
            <button key={item.value} className={view === item.value ? "selected" : ""}
              aria-pressed={view === item.value} onClick={() => setView(item.value)}>{item.value === "experiences" ? "Opplevelser" : item.label}</button>
          ))}
        </div>
        <p className="view-description">
          {view === "experiences"
            ? "Turer, besøk og åpne samlinger – sjekk åpningstider og eventuell bestilling."
            : view === "courses"
              ? "Finn kurs og faste aktiviteter som krever påmelding eller planlegging."
              : "Utforsk både opplevelser, åpne samlinger og kurs med påmelding."}
        </p>
        <div className="filter-controls">
          <div className="age-control">
            <span id="age-filter-label">Barnas alder</span>
            <details className="age-picker" ref={agePicker} onBlur={(event) => {
              if (event.relatedTarget && !event.currentTarget.contains(event.relatedTarget)) closeAgePicker();
            }}>
              <summary aria-labelledby="age-filter-label age-filter-value" aria-describedby="age-guidance">
                <span id="age-filter-value">{selectedAgeGroups.length === 0 ? "Alle aldre" : selectedAgeGroups.map((group) => group.label).join(", ")}</span>
                <span aria-hidden="true">⌄</span>
              </summary>
              <fieldset className="age-options">
                <legend>Velg én eller flere aldersgrupper</legend>
                {ageGroups.filter((group) => group.value !== "all").map((group) => (
                  <label key={group.value}>
                    <input type="checkbox" checked={selectedAges.includes(group.value)} onChange={() => toggleAge(group.value)} />
                    {group.label}
                  </label>
                ))}
                <button type="button" className="reset-filters" onClick={() => setSelectedAges([])}>Velg alle aldre</button>
                <p>Viser aktiviteter som passer minst én valgt aldersgruppe.</p>
                <p id="age-guidance">Alder er veiledende, med mindre arrangøren oppgir en aldersgrense.</p>
                <button type="button" className="primary-button age-done" onClick={() => closeAgePicker(true)}>Ferdig</button>
              </fieldset>
            </details>
          </div>
          <label htmlFor="place-filter">Sted
            <select id="place-filter" value={municipality} onChange={(event) => setMunicipality(event.target.value)}>
              {municipalities.map((place) => <option key={place}>{place}</option>)}
            </select>
          </label>
          <label htmlFor="category-filter" className="category-control">Aktivitetstype
            <select id="category-filter" value={category} onChange={(event) => setCategory(event.target.value)}>
              {categories.map((item) => <option key={item} value={item}>{item === "Alle aktiviteter" ? "Alle typer" : item}</option>)}
            </select>
          </label>
        </div>
        <h2 id="results-heading" className="results-heading sr-only" tabIndex={-1} ref={resultsHeading}>Aktiviteter</h2>
        <div className="results-toolbar">
          <div className="count" role="status" aria-live="polite" aria-atomic="true">
            {shown.length} {shown.length === 1 ? "aktivitet" : "aktiviteter"}
            {unknownAge.length > 0 && ` · ${unknownAge.length} med uavklart alder nedenfor`}
          </div>
          <div className="favorites-actions">
            {onlySaved && <button className="reset-filters" onClick={() => clearFilter(() => setOnlySaved(false))}>Vis alle aktiviteter</button>}
            <button className={`filter favorites-button ${onlySaved ? "active" : ""}`}
              aria-pressed={onlySaved} onClick={() => setOnlySaved((previous) => !previous)}>
              <span aria-hidden="true">{onlySaved ? "♥" : "♡"}</span> Mine favoritter ({favoriteCount})
            </button>
          </div>
        </div>
        {activeFilters.length > 0 && (
          <div className="active-filters" role="group" aria-label="Valgte filtre">
            {activeFilters.map((filter) => (
              <button key={filter.label} className="filter" onClick={() => clearFilter(filter.clear)} aria-label={`Fjern filter: ${filter.label}`}>
                {filter.label} <span aria-hidden="true">×</span>
              </button>
            ))}
            <button className="reset-filters" onClick={() => clearFilter(resetFilters)}>Nullstill filtre</button>
          </div>
        )}
        <div className="favorite-notice" role="status" aria-live="polite" aria-atomic="true">
          {favoriteNotice?.text}
        </div>
        <ActivityGrid id="activity-results">
          {shown.length ? (
            shown.map((activity) => (
              <ActivityCard
                key={activity.id}
                activity={activity}
                saved={favorites.has(activity.id)}
                onToggleFavorite={handleToggleFavorite}
              />
            ))
          ) : (
            <div className="empty">
              <p>{onlySaved
                ? "Ingen favoritter passer valgene dine. Lagre aktiviteter med hjertet, eller fjern et filter."
                : "Ingen aktiviteter passer valgene dine. Prøv å fjerne et filter eller velge en annen type tilbud."}</p>
              <div className="empty-actions">
                {selectedAges.length > 0 && <button className="filter" onClick={() => clearFilter(() => setSelectedAges([]))}>Vis alle aldre</button>}
                {municipality !== "Alle steder" && <button className="filter" onClick={() => clearFilter(() => setMunicipality("Alle steder"))}>Vis alle steder</button>}
                {activeFilters.length > 0 && <button className="filter" onClick={() => clearFilter(resetFilters)}>Nullstill alle valg</button>}
              </div>
            </div>
          )}
        </ActivityGrid>
        {unknownAge.length > 0 && (
          <section className="unknown-age" aria-labelledby="unknown-age-heading">
            <h3 id="unknown-age-heading">Sjekk alder hos arrangøren</h3>
            <p>Disse aktivitetene passer de andre valgene dine, men har uavklart alder.</p>
            <ActivityGrid>
              {unknownAge.map((activity) => <ActivityCard key={activity.id} activity={activity}
                saved={favorites.has(activity.id)} onToggleFavorite={handleToggleFavorite} />)}
            </ActivityGrid>
          </section>
        )}
        {otherViewCount > 0 && (
          <p className="other-offers">
            {otherViewCount} tilbud passer også valgene dine under {view === "experiences" ? "kurs og påmelding" : "opplevelser og åpne tilbud"}.
            {" "}<button className="reset-filters" onClick={() => setView(view === "experiences" ? "courses" : "experiences")}>Vis disse tilbudene</button>
          </p>
        )}
      </section>
      <About onContact={openContact} />
      {contactRevision > 0 && <ContactForm focusRevision={contactRevision} />}
    </main>
  );
}
