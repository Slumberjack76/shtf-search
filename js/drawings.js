/* Detailed instructional SVGs + simpler step drawings. No gory imagery. */
window.DRAWINGS = {
  'cpr-position': `<svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect x="8" y="8" width="384" height="284" rx="12" fill="#F4F1EA" stroke="#D6D0C4" stroke-width="2"/>
    <!-- floor -->
  <path d="M30 240 H370" fill="none" stroke="#1A1A1A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    <!-- person supine -->
  <circle cx="90" cy="170" r="22" fill="#fff" stroke="#1A1A1A" stroke-width="3"/>
  <path d="M108 180 L170 200 L300 198" fill="none" stroke="#1A1A1A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M170 200 L170 240" fill="none" stroke="#1A1A1A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M300 198 L350 160 M300 198 L350 236" fill="none" stroke="#1A1A1A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M150 198 L130 230 M150 198 L180 232" fill="none" stroke="#1A1A1A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
  <!-- arrow flip -->
  <path d="M90 110 A24 24 0 0 1 120 80" fill="none" stroke="#1A1A1A" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M112 74 L122 80 L110 88" fill="none" stroke="#1A1A1A" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`,
  'cpr-depth': `<svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect x="8" y="8" width="384" height="284" rx="12" fill="#F4F1EA" stroke="#D6D0C4" stroke-width="2"/>
    <!-- floor + torso side view -->
  <path d="M40 250 H360" fill="none" stroke="#1A1A1A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
  <ellipse cx="200" cy="230" rx="110" ry="22" fill="#fff" stroke="#1A1A1A" stroke-width="3"/>
  <circle cx="86" cy="222" r="16" fill="#fff" stroke="#1A1A1A" stroke-width="3"/>
  <!-- rescuer -->
  <circle cx="200" cy="70" r="16" fill="#fff" stroke="#1A1A1A" stroke-width="3"/>
  <path d="M200 86 V150" fill="none" stroke="#1A1A1A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
  <!-- straight arms -->
  <path d="M200 110 L200 200" fill="none" stroke="#1A1A1A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M188 198 H212" fill="none" stroke="#1A1A1A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
  <!-- knees -->
  <path d="M200 150 L140 250 M200 150 L260 250" fill="none" stroke="#1A1A1A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
  <!-- depth arrows -->
  <path d="M300 200 V238" fill="none" stroke="#1A1A1A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M292 230 L300 240 L308 230" fill="none" stroke="#1A1A1A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M292 208 L300 198 L308 208" fill="none" stroke="#1A1A1A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>`,
  'cold-warm': `<svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect x="8" y="8" width="384" height="284" rx="12" fill="#F4F1EA" stroke="#D6D0C4" stroke-width="2"/>
    <circle cx="200" cy="70" r="22" fill="#fff" stroke="#1A1A1A" stroke-width="3"/>
  <path d="M200 92 V150" fill="none" stroke="#1A1A1A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M200 110 L150 160 M200 110 L250 160" fill="none" stroke="#1A1A1A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M200 150 L160 250 M200 150 L240 250" fill="none" stroke="#1A1A1A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
  <!-- blanket wrap -->
  <path d="M150 50 Q200 20 250 50 L260 170 Q200 190 140 170 Z" fill="none" stroke="#1B6B93" stroke-width="3" stroke-dasharray="8 6"/>
  <circle cx="200" cy="70" r="6" fill="#2E6F40"/>
  <circle cx="200" cy="100" r="6" fill="#2E6F40"/>
  <circle cx="200" cy="140" r="6" fill="#2E6F40"/>
  <circle cx="200" cy="168" r="6" fill="#2E6F40"/>
          </svg>`,
  'frostbite-water': `<svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect x="8" y="8" width="384" height="284" rx="12" fill="#F4F1EA" stroke="#D6D0C4" stroke-width="2"/>
    <path d="M120 90 H280 L268 230 H132 Z" fill="none" stroke="#1A1A1A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M130 160 H270" stroke="#1B6B93" stroke-width="3"/>
  <!-- hand in water -->
  <path d="M200 70 V150" fill="none" stroke="#1A1A1A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M200 150 L180 180 M200 150 L200 190 M200 150 L220 180" fill="none" stroke="#1A1A1A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M320 70 L300 110 L340 110 Z" fill="none" stroke="#C62828" stroke-width="3"/>
      </svg>`,
  'snake-care': `<svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect x="8" y="8" width="384" height="284" rx="12" fill="#F4F1EA" stroke="#D6D0C4" stroke-width="2"/>
    <circle cx="90" cy="140" r="20" fill="#fff" stroke="#1A1A1A" stroke-width="3"/>
  <path d="M90 160 V230 H200" fill="none" stroke="#1A1A1A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M90 180 L50 230 M90 180 L130 170 L200 150" fill="none" stroke="#1A1A1A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
  <!-- bitten forearm rest -->
  <ellipse cx="250" cy="150" rx="14" ry="10" fill="none" stroke="#1A1A1A" stroke-width="3"/>
    <!-- rings coming off -->
  <circle cx="300" cy="200" r="12" fill="none" stroke="#1A1A1A" stroke-width="3"/>
  <path d="M300 188 V170" fill="none" stroke="#1A1A1A" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`,
  'burn-cool': `<svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect x="8" y="8" width="384" height="284" rx="12" fill="#F4F1EA" stroke="#D6D0C4" stroke-width="2"/>
    <path d="M240 40 V90" fill="none" stroke="#1A1A1A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M240 90 L230 120 M240 90 L240 124 M240 90 L250 120" fill="none" stroke="#1A1A1A" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M80 160 C140 140 200 140 260 155 C310 168 350 180 380 186" fill="none" stroke="#1A1A1A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M80 196 C140 176 200 176 260 190 C310 204 350 216 380 222" fill="none" stroke="#1A1A1A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M80 70 L100 110 L60 110 Z" fill="none" stroke="#C62828" stroke-width="3"/>
    </svg>`,
  'lost-stay': `<svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect x="8" y="8" width="384" height="284" rx="12" fill="#F4F1EA" stroke="#D6D0C4" stroke-width="2"/>
    <circle cx="120" cy="130" r="20" fill="#fff" stroke="#1A1A1A" stroke-width="3"/>
  <path d="M120 150 V230" fill="none" stroke="#1A1A1A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M120 170 L80 220 M120 170 L160 220" fill="none" stroke="#1A1A1A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M80 230 H160" fill="none" stroke="#1A1A1A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M260 80 L340 200 M340 80 L260 200" stroke="#C62828" stroke-width="6" stroke-linecap="round"/>
    </svg>`,
  'call-911': `<svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect x="8" y="8" width="384" height="284" rx="12" fill="#F4F1EA" stroke="#D6D0C4" stroke-width="2"/>
  <circle cx="150" cy="150" r="50" fill="none" stroke="#1A1A1A" stroke-width="3"/>
  <circle cx="150" cy="110" r="22" fill="#fff" stroke="#1A1A1A" stroke-width="3"/>
  <path d="M116 210 V180 C116 160 134 154 150 154 C166 154 184 160 184 180 V210" stroke="#1A1A1A" stroke-width="3" fill="none"/>
      </svg>`,
  'stay-safe': `<svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect x="8" y="8" width="384" height="284" rx="12" fill="#F4F1EA" stroke="#D6D0C4" stroke-width="2"/>
  <path d="M200 50 L330 100 V170 C330 230 250 260 200 270 C150 260 70 230 70 170 V100 Z" fill="none" stroke="#1A1A1A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`,
  'shelter-in': `<svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect x="8" y="8" width="384" height="284" rx="12" fill="#F4F1EA" stroke="#D6D0C4" stroke-width="2"/>
  <path d="M60 160 L200 70 L340 160" fill="none" stroke="#1A1A1A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M90 160 V240 H310 V160" fill="none" stroke="#1A1A1A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M180 240 V190 H220 V240" fill="none" stroke="#1A1A1A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`,
  'wet-clothes': `<svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect x="8" y="8" width="384" height="284" rx="12" fill="#F4F1EA" stroke="#D6D0C4" stroke-width="2"/>
  <path d="M140 70 L200 100 L260 70 L280 110 L240 120 V220 H160 V120 L120 110 Z" fill="none" stroke="#1A1A1A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M180 150 C184 170 190 170 194 150" fill="none" stroke="#1A1A1A" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M210 160 C214 180 220 180 224 160" fill="none" stroke="#1A1A1A" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`,
  'chemicals': `<svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect x="8" y="8" width="384" height="284" rx="12" fill="#F4F1EA" stroke="#D6D0C4" stroke-width="2"/>
  <path d="M200 70 L320 250 H80 Z" fill="none" stroke="#1A1A1A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M200 130 V190" fill="none" stroke="#1A1A1A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
  <circle cx="200" cy="214" r="6" fill="#1A1A1A"/>
    </svg>`,
  'find-bleed': `<svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect x="8" y="8" width="384" height="284" rx="12" fill="#F4F1EA" stroke="#D6D0C4" stroke-width="2"/>
  <circle cx="200" cy="80" r="24" fill="#fff" stroke="#1A1A1A" stroke-width="3"/>
  <path d="M200 104 V200" fill="none" stroke="#1A1A1A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M200 130 L140 180 M200 130 L260 180" fill="none" stroke="#1A1A1A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M200 200 L160 270 M200 200 L240 270" fill="none" stroke="#1A1A1A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
  <circle cx="250" cy="175" r="14" fill="none" stroke="#C62828" stroke-width="3"/>
    </svg>`,
  'leave-tq': `<svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect x="8" y="8" width="384" height="284" rx="12" fill="#F4F1EA" stroke="#D6D0C4" stroke-width="2"/>
  <rect x="80" y="80" width="240" height="120" rx="12" fill="#fff" stroke="#1A1A1A" stroke-width="3"/>
      </svg>`,
  'keep-cpr': `<svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect x="8" y="8" width="384" height="284" rx="12" fill="#F4F1EA" stroke="#D6D0C4" stroke-width="2"/>
  <circle cx="200" cy="150" r="70" fill="none" stroke="#1A1A1A" stroke-width="3"/>
  <path d="M200 150 L200 100" fill="none" stroke="#1A1A1A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M200 150 L240 170" fill="none" stroke="#1A1A1A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`,
  'no-drink': `<svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect x="8" y="8" width="384" height="284" rx="12" fill="#F4F1EA" stroke="#D6D0C4" stroke-width="2"/>
  <path d="M160 70 H240 L230 220 H170 Z" fill="none" stroke="#1A1A1A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M140 80 L260 230" stroke="#C62828" stroke-width="4"/>
  </svg>`,
  'placeholder-detail': `<svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect x="8" y="8" width="384" height="284" rx="12" fill="#F4F1EA" stroke="#E08A00" stroke-width="3"/>
    <rect x="80" y="80" width="240" height="150" rx="8" fill="#fff" stroke="#1A1A1A" stroke-width="2.5" stroke-dasharray="10 8"/>
  <path d="M140 190 L200 110 L260 190" fill="none" stroke="#1A1A1A" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`,
  'smoke-out': `<svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect x="8" y="8" width="384" height="284" rx="12" fill="#F4F1EA" stroke="#D6D0C4" stroke-width="2"/>
  <!-- house -->
  <path d="M60 160 L140 100 L220 160" fill="none" stroke="#1A1A1A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M80 160 V240 H200 V160" fill="none" stroke="#1A1A1A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M120 240 V200 H150 V240" fill="none" stroke="#1A1A1A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
  <!-- wavy smoke at top of door, people walking out to the right -->
  <path d="M130 190 C140 170 150 170 160 190" fill="none" stroke="#1A1A1A" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
  <circle cx="260" cy="170" r="16" fill="none" stroke="#1A1A1A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M260 186 V230 M260 200 L230 220 M260 200 L290 220 M245 230 L260 210 L275 230" fill="none" stroke="#1A1A1A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
  <circle cx="320" cy="170" r="14" fill="none" stroke="#1A1A1A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M320 184 V230 M320 198 L300 222 M320 198 L344 222" fill="none" stroke="#1A1A1A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M342 70 L354.0 88 L378 52" fill="none" stroke="#2E6F40" stroke-width="4" stroke-linecap="round"/>
  <!-- stay out: door with X behind them -->
  <path d="M144 64 L176 96 M176 64 L144 96" fill="none" stroke="#C62828" stroke-width="4" stroke-linecap="round"/>
</svg>`,
  'smoke-crawl': `<svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect x="8" y="8" width="384" height="284" rx="12" fill="#F4F1EA" stroke="#D6D0C4" stroke-width="2"/>
  <!-- smoke layer high -->
  <path d="M30 70 C70 40 110 100 150 70 C190 40 230 100 270 70 C310 40 350 90 380 70" fill="none" stroke="#1A1A1A" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M30 100 C80 80 120 120 170 100 C220 80 280 130 380 100" fill="none" stroke="#1A1A1A" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
  <!-- person crawling on floor -->
  <path d="M40 250 H370" fill="none" stroke="#1A1A1A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
  <circle cx="140" cy="230" r="14" fill="none" stroke="#1A1A1A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M154 232 L230 232 L250 250 M230 232 L250 210" fill="none" stroke="#1A1A1A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M180 232 L170 250 M200 232 L200 250" fill="none" stroke="#1A1A1A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M44 200 L54.666666666666664 216 L76 184" fill="none" stroke="#2E6F40" stroke-width="4" stroke-linecap="round"/>
</svg>`,
  'smoke-door': `<svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect x="8" y="8" width="384" height="284" rx="12" fill="#F4F1EA" stroke="#D6D0C4" stroke-width="2"/>
  <path d="M80 60 H200 V250 H80 Z" fill="none" stroke="#1A1A1A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
  <circle cx="180" cy="160" r="6" fill="#1A1A1A"/>
  <!-- hand feeling door -->
  <path d="M240 160 L200 160" fill="none" stroke="#1A1A1A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M248 150 C260 150 270 160 260 175 L230 175 L230 155 Z" fill="none" stroke="#1A1A1A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
  <!-- heat marks -->
  <path d="M110 90 C120 70 130 70 140 90 M150 90 C160 70 170 70 180 90" stroke="#C62828" stroke-width="3" fill="none" stroke-linecap="round"/>
  <path d="M124 24 L156 56 M156 24 L124 56" fill="none" stroke="#C62828" stroke-width="4" stroke-linecap="round"/>
  <!-- other exit -->
  <path d="M300 80 L360 130 L300 180" fill="none" stroke="#1A1A1A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M360 130 H280" fill="none" stroke="#1A1A1A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M304 210 L314.6666666666667 226 L336 194" fill="none" stroke="#2E6F40" stroke-width="4" stroke-linecap="round"/>
</svg>`,
  'choking-thrust': `<svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect x="8" y="8" width="384" height="284" rx="12" fill="#F4F1EA" stroke="#D6D0C4" stroke-width="2"/>
  <!-- person from side, rescuer behind, fist above navel, arrows in and up -->
  <circle cx="220" cy="70" r="22" fill="none" stroke="#1A1A1A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M220 92 V200" fill="none" stroke="#1A1A1A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M220 120 L170 170 M220 120 L260 80" fill="none" stroke="#1A1A1A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M220 200 L180 270 M220 200 L260 270" fill="none" stroke="#1A1A1A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
  <!-- rescuer -->
  <circle cx="130" cy="90" r="16" fill="none" stroke="#1A1A1A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M145 100 L200 150" fill="none" stroke="#1A1A1A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
  <!-- fist -->
  <circle cx="200" cy="150" r="16" fill="#fff" stroke="#1A1A1A" stroke-width="3"/>
  <!-- in and up arrows -->
  <path d="M160 180 L200 150 L190 190" fill="none" stroke="#1A1A1A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M200 200 L200 150" fill="none" stroke="#1A1A1A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M44 60 L54.666666666666664 76 L76 44" fill="none" stroke="#2E6F40" stroke-width="4" stroke-linecap="round"/>
</svg>`,
  'seizure-safe': `<svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect x="8" y="8" width="384" height="284" rx="12" fill="#F4F1EA" stroke="#D6D0C4" stroke-width="2"/>
  <path d="M40 220 H360" fill="none" stroke="#1A1A1A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
  <circle cx="120" cy="170" r="20" fill="none" stroke="#1A1A1A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M140 180 L250 180 L300 150 M250 180 L290 220" fill="none" stroke="#1A1A1A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
  <!-- cushion under head -->
  <ellipse cx="120" cy="200" rx="36" ry="14" fill="none" stroke="#1A1A1A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M64 120 L74.66666666666667 136 L96 104" fill="none" stroke="#2E6F40" stroke-width="4" stroke-linecap="round"/>
  <!-- X over mouth object and holding arms -->
  <path d="M200 80 L250 80 L250 110 L200 110" fill="none" stroke="#1A1A1A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M211 46 L239 74 M239 46 L211 74" fill="none" stroke="#C62828" stroke-width="4" stroke-linecap="round"/>
  <path d="M300 80 L340 80 M320 60 V100" fill="none" stroke="#1A1A1A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M346 66 L374 94 M374 66 L346 94" fill="none" stroke="#C62828" stroke-width="4" stroke-linecap="round"/>
</svg>`,
  'splint-limb': `<svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect x="8" y="8" width="384" height="284" rx="12" fill="#F4F1EA" stroke="#D6D0C4" stroke-width="2"/>
  <path d="M40 150 C120 130 200 130 280 150 C320 160 360 170 380 180" fill="none" stroke="#1A1A1A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M40 190 C120 170 200 170 280 190 C320 200 360 210 380 220" fill="none" stroke="#1A1A1A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
  <!-- board -->
  <path d="M80 120 L300 155 L295 230 L75 195 Z" fill="none" stroke="#1A1A1A" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
  <!-- ties above and below mid -->
  <path d="M120 125 L115 200" fill="none" stroke="#1A1A1A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M240 145 L235 220" fill="none" stroke="#1A1A1A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M44 70 L54.666666666666664 86 L76 54" fill="none" stroke="#2E6F40" stroke-width="4" stroke-linecap="round"/>
</svg>`,
  'clock-time': `<svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect x="8" y="8" width="384" height="284" rx="12" fill="#F4F1EA" stroke="#D6D0C4" stroke-width="2"/>
  <circle cx="200" cy="150" r="80" fill="none" stroke="#1A1A1A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M200 150 L200 90" fill="none" stroke="#1A1A1A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M200 150 L250 150" fill="none" stroke="#1A1A1A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
  <circle cx="200" cy="150" r="6" fill="#1A1A1A"/>
  <path d="M302 70 L314.0 88 L338 52" fill="none" stroke="#2E6F40" stroke-width="4" stroke-linecap="round"/>
</svg>`
};
