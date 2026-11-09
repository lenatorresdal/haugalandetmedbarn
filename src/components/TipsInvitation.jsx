export default function TipsInvitation({ onContact }) {
  return (
    <aside className="about" id="om" aria-labelledby="about-heading">
      <h2 id="about-heading">Har du et tips til andre barnefamilier?</h2>
      <p>
        Savner du en aktivitet, har du et forslag, eller har du oppdaget noe som
        ikke stemmer? Send meg gjerne en melding.
      </p>
      <button className="primary-button" onClick={onContact}>
        Send meg et tips
      </button>
    </aside>
  );
}
