// Symbolic activity scenes, matching the existing 360 × 180 card illustrations.
function Tree({ x, y = 65, scale = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${scale})`}>
    <path d="M0 50V0" stroke="#926b51" strokeWidth="7" strokeLinecap="round" />
    <path d="M-25 25-10 0h-9L0-35 19 0h-9l15 25Z" fill="#657f70" />
  </g>;
}

function PicnicTable({ x, y }) {
  return <g transform={`translate(${x} ${y})`} strokeLinecap="round">
    <path d="M-23 0h46m-32 2-9 25M9 2l9 25m-45-10h54" stroke="#926b51" strokeWidth="5" />
    <path d="M-23-2h46" stroke="#c1ae91" strokeWidth="7" />
  </g>;
}

const discoveryScenes = {
  planeSpotting: <>
    <circle cx="285" cy="40" r="21" fill="#e9d3a0" />
    <path d="M0 103q83-30 173-4t187-12v93H0Z" fill="#a3beb7" />
    <path d="m215 106 112-10" stroke="#657f70" strokeWidth="13" />
    <path d="m220 105 10-1m12-1 10-1m12-1 10-1m12-1 10-1m12-1 10-1" stroke="#fff8e7" strokeWidth="2" />
    <g transform="translate(214 51) rotate(-10)" fill="#fff8e7" stroke="#657f70" strokeWidth="1.5" strokeLinejoin="round">
      <path d="m-39 0 31-4 15-21h8L8-3l30 3q8 3 0 6L7 7 0 21h-7l3-15-25-1-11-12h7Z" />
    </g>
    <path d="M0 146q62-50 136-24t109 58H0Z" fill="#829377" />
    <path d="m26 180 45-26 48 26" fill="#eadfc6" />
    <circle cx="116" cy="101" r="10" fill="#dbb28b" />
    <path d="m108 113-5 29h25l-5-29" fill="#b98263" />
    <path d="m110 142-4 20m16-20 7 20m-5-43 13-13" stroke="#365c46" strokeWidth="6" strokeLinecap="round" />
    <path d="m129 101 13 2-2 8-13-3Z" fill="#365c46" />
    <circle cx="158" cy="123" r="8" fill="#dbb28b" />
    <path d="m151 132-4 22h22l-5-22" fill="#e9d3a0" />
    <path d="m153 154-3 13m13-13 5 13m-4-29 15-13" stroke="#365c46" strokeWidth="5" strokeLinecap="round" />
  </>,
  museumTreasure: <>
    <path d="M0 148h360v32H0Z" fill="#d6c5ab" />
    <rect x="43" y="42" width="75" height="91" rx="3" fill="#c1ae91" />
    <rect x="50" y="49" width="61" height="77" fill="#faf9f5" />
    <path d="m57 109 21-32 13 15 12-7v34H57Z" fill="#829377" />
    <rect x="257" y="61" width="44" height="78" rx="3" fill="#926b51" />
    <path d="M264 68h30v20h-30Zm0 27h30v36h-30Z" fill="#b98263" />
    <circle cx="286" cy="112" r="3" fill="#e9d3a0" />
    <path d="M132 151v-40q0-25 30-25t30 25v40Z" fill="#926b51" />
    <path d="M132 113h60v38h-60Z" fill="#b98263" />
    <path d="M146 99v52m32-52v52" stroke="#e9d3a0" strokeWidth="6" />
    <rect x="157" y="117" width="12" height="14" rx="2" fill="#e9d3a0" />
    <path d="m196 96 46 8-8 49-46-9Z" fill="#fff8e7" />
    <path d="m204 108 10 8-11 9 20 7" fill="none" stroke="#829377" strokeWidth="2" strokeDasharray="4 4" />
    <path d="m218 133 9 9m0-9-9 9" stroke="#b98263" strokeWidth="3" />
    <circle cx="223" cy="74" r="15" fill="#dce9e5" fillOpacity=".7" stroke="#365c46" strokeWidth="5" />
    <path d="m233 86 13 19" stroke="#365c46" strokeWidth="7" strokeLinecap="round" />
  </>,
  naturePlay: <>
    <path d="M0 91q79-22 163 0t197-10v99H0Z" fill="#afbf9d" />
    <ellipse cx="269" cy="119" rx="105" ry="32" fill="#a3beb7" />
    <path d="M223 116h39m12 14h48" stroke="#dce9e5" strokeWidth="3" strokeLinecap="round" />
    <Tree x={43} y={60} /><Tree x={312} y={48} scale={.8} />
    <path d="m80 142 95-18" stroke="#926b51" strokeWidth="15" strokeLinecap="round" />
    <path d="m95 147-5 16m70-28 5 16" stroke="#655b48" strokeWidth="6" />
    <circle cx="125" cy="87" r="9" fill="#dbb28b" />
    <path d="m118 98-4 24 23-4-5-22Z" fill="#e9d3a0" />
    <path d="m119 122-13 16m26-19 13 9m-24-23-15-7m25 6 16-13" fill="none" stroke="#365c46" strokeWidth="5" strokeLinecap="round" />
    <PicnicTable x={258} y={151} />
    <path d="m25 169 19-13 14 13m119-9 13-11 12 11" fill="#c1ae91" />
  </>,
  creekPlay: <>
    <path d="M0 100q80-21 177 0t183-6v86H0Z" fill="#afbf9d" />
    <path d="M244 94q-99 25-67 45t-62 41h95q46-26 17-43t68-43Z" fill="#a3beb7" />
    <path d="M226 112h21m-56 28h20m-50 29h26" stroke="#dce9e5" strokeWidth="3" strokeLinecap="round" />
    <Tree x={49} y={58} /><Tree x={305} y={59} />
    <PicnicTable x={102} y={111} />
    <g fill="#8d9787"><ellipse cx="168" cy="146" rx="12" ry="6" /><ellipse cx="199" cy="158" rx="13" ry="6" /><ellipse cx="227" cy="168" rx="11" ry="6" /></g>
    <circle cx="267" cy="104" r="9" fill="#dbb28b" />
    <path d="m258 115-11 19 24 7 6-22Z" fill="#b98263" />
    <path d="m252 135-10 16 15 6m13-17 9 19m-21-38-20 14" fill="none" stroke="#365c46" strokeWidth="6" strokeLinecap="round" />
    <path d="m236 132-24 20" stroke="#926b51" strokeWidth="3" strokeLinecap="round" />
    <path d="m55 163 5-14m-5 6-7-4m14 3 6-7" stroke="#657f70" strokeWidth="3" strokeLinecap="round" />
  </>,
  crabBeach: <>
    <circle cx="281" cy="36" r="20" fill="#e9d3a0" />
    <path d="M0 85q65-18 124 0t125-4 111 0v99H0Z" fill="#a3beb7" />
    <path d="M0 124q76-24 133 15t112 41H0Z" fill="#eadfc6" />
    <path d="m224 99 136 20v17l-136-20Z" fill="#af8264" />
    <path d="M240 115v31m94-16v28" stroke="#655b48" strokeWidth="6" />
    <path d="m237 105 110 16" stroke="#d6b594" strokeWidth="2" />
    <path d="m86 122 7 36h36l7-36Z" fill="#b98263" />
    <ellipse cx="111" cy="122" rx="25" ry="6" fill="#d6b594" />
    <path d="M94 120v-12q17-25 34 0v12" fill="none" stroke="#926b51" strokeWidth="3" />
    <path d="m159 135 44-63" stroke="#926b51" strokeWidth="5" strokeLinecap="round" />
    <ellipse cx="207" cy="66" rx="18" ry="23" transform="rotate(33 207 66)" fill="#dce9e5" fillOpacity=".5" stroke="#657f70" strokeWidth="3" />
    <path d="m193 54 22 24m-24-11 18 18m-7-38 21 23" stroke="#657f70" strokeWidth="1" />
    <g transform="translate(184 155)" stroke="#b98263" strokeWidth="3" strokeLinecap="round" fill="#b98263">
      <ellipse rx="13" ry="8" /><path d="m-10-3-11-12m31 12 11-12m-30 19-12 7m33-7 12 7m-34-1-9 9m31-9 9 9" />
      <path d="m-24-19 1 7 7-4m32 0 7 4 1-7" fill="none" />
    </g>
    <path d="M251 68h33m-64 14h20" stroke="#dce9e5" strokeWidth="3" strokeLinecap="round" />
  </>,
  lakesideGrill: <>
    <path d="M0 83q82-21 177 0t183-7v104H0Z" fill="#afbf9d" />
    <path d="M0 107q85-14 167-1t193-7v81H0Z" fill="#a3beb7" />
    <path d="M0 155q96-41 185-4t175 0v29H0Z" fill="#829377" />
    <Tree x={35} y={51} scale={.8} /><Tree x={323} y={49} scale={.9} />
    <path d="M81 98V60h66v38" fill="#b98263" />
    <path d="m69 61 46-29 45 29Z" fill="#365c46" />
    <path d="M106 98V75h19v23" fill="#655b48" />
    <path d="m223 127 40-7-15 10-20 2Z" fill="#e9d3a0" />
    <PicnicTable x={110} y={147} />
    <path d="m233 145-7 28m23-28 8 28m-30-9h29" stroke="#655b48" strokeWidth="4" strokeLinecap="round" />
    <path d="M219 132h39q-2 22-19 22t-20-22Z" fill="#657f70" />
    <ellipse cx="238" cy="132" rx="21" ry="6" fill="#365c46" />
    <path d="m224 130 28 4m-24-7 25 4" stroke="#c1ae91" strokeWidth="2" />
    <path d="M232 119q-8-8 0-16m12 14q-7-8 0-17" fill="none" stroke="#faf9f5" strokeWidth="3" strokeLinecap="round" />
    <path d="M173 109h31m78-12h25" stroke="#dce9e5" strokeWidth="3" strokeLinecap="round" />
  </>,
  gearLibrary: <>
    <path d="M0 157h360v23H0Z" fill="#d6c5ab" />
    <path d="M73 45v112m214-112v112M66 108h228M66 151h228" stroke="#926b51" strokeWidth="6" strokeLinecap="round" />
    <path d="M87 55q12-19 29 0l4 36H83Z" fill="#829377" />
    <path d="M93 49v-8q9-11 18 0v8m-20 42V65m21 26V65" fill="none" stroke="#365c46" strokeWidth="3" />
    <rect x="92" y="67" width="20" height="16" rx="3" fill="#afbf9d" />
    <path d="M145 87q0-30 25-30t25 30Z" fill="#e9d3a0" />
    <path d="M151 87v9h11m25-9v9h-11m-12-35-4 16m15-16 4 16" fill="none" stroke="#926b51" strokeWidth="3" strokeLinecap="round" />
    <path d="m226 40-2 56m18-56-2 56" stroke="#657f70" strokeWidth="8" strokeLinecap="round" />
    <path d="m223 65 5 0m9 0h5" stroke="#fff8e7" strokeWidth="4" />
    <path d="m258 63 10-16m-12 30 12-20m-10 34 12-22" stroke="#b98263" strokeWidth="4" strokeLinecap="round" />
    <circle cx="109" cy="131" r="17" fill="#b98263" />
    <path d="M92 131h34m-17-17q-14 17 0 34m0-34q14 17 0 34" fill="none" stroke="#eadfc6" strokeWidth="2" />
    <path d="M146 141v-22h18v13h20v10Z" fill="#657f70" />
    <path d="M146 147h42m-34-5v5m24-5v5" stroke="#655b48" strokeWidth="3" strokeLinecap="round" />
    <rect x="209" y="118" width="60" height="19" rx="9" fill="#a3beb7" />
    <path d="M216 127h46" stroke="#657f70" strokeWidth="2" />
    <path d="m219 143 20 0m-10-5v10" stroke="#b98263" strokeWidth="3" strokeLinecap="round" />
  </>,
};

export default discoveryScenes;
