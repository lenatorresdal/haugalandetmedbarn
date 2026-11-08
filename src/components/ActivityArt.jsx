import tripScenes from './TripScenes.jsx';
import cafeScenes from './CafeScenes.jsx';

const scenes = {
  iceSkating: <>
    <ellipse cx="180" cy="145" rx="150" ry="25" fill="#f7fbfc" />
    <path d="M75 153q90-25 205 0M98 164q80-20 152-3" fill="none" stroke="#b5cdd5" strokeWidth="2" />
    <circle cx="177" cy="47" r="13" fill="#d0a786" />
    <path d="M162 42q14-23 30 0" fill="#365c46" />
    <path d="M174 66l-15 40 36 5-5-43Z" fill="#b98263" />
    <path d="M168 78l-35 18m53-18 35 8M170 110l-17 28m36-27 21 22" fill="none" stroke="#365c46" strokeWidth="10" strokeLinecap="round" />
    <path d="M141 146h29m31-5h28" stroke="#687268" strokeWidth="4" strokeLinecap="round" />
  </>,
  climbing: <>
    <path d="M65 166 90 20h180l25 146Z" fill="#d1c3a8" />
    {[ [110,45],[165,35],[225,50],[130,85],[200,90],[250,115],[105,130],[170,145] ].map(([x,y]) => <rect key={`${x}-${y}`} x={x} y={y} width="14" height="8" rx="4" fill={x % 3 ? '#829377' : '#b98263'} transform={`rotate(-20 ${x} ${y})`} />)}
    <path d="M185 20v63" stroke="#687268" strokeWidth="2" />
    <circle cx="180" cy="68" r="11" fill="#d0a786" />
    <path d="m174 85-10 30 25 3 2-31Z" fill="#365c46" />
    <path d="m174 89-33-12m47 13 28-29m-45 56-20 27m35-25 24 14" fill="none" stroke="#b98263" strokeWidth="8" strokeLinecap="round" />
  </>,
  bowling: <>
    <path d="M60 180 135 30h90l75 150Z" fill="#d4bc94" />
    <path d="M100 180 150 30m110 150L210 30" stroke="#b59b73" strokeWidth="3" />
    {[155,180,205].map((x) => <g key={x} transform={`translate(${x} 48)`}><path d="M-7 0q7-12 14 0l-2 14q12 23 1 27H-6q-11-4 1-27Z" fill="#fffaf1" /><path d="M-6 8H6m-6 5H6" stroke="#b98263" strokeWidth="3" /></g>)}
    <circle cx="190" cy="137" r="24" fill="#365c46" />
    <circle cx="185" cy="125" r="3" fill="#e6e9dc" /><circle cx="195" cy="129" r="3" fill="#e6e9dc" /><circle cx="183" cy="135" r="3" fill="#e6e9dc" />
  </>,
  ...tripScenes,
  ...cafeScenes,
  adventure: <>
      <path d="M0 132q90-15 180 0t180-8v56H0Z" fill="#b9c8b2" />
      <path d="M98 180q8-34 67-43t73-29" fill="none" stroke="#eadfc6" strokeWidth="20" />
      <path d="M39 85h70v55H39ZM119 75h65v54h-65ZM250 87h68v49h-68Z" fill="#fff8e7" />
      <path d="M33 85l41-33 41 33ZM113 75l38-31 39 31ZM244 87l40-32 40 32Z" fill="#af8264" />
      <path d="M51 99h14v16H51Zm31 0h14v16H82Zm49-10h14v16h-14Zm27 0h14v16h-14Zm105 12h14v16h-14Zm27 0h14v16h-14Z" fill="#a3beb7" />
      <path d="M70 140v-23h15v23M145 129v-20h15v20" fill="#657f70" />
      <path d="M221 129V64" stroke="#7a8066" strokeWidth="5" />
      <circle cx="221" cy="57" r="26" fill="#829377" />
      <path d="M164 142l26-8 24 8 25-8v31l-25 8-24-8-26 8Z" fill="#fff8e7" stroke="#c1ae91" strokeWidth="2" strokeLinejoin="round" />
      <path d="M190 134v31m24-23v31" stroke="#d9c9b1" strokeWidth="2" />
      <path d="M175 154q13-16 28 0t24-6" fill="none" stroke="#bf9278" strokeWidth="2" strokeDasharray="3 4" />
      <path d="M221 144l8 8m0-8-8 8" stroke="#657f70" strokeWidth="3" strokeLinecap="round" />
    </>,
  dokken: <>
      <path d="M0 111h360v69H0Z" fill="#a3beb7" />
      <path d="M0 135l95-13 228 10 37 48H0Z" fill="#b9c8b2" />
      <path d="M30 81h92v62H30Z" fill="#fff8e7" />
      <path d="M22 82l54-39 54 39Z" fill="#af8264" />
      <path d="M142 76h65v61h-65Z" fill="#bf9278" />
      <path d="M136 77l38-34 39 34Z" fill="#655b48" />
      <path d="M225 94h89v48h-89Z" fill="#eadfc6" />
      <path d="M217 94l52-32 53 32Z" fill="#829377" />
      <path d="M43 96h18v22H43Zm47 0h18v22H90Zm63-7h14v18h-14Zm28 0h14v18h-14Zm56 17h16v18h-16Zm48 0h16v18h-16Z" fill="#a3beb7" stroke="#fff8e7" strokeWidth="2" />
      <path d="M69 143v-33h15v33m83-6v-23h16v23m75 5v-27h17v27" fill="#657f70" />
      <path d="M92 180q35-34 103-34t82 34" fill="#eadfc6" />
      <path d="M0 156l53-7-12 15H12Z" fill="#af8264" />
      <path d="M8 174h36m279-22h27" stroke="#cbdcd1" strokeWidth="3" strokeLinecap="round" />
    </>,
  vikingFarm: <>
      <path d="M0 111q80-19 180 0t180-9v78H0Z" fill="#afbf9d" />
      <path d="M47 94h214v56H47Z" fill="#af8264" />
      <path d="M32 96l49-57h139l57 57Z" fill="#829377" />
      <path d="M45 89l41-42h129l44 42Z" fill="#9eae89" />
      <path d="M54 101v44m26-44v44m27-44v44m97-44v44m27-44v44m23-44v44" stroke="#926b51" strokeWidth="3" />
      <path d="M126 150v-38q24-28 48 0v38" fill="#655b48" />
      <path d="M117 148v-39l33-23 33 23v39" fill="none" stroke="#eadfc6" strokeWidth="5" />
      <path d="M71 42l-9-13m158 13 10-13" stroke="#655b48" strokeWidth="5" strokeLinecap="round" />
      <path d="M119 180l22-30h22l37 30" fill="#eadfc6" />
      <circle cx="288" cy="136" r="23" fill="#bf9278" stroke="#eadfc6" strokeWidth="4" />
      <path d="M288 114v44m-22-22h44" stroke="#eadfc6" strokeWidth="3" />
      <circle cx="288" cy="136" r="6" fill="#7a8066" />
    </>,
  historyCenter: <>
      <path d="M0 102q100-23 180 5t180-5v78H0Z" fill="#b9c8b2" />
      <path d="M251 89V50h48v42" fill="#d0c3a8" />
      <path d="M245 51l30-21 30 21ZM259 32V13h18v25" fill="#7a8066" />
      <path d="M54 116q100-78 239 0v31H54Z" fill="#af8264" />
      <path d="M48 113q116-84 251 0" fill="none" stroke="#829377" strokeWidth="14" strokeLinecap="round" />
      <path d="M71 119q99-58 204 0v22H71Z" fill="#a3beb7" />
      <path d="M101 104v37m32-48v48m32-53v53m33-50v50m33-40v40m-158-20h200" stroke="#657f70" strokeWidth="3" />
      <path d="M151 147v-31h31v31" fill="#435e57" />
      <path d="M124 180l31-33h24l54 33" fill="#eadfc6" />
      <path d="M40 151l-3-54 17-7 10 59Z" fill="#c1ae91" />
      <path d="M45 104l8 6-7 7 9 7-7 9" fill="none" stroke="#7a8066" strokeWidth="2" />
      <circle cx="293" cy="152" r="17" fill="#bf9278" />
      <path d="M293 140v24m-12-12h24" stroke="#eadfc6" strokeWidth="3" />
    </>,
  minigolf: <>
      <path d="M0 145q90-30 180-5t180-10v50H0Z" fill="#bdceb3" />
      <path d="M101 157l34-99h84l45 99Z" fill="#af8264" />
      <path d="M110 151l30-86h74l40 86Z" fill="#829377" />
      <ellipse cx="178" cy="85" rx="7" ry="3" fill="#435e57" />
      <path d="M178 83V34l29 10-29 9" fill="#bf9278" stroke="#657f70" strokeWidth="2" strokeLinejoin="round" />
      <path d="M247 70l-28 69 17 5" fill="none" stroke="#657f70" strokeWidth="5" strokeLinecap="round" />
      <circle cx="192" cy="134" r="5" fill="#fff8e7" />
      <path d="M55 143V86M44 122l13-54 17 54ZM284 134V82M270 115l17-55 17 55Z" fill="#6f8a6a" />
    </>,
  trampoline: <>
      <rect width="360" height="180" fill="#e7e9df" />
      <path d="M0 137h360v43H0Z" fill="#cbd9cc" />
      <path d="M30 28v109M330 28v109M30 28h300" fill="none" stroke="#9caf9f" strokeWidth="5" strokeLinecap="round" />
      <path d="M50 30v102M76 30v102M102 30v102M128 30v102M154 30v102M180 30v102M206 30v102M232 30v102M258 30v102M284 30v102M310 30v102M32 54h296M32 80h296M32 106h296" stroke="#cfdbcf" strokeWidth="1" />
      <path d="M73 151l-4 17M286 151l5 17" stroke="#657f70" strokeWidth="6" strokeLinecap="round" />
      <ellipse cx="180" cy="145" rx="123" ry="21" fill="#829377" />
      <ellipse cx="180" cy="142" rx="103" ry="13" fill="#526e65" />
      <path d="M84 142h18M258 142h18M180 126v7M180 151v7M111 131l10 6M239 149l10 5M111 153l10-6M239 136l10-5" stroke="#cbdcd1" strokeWidth="2" strokeLinecap="round" />
      <ellipse cx="181" cy="143" rx="26" ry="4" fill="#435e57" />
      <circle cx="180" cy="55" r="13" fill="#dbb28b" />
      <path d="M167 54q-2-18 14-17 15 1 12 17l-9-9q-6 8-17 9Z" fill="#655b48" />
      <path d="M174 65v7h12v-7" fill="#dbb28b" />
      <path d="M168 73q12-7 24 0l4 25h-32Z" fill="#bf9278" />
      <path d="M168 76l-17-12-10-14M192 76l17-12 10-14" fill="none" stroke="#dbb28b" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M170 98l-14 15-12-5M188 98l14 15 12-5" fill="none" stroke="#657f70" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M141 107l-5-2M216 107l5-2" stroke="#f9f5e9" strokeWidth="7" strokeLinecap="round" />
      <path d="M175 59q5 4 10 0" fill="none" stroke="#926b51" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M122 88l-6 12M238 88l6 12M128 116l-5 7M232 116l5 7" stroke="#afbf9d" strokeWidth="3" strokeLinecap="round" />
    </>,
  playCenter: <>
      <rect width="360" height="180" fill="#eeeade" />
      <path d="M0 140h360v40H0Z" fill="#d0ddce" />
      <path d="M24 140h312" stroke="#bdcdb9" strokeWidth="3" />
      <rect x="69" y="45" width="104" height="96" rx="7" fill="#cbdcd1" />
      <path d="M79 55h84v77H79ZM79 93h84M107 55v77M135 55v77" fill="none" stroke="#9ab6a7" strokeWidth="2" />
      <path d="M83 56l76 72M83 80l52 48M107 56l52 48M159 56l-76 72M135 56l-52 48M159 80l-52 48" stroke="#b3c9bc" strokeWidth="1" />
      <path d="M69 139V46h104v93M69 94h104" fill="none" stroke="#657f70" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M91 139v-33m23 33v-33M91 116h23M91 128h23" stroke="#af8264" strokeWidth="5" strokeLinecap="round" />
      <path d="M176 81c33 0 27 55 64 55h28" fill="none" stroke="#bf9278" strokeWidth="25" strokeLinecap="round" />
      <path d="M176 78c33 0 27 55 64 55h28" fill="none" stroke="#e0bb8e" strokeWidth="16" strokeLinecap="round" />
      <rect x="64" y="38" width="114" height="12" rx="6" fill="#829377" />
      <rect x="222" y="143" width="87" height="20" rx="8" fill="#829377" />
      <g>
        <circle cx="234" cy="144" r="6" fill="#d4a776" />
        <circle cx="248" cy="148" r="6" fill="#bf9278" />
        <circle cx="262" cy="142" r="6" fill="#f9f5e9" />
        <circle cx="276" cy="147" r="6" fill="#a3beb7" />
        <circle cx="291" cy="143" r="6" fill="#d4a776" />
      </g>
      <rect x="39" y="144" width="29" height="22" rx="4" fill="#bf9278" />
      <path d="M42 140l12-19 12 19Z" fill="#d4a776" />
      <circle cx="202" cy="46" r="10" fill="#dbb28b" />
      <path d="M197 58l-8 23 19 6 4-24Z" fill="#829377" />
      <path d="M193 81l13 13 10-2M201 64l16 8M198 82l-10 13" fill="none" stroke="#dbb28b" strokeWidth="6" strokeLinecap="round" />
    </>,
  swimKids: <>
      <rect width="360" height="94" fill="#e6ede8" />
      <path d="M0 30h360M0 58h360M0 86h360M30 0v94M60 0v94M90 0v94M120 0v94M150 0v94M180 0v94M210 0v94M240 0v94M270 0v94M300 0v94M330 0v94" stroke="#c7d6d0" />
      <rect y="84" width="360" height="13" fill="#f9f5e9" />
      <rect y="97" width="360" height="8" fill="#729b9b" />
      <rect y="105" width="360" height="75" fill="#9bc8ce" />
      <path d="M0 109h360" stroke="#dceef0" strokeWidth="3" />
      <path d="M43 126V79a8 8 0 0 1 16 0v18M76 126V79a8 8 0 0 1 16 0v18M43 109h33M43 121h33" fill="none" stroke="#657f80" strokeWidth="4" strokeLinecap="round" />
      <path d="M96 157h238" stroke="#e5eee4" strokeWidth="5" strokeDasharray="12 9" strokeLinecap="round" />
      <ellipse cx="197" cy="134" rx="70" ry="7" fill="#83b7bf" />
      <path d="M156 124l-27-5-16 8M158 131l-27 1-16 9" fill="none" stroke="#dbb28b" strokeWidth="8" strokeLinecap="round" />
      <path d="M151 120q26-8 49 3l-4 13-45-6Z" fill="#657f70" />
      <path d="M194 122l19-8 13 7-16 14-16 1Z" fill="#dbb28b" />
      <circle cx="225" cy="106" r="15" fill="#dbb28b" />
      <path d="M210 104a15 15 0 0 1 30-2l-15-5Z" fill="#bf9278" />
      <path d="M212 105l24 3" stroke="#657f80" strokeWidth="3" />
      <rect x="225" y="103" width="12" height="7" rx="3" fill="#e4f1ee" stroke="#657f80" strokeWidth="2" />
      <path d="M231 115q4 2 7-1" fill="none" stroke="#926b51" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M204 126l26 3 27-9M189 123l-7-18 22-17" fill="none" stroke="#dbb28b" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M104 116l-6-5M105 134l-9 2M261 112l4-6M269 121l7-2" stroke="#e4f1ee" strokeWidth="3" strokeLinecap="round" />
      <path d="M132 141h40M190 145h35M246 138h31M42 155h30" stroke="#dceef0" strokeWidth="3" strokeLinecap="round" />
    </>,
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
      <rect width="360" height="94" fill="#e6ede8" />
      <path d="M0 30h360M0 58h360M0 86h360M30 0v94M60 0v94M90 0v94M120 0v94M150 0v94M180 0v94M210 0v94M240 0v94M270 0v94M300 0v94M330 0v94" stroke="#c7d6d0" strokeWidth="1" />
      <rect y="84" width="360" height="13" fill="#f9f5e9" />
      <rect y="97" width="360" height="8" fill="#729b9b" />
      <rect y="105" width="360" height="75" fill="#9bc8ce" />
      <path d="M0 109h360" stroke="#dceef0" strokeWidth="3" />
      <path d="M43 126V79a8 8 0 0 1 16 0v18M76 126V79a8 8 0 0 1 16 0v18M43 109h33M43 121h33" fill="none" stroke="#657f80" strokeWidth="4" strokeLinecap="round" />
      <ellipse cx="183" cy="137" rx="63" ry="8" fill="#83b7bf" />
      <path d="M142 100q20-17 41 0l9 35h-59Z" fill="#657f70" />
      <path d="M156 85v13q7 7 14 0V85" fill="#dbb28b" />
      <circle cx="163" cy="69" r="19" fill="#dbb28b" />
      <path d="M144 71q-5-27 19-27 23 0 20 24l-11-13q-9 13-28 16Z" fill="#655b48" />
      <path d="M168 77q4 4 8-1" fill="none" stroke="#926b51" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M194 105q9-7 20 0l10 20-28 5-8-14Z" fill="#e0bb8e" />
      <circle cx="207" cy="92" r="13" fill="#e0bb8e" />
      <path d="M202 80q1-7 7-4" fill="none" stroke="#af8264" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M201 97q5 5 10 0" fill="none" stroke="#926b51" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M196 118l22-2 6 10-25 5Z" fill="#bf9278" />
      <path d="M145 106q10 27 53 20M179 104q10 12 37 5" fill="none" stroke="#dbb28b" strokeWidth="10" strokeLinecap="round" />
      <path d="M197 107l-10-6M216 106l9-5" stroke="#e0bb8e" strokeWidth="5" strokeLinecap="round" />
      <path d="M126 137q19-4 35 0t35 0t37 0" fill="none" stroke="#dceef0" strokeWidth="3" strokeLinecap="round" />
      <path d="M111 139h35M160 148h46M219 137h34M279 151h30M66 163h49M230 168h41" fill="none" stroke="#dceef0" strokeWidth="3" strokeLinecap="round" />
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
};

export default function ActivityArt({ scene, background }) {
  return (
    <svg viewBox="0 0 360 180" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <rect width="360" height="180" fill={background} />
      {scenes[scene]}
    </svg>
  );
}
