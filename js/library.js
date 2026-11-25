/* Library cards, categories, and search corpus. Medical steps are sourced. */
window.LIBRARY = (function () {
  const src = {
    stb: {
      name: "Stop the Bleed (American College of Surgeons)",
      url: "https://www.stopthebleed.org/",
      extra: "ABCs: Alert 911, find the bleeding, compress (pressure, packing, or tourniquet). Tourniquet: 2 to 3 inches above the wound, not over the elbow or knee. Tighten until bleeding stops. Do not take it off."
    },
    aha: {
      name: "American Heart Association, Hands-Only CPR",
      url: "https://cpr.heart.org/en/resources/what-is-cpr",
      extra: "For a teen or adult who collapses: call 911, then push hard and fast in the center of the chest. Rate 100 to 120 pushes a minute. Depth at least 2 inches for an average adult, not more than 2.4 inches. Let the chest come all the way back up. Hands-Only CPR is for teens and adults, not for babies. For a child, AHA: use one or two hands in the center of the chest and push about one third of the chest depth, about 2 inches. For an infant, AHA: use two fingers in the center of the chest and push about one third of the chest depth, about 1½ inches. Get an adult."
    },
    ahaChoke: {
      name: "American Heart Association, choking first aid",
      url: "https://cpr.heart.org/",
      extra: "If the person can cough or speak, let them cough. If they cannot cough, speak, or breathe, give abdominal thrusts: a fist slightly above the navel, other hand on top, inward and up, until the object comes out or they become unresponsive. Then start CPR and look in the mouth for the object. Infants and late pregnancy use different methods — see more detail and get an adult."
    },
    cdcHeat: {
      name: "CDC, Heat-related illnesses",
      url: "https://www.cdc.gov/disasters/extremeheat/pdf/Heat_Related_Illness.pdf",
      extra: "Heat stroke: call 911, move to a cooler place, cool with cloths or a bath, do not give a drink. Heat exhaustion: move to a cool place, loosen clothes, cool wet cloths or a cool bath, sip water."
    },
    cdcCold: {
      name: "CDC, Hypothermia and frostbite",
      url: "https://www.cdc.gov/winter-weather/prevention/index.html",
      extra: "Get medical help, get to shelter, take off wet clothes, warm the center of the body with dry layers. Frostbite: warm (not hot) water. Do not rub. Do not use a stove or heating pad on numb skin."
    },
    cdcSnake: {
      name: "CDC / NIOSH, Venomous snake first aid",
      url: "https://www.cdc.gov/niosh/outdoor-workers/about/venomous-snakes.html/",
      extra: "Get emergency care. Keep calm. Sit or lie down. Remove rings and watches. Wash with soap and water. Cover with a clean dry dressing. Mark the swelling edge and the time. Do not cut, suck, ice, or use a tourniquet. Do not try to catch the snake."
    },
    cdcWater: {
      name: "CDC, Make water safe during an emergency",
      url: "https://www.cdc.gov/water-emergency/media/pdfs/make-water-safe-during-emergency-p.pdf",
      extra: "Boil clear water 1 minute (3 minutes above 6,500 feet). Or unscented 5–9% household bleach: 8 drops per gallon if clear, 16 drops if cloudy, wait 30 minutes. Boiling and bleach do not fix fuel, chemicals, or toxins."
    },
    arcBurn: {
      name: "American Red Cross, burn first aid (standard public guidance)",
      url: "https://www.redcross.org/take-a-class/resources/learn-first-aid/burn-care",
      extra: "Cool with cool or cold clean water as soon as you can, for at least 10 minutes. Do not use ice, butter, or ointments on a serious burn. Cover loosely. Get emergency help for large, deep, or face/hand/joint burns. Confirm against a current Red Cross card before field use."
    },
    fireCo: {
      name: "U.S. Fire Administration / Ready.gov fire escape, and CDC carbon monoxide",
      url: "https://www.cdc.gov/carbon-monoxide/about/index.html",
      extra: "Fire: get out, stay low under smoke, feel doors, stay out, call 911 from outside, never go back in. Carbon monoxide: get everyone to fresh air right away if a CO alarm sounds or people have headache, dizziness, weakness, nausea, or confusion. Call 911. Do not go back in until responders say it is safe."
    },
    cdcSeizure: {
      name: "CDC, First aid for seizures",
      url: "https://www.cdc.gov/epilepsy/first-aid-for-seizures/index.html",
      extra: "Stay with the person and time the seizure. Clear harmful objects and cushion the head. Do not hold them down. Do not put anything in their mouth. When it ends, roll them onto their side if you can. Call 911 if it lasts 5 minutes, they are hurt, it is their first seizure, they have trouble breathing, or they do not wake up."
    },
    recovery: {
      name: "Standard first-aid recovery position (unconscious but breathing)",
      url: "https://medlineplus.gov/ency/article/000013.htm",
      extra: "Use only if the person is breathing and you do not think the neck or back is hurt. Roll them onto their side so the airway stays open, and watch their breathing. If they stop breathing, start CPR. Confirm against current Red Cross or local EMS guidance."
    },
    splint: {
      name: "American Red Cross first aid and U.S. Army FM 4-25.11, basic splinting",
      url: "https://www.redcross.org/",
      extra: "Do not force a bone back into place. Immobilize the joints above and below the injury, pad the splint, and tie it snug — not tight. Check fingers or toes for color, warmth, and feeling. Get emergency care if bone is showing or circulation is poor."
    },
    npsLost: {
      name: "National Park Service, STOP if you are lost (common wilderness teaching)",
      url: "https://www.nps.gov/",
      extra: "Sit, Think, Observe, Plan. If people will look for you, staying put is usually safer. Signal in threes. This card is a short reminder, not a full navigation course."
    }
  };

  const cards = [
    {
      id: "too-hot",
      title: "Too hot",
      helpLabel: "TOO HOT",
      helpIcon: "hot",
      helpNow: true,
      type: "card",
      category: "shelter",
      synonyms: ["dizzy", "hot", "heat", "heat stroke", "heat exhaustion", "sun", "sweating", "confused", "fever"],
      source: src.cdcHeat,
      headerAction: null,
      stopIf: [
        "They are confused, have a seizure, or pass out — this can be heat stroke. Call 911 and keep cooling.",
        "They are throwing up, getting worse, or not better after one hour.",
        "Do not give a drink if they are confused or passed out."
      ],
      steps: [
        { text: "Move the person to shade or a cooler place.", style: "simple", drawing: "shade" },
        { text: "Loosen or take off extra clothes.", style: "simple", drawing: "clothes" },
        { text: "Cool the skin with wet cloths or a cool bath.", style: "detailed", drawing: "heat-cool", caption: "Wet cloths or ice packs on the neck, armpits, and groin help. Fan them if you can." },
        { text: "If they are awake and clear, let them sip water.", style: "simple", drawing: "sip" }
      ]
    },
    {
      id: "bleeding",
      title: "Stop the bleeding",
      helpLabel: "BLEEDING",
      helpIcon: "bleed",
      helpNow: true,
      type: "card",
      category: "medical",
      synonyms: ["blood", "cut", "gash", "wound", "hemorrhage", "laceration", "tourniquet", "spurting", "soaking"],
      source: src.stb,
      headerAction: "tourniquet",
      stopIf: [
        "The person is pale, confused, or passing out.",
        "Blood soaks through and will not stop.",
        "You are not safe. Move to safety first."
      ],
      steps: [
        { text: "Press hard on the wound with both hands. Check under clothes.", style: "detailed", drawing: "bleed-pressure", caption: "Use a clean cloth if you have one. Stack both hands. Push straight down. Keep pressing. Check under clothes for more than one wound." },
        { text: "If the wound is deep, pack cloth in tight.", style: "detailed", drawing: "bleed-pack", caption: "Pack gauze or cloth into the wound, then press hard. Use this for neck, armpit, or groin — places a tourniquet cannot go." },
        { text: "If an arm or leg still bleeds, put on a tourniquet.", style: "detailed", drawing: "bleed-tourniquet", caption: "Place it 2 to 3 inches above the wound. Not on the elbow or knee. Tighten until bleeding stops. Tap TOURNIQUET TIME at the top and write the time on the strap." },
        { text: "Tap TOURNIQUET TIME at the top. Write the time on the strap.", style: "simple", drawing: "tq-time-btn", caption: "Leave the tourniquet on until help takes over. Do not take the tourniquet off yourself." }
      ]
    },
    {
      id: "cpr",
      title: "Not breathing",
      helpLabel: "NOT BREATHING",
      helpSub: "or choking",
      helpIcon: "cpr",
      helpNow: true,
      type: "card",
      category: "medical",
      synonyms: ["passed out", "not breathing", "cpr", "collapse", "unconscious", "heart", "no pulse", "hands only", "chest", "choking"],
      source: src.aha,
      headerAction: "cpr",
      related: [{ id: "choking", label: "CHOKING? →" }],
      stopIf: [
        "This card is for a teen or adult who collapses.",
        "If they are choking, tap Choking at the top.",
        "For a baby or small child, get an adult right away.",
        "If they start to breathe or move, stop pushing and watch them."
      ],
      sizeSwitch: true,
      sizes: {
        adult: {
          drawing: "cpr-hands",
          step1Text: "Push hard and fast in the center of the chest.",
          step1Caption: "Lay them on their back on a firm floor, not a soft bed. Heel of one hand on the lower half of the breastbone. Other hand on top.",
          step2Caption: "Push at least 2 inches down on an average adult. Let the chest come all the way back up. Do not lean on the chest between pushes."
        },
        kid: {
          drawing: "cpr-hands-kid",
          step2Drawing: "cpr-arms-locked-kid",
          step1Text: "Push hard and fast in the center of the chest.",
          step1Caption: "AHA: for a child, use one or two hands in the center of the chest. Lay them on their back on a firm floor.",
          step2Caption: "AHA: for a child, push about one third of the chest depth, about 2 inches. Let the chest come all the way back up. Do not lean on the chest between pushes."
        },
        baby: {
          drawing: "cpr-hands-baby",
          step2Drawing: "cpr-baby-depth",
          step1Text: "Use two fingers in the center of the chest.",
          step1Caption: "AHA: for an infant, use two fingers in the center of the chest. Get an adult right away. Hands-Only CPR is for teens and adults, not for babies.",
          step2Caption: "AHA: for an infant, push about one third of the chest depth, about 1½ inches. Let the chest come all the way back up."
        }
      },
      steps: [
        { text: "Push hard and fast in the center of the chest.", style: "detailed", drawing: "cpr-hands", caption: "Lay them on their back on a firm floor, not a soft bed. Heel of one hand on the lower half of the breastbone. Other hand on top." },
        { text: "Keep arms straight. Shoulders over your hands.", style: "detailed", drawing: "cpr-arms-locked", caption: "Push at least 2 inches down on an average adult. Let the chest come all the way back up. Do not lean on the chest between pushes." },
        { text: "Tap START CPR BEAT at the top and keep going.", style: "simple", drawing: "cpr-beat-button", caption: "Aim for about 110 beats a minute. AHA says 100 to 120." },
        { text: "Do not stop until help comes or they breathe.", style: "simple", drawing: "cpr-keep-going", caption: "If an AED is there, use it." }
      ]
    },
    {
      id: "burns",
      title: "Burns",
      helpLabel: "BURN",
      helpIcon: "burn",
      helpNow: true,
      type: "card",
      category: "medical",
      pin: "medical",
      synonyms: ["sunburn", "burned", "burn", "scald", "blister", "fire", "hot stove"],
      source: src.arcBurn,
      headerAction: "burn",
      stopIf: [
        "The burn is large, deep, or on the face, hands, feet, or joints. Call 911.",
        "The person was burned by electricity or chemicals. Get an adult."
      ],
      steps: [
        { text: "Cool the burn with cool running water for 10 minutes.", style: "detailed", drawing: "burn-cool", badge: "ok", caption: "Use cool or cold clean water. American Red Cross: at least 10 minutes. Use the timer at the top." },
        { text: "Do not use ice, butter, oil, or toothpaste.", style: "simple", drawing: "burn-cool", badge: "bad" },
        { text: "Cover loosely with a clean, dry cloth.", style: "simple", drawing: "burn-cool" },
        { text: "Leave blisters closed. Do not pop them.", style: "simple", drawing: "burn-cool" }
      ]
    },
    {
      id: "smoke",
      title: "Smoke, fire, or CO",
      helpLabel: "SMOKE / FIRE",
      helpSub: "or CO",
      helpIcon: "stove",
      helpNow: true,
      type: "card",
      category: "shelter",
      synonyms: ["smoke", "fire", "carbon monoxide", "co alarm", "fumes", "gas", "stove", "burning"],
      source: src.fireCo,
      headerAction: null,
      stopIf: [
        "Anyone is passed out, confused, or cannot walk. Get them to fresh air if you can do it safely, and call 911.",
        "Never go back inside for people, pets, or things until responders say it is safe."
      ],
      steps: [
        { text: "Get everyone outside to fresh air now.", style: "detailed", drawing: "smoke-out" },
        { text: "Stay low under smoke. Crawl to the way out.", style: "detailed", drawing: "smoke-crawl" },
        { text: "If a door feels warm, use another way out.", style: "detailed", drawing: "smoke-door", caption: "Feel the door with the back of your hand. A warm door means fire may be on the other side." },
        { text: "Stay out. Call 911 from outside.", style: "simple", drawing: "smoke-out" },
        { text: "If a CO alarm sounds, or people feel sick, get to fresh air.", style: "detailed", drawing: "co-fresh", caption: "CO signs: headache, dizziness, weakness, nausea, or confusion. Get to fresh air and call 911. CDC: do not go back in." }
      ]
    },
    {
      id: "bite",
      title: "Bite or sting",
      helpLabel: "BITE / STING",
      helpSub: "or allergy",
      helpIcon: "snake",
      helpNow: true,
      type: "card",
      category: "medical",
      synonyms: ["snake", "snakebite", "rattlesnake", "sting", "bee", "wasp", "scorpion", "venom", "bite", "allergy", "allergic"],
      synonymTitles: { snake: "Snake bite", snakebite: "Snake bite", rattlesnake: "Snake bite", sting: "Sting", bee: "Bee sting", wasp: "Wasp sting", scorpion: "Scorpion sting", venom: "Venom bite", allergy: "Allergy", allergic: "Allergy" },
      source: src.cdcSnake,
      headerAction: null,
      stopIf: [
        "Trouble breathing, or the face or throat is swelling. Call 911. This can be a serious allergy.",
        "Any snakebite: get emergency care. Do not wait for symptoms.",
        "Do not drive yourself. A bite can make you dizzy."
      ],
      matchHint: "Snake bite: steps 1–5",
      steps: [
        { text: "Get far from the snake. Do not try to catch it.", style: "detailed", drawing: "snake-care" },
        { text: "Sit still. Keep the bitten part still and comfortable.", style: "detailed", drawing: "snake-care", caption: "Sit or lie down. CDC: do not drive yourself." },
        { text: "Take off rings and watches before swelling starts.", style: "detailed", drawing: "snake-care" },
        { text: "Wash with soap and water. Cover with a clean cloth.", style: "detailed", drawing: "snake-mark", badge: "ok", caption: "Mark the edge of the swelling and write the time." },
        { text: "Do not cut, suck, ice, or use a tourniquet.", style: "detailed", drawing: "snake-donts", badge: "bad", caption: "CDC / NIOSH: no cutting, no sucking venom, no ice, no tourniquet on a snakebite." }
      ]
    },
    {
      id: "too-cold",
      title: "Too cold",
      helpLabel: "TOO COLD",
      helpIcon: "cold",
      helpNow: true,
      type: "card",
      category: "shelter",
      synonyms: ["cold", "hypothermia", "frostbite", "shivering", "freezing", "numb", "wet and cold"],
      source: src.cdcCold,
      headerAction: null,
      stopIf: [
        "They are confused, drowsy, or not shivering anymore. Call 911.",
        "They look dead or have no pulse. Get help and start CPR. Handle them gently."
      ],
      steps: [
        { text: "Get them out of the cold and into shelter.", style: "simple", drawing: "shelter-in" },
        { text: "Take off any wet clothes.", style: "simple", drawing: "wet-clothes" },
        { text: "Warm the chest, neck, head, and groin with dry blankets.", style: "detailed", drawing: "cold-warm", caption: "Warm the center of the body first. Dry layers. Skin-to-skin under blankets is okay. If they are awake, a warm drink is okay. No alcohol. No drinks if they are not awake." },
        { text: "For frostbite, use warm water. Do not rub the skin.", style: "detailed", drawing: "frostbite-water", badge: "bad", caption: "Water should feel warm, not hot, on skin that is not numb. No stove, no heating pad, no rubbing. Do not walk on frostbitten feet if you can help it." }
      ]
    },
    {
      id: "choking",
      title: "Choking",
      helpLabel: "CHOKING",
      helpIcon: "cpr",
      helpNow: false,
      emergency: true,
      type: "card",
      category: "medical",
      synonyms: ["choking", "can't breathe", "heimlich", "stuck food", "throat"],
      source: src.ahaChoke,
      headerAction: null,
      related: [{ id: "cpr", label: "Not breathing?" }],
      stopIf: [
        "If they become unresponsive, start CPR and look in the mouth for the object.",
        "For a baby, or a person who is pregnant or too big to reach around, get an adult. The steps are different."
      ],
      steps: [
        { text: "If they can cough or speak, let them cough.", style: "simple", drawing: "choke-cough" },
        { text: "If they cannot cough, speak, or breathe, stand behind them.", style: "simple", drawing: "choke-behind" },
        { text: "Make a fist just above the belly button.", style: "detailed", drawing: "choke-fist", caption: "Grab that fist with your other hand." },
        { text: "Pull in and up, hard, until the object comes out.", style: "detailed", drawing: "choke-thrust" }
      ]
    },
    {
      id: "water",
      title: "No safe water",
      helpLabel: "NO SAFE WATER",
      helpIcon: "water",
      helpNow: false,
      emergency: true,
      type: "card",
      category: "water",
      synonyms: ["thirsty", "drink", "boil", "bleach", "dirty water", "diarrhea", "giardia", "purify", "filter"],
      source: src.cdcWater,
      headerAction: "boil",
      stopIf: [
        "The water has fuel, chemicals, or toxins in it. Do not boil or bleach that water. Find another source.",
        "You cannot keep boiled water clean. Use a closed, clean container."
      ],
      steps: [
        { text: "Use bottled water if you have it.", style: "simple", drawing: "bottled" },
        { text: "If not, bring clear water to a rolling boil.", style: "detailed", drawing: "water-boil", caption: "A rolling boil means big bubbles that do not stop." },
        { text: "Boil one minute. Above 6,500 feet, boil three minutes.", style: "detailed", drawing: "water-boil-time", timer: "boil", caption: "Use the boil timer at the top. Then let it cool and store it in a clean closed container." },
        { text: "No stove? Add unscented bleach, then wait 30 minutes.", style: "detailed", drawing: "water-bleach", caption: "Clear: 8 drops per gallon. Cloudy: 16 drops. Mix well. Wait 30 minutes. Do not use this if the water has fuel or chemicals." }
      ]
    },
    {
      id: "lost",
      title: "If you are lost",
      helpLabel: "LOST",
      helpIcon: "lost",
      helpNow: false,
      emergency: true,
      type: "card",
      category: "maps",
      pin: "maps",
      synonyms: ["lost", "trail", "separated", "can't find camp", "dark", "woods", "desert"],
      source: src.npsLost,
      headerAction: null,
      stopIf: [
        "You are hurt, night is coming, or weather is turning bad. Make shelter and a signal.",
        "If you have a map or Organic Maps, use it only after you stop and think."
      ],
      steps: [
        { text: "Stop. Sit down. Try to stay calm.", style: "detailed", drawing: "lost-stay" },
        { text: "Think. How did you get here?", style: "simple", drawing: "lost-stay" },
        { text: "Look around for landmarks, water, and shelter.", style: "simple", drawing: "lost-stay" },
        { text: "If someone will look for you, stay put.", style: "detailed", drawing: "lost-stay", caption: "Make a signal: three shouts, three fires, or a big X. Stay warm and find shade. Sip water if you have it." }
      ]
    },
    {
      id: "seizure",
      title: "Seizures",
      helpLabel: "SEIZURE",
      helpIcon: "seizure",
      helpNow: false,
      emergency: true,
      type: "card",
      category: "medical",
      synonyms: ["seizure", "seizures", "convulsion", "epilepsy", "fitting"],
      source: src.cdcSeizure,
      headerAction: null,
      stopIf: [
        "Call 911 if it lasts 5 minutes, they are hurt, it is a first seizure, they have trouble breathing, or they do not wake up."
      ],
      steps: [
        { text: "Stay with them. Time how long it lasts.", style: "simple", drawing: "clock-time" },
        { text: "Clear hard things away. Cushion their head.", style: "detailed", drawing: "seizure-safe", badge: "ok" },
        { text: "Do not hold them down. Do not put anything in their mouth.", style: "detailed", drawing: "seizure-safe", badge: "bad" },
        { text: "When it stops, roll them onto their side if you can.", style: "detailed", drawing: "recovery-roll" }
      ]
    },
    {
      id: "recovery",
      title: "Recovery position",
      helpLabel: "RECOVERY",
      helpIcon: "recovery",
      helpNow: false,
      emergency: true,
      type: "card",
      category: "medical",
      synonyms: ["recovery position", "unconscious", "breathing but out", "on their side"],
      source: src.recovery,
      headerAction: null,
      stopIf: [
        "If they are not breathing, do not use this card. Start CPR.",
        "If you think the neck or back is hurt, do not roll them. Keep the head still and call 911."
      ],
      steps: [
        { text: "Use this only if they are breathing and the neck is not hurt.", style: "simple", drawing: "recovery-check" },
        { text: "Kneel beside them. Place the near arm out.", style: "detailed", drawing: "recovery-arm-out", caption: "Bring the far arm to the cheek. Bend the far knee." },
        { text: "Roll them toward you onto their side.", style: "detailed", drawing: "recovery-roll" },
        { text: "Tilt the head a little. Watch their breathing.", style: "simple", drawing: "recovery-airway" }
      ]
    },
    {
      id: "splint",
      title: "Splinting",
      helpLabel: "SPLINT",
      helpIcon: "splint",
      helpNow: false,
      emergency: true,
      type: "card",
      category: "medical",
      synonyms: ["splint", "splinting", "broken bone", "fracture", "sprain"],
      source: src.splint,
      headerAction: null,
      stopIf: [
        "Bone is showing, or fingers or toes turn cold, blue, or numb. Call 911. Loosen the ties if you can do it safely."
      ],
      steps: [
        { text: "Do not push a bone back in or force it straight.", style: "simple", drawing: "splint-dont", badge: "bad" },
        { text: "Pad the injured area. Splint above and below the joint.", style: "detailed", drawing: "splint-pad", badge: "ok" },
        { text: "Tie snug, not tight. Check fingers or toes.", style: "detailed", drawing: "splint-check", caption: "They should stay warm and pink, and the person should still feel them." },
        { text: "Get an adult. Keep the person still and comfortable.", style: "simple", drawing: "stay-safe" }
      ]
    }
  ];

  const helpNowOrder = ["too-hot", "bleeding", "cpr", "burns", "smoke", "bite", "too-cold"];

  const categories = [
    { id: "water", label: "Water", icon: "water" },
    { id: "medical", label: "Medical", icon: "medical" },
    { id: "shelter", label: "Shelter / Heat", icon: "shelter" },
    { id: "food", label: "Food", icon: "food" },
    { id: "power", label: "Power", icon: "power" },
    { id: "maps", label: "Maps", icon: "maps" },
    { id: "comms", label: "Comms", icon: "comms" },
    { id: "repair", label: "Repair / Build", icon: "repair" },
    { id: "security", label: "Security", icon: "security" },
    { id: "learning", label: "Learning", icon: "learn" }
  ];

  const docs = [
    { id: "pdf-rain", type: "infographic", category: "water", title: "Collecting rain water (sample one-pager)", path: "samples/sample-rain-catchment.pdf", placeholder: true, body: "Rain catchment barrel tarp gutter monsoon drinking water treat before drinking", synonyms: ["rain", "catchment"] },
    { id: "pdf-burns-sheet", type: "infographic", category: "medical", title: "Cool a burn with water (sample one-pager)", path: "samples/sample-burns-cool-water.pdf", placeholder: true, body: "Burn cool water no ice no butter cover loosely", synonyms: ["sunburn", "burned"] },
    { id: "pdf-canning", type: "pdf", category: "food", title: "Food preservation notes (sample, not USDA text)", path: "samples/sample-usda-canning-notes.pdf", placeholder: true, body: "Canning jars preserve USDA pantry pressure water bath", synonyms: ["canning"] },
    { id: "pdf-dressing", type: "pdf", category: "food", title: "Field dressing game (sample only)", path: "samples/sample-field-dressing.pdf", placeholder: true, body: "Field dressing gutting game meat deer hunting store meat cool the carcass", synonyms: ["field dressing", "meat"] },
    { id: "pdf-solar", type: "pdf", category: "power", title: "Wiring a solar panel and charge controller (sample)", path: "samples/sample-solar-charge-controller.pdf", placeholder: true, body: "Solar panel charge controller battery 12 volt fuse off grid power wiring", synonyms: ["solar", "battery"] },
    { id: "pdf-topo", type: "map", category: "maps", title: "Arizona and Nevada topo map index (sample)", path: "samples/sample-usgs-topo-az-index.pdf", placeholder: true, body: "USGS topo trail map Arizona Nevada contour canyon hiking Organic Maps", synonyms: ["topo", "trail", "map"] },
    { id: "pdf-knots", type: "infographic", category: "repair", title: "Useful knots (sample sheet)", path: "samples/sample-knots-sheet.pdf", placeholder: true, body: "Knot rope bowline hitch lashing shelter tarp guy line", synonyms: ["knot", "rope"] },
    { id: "pdf-plants", type: "pdf", category: "food", title: "Southwest plants: edible and poisonous (sample)", path: "samples/sample-edible-plants-sw.pdf", placeholder: true, body: "Edible poisonous plant cactus mesquite palo verde datura nightshade forage", synonyms: ["edible", "poisonous", "plant"] },
    { id: "wiki-wikipedia", type: "wiki", category: "learning", title: "Wikipedia (open in Kiwix)", path: null, placeholder: false, body: "Offline Wikipedia ZIM encyclopedia Kiwix", synonyms: ["wikipedia", "wiki"] },
    { id: "wiki-wikimed", type: "wiki", category: "medical", title: "WikiMed medical encyclopedia (open in Kiwix)", path: null, placeholder: false, body: "WikiMed medical health Kiwix ZIM", synonyms: ["wikimed", "doctor"] },
    { id: "map-organic", type: "map", category: "maps", title: "Organic Maps (app on the iPad)", path: null, placeholder: false, body: "Organic Maps offline OpenStreetMap trails roads hiking", synonyms: ["organic maps", "osm"] }
  ];

  const categoryCopy = {
    water: "Water you can drink, and how to make it safer.",
    medical: "Hurt, sick, bitten, or burned. Use Help now first, then this list.",
    shelter: "Stay warm, stay cool, stay dry, and get out of smoke or CO.",
    food: "Food, cooking, and storing meat. Some pages are still samples.",
    power: "Batteries, solar, and light. Sample pages are marked.",
    maps: "If you are lost, start here. Then maps and trails.",
    comms: "PLACEHOLDER. Radio and signaling pages will go here.",
    repair: "PLACEHOLDER. Hand-tool repairs, knots, and building without a shop.",
    security: "PLACEHOLDER. Safety around the home and camp. No how-to-harm pages.",
    learning: "School and how-to books, including Wikipedia in Kiwix."
  };

  return { src, cards, helpNowOrder, categories, docs, categoryCopy };
})();
