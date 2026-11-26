import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { activities, categories } from "./activities.js";
import { ageGroups, isAllAges, matchesAge } from "./ageFilters.js";
import { activityViews, matchesView } from "./participation.js";
import { fitsParentalLeave } from "./parentalLeave.js";
import useFavorites from "./useFavorites.js";
import useUrlFilters from "./useUrlFilters.js";
import TipsInvitation from "./components/TipsInvitation.jsx";
import ActivityCard from "./components/ActivityCard.jsx";
import ActivityGrid from "./components/ActivityGrid.jsx";
import ContactForm from "./components/ContactForm.jsx";
import HeartIcon from "./components/icons/HeartIcon.jsx";
import ArrowIcon from "./components/icons/ArrowIcon.jsx";

const municipalities = [
  "Alle steder",
  ...[...new Set(activities.map((activity) => activity.municipality))].sort((a, b) => a.localeCompare(b, "nb")),
];

export default function App() {
  const [sharedId, setSharedId] = useState(() =>
    typeof window === "undefined" ? null : new URLSearchParams(window.location.search).get("aktivitet"),
  );
  useEffect(() => {
    const restore = () => setSharedId(new URLSearchParams(window.location.search).get("aktivitet"));
    window.addEventListener("popstate", restore);
    return () => window.removeEventListener("popstate", restore);
  }, []);
  const sharedActivity = activities.find((activity) => activity.id === sharedId);
  function showAllActivities() {
    const url = new URL(window.location.href);
    url.searchParams.delete("aktivitet");
    window.history.pushState(window.history.state, "", url.pathname + url.search + url.hash);
    setSharedId(null);
  }
  const resultsHeading = useRef(null);
  const exploreSection = useRef(null);
  const restoreResultsFocus = useRef(false);
  const agePicker = useRef(null);

  useLayoutEffect(() => {
    if (!window.initialActivityAnchor) return;
    window.initialActivityAnchor = false;
    window.history.replaceState(window.history.state, "", `${window.location.pathname}${window.location.search}#aktiviteter`);
    exploreSection.current?.scrollIntoView?.({ behavior: "instant", block: "start" });
  }, []);

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

  const [contactRevision, setContactRevision] = useState(() =>
    typeof window !== "undefined" && new URLSearchParams(window.location.search).get("kontakt") === "1" ? 1 : 0,
  );

  function openContact() {
    setContactRevision((previous) => previous + 1);
  }
  const [{ view, category, municipality, onlySaved, parentalLeaveOnly, selectedAges }, updateFilter] = useUrlFilters();
  const setFilter = (key, value) => {
    if (sharedActivity) showAllActivities();
    updateFilter(key, value);
  };
  const setView = (value) => setFilter("view", value);
  const setCategory = (value) => setFilter("category", value);
  const setMunicipality = (value) => setFilter("municipality", value);
  const setOnlySaved = (value) => setFilter("onlySaved", value);
  const setParentalLeaveOnly = (value) => setFilter("parentalLeaveOnly", value);
  const setSelectedAges = (value) => setFilter("selectedAges", value);
  const selectedAgeGroups = ageGroups.filter((group) => selectedAges.includes(group.value));
  const hasAgeFilter = selectedAgeGroups.length > 0;
  const hasPlaceFilter = municipality !== "Alle steder";
  const hasCategoryFilter = category !== "Alle aktiviteter";

  function toggleAge(value) {
    setSelectedAges((previous) => previous.includes(value)
      ? previous.filter((age) => age !== value)
      : [...previous, value]);
  }
  const [favorites, toggleFavorite] = useFavorites();
  const favoriteCount = activities.filter((activity) => favorites.has(activity.id)).length;

  function handleToggleFavorite(id) {
    if (onlySaved && favorites.has(id)) restoreResultsFocus.current = true;
    toggleFavorite(id);
  }

  const filtered = activities.filter(
    (activity) =>
      (!hasPlaceFilter ||
        activity.municipality === municipality) &&
      (!onlySaved || favorites.has(activity.id)) &&
      (!parentalLeaveOnly || fitsParentalLeave(activity)) &&
      (!hasCategoryFilter || activity.category === category),
  );

  const ageMatches = filtered
    .filter((activity) => selectedAges.length === 0 || selectedAgeGroups.some((group) => matchesAge(activity, group)))
    .sort((a, b) => selectedAges.length === 0 ? 0 : Number(isAllAges(a)) - Number(isAllAges(b)));
  const shown = sharedActivity ? [sharedActivity] : ageMatches.filter((activity) => matchesView(activity, view));
  const otherViewCount = sharedActivity ? 0 : ageMatches.length - shown.length;
  const otherView = view === "experiences" ? "courses" : "experiences";
  const otherViewName = view === "experiences" ? "kurs" : otherViewCount === 1 ? "opplevelse" : "opplevelser";
  const unknownAge = sharedActivity || selectedAges.length === 0
    ? []
    : filtered.filter((activity) => !activity.ageRange && matchesView(activity, view));
  const activeFilters = [
    ...selectedAgeGroups.map((group) => ({ label: group.label, clear: () => toggleAge(group.value) })),
    ...(hasPlaceFilter ? [{ label: municipality, clear: () => setMunicipality("Alle steder") }] : []),
    ...(hasCategoryFilter ? [{ label: category, clear: () => setCategory("Alle aktiviteter") }] : []),
    ...(parentalLeaveOnly ? [{ label: "I permisjon", clear: () => setParentalLeaveOnly(false) }] : []),
    ...(onlySaved ? [{ label: "Mine favoritter", clear: () => setOnlySaved(false) }] : []),
  ];

  function resetFilters() {
    setView("all");
    setSelectedAges([]);
    setMunicipality("Alle steder");
    setCategory("Alle aktiviteter");
    setOnlySaved(false);
    setParentalLeaveOnly(false);
  }

  return (
    <div className="app-shell">
      <a className="skip-link" href="#results-heading" onClick={() => resultsHeading.current?.focus()}>Hopp til aktiviteter</a>
      <header className="introduction">
        <h1>
          <span className="sr-only">Haugalandet med barn</span>
          <img src="/logo.svg" alt="" width="503" height="100" />
        </h1>
      </header>
      <main className="home-main">
        <section className="explore" id="aktiviteter" ref={exploreSection}>
          {sharedActivity && <div className="shared-activity-notice" role="status">
            <span>Du ser en delt aktivitet. Gå til oversikten for å bruke filtrene.</span>
            <button className="reset-filters" onClick={() => clearFilter(showAllActivities)}>Til aktivitetsoversikten</button>
          </div>}
          {!sharedActivity && <>
            <div className="activity-views" role="group" aria-label="Vis aktiviteter">
              {activityViews.map((item) => (
                <button key={item.value} className={view === item.value ? "selected" : ""}
                  aria-pressed={view === item.value} onClick={() => setView(item.value)}>{item.label}</button>
              ))}
            </div>
            <div className="filter-controls">
              <div className="age-control">
                <span id="age-filter-label">Barnas alder</span>
                <details className="age-picker" ref={agePicker} onBlur={(event) => {
                  if (event.relatedTarget && !event.currentTarget.contains(event.relatedTarget)) closeAgePicker();
                }}>
                  <summary className={hasAgeFilter ? "filter-value-selected" : undefined}
                    aria-labelledby="age-filter-label age-filter-value" aria-describedby="age-guidance">
                    <span id="age-filter-value">{hasAgeFilter ? selectedAgeGroups.map((group) => group.label).join(", ") : "Alle aldre"}</span>
                    <ArrowIcon direction="down" />
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
                <select id="place-filter" className={hasPlaceFilter ? "filter-value-selected" : undefined}
                  value={municipality} onChange={(event) => setMunicipality(event.target.value)}>
                  {municipalities.map((place) => <option key={place}>{place}</option>)}
                </select>
              </label>
              <label htmlFor="category-filter">Aktivitetstype
                <select id="category-filter" className={hasCategoryFilter ? "filter-value-selected" : undefined}
                  value={category} onChange={(event) => setCategory(event.target.value)}>
                  {categories.map((item) => <option key={item} value={item}>{item === "Alle aktiviteter" ? "Alle typer" : item}</option>)}
                </select>
              </label>
            </div>
          </>}
          <h2 id="results-heading" className="results-heading sr-only" tabIndex={-1} ref={resultsHeading}>Aktiviteter</h2>
          <div className="results-toolbar">
            <div className="count" role="status" aria-live="polite" aria-atomic="true">
              {shown.length === 0 && otherViewCount > 0 ? "0 treff i denne visningen" : `${shown.length} ${shown.length === 1 ? "aktivitet" : "aktiviteter"}`}
              {unknownAge.length > 0 && ` · ${unknownAge.length} med uavklart alder nedenfor`}
            </div>
            {!sharedActivity && <div className="results-actions">
              <button type="button" className={`filter parental-leave-filter${parentalLeaveOnly ? " active" : ""}`}
                aria-pressed={parentalLeaveOnly} onClick={() => setParentalLeaveOnly((previous) => !previous)}>I permisjon</button>
              <button className={`filter favorites-button ${onlySaved ? "active" : ""}`}
                aria-pressed={onlySaved} onClick={() => setOnlySaved((previous) => !previous)}>
                <HeartIcon filled={onlySaved} /> Mine favoritter ({favoriteCount})
              </button>
              {onlySaved && <button className="reset-filters" onClick={() => clearFilter(() => setOnlySaved(false))}>Vis alle aktiviteter</button>}
            </div>}
          </div>
          {!sharedActivity && activeFilters.length > 0 && (
            <div className="active-filters" role="group" aria-label="Valgte filtre">
              {activeFilters.map((filter) => (
                <button key={filter.label} className="filter" onClick={() => clearFilter(filter.clear)} aria-label={`Fjern filter: ${filter.label}`}>
                  {filter.label} <span aria-hidden="true">×</span>
                </button>
              ))}
              <button className="reset-filters" onClick={() => clearFilter(resetFilters)}>Nullstill filtre</button>
            </div>
          )}
          <ActivityGrid id="activity-results">
            {shown.length ? (
              shown.map((activity) => (
                <ActivityCard
                  key={activity.id}
                  activity={activity}
                  initiallyOpen={Boolean(sharedActivity)}
                  saved={favorites.has(activity.id)}
                  onToggleFavorite={handleToggleFavorite}
                />
              ))
            ) : (
              <div className="empty">
                <p>{otherViewCount > 0
                  ? "Andre tilbud passer filtrene dine."
                  : onlySaved
                    ? "Ingen favoritter passer valgene dine. Lagre aktiviteter med hjertet, eller fjern et filter."
                    : unknownAge.length > 0
                      ? "Ingen treff med bekreftet alder. Se mulige treff nedenfor."
                      : "Ingen aktiviteter passer valgene dine. Prøv å fjerne et filter."}</p>
                <div className="empty-actions">
                  {otherViewCount > 0 ? (
                    <button className="primary-button" onClick={() => clearFilter(() => setView(otherView))}>Se {otherViewCount} {otherViewName} som passer</button>
                  ) : <>
                    {hasAgeFilter && <button className="filter" onClick={() => clearFilter(() => setSelectedAges([]))}>Vis alle aldre</button>}
                    {hasPlaceFilter && <button className="filter" onClick={() => clearFilter(() => setMunicipality("Alle steder"))}>Vis alle steder</button>}
                    {activeFilters.length > 0 && <button className="filter" onClick={() => clearFilter(resetFilters)}>Nullstill alle valg</button>}
                  </>}
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
          {otherViewCount > 0 && shown.length > 0 && (
            <p className="other-offers">
              <span>{otherViewCount} tilbud passer også valgene dine under {view === "experiences" ? "kurs og påmelding" : "opplevelser og åpne tilbud"}.</span>
              {" "}<button className="reset-filters" onClick={() => clearFilter(() => setView(otherView))}>Vis disse tilbudene <ArrowIcon /></button>
            </p>
          )}
        </section>
        <TipsInvitation onContact={openContact} />
        {contactRevision > 0 && <ContactForm focusRevision={contactRevision} />}
      </main>
      <footer className="site-footer">
        <nav aria-label="Lenker nederst på siden">
          <a href="/personvern">Personvern</a>
          <a href="https://www.instagram.com/haugalandetmedbarn/">Instagram</a>
          <button type="button" className="footer-link-button" data-analytics-settings hidden>
            Analyseinnstillinger
          </button>
        </nav>
      </footer>
    </div>
  );
}
