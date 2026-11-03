export default function About({ onContact }) {
  return (
    <aside className="about" id="om" aria-labelledby="about-heading">
      <h2 id="about-heading">Nettsiden er under utvikling 🌱</h2>
      <p>
        Målet med denne nettsiden er å gjøre det enklere for barnefamilier å
        finne aktiviteter og opplevelser på Haugalandet.
      </p>
      <p>
        Siden er fortsatt under utvikling, og jeg setter stor pris på tips og
        tilbakemeldinger underveis.
      </p>
      <p>
        <strong>
          Vet du om en aktivitet som mangler, har forslag til forbedringer eller
          har oppdaget noe som ikke stemmer?
        </strong>{" "}
        Da vil jeg veldig gjerne høre fra deg.
      </p>
      <p>Tusen takk for at du bidrar!</p>
      <p>- Lena</p>
      <button className="primary-button" onClick={onContact}>
        Send meg et tips
      </button>
    </aside>
  );
}
