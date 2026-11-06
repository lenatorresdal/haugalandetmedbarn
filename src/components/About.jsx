export default function About({ onContact }) {
  return (
    <aside className="about" id="om" aria-labelledby="about-heading">
      <h2 id="about-heading">
        Vil du bidra til å gjøre denne nettsiden <b>enda</b> bedre?
      </h2>
      <p>
        Vet du om en morsom aktivitet, har du forslag til forbedringer, eller
        har du oppdaget noe som ikke stemmer? Da vil jeg veldig gjerne høre fra
        deg!
      </p>
      <button className="primary-button" onClick={onContact}>
        Send meg et tips
      </button>
    </aside>
  );
}
