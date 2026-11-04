function Cup({ x, y }) {
  return <g transform={`translate(${x} ${y})`}>
    <ellipse cx="18" cy="31" rx="27" ry="4" fill="#c1ae91" />
    <path d="M0 8h36v10q0 13-18 13T0 18Z" fill="#fff8e7" />
    <path d="M36 11q16-2 12 9-3 7-13 4" fill="none" stroke="#fff8e7" strokeWidth="4" />
    <ellipse cx="18" cy="8" rx="18" ry="4" fill="#8e7258" />
    <path d="M12-1q-5-7 0-14m12 14q-5-7 0-14" fill="none" stroke="#aeaa8e" strokeWidth="2" strokeLinecap="round" />
  </g>;
}

const cafeScenes = {
  babyCinema: <>
    <rect x="48" y="20" width="264" height="94" rx="5" fill="#657f70" />
    <rect x="56" y="28" width="248" height="78" rx="2" fill="#fff8e7" />
    <path d="M167 44l37 23-37 23Z" fill="#bf9278" />
    <path d="M0 146h360v34H0Z" fill="#c1ae91" />
    <path d="M35 162v-26q0-18 19-18h27q19 0 19 18v26m161 0v-26q0-18 19-18h27q19 0 19 18v26" fill="#af8264" />
    <path d="M138 128h65q0 26-30 26t-35-26Z" fill="#829377" />
    <path d="M171 128V98q30 0 32 30Z" fill="#cbdcd1" />
    <path d="M138 128l-9-15h-11m36 41-9 13m44-13 10 13" fill="none" stroke="#657f70" strokeWidth="4" strokeLinecap="round" />
    <circle cx="145" cy="169" r="7" fill="#655b48" />
    <circle cx="200" cy="169" r="7" fill="#655b48" />
  </>,
  parentTraining: <>
    <path d="M0 140h360v40H0Z" fill="#cbdcd1" />
    <rect x="65" y="140" width="230" height="22" rx="11" fill="#829377" />
    <circle cx="130" cy="57" r="15" fill="#dbb28b" />
    <path d="M115 56q0-22 17-20 18 1 13 20l-10-10Z" fill="#655b48" />
    <path d="M120 76h24l16 37-37 8Z" fill="#bf9278" />
    <path d="M130 117l37 8-7 23m-30-30-14 28h-18" fill="none" stroke="#657f70" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M141 84l21 15 17-10" fill="none" stroke="#dbb28b" strokeWidth="7" strokeLinecap="round" />
    <ellipse cx="244" cy="145" rx="30" ry="9" fill="#eadfc6" />
    <path d="M219 137q15-13 34-1l9 10h-45Z" fill="#d4a776" />
    <circle cx="256" cy="125" r="11" fill="#dbb28b" />
    <path d="M253 129q4 3 7-1" fill="none" stroke="#926b51" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M220 133l-9-8m33 5-7-7" stroke="#dbb28b" strokeWidth="5" strokeLinecap="round" />
  </>,
  oasenCafePlay: <>
    <path d="M0 136h360v44H0Z" fill="#d9c9b1" />
    <rect x="30" y="30" width="300" height="106" rx="6" fill="#f9f5e9" />
    <path d="M177 30v106" stroke="#d0c3a8" strokeWidth="4" />
    <path d="M39 49h127" stroke="#c1ae91" strokeWidth="5" />
    <path d="M45 33h115v19H45Z" fill="#829377" />
    <path d="M53 33v19m18-19v19m18-19v19m18-19v19m18-19v19m18-19v19" stroke="#cbdcd1" strokeWidth="8" />
    <path d="M60 107h82m-69 0v40m56-40v40" stroke="#af8264" strokeWidth="5" strokeLinecap="round" />
    <Cup x={78} y={73} />
    <rect x="202" y="107" width="99" height="36" rx="13" fill="#cbdcd1" />
    <rect x="217" y="94" width="24" height="24" rx="3" fill="#bf9278" />
    <path d="M213 91l16-25 16 25Z" fill="#d4a776" />
    <rect x="251" y="107" width="22" height="24" rx="3" fill="#829377" />
    <circle cx="285" cy="117" r="13" fill="#d4a776" />
    <path d="M273 113q12 7 24 0m-12-9q-8 13 0 26" fill="none" stroke="#fff8e7" strokeWidth="2" />
    <path d="M308 133V70h14v63" fill="#eadccf" />
    <path d="M309 76h12m-12 9h12" stroke="#bf9278" strokeWidth="2" />
  </>,
  totalenCafe: <>
    <path d="M0 140h360v40H0Z" fill="#d0c3a8" />
    <rect x="40" y="28" width="103" height="82" rx="3" fill="#a3beb7" />
    <path d="M91 28v82m-51-41h103" stroke="#fff8e7" strokeWidth="5" />
    <path d="M47 100l24-21 25 14 39-28v38H47Z" fill="#cbdcd1" />
    <rect x="188" y="31" width="119" height="96" rx="7" fill="#d9c9b1" />
    <path d="M188 49h119" stroke="#c1ae91" strokeWidth="3" />
    <rect x="210" y="90" width="28" height="27" rx="3" fill="#829377" />
    <path d="M206 87l18-28 18 28Z" fill="#d4a776" />
    <rect x="241" y="98" width="24" height="22" rx="3" fill="#bf9278" />
    <circle cx="281" cy="109" r="11" fill="#a3beb7" />
    <path d="M51 139h119m-103 0v35m87-35v35" stroke="#af8264" strokeWidth="6" strokeLinecap="round" />
    <Cup x={76} y={105} />
    <ellipse cx="144" cy="131" rx="20" ry="4" fill="#c1ae91" />
    <path d="M127 119h34q-2 12-17 12t-17-12Z" fill="#fff8e7" />
    <ellipse cx="144" cy="119" rx="17" ry="4" fill="#eadfc6" />
    <circle cx="144" cy="119" r="3" fill="#bf9278" />
  </>,
  libraryCafe: <>
    <path d="M0 140h360v40H0Z" fill="#cbd2bc" />
    <rect x="35" y="30" width="105" height="105" rx="3" fill="#c1ae91" />
    <path d="M41 65h93m-93 34h93" stroke="#af8264" strokeWidth="5" />
    <path d="M49 38v24m13-24v24m13-24v24m15-24 7 24m13-24v24m12-24v24M49 73v23m14-23v23m12-23v23m14-23v23m14-23 7 23m12-23v23M49 107v22m13-22v22m13-22v22m14-22 7 22m13-22v22m13-22v22" stroke="#829377" strokeWidth="8" />
    <rect x="205" y="25" width="108" height="89" rx="3" fill="#a3beb7" />
    <path d="M259 25v89m-54-45h108" stroke="#fff8e7" strokeWidth="5" />
    <path d="M278 109V72" stroke="#926b51" strokeWidth="3" />
    <circle cx="278" cy="61" r="22" fill="#9eae89" />
    <path d="M152 140h150m-130 0v35m110-35v35" stroke="#af8264" strokeWidth="6" strokeLinecap="round" />
    <Cup x={166} y={105} />
    <path d="M231 124q14-8 28 0 14-8 28 0v13q-14-6-28 0-14-6-28 0Z" fill="#fff8e7" />
    <path d="M259 124v13" stroke="#c1ae91" strokeWidth="2" />
  </>,
  courtyardCafe: <>
    <path d="M0 133h360v47H0Z" fill="#d0c3a8" />
    <path d="M22 34h126v99H22Zm185 0h131v99H207Z" fill="#bf9278" />
    <path d="M22 56h126m-126 24h126m-126 24h126m59-48h131m-131 24h131m-131 24h131" stroke="#d4ac91" strokeWidth="2" />
    <path d="M41 55h37v51H41Zm52 0h37v51H93Zm132 0h37v51h-37Zm53 0h37v51h-37Z" fill="#a3beb7" stroke="#fff8e7" strokeWidth="4" />
    <path d="M148 133V67q29-33 59 0v66" fill="#829377" />
    <path d="M41 24q140 45 275 0" fill="none" stroke="#657f70" strokeWidth="2" />
    <g fill="#f3e9cb">
      <circle cx="75" cy="34" r="4" /><circle cx="116" cy="42" r="4" />
      <circle cx="158" cy="46" r="4" /><circle cx="200" cy="46" r="4" />
      <circle cx="242" cy="41" r="4" /><circle cx="283" cy="32" r="4" />
    </g>
    <path d="M128 145h110m-92 0v30m74-30v30" stroke="#af8264" strokeWidth="6" strokeLinecap="round" />
    <Cup x={157} y={110} />
    <path d="M44 143h27l-4 25H48Z" fill="#af8264" />
    <path d="M57 143v-28m0 17q-25-6-16-20 15-1 16 20m1-7q22-7 17-21-16 1-17 21" fill="#829377" />
    <path d="M286 143h27l-4 25h-19Z" fill="#af8264" />
    <circle cx="299" cy="126" r="19" fill="#9eae89" />
  </>,
};

export default cafeScenes;
