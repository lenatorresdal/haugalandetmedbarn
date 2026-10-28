const scenes = {
  play: <> <rect x="90" y="105" width="45" height="45" rx="4" fill="#af8264"/>
      <rect x="139" y="123" width="38" height="28" rx="3" fill="#829377"/>
      <path d="M95 100l18-31 19 31" fill="#d4a776"/>
      <circle cx="227" cy="108" r="32" fill="#9eae89"/>
      <path d="M204 108h46M227 77v62" stroke="#e2e6cf" strokeWidth="2"/>
      <path d="M188 149q60 17 94-2" stroke="#c1ae91" fill="none" strokeWidth="5"/> </>,
  music: <> <path d="M155 110V54l60-12v57" fill="none" stroke="#7a8066" strokeWidth="7"/>
      <ellipse cx="142" cy="113" rx="17" ry="12" fill="#7a8066"/>
      <ellipse cx="202" cy="101" rx="17" ry="12" fill="#7a8066"/>
      <circle cx="259" cy="126" r="27" fill="#c39171"/>
      <circle cx="259" cy="126" r="20" fill="#e0bb8e"/>
      <path d="M95 72l5-13m-15 5 15 5" stroke="#b39263" strokeWidth="3"/> </>,
  forest: <> <path d="M0 160Q100 100 180 143T360 115V180H0" fill="#afbf9d"/>
      <path d="M125 180q80-50 118-37t-9-33" stroke="#eadfc6" strokeWidth="22" fill="none"/>
      <g fill="#6f8a6a">
      <path d="M50 142V62h5v80zM40 112l13-68 18 68zM278 133V50h5v83zM259 107l22-77 24 77z"/>
      </g>
      <circle cx="111" cy="48" r="18" fill="#f3e9cb"/> </>,
  coffee: <> <ellipse cx="180" cy="149" rx="77" ry="9" fill="#d0c3a8"/>
      <path d="M137 77h76v34q0 33-38 33t-38-33z" fill="#f9f5e9"/>
      <path d="M214 82q36-1 23 27-8 10-23 7" stroke="#f9f5e9" strokeWidth="9" fill="none"/>
      <path d="M163 59q-11-12 0-25m22 25q-11-12 0-25" stroke="#aeaa8e" strokeWidth="3" fill="none"/>
      <ellipse cx="175" cy="78" rx="38" ry="8" fill="#8e7258"/> </>,
  sea: <> <path d="M0 110q90-20 180 0t180 0v70H0" fill="#a3beb7"/>
      <path d="M0 145q90-20 180 0t180 0" stroke="#cbdcd1" strokeWidth="3" fill="none"/>
      <path d="M150 111h80l-17 22h-48z" fill="#6c8577"/>
      <path d="M185 107V38l-33 63z" fill="#fff8e7"/>
      <path d="M190 101V48l36 53z" fill="#c4ab85"/>
      <circle cx="282" cy="40" r="21" fill="#e9d3a0"/> </>,
};

export default function ActivityArt({ scene, background }) {
  return (
    <svg viewBox="0 0 360 180" aria-hidden="true">
      <rect width="360" height="180" fill={background} />
      {scenes[scene]}
    </svg>
  );
}
