export default function About({ onContact }) {
  return (
    <aside className="about" id="om" aria-labelledby="about-heading">
      <h2 id="about-heading">
        Vil du bidra til å gjøre denne guiden enda bedre?
      </h2>
      <p>
        Målet med denne nettsiden er å gjøre det enklere for barnefamilier å
        finne aktiviteter og opplevelser på Haugalandet. Vet du om en morsom
        aktivitet, har forslag til forbedringer eller har oppdager noe som ikke
        stemmer? Da vil jeg veldig gjerne høre fra deg!
      </p>
      <p>- Lena</p>
      <button className="primary-button" onClick={onContact}>
        Send meg et tips
      </button>
    </aside>
  );
}
