const scenes = {
  library: <>
      <path d="M0 133q90-18 180-4t180-1v52H0Z" fill="#b9c8b2"/>
      <path d="M155 180l37-49h27l55 49" fill="#eadfc6"/>
      <rect x="69" y="51" width="220" height="84" fill="#d0c3a8"/>
      <rect x="63" y="46" width="232" height="8" rx="1" fill="#7a8066"/>
      <rect x="139" y="58" width="142" height="69" fill="#a3beb7"/>
      <path d="M143 60h134v18H143Z" fill="#cbdcd1"/>
      <path d="M166 58v69M194 58v69M222 58v69M250 58v69M139 85h142M139 106h142" stroke="#657f70" strokeWidth="3"/>
      <rect x="135" y="82" width="150" height="8" fill="#af8264"/>
      <rect x="193" y="108" width="28" height="27" fill="#526e55"/>
      <path d="M207 109v24" stroke="#a3beb7" strokeWidth="2"/>
      <path d="M77 59l25-3 24 8-8 23-39-3ZM78 89l38 3 13 16-7 22-45-3Z" fill="#b4a58e"/>
      <path d="M90 65l12 11 12-8M90 98v19l19-11M82 121l29 3" fill="none" stroke="#d9ceba" strokeWidth="3" strokeLinecap="round"/>
      <rect x="54" y="132" width="93" height="12" rx="6" fill="#829377"/>
      <rect x="239" y="132" width="65" height="12" rx="6" fill="#829377"/>
      <ellipse cx="106" cy="162" rx="45" ry="5" fill="#9eae89"/>
      <path d="M72 143q18-9 34 0 17-9 34 0v17q-18-7-34 1-17-8-34-1Z" fill="#af8264"/>
      <path d="M76 140q16-7 30 1 15-8 30-1v15q-16-6-30 1-15-7-30-1Z" fill="#fff8e7"/>
      <path d="M106 142v14M82 145l16 2M114 147l15-2" fill="none" stroke="#c1ae91" strokeWidth="1.5" strokeLinecap="round"/>
    </>,
  swim: <>
      <path d="M0 118q45-14 90 0t90 0t90 0t90 0v62H0Z" fill="#a3beb7" />
      <ellipse cx="182" cy="120" rx="60" ry="18" fill="#d4a776" />
      <ellipse cx="182" cy="116" rx="36" ry="9" fill="#dce9e5" />
      <circle cx="182" cy="87" r="19" fill="#dbb28b" />
      <path d="M156 115q26-30 52 0" fill="#829377" />
      <circle cx="257" cy="85" r="18" fill="#e0bb8e" />
      <path d="M240 81q17 8 34 0M257 67q-10 18 0 36" fill="none" stroke="#fff8e7" strokeWidth="2" />
      <path d="M55 145q25-9 50 0t50 0M214 151q25-9 50 0t50 0" fill="none" stroke="#cbdcd1" strokeWidth="3" />
    </>,
  play: <>
      <ellipse cx="180" cy="151" rx="106" ry="9" fill="#d9c9b1"/>
      <rect x="82" y="112" width="38" height="36" rx="4" fill="#af8264"/>
      <rect x="120" y="116" width="35" height="32" rx="4" fill="#829377"/>
      <path d="M83 106l18-30 18 30z" fill="#d4a776"/>
      <path d="M92 129h18M101 120v18" stroke="#eee1cf" strokeWidth="3" strokeLinecap="round"/>
      <rect x="171" y="140" width="58" height="9" rx="4" fill="#af8264"/>
      <path d="M200 137V66" stroke="#c1ae91" strokeWidth="6" strokeLinecap="round"/>
      <rect x="173" y="125" width="54" height="13" rx="6" fill="#829377"/>
      <rect x="179" y="110" width="42" height="13" rx="6" fill="#d4a776"/>
      <rect x="185" y="95" width="30" height="13" rx="6" fill="#bf9278"/>
      <circle cx="200" cy="81" r="10" fill="#e0bb8e"/>
      <circle cx="264" cy="127" r="22" fill="#9eae89"/>
      <path d="M244 119q20 9 40 0M264 105q-13 22 0 44" fill="none" stroke="#e2e6cf" strokeWidth="3"/>
    </>,
  music: <>
      <ellipse cx="182" cy="148" rx="91" ry="12" fill="#d2c2ac"/>
      <path d="M128 137q12-18 46-15l26 14q5 12-11 12h-56q-17-1-5-11Z" fill="#657f70"/>
      <path d="M144 87q17-14 35 0l9 43h-54Z" fill="#829377"/>
      <circle cx="161" cy="67" r="18" fill="#dbb28b"/>
      <path d="M143 69q-7-28 18-28 24 0 20 25l-10-13q-9 13-28 16Z" fill="#655b48"/>
      <path d="M178 106q14-11 31-1l12 22q-13 12-33 1Z" fill="#e0bb8e"/>
      <circle cx="205" cy="91" r="13" fill="#dbb28b"/>
      <path d="M199 79q7-7 12 0" fill="none" stroke="#af8264" strokeWidth="3" strokeLinecap="round"/>
      <path d="M145 103q15 27 46 17M177 97q9 13 24 12" fill="none" stroke="#829377" strokeWidth="10" strokeLinecap="round"/>
      <path d="M188 120l8 1M201 109l7-2" stroke="#dbb28b" strokeWidth="7" strokeLinecap="round"/>
      <path d="M234 77V47l24-5v28" fill="none" stroke="#7a8066" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
      <ellipse cx="228" cy="78" rx="8" ry="6" fill="#7a8066"/>
      <ellipse cx="252" cy="71" rx="8" ry="6" fill="#7a8066"/>
      <path d="M110 84V63l12 5" fill="none" stroke="#bf9278" strokeWidth="4" strokeLinecap="round"/>
      <ellipse cx="104" cy="85" rx="7" ry="5" fill="#bf9278"/>
      <path d="M255 118q-5-7-10-2-5 6 10 14 15-8 10-14-5-5-10 2Z" fill="#bf9278"/>
    </>,
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
    <svg viewBox="0 0 360 180" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <rect width="360" height="180" fill={background} />
      {scenes[scene]}
    </svg>
  );
}
