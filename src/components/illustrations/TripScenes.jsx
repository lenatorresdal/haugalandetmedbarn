// Stylised illustrations of the destinations, using the activity cards' palette.
const tripScenes = {
  flowerGarden: <>
    <path d="M0 117q90-23 180-3t180-8v74H0Z" fill="#afbf9d" />
    <path d="M110 180q80-36 64-63t57-35" fill="none" stroke="#eadfc6" strokeWidth="22" />
    <path d="M42 133V35m272 99V30" stroke="#926b51" strokeWidth="7" />
    <g fill="#829377"><circle cx="42" cy="34" r="34" /><circle cx="312" cy="30" r="36" /></g>
    <g fill="#657f70"><ellipse cx="80" cy="128" rx="51" ry="29" /><ellipse cx="277" cy="145" rx="57" ry="30" /></g>
    {[ [47,117],[75,103],[102,119],[61,137],[95,139],[239,135],[269,121],[299,136],[260,155],[291,157] ].map(([x,y]) => (
      <g key={`${x}-${y}`} transform={`translate(${x} ${y})`}>
        <g fill="#c994a5"><circle cx="-5" cy="-3" r="6" /><circle cx="5" cy="-3" r="6" /><circle cy="-8" r="6" /><circle cx="-4" cy="5" r="6" /><circle cx="5" cy="5" r="6" /></g>
        <circle r="3" fill="#f3e9cb" />
      </g>
    ))}
    <path d="M135 128V80q0-12 13-12t13 12v48Z" fill="#af8264" />
    <path d="m137 75 4-14 7 10 8-10 4 15" fill="#926b51" />
    <circle cx="143" cy="83" r="2" fill="#655b48" /><circle cx="153" cy="83" r="2" fill="#655b48" />
    <path d="m144 93 4 4 5-4m-8 12 6 6-6 6" fill="none" stroke="#eadfc6" strokeWidth="2" strokeLinecap="round" />
  </>,
  forestClimbing: <>
    <path d="M0 120q90-24 180 0t180-8v68H0Z" fill="#afbf9d" />
    <path d="M0 180q67-44 130-25t120-9" fill="none" stroke="#eadfc6" strokeWidth="17" />
    <path d="M57 144V29m119 110V22m124 123V27" stroke="#926b51" strokeWidth="12" strokeLinecap="round" />
    <g fill="#829377">
      <circle cx="56" cy="27" r="34" /><circle cx="174" cy="20" r="37" /><circle cx="301" cy="25" r="36" />
    </g>
    <path d="M60 70q58 20 113 0m8-19q58 20 116 0M60 117q58 20 113 0m8-12q58 20 116 0" fill="none" stroke="#657f70" strokeWidth="3" />
    <path d="M76 75v46m24-41v46m24-44v45m24-49v45m48-68v54m24-49v53m24-51v52m24-56v51m16-55v50" stroke="#c1ae91" strokeWidth="2" />
    <path d="m63 119 14 3m9 2 14 3m10 1h14m10-1 14-3m9-2 14-3M184 107l17 3m10 2 17 2m10 0 17-1m10-2 17-3m5-2 12-3" stroke="#af8264" strokeWidth="6" strokeLinecap="round" />
    <path d="M43 119h29m90-2h28m96-12h28" stroke="#655b48" strokeWidth="7" />
    <circle cx="111" cy="81" r="9" fill="#dbb28b" />
    <path d="m104 92-4 21 22 1-4-22Z" fill="#bf9278" />
    <path d="m104 95-13-10m27 10 15-14" fill="none" stroke="#dbb28b" strokeWidth="5" strokeLinecap="round" />
    <path d="m105 113-6 12m17-12 7 14" stroke="#435e57" strokeWidth="6" strokeLinecap="round" />
    <circle cx="240" cy="66" r="10" fill="#dbb28b" />
    <path d="m231 79-3 24 25-1-5-24Z" fill="#657f70" />
    <path d="m233 82-15-14m28 14 17-15" fill="none" stroke="#dbb28b" strokeWidth="5" strokeLinecap="round" />
    <path d="m233 103-7 10m20-11 7 9" stroke="#655b48" strokeWidth="6" strokeLinecap="round" />
  </>,
  lakePaddling: <>
    <circle cx="274" cy="35" r="19" fill="#f3e9cb" />
    <path d="M0 91q55-29 119-4t119-2 122-3v98H0Z" fill="#9eae89" />
    <path d="M0 111q90-17 180-2t180-9v80H0Z" fill="#a3beb7" />
    <path d="M27 100V49m-16 34 18-55 19 55ZM320 98V44m-18 35 20-60 22 60Z" fill="#6f8a6a" />
    <path d="M30 151h34m211-25h48M123 170h99m54-13h36" stroke="#dce9e5" strokeWidth="3" strokeLinecap="round" />
    <path d="M64 126q69 15 143-2l-22 29H89Z" fill="#bf9278" />
    <path d="M69 128q65 13 132-2" fill="none" stroke="#eadfc6" strokeWidth="4" />
    <circle cx="110" cy="96" r="11" fill="#dbb28b" />
    <path d="m101 109-5 20h30l-5-21Z" fill="#657f70" />
    <path d="M102 110h18v15h-18Z" fill="#d4a776" />
    <circle cx="164" cy="101" r="9" fill="#dbb28b" />
    <path d="m156 112-3 17h24l-4-18Z" fill="#d4a776" />
    <path d="m108 116-22 8m78-7 17 4" fill="none" stroke="#dbb28b" strokeWidth="5" strokeLinecap="round" />
    <path d="m88 107 46 45" stroke="#655b48" strokeWidth="4" strokeLinecap="round" />
    <path d="m127 143 13 7 6 13-12-4-10-11Z" fill="#eadfc6" />
    <ellipse cx="273" cy="148" rx="48" ry="7" fill="#657f70" />
    <path d="m258 142 20-3 17 5" fill="none" stroke="#dbb28b" strokeWidth="6" strokeLinecap="round" />
    <path d="M271 139v-31" stroke="#435e57" strokeWidth="10" strokeLinecap="round" />
    <path d="m266 112-3 17h19l-6-18Z" fill="#d4a776" />
    <circle cx="271" cy="96" r="9" fill="#dbb28b" />
    <path d="m272 116 19 5 9-9" fill="none" stroke="#dbb28b" strokeWidth="5" strokeLinecap="round" />
    <path d="m301 96-9 56" stroke="#655b48" strokeWidth="3" />
    <path d="m289 144-2 16q5 6 9 0l1-16Z" fill="#eadfc6" />
  </>,
  farmVisit: <>
    <path d="M0 115q90-30 180 0t180-5v70H0Z" fill="#afbf9d" />
    <path d="M55 82h125v75H55Z" fill="#bf9278" />
    <path d="m43 83 74-53 75 53Z" fill="#657f70" />
    <path d="M98 157v-49h39v49" fill="#655b48" />
    <path d="M218 141h115m-105-17v44m32-44v44m32-44v44m32-44v44" stroke="#af8264" strokeWidth="5" />
    <ellipse cx="260" cy="114" rx="25" ry="16" fill="#fff8e7" />
    <circle cx="286" cy="108" r="10" fill="#655b48" />
    <path d="M247 126v12m23-12v12" stroke="#655b48" strokeWidth="5" strokeLinecap="round" />
  </>,
  vangen: <>
    <path d="M0 95q90-20 180 5t180-10v90H0Z" fill="#afbf9d" />
    <ellipse cx="145" cy="145" rx="126" ry="30" fill="#a3beb7" />
    <path d="M280 156V65m-38 0h76m-55 0v55m35-55v55m-40 3h45" fill="none" stroke="#af8264" strokeWidth="6" strokeLinecap="round" />
    <ellipse cx="126" cy="142" rx="18" ry="9" fill="#bf9278" />
    <circle cx="143" cy="132" r="9" fill="#657f70" />
    <path d="m151 130 10 4-10 3Z" fill="#d4a776" />
    <ellipse cx="75" cy="156" rx="12" ry="6" fill="#d4a776" />
    <circle cx="87" cy="150" r="6" fill="#d4a776" />
    <path d="M42 104V53" stroke="#926b51" strokeWidth="5" />
    <circle cx="42" cy="42" r="28" fill="#829377" />
  </>,
  hillCabin: <>
    <path d="M0 136q75-42 148-56t212 39v61H0Z" fill="#afbf9d" />
    <path d="M0 163q61-6 112-35t113 7l35 45H0Z" fill="#9eae89" />
    <path d="M77 180q-24-22 10-35t48-26q11-8 46-15" fill="none" stroke="#eadfc6" strokeWidth="12" />
    <path d="M177 107V66l33-26 37 26v41Z" fill="#af8264" />
    <path d="M170 68l40-35 44 35" fill="none" stroke="#655b48" strokeWidth="6" strokeLinejoin="round" />
    <path d="M188 99V71l22-19 25 19v28Z" fill="#cbdcd1" />
    <path d="M211 53v46m-23-20h47" stroke="#657f70" strokeWidth="3" />
    <path d="M24 151V77h5v74M8 117l19-72 23 72ZM83 120V58h5v62M67 94l19-64 22 64ZM290 150V75h5v75M272 116l21-74 23 74Z" fill="#6f8a6a" />
    <path d="M134 149l13-5m-20 19 13-5m10-31 13-5" stroke="#c1ae91" strokeWidth="4" strokeLinecap="round" />
    <circle cx="133" cy="40" r="16" fill="#f3e9cb" />
  </>,
  coastalPath: <>
    <path d="M0 83h360v97H0Z" fill="#a3beb7" />
    <path d="M0 110q64-19 123 17t104-10l55-5 78 68H0Z" fill="#afbf9d" />
    <path d="M51 180q-10-32 70-37t100-25" fill="none" stroke="#eadfc6" strokeWidth="14" />
    <path d="M219 117l6-26h17l6 26Z" fill="#fff8e7" />
    <path d="M225 91h17v-9h-17Zm-3-9 11-9 12 9Z" fill="#657f70" />
    <path d="M233 105v12" stroke="#657f70" strokeWidth="4" />
    <path d="M8 146l32-18 19 15-6 17H8Zm268 34 16-30 31-9 37 18v21Z" fill="#b4a58e" />
    <path d="M42 100h37m203 0h47m-24 24h32" stroke="#dce9e5" strokeWidth="3" strokeLinecap="round" />
    <path d="M108 49q8-8 16 0 8-8 16 0m32 13q6-6 12 0 6-6 12 0" fill="none" stroke="#657f70" strokeWidth="2" />
    <circle cx="286" cy="40" r="18" fill="#f3e9cb" />
  </>,
  coastalFort: <>
    <path d="M0 92h360v88H0Z" fill="#a3beb7" />
    <path d="M0 139q88-55 182-22t178 3v60H0Z" fill="#9eae89" />
    <path d="M64 130V85l24-13h112l24 13v45Z" fill="#a5a38e" />
    <path d="M64 85h160l-20-17H87Z" fill="#7a8066" />
    <path d="M84 90h117v9H84Z" fill="#435e57" />
    <path d="M115 130v-20h27v20" fill="#526e55" />
    <path d="M12 151l47-13 22 14-8 28H0ZM246 150l37-18 39 15 38-4v37H239Z" fill="#b4a58e" />
    <path d="M107 180l17-49h19l22 49" fill="#eadfc6" />
    <path d="M252 99h39m15 9h34M22 108h24" stroke="#dce9e5" strokeWidth="3" strokeLinecap="round" />
    <circle cx="287" cy="40" r="19" fill="#f3e9cb" />
    <path d="M231 60q8-8 16 0 8-8 16 0" fill="none" stroke="#657f70" strokeWidth="2" />
  </>,
  visnes: <>
    <path d="M0 114q100-18 180 9t180-6v63H0Z" fill="#b9c8b2" />
    <path d="M68 180q43-51 99-44t87 44" fill="#eadfc6" />
    <path d="M42 97h89v43H42Z" fill="#bf9278" />
    <path d="M35 98l51-34 52 34Z" fill="#7a8066" />
    <path d="M53 109h15v18H53Zm48 0h15v18h-15Z" fill="#fff8e7" />
    <path d="M77 140v-27h17v27" fill="#655b48" />
    <path d="M202 145h48v9h-48ZM210 126h32v19h-32Z" fill="#c1ae91" />
    <path d="M215 126l7-48h12l6 48Z" fill="#829f8d" />
    <circle cx="228" cy="65" r="8" fill="#829f8d" />
    <path d="M222 79l-17-28-5-15m31 44 15 14-7 13" fill="none" stroke="#829f8d" strokeWidth="7" strokeLinecap="round" />
    <path d="M224 57l-6-8m10 6v-11m5 13 7-8" stroke="#829f8d" strokeWidth="2" />
    <path d="M195 34h10l-2-12h-6Z" fill="#af8264" />
    <path d="M197 23q-7-9 3-16 8 9 2 16" fill="#d4a776" />
    <path d="M290 142V88" stroke="#926b51" strokeWidth="5" />
    <circle cx="289" cy="74" r="30" fill="#829377" />
    <circle cx="310" cy="94" r="20" fill="#9eae89" />
  </>,
  islandCabin: <>
    <path d="M0 90h360v90H0Z" fill="#a3beb7" />
    <path d="M0 132q45-38 93-17l39 65H0ZM166 140q59-66 138-23l56 63H143Z" fill="#9eae89" />
    <path d="M87 143h96m-96-5v17m24-17v17m24-17v17m24-17v17m24-17v17" stroke="#af8264" strokeWidth="4" strokeLinecap="round" />
    <path d="M201 133V92l32-26 37 26v41Z" fill="#af8264" />
    <path d="M194 94l39-35 44 35" fill="none" stroke="#655b48" strokeWidth="6" strokeLinejoin="round" />
    <path d="M213 126V96l20-18 24 18v30Z" fill="#cbdcd1" />
    <path d="M234 80v46m-21-24h44" stroke="#657f70" strokeWidth="3" />
    <path d="M184 180l45-43" stroke="#eadfc6" strokeWidth="12" />
    <path d="M15 159h39m243-6h31m-209 16h28" stroke="#dce9e5" strokeWidth="3" strokeLinecap="round" />
    <path d="M49 75q8-8 16 0 8-8 16 0" fill="none" stroke="#657f70" strokeWidth="2" />
  </>,
  kringsja: <>
    <path d="M0 128q74-50 164-13t196-18v83H0Z" fill="#afbf9d" />
    <path d="M45 127V79h97v48Z" fill="#bf9278" />
    <path d="M36 80l57-35 58 35Z" fill="#655b48" />
    <path d="M57 91h18v19H57Zm54 0h18v19h-18Z" fill="#fff8e7" />
    <path d="M84 127v-29h19v29" fill="#657f70" />
    <path d="M113 180q28-42 88-39" fill="none" stroke="#eadfc6" strokeWidth="17" />
    <path d="M211 75l-35 55h69Z" fill="#c1ae91" />
    <path d="M211 73l-18 57h32Z" fill="#af8264" />
    <path d="M206 64l13 18m-7-18-12 18" stroke="#7a8066" strokeWidth="3" />
    <ellipse cx="278" cy="143" rx="23" ry="14" fill="#655b48" />
    <circle cx="299" cy="136" r="9" fill="#435e57" />
    <path d="M264 153v12m24-12v12m10-34 6-4m-11 6-3-7" stroke="#435e57" strokeWidth="4" strokeLinecap="round" />
    <path d="M287 83V44h5v39m-20-12 18-46 19 46Z" fill="#829377" />
  </>,
  lighthouse: <>
    <path d="M0 85h360v95H0Z" fill="#a3beb7" />
    <path d="M0 150l88-36 110-10 93 29 69 47H0Z" fill="#9eae89" />
    <path d="M67 180q65-39 113-52" fill="none" stroke="#eadfc6" strokeWidth="18" />
    <path d="M178 118l6-65h25l7 65Z" fill="#fff8e7" />
    <path d="M180 55h33v-8h-33Zm2-10h29V31h-29Z" fill="#657f70" />
    <path d="M178 31l18-14 19 14Z" fill="#af8264" />
    <path d="M189 35h15v8h-15" fill="#eadfc6" />
    <path d="M192 117V97h10v20" fill="#657f70" />
    <path d="M224 124V86h60v38Z" fill="#fff8e7" />
    <path d="M216 87l37-27 38 27Z" fill="#af8264" />
    <path d="M233 98h13v14h-13Zm25 0h13v14h-13Z" fill="#a3beb7" />
    <path d="M17 115h40m241-12h34M279 151h35" stroke="#dce9e5" strokeWidth="3" strokeLinecap="round" />
    <path d="M56 46q8-8 16 0 8-8 16 0" fill="none" stroke="#657f70" strokeWidth="2" />
  </>,
  lakesideCabin: <>
    <path d="M0 107q100-21 180 4t180-7v76H0Z" fill="#a3beb7" />
    <path d="M0 110q83-11 150 32l62 38H0Z" fill="#afbf9d" />
    <path d="M11 180q44-39 110-39" fill="none" stroke="#eadfc6" strokeWidth="18" />
    <path d="M108 145V94l39-33 45 33v51Z" fill="#af8264" />
    <path d="M100 96l47-42 52 42" fill="none" stroke="#655b48" strokeWidth="6" strokeLinejoin="round" />
    <path d="M119 137V99l28-25 33 25v38Z" fill="#cbdcd1" />
    <path d="M149 77v60m-30-28h61" stroke="#657f70" strokeWidth="3" />
    <path d="M166 69V47h8v29" fill="#655b48" />
    <path d="M54 117V57h5v60M37 91l20-62 23 62Z" fill="#829377" />
    <path d="M237 137h50m-76 20h34m47 8h37" stroke="#dce9e5" strokeWidth="3" strokeLinecap="round" />
    <path d="M274 98V49h5v49m-20-17 18-51 20 51Z" fill="#829377" />
  </>,
  woodlandLake: <>
    <path d="M0 102q90-33 180-3t180-9v90H0Z" fill="#afbf9d" />
    <path d="M118 119q88-34 216-2l26 63H119q-66-35-1-61Z" fill="#a3beb7" />
    <path d="M42 180q-6-34 41-55t91-18" fill="none" stroke="#eadfc6" strokeWidth="16" />
    <path d="M25 126V55h5v71M9 94l19-65 22 65ZM88 102V37h5v65M71 76l20-61 23 61ZM280 99V42h5v57M264 77l19-57 20 57Z" fill="#6f8a6a" />
    <path d="M165 143h49m27 18h56m-65-36h34" stroke="#dce9e5" strokeWidth="3" strokeLinecap="round" />
    <path d="M90 145h35m-29 0v12m23-12v12m-26-22v8h28v-8" fill="none" stroke="#af8264" strokeWidth="4" strokeLinecap="round" />
    <circle cx="197" cy="42" r="18" fill="#f3e9cb" />
  </>,
  islandVisit: <>
    <path d="M0 82h360v98H0Z" fill="#a3beb7" />
    <path d="M136 116q95-53 224-7v57l-140-9Z" fill="#9eae89" />
    <path d="M172 115V78h49v37Z" fill="#fff8e7" />
    <path d="M166 79l30-23 31 23Z" fill="#af8264" />
    <path d="M238 123V87h57v36Z" fill="#bf9278" />
    <path d="M231 88l35-25 36 25Z" fill="#655b48" />
    <path d="M182 90h11v14h-11Zm18 0h11v14h-11Zm48 7h12v15h-12Zm20 0h12v15h-12Z" fill="#cbdcd1" />
    <path d="M165 130h138m-128 0v19m36-19v22m37-22v24m36-24v26" stroke="#af8264" strokeWidth="5" />
    <path d="M32 133h117l-21 25H55Z" fill="#657f70" />
    <path d="M55 131v-25h59l13 25Z" fill="#fff8e7" />
    <path d="M63 113h14v10H63Zm21 0h14v10H84Zm22 0 8 10h-8Z" fill="#a3beb7" />
    <path d="M88 104V90" stroke="#657f70" strokeWidth="3" />
    <path d="M23 167h27m12 7h53m30-10h25" stroke="#dce9e5" strokeWidth="3" strokeLinecap="round" />
    <path d="M104 47q8-8 16 0 8-8 16 0" fill="none" stroke="#657f70" strokeWidth="2" />
  </>,
};

export default tripScenes;
