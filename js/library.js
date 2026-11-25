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
    },
    pennDeer: {
      name: "Penn State Extension, Field Dressing Deer Pocket Guide",
      url: "https://extension.psu.edu/field-dressing-deer-pocket-guide/",
      extra: "Dress at once. Knife edge toward the hide, two fingers holding the guts down. Tie off the anus. Do not cut the tube from the bladder. The pelvis does not have to be sawed. If organs smell bad, look green, or show clots or odd color, do not eat the meat. Chill below 40°F."
    },
    osuGame: {
      name: "Oregon State University Extension PNW 517, and Montana State field care of big game",
      url: "https://extension.oregonstate.edu/sites/extd8/files/catalog/auto/PNW517.pdf",
      extra: "Head slightly downhill while you open the belly, so the stomach is not pressed against the cut. The dark tuft inside each hock is the tarsal gland. Do not touch it and then the meat. Cutting the glands out is not required. Montana field care: https://animalrangeextension.montana.edu/wildlife/documents/field-care-big-game.pdf"
    },
    adfgGutless: {
      name: "Alaska Department of Fish and Game, gutless method",
      url: "https://www.adfg.alaska.gov/static/hunting/pdfs/field_dressing_big_game_gutless_method.pdf",
      extra: "Skin from the backbone and take the meat off without opening the gut. Do not leave a whole animal overnight with the guts in. If gut contents touch meat, wash that spot and dry it at once. Otherwise do not wash the carcass. NDOW cooling priority: https://www.ndow.org/blog/how-to-dress-your-harvest-properly/"
    },
    fm2176: {
      name: "U.S. Army FM 21-76 Survival, field-craft chapters",
      url: "https://archive.org/details/Fm21-76SurvivalManual",
      extra: "Snare, twitch-up, figure-4 deadfall, gorge hook, stakeout line, fish spoilage signs, and small-game skinning. A plain snare often catches and does not kill. The deadfall weight must kill at once. Trigger sticks are dry wood, not green. Technique only."
    },
    cdcRabbit: {
      name: "CDC tularemia prevention, and Missouri Department of Conservation",
      url: "https://www.cdc.gov/tularemia/prevention/",
      extra: "Rabbits, hares, and rodents can carry tularemia. Gloves if you have them. Many pinhead white spots on the liver, or a swollen spleen: do not eat the animal. Missouri: cook rabbit to at least 165°F. https://mdc.mo.gov/hunting-trapping/species/rabbit/rabbit-safety-health"
    },
    knotsAngling: {
      name: "Take Me Fishing, improved clinch and Palomar",
      url: "https://www.takemefishing.org/how-to-fish/fishing-knots-and-rigs/easy-fishing-knots/",
      extra: "Improved clinch: wraps around the standing line, tag back through the small loop at the eye, then through the big loop. Palomar: doubled line, loose overhand, whole hook through the loop, pull both ends so the strands in the eye lie side by side. Clinch steps: https://www.takemefishing.org/blog/april-2018/improved-clinch-knot-fishing-knot-tying-steps/"
    },
    usdaZone: {
      name: "USDA FSIS, the danger zone",
      url: "https://www.fsis.usda.gov/food-safety/safe-food-handling-and-preparation/food-safety-basics/danger-zone-40f-140f",
      extra: "Bacteria grow fastest from 40°F to 140°F. Do not leave perishable food there more than 2 hours, or 1 hour if the air is above 90°F. You cannot see the bacteria."
    },
    gameTemps: {
      name: "FoodSafety.gov minimum temperatures, Missouri rabbit 165°F, CDC trichinellosis",
      url: "https://www.foodsafety.gov/food-safety-charts/safe-minimum-internal-temperatures",
      extra: "Deer and elk, whole and ground: 160°F. All poultry: 165°F. Fish: 145°F. Rabbit is grouped with venison at 160°F on that chart. This card uses 165°F for rabbit and squirrel because of tularemia. Bear and wild pig: 160°F. Freezing does not make all wild trichinella safe. https://www.cdc.gov/trichinellosis/prevention/index.html"
    },
    jerkyHeat: {
      name: "K-State Research and Extension, drying meat safely, following NCHFP",
      url: "https://enewsletters.k-state.edu/youaskedit/2017/08/15/drying-meat-safely/",
      extra: "Heat strips to 160°F before drying (boil quarter-inch strips about 5 minutes and check with a thermometer; thicker needs longer) or heat dried quarter-inch strips 10 minutes in a 275°F oven. Birds 165°F. Dry until a piece cracks when bent but does not break. NCHFP on the 160°F step: https://nchfp.uga.edu/faqs/general-drying/category/faq-drying"
    },
    meatSigns: {
      name: "Penn State field dressing, CDC chronic wasting disease, FM 21-76 fish and liver signs",
      url: "https://www.cdc.gov/chronic-wasting/prevention/index.html",
      extra: "Abnormal organs: do not eat the meat. You cannot see chronic wasting disease. Do not eat deer or elk brain, spinal cord, eyes, spleen, tonsils, or lymph nodes. Do not eat an animal that was found dead or acted sick. Spoiled meat is not made safe by cooking."
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
    },
    {
      id: "field-dress-deer",
      title: "Field dressing a deer",
      helpLabel: "FIELD DRESS",
      helpSub: "Field dressing",
      helpIcon: "food",
      helpNow: false,
      type: "card",
      category: "food",
      synonyms: ["field dress", "field dressing", "field dressing a deer", "deer field dressing", "field dressing steps", "how to field dress", "gut", "gutting", "deer", "elk", "harvest", "eviscerate", "entrails", "paunch", "bladder", "carcass", "venison"],
      source: src.pennDeer,
      headerAction: null,
      stopIf: [
        "You cut the stomach, intestines, or bladder. Trim every bit of meat the spill touched, plus a margin, with a clean knife. If the spill is widespread, do not eat the meat.",
        "Organs smell rotten, look green, or show spots or pus. Do not eat this animal.",
        "The meat stayed warmer than 40°F for more than 1 hour in hot air, or more than 2 hours in cooler air. Do not eat it."
      ],
      steps: [
        { text: "Put gloves on if you have them. Roll the deer onto its back. Point the head slightly downhill. Spread the hind legs with a stick or rocks.", style: "detailed", drawing: "deer-open-cut", caption: "Head downhill. The dashed line is a shallow cut from the breastbone to the pelvis." },
        { text: "Start where the breastbone ends. Cut only the skin and the belly wall. Keep the knife edge toward the hide. Two fingers push the guts down, away from the blade. Do not stab.", style: "detailed", drawing: "deer-open-cut", caption: "Edge up, toward the hide. Fingers hold the guts down." },
        { text: "Cut a circle around the anus. Tie it shut with cord. Pull the tied end into the belly. Do not cut the tube that runs from the bladder.", style: "detailed", drawing: "deer-organs", caption: "Red outlines are the organs you must not puncture. Deer have no bile sac." },
        { text: "Cut the diaphragm free from the ribs. Reach forward and cut the windpipe and the food tube. Roll the deer on its side so the guts fall out. Cut them free without slicing them.", style: "simple", drawing: "deer-organs" },
        { text: "Keep the heart and liver only if they are smooth, wet, and dark red or purple, with no spots and no bad smell. Do not look for a gall bladder. A deer does not have one.", style: "simple", drawing: "deer-organs" },
        { text: "Prop the cavity open with a clean stick. Wipe out hair, dirt, and feces. Do not rinse the carcass in a creek or pond.", style: "detailed", drawing: "deer-cool", caption: "Water spreads filth and washes off the glaze that limits bacteria." },
        { text: "In warm air, take the hide off. It holds the heat in. Do not touch the dark tarsal tufts on the inside of the hocks and then touch the meat.", style: "detailed", drawing: "deer-cool", caption: "Shade, hide off, cavity propped, meat off the hot ground." },
        { text: "Get the thick meat down to 40°F, or cook it the same day. If the air is hot, use the heat card.", style: "simple", drawing: "meat-time" }
      ]
    },
    {
      id: "gutless-big-game",
      title: "Gutless method for big game",
      helpLabel: "GUTLESS",
      helpIcon: "food",
      helpNow: false,
      type: "card",
      category: "food",
      synonyms: ["gutless", "quarter", "quartering", "backstrap", "tenderloin", "elk", "deer", "boneless", "field dress"],
      source: src.adfgGutless,
      headerAction: null,
      stopIf: [
        "You cannot take the meat off today. Gut the animal instead. Guts left in overnight spoil the meat.",
        "The knife slips through into the bladder or the gut. Trim every piece the spill touched. If you cannot get it all, do not eat the meat."
      ],
      steps: [
        { text: "Use this only when you will take the meat off now. If the carcass will sit whole until tomorrow, field dress it instead.", style: "simple", drawing: "gutless-side" },
        { text: "Lay the animal on its side. Cut the skin along the backbone with short strokes. Point the blade out through the hide so the hair stays off the meat. Spread the hide hair-side down as a clean table.", style: "detailed", drawing: "gutless-side", caption: "The backstrap is outside the spine. The tenderloin is inside, under it." },
        { text: "Front leg: there is no bone joint to the body. Pull the leg out and cut the muscle in the armpit. Stay close to the ribs.", style: "simple", drawing: "gutless-side" },
        { text: "Backstrap: it lies outside the spine, from the pelvis toward the neck. Fillet it off. Keep the knife shallow.", style: "simple", drawing: "gutless-side" },
        { text: "Hind leg: follow the seam to the pelvis. Keep the knife on the bone. The hip is a ball and socket. Cut the ligaments and bend the leg free. The bladder and the gut are just inside. Do not stab through.", style: "detailed", drawing: "gutless-side", caption: "Knife stays on the bone at the hip." },
        { text: "Tenderloin: it is inside the belly, stuck to the underside of the spine. Make a shallow cut and free it with your fingers. Do not puncture the intestines.", style: "simple", drawing: "gutless-side" },
        { text: "Roll the animal onto the skinned hide and repeat the other side. Hang the pieces separate, in the shade, with air between them. Do not stack them or seal them in plastic.", style: "simple", drawing: "meat-heat" },
        { text: "If gut contents touch the meat, wash only that spot with clean water and dry it at once. Do not wash the rest.", style: "simple", drawing: "deer-cool" }
      ]
    },
    {
      id: "small-game-dress",
      title: "Skin and gut a rabbit or squirrel",
      helpLabel: "SMALL GAME",
      helpIcon: "food",
      helpNow: false,
      type: "card",
      category: "food",
      synonyms: ["squirrel", "rabbit", "small game", "skin", "case skin", "tularemia", "hare"],
      source: src.cdcRabbit,
      headerAction: null,
      stopIf: [
        "The liver has many white or yellow pinhead spots, or the spleen is swollen. Do not eat any of this animal. Wash your hands.",
        "The animal was already dead, or it let you walk up to it. Leave it.",
        "You broke the gut or the bladder open on the meat and cannot cut all of that meat away. Do not eat it."
      ],
      steps: [
        { text: "Put gloves on if you have them. A rabbit or squirrel that acted sick is not food.", style: "simple", drawing: "small-game-skin" },
        { text: "Rabbit: slit only the skin across the middle of the back. Work your fingers under the hide and pull it toward the head and toward the tail.", style: "detailed", drawing: "small-game-skin", caption: "Cut skin only. Pull the hide both ways." },
        { text: "Squirrel: cut the tail bone from underneath and leave the tail skin attached. Step on the tail skin. Pull the hind legs up so the hide peels off toward the head.", style: "detailed", drawing: "small-game-skin", caption: "Foot on the tail skin. Pull the hind legs up." },
        { text: "Cut off the head and the feet. They do not go in the pot. Keep the knife edge toward the hide so you do not slice the meat or dump hair on it.", style: "simple", drawing: "small-game-skin" },
        { text: "Slit the belly wall only. Pull the guts out, including the ones in the chest. Do not cut the intestines or the bladder.", style: "detailed", drawing: "small-game-gut", caption: "Rabbits and squirrels have a small green bile sac on the liver. Do not break it." },
        { text: "Look at the liver. Smooth and dark red is normal. Many pinhead white or yellow spots, or a big swollen spleen: do not eat this animal. Wash your hands.", style: "detailed", drawing: "small-game-gut", caption: "Spotted liver means do not eat it." },
        { text: "Cool the carcass at once. Cook rabbit or squirrel to 165°F in the center.", style: "simple", drawing: "cook-temps" }
      ]
    },
    {
      id: "clean-fish",
      title: "Clean a fish",
      helpLabel: "CLEAN FISH",
      helpIcon: "food",
      helpNow: false,
      type: "card",
      category: "food",
      synonyms: ["fish", "clean fish", "gut a fish", "scale", "fillet", "trout", "catfish", "bleed"],
      source: src.fm2176,
      headerAction: null,
      stopIf: [
        "The eye is sunken or cloudy, the gills are brown or gray, the flesh is slimy, it smells sharp or spoiled, or a thumb dent stays in the meat. Do not eat it. Cooking will not fix spoiled fish.",
        "You have no ice and the air is hot. Cook it the same day or do not keep it."
      ],
      steps: [
        { text: "Kill it with a firm blow just behind the eyes. Cut the gills or the throat and let the blood drain.", style: "detailed", drawing: "fish-clean", caption: "Blow behind the eyes. Cut the gills to bleed." },
        { text: "If it has obvious scales, scrape from the tail toward the head. Leave trout in the skin. For catfish, do not scale it. Cut the skin behind the head and pull the skin toward the tail.", style: "detailed", drawing: "fish-clean", caption: "Scale from the tail toward the head." },
        { text: "Slit the belly from the vent up to the gills. Pull the guts out. Scrape out the dark blood line under the spine.", style: "detailed", drawing: "fish-clean", caption: "The blood line is the dark strip along the backbone." },
        { text: "Rinse with clean cold water if you have it. Do not rinse in a dirty ditch. Keep the fish cold.", style: "detailed", drawing: "fish-fresh", caption: "Clear eye and red or pink gills are fresh. Sunken eye, brown gills, slime, or a dent that stays means stop." },
        { text: "In desert heat with no ice, cook it the same day. Cook fish to 145°F, until it is opaque and it flakes.", style: "simple", drawing: "cook-temps" }
      ]
    },
    {
      id: "simple-snare",
      title: "Simple snare",
      helpLabel: "SNARE",
      helpIcon: "food",
      helpNow: false,
      type: "card",
      category: "food",
      synonyms: ["snare", "snaring", "noose", "twitch-up", "trap", "rabbit snare", "lock"],
      source: src.fm2176,
      headerAction: null,
      stopIf: [
        "The loop can open again after it tightens. Retie it. A slip knot will not hold.",
        "A person or a dog could walk into the snare. Do not set it there."
      ],
      steps: [
        { text: "Use wire if you have it. Twist a small eye in one end and pass the standing wire through that eye so the loop can only get smaller.", style: "detailed", drawing: "snare-lock", caption: "Cord needs a one-way lock. Two wraps toward the noose, then one tuck toward the anchor." },
        { text: "If you only have cord, tie that lock. Two wraps face the noose. One more wrap faces the anchor, and the tag is tucked under that wrap. Do not use a slip knot.", style: "detailed", drawing: "snare-lock", caption: "Slide the hitch toward the anchor to shrink the noose. It jams if the loop tries to open." },
        { text: "Set the loop on a trail where brush makes a narrow funnel. Make it big enough for the head, at head height, not low enough to catch a foot. Anchor it to a stake that will not pull out. Prop the loop open with twigs.", style: "detailed", drawing: "snare-set", caption: "Funnel the trail. Loop at head height." },
        { text: "A snare like this often catches the animal and does not kill it. Check it often. If the animal is alive, kill it at once with a hard blow to the head, then dress it.", style: "simple", drawing: "snare-set" },
        { text: "Twitch-up: bend a springy sapling and strip the branches. Use two dry forked sticks. Drive one into the ground with its short leg parallel to the ground. Tie the other fork to the sapling and hook the short legs together. A head in the noose pulls the hooks apart and the sapling lifts.", style: "detailed", drawing: "snare-twitch", caption: "Dry dead wood only. Green sap can glue the trigger. The sapling must lift the animal clear." }
      ]
    },
    {
      id: "figure4-deadfall",
      title: "Figure-4 deadfall",
      helpLabel: "DEADFALL",
      helpIcon: "food",
      helpNow: false,
      type: "card",
      category: "food",
      synonyms: ["deadfall", "figure 4", "figure-4", "dead fall", "trap", "trigger"],
      source: src.fm2176,
      headerAction: null,
      stopIf: [
        "The log or rock is not heavy enough to kill at once. Do not set it.",
        "You cannot keep your hands out from under the weight while you set it. Reset with a prop until the sticks hold on their own."
      ],
      steps: [
        { text: "Cut three dry sticks. Do not use green wood. Sap can glue the trigger.", style: "detailed", drawing: "deadfall-parts", caption: "Upright: sloped top, square notch low on that side, flat bottom. Release: angled notch at one end. Bait: hook, square notch, then the point." },
        { text: "Upright: the top slopes down to one side. Cut a square notch low on that same side. Leave the bottom flat. Do not pound this stick into the ground.", style: "detailed", drawing: "deadfall-parts", caption: "A deep stake can hold the log up after the trigger trips." },
        { text: "Release stick: cut an angled notch near one end. That notch hooks the sloped top of the upright. The short tip past the notch goes under the log. The long end goes down to the bait stick.", style: "simple", drawing: "deadfall-parts" },
        { text: "Bait stick: an angled hook on the blunt end, a square notch closer to the point, and a sharp point. The hook holds the long end of the release. The square notch locks into the upright.", style: "simple", drawing: "deadfall-parts" },
        { text: "Stand the upright on the ground, just outside where the log will fall. Hook the release notch on the bevel. The short tip props the log. The long end comes down to the bait. The low end of the log rests on the ground.", style: "detailed", drawing: "deadfall-set", caption: "The three sticks make a 4. The upright only touches the ground and the other two sticks." },
        { text: "Lock the bait's square notch into the upright's side notch. Set the long end of the release into the angled hook. The point sticks out under the log.", style: "detailed", drawing: "deadfall-set", caption: "1 release notch on the bevel. 2 square notch in the upright. 3 angled hook holds the release." },
        { text: "Use a log or a flat rock heavy enough to kill at once. Fit the sticks before you add the weight. Keep your hands out from under it. A nudge on the bait must drop the weight.", style: "simple", drawing: "deadfall-set" }
      ]
    },
    {
      id: "fishing-knots",
      title: "Palomar and improved clinch knots",
      helpLabel: "KNOTS",
      helpIcon: "food",
      helpNow: false,
      type: "card",
      category: "food",
      synonyms: ["palomar", "clinch", "improved clinch", "fishing knot", "knot", "hook knot"],
      source: src.knotsAngling,
      headerAction: null,
      stopIf: [
        "The wraps cross, or the palomar strands in the eye are crossed. Untie it and start again. A bad knot slips when a fish pulls."
      ],
      steps: [
        { text: "Improved clinch: pass the tag through the hook eye. Wrap the tag around the standing line 5 times on heavier line, or 7 times on light line. Do not let the wraps cross. The first wrap is the one next to the eye.", style: "detailed", drawing: "knot-clinch", caption: "Blue is the standing line. Red is the tag. Count five wraps." },
        { text: "Pass the tag back through the small loop just above the eye. Then pass the tag through the big loop you just made. That second pass is what makes it improved.", style: "detailed", drawing: "knot-clinch", caption: "Through the small loop first, then the big loop." },
        { text: "Wet the line. Pull the tag until the coils stack. Then pull the standing line so the knot slides down onto the eye. Leave a short tag. Tug the hook and the line to test it.", style: "detailed", drawing: "knot-clinch", caption: "Stacked coils sit against the eye." },
        { text: "Palomar: double about 6 inches of line. Pass the doubled end through the eye. Tie a loose overhand with the doubled line. Do not twist the two strands. Do not tighten yet.", style: "detailed", drawing: "knot-palomar", caption: "The overhand stays loose until the hook is through the loop." },
        { text: "Pass the whole hook through that end loop. Wet the line. Pull the standing line and the tag together. The loop seats around the eye.", style: "detailed", drawing: "knot-palomar", caption: "The two strands in the eye lie side by side, not crossed." },
        { text: "Trim the tag and leave a short stub. Test the knot with a hard tug before you fish it.", style: "simple", drawing: "knot-palomar" }
      ]
    },
    {
      id: "hand-line-trotline",
      title: "Hand line and trotline",
      helpLabel: "TROTLINE",
      helpIcon: "food",
      helpNow: false,
      type: "card",
      category: "food",
      synonyms: ["trotline", "trot line", "hand line", "handline", "gorge", "set line", "fishing"],
      source: src.fm2176,
      headerAction: null,
      stopIf: [
        "A dropper is long enough to wrap the main line or the next hook. Shorten it.",
        "You cannot check the line for hours in hot weather. A dead fish in the heat spoils."
      ],
      steps: [
        { text: "A gorge is a short piece of wood, bone, or wire, sharp at both ends, with a notch in the middle. Tie the line in the notch. Cover the gorge with bait laid lengthwise.", style: "detailed", drawing: "fish-kit", caption: "After the fish swallows it, a pull turns the gorge sideways." },
        { text: "Or cut a short hardwood shank, notch one end, and lash a thorn, bone, or nail into that notch so the point cannot shift. Tie a smooth stone on the line above the hook for a weight.", style: "detailed", drawing: "fish-kit", caption: "The point has to stay put. The stone takes the bait down." },
        { text: "Fish with a straight pole or with the line in your hand. Work the edges of the current, next to cover, not the fastest water. Set the hook with a firm pull.", style: "simple", drawing: "fish-kit" },
        { text: "Trotline: tie a main line between two stakes driven into the bottom, or between two anchors on the bank. Stake tops can sit just under the surface.", style: "detailed", drawing: "trotline-set", caption: "Set it along the edge, near cover. Stay out of the fast current." },
        { text: "Tie short droppers onto the main line so they cannot slide and cannot wrap each other. Make each dropper shorter than half the gap to the next one. Bait them. A stone can hold the line down.", style: "detailed", drawing: "trotline-set", caption: "Short droppers. Fixed to the main line." },
        { text: "Check the line often. Kill and clean what you keep. Do not leave fish to die on the hooks in the heat.", style: "simple", drawing: "fish-fresh" }
      ]
    },
    {
      id: "meat-in-heat",
      title: "Keep meat safe in the heat",
      helpLabel: "MEAT HEAT",
      helpIcon: "food",
      helpNow: false,
      type: "card",
      category: "food",
      synonyms: ["spoil", "spoiled", "heat", "phoenix", "desert", "cooler", "danger zone", "40", "ice", "venison"],
      source: src.usdaZone,
      headerAction: null,
      stopIf: [
        "The thickest meat has been between 40°F and 140°F for more than 1 hour and the air is above 90°F. Do not eat it.",
        "The air is cooler than 90°F but the meat has been in that zone more than 2 hours. Do not eat it.",
        "The meat smells sour or rotten, or it is warm and full of maggots. Do not eat it."
      ],
      steps: [
        { text: "Start the clock when the animal dies. Get the hide off and the guts out, or the meat off the bone, as fast as you can. A hide holds heat. The center of a big ham stays hot.", style: "detailed", drawing: "meat-heat", caption: "Do not stack warm meat in plastic in the sun." },
        { text: "Cut the meat into pieces you can cool. Put them in the shade, off the ground, separate, with air moving around them. Do not stack warm meat. Do not seal it in plastic.", style: "detailed", drawing: "meat-heat", caption: "Shade, pieces apart, air through a wet cloth." },
        { text: "A wet cloth in dry desert air, in the shade, with a breeze, only slows spoilage. In a Phoenix summer it does not cool meat to 40°F. Re-wet the cloth. Humid air works worse. This buys time. It is not a refrigerator.", style: "detailed", drawing: "meat-heat", caption: "Evaporative cooling is still inside the danger zone." },
        { text: "If you have ice, keep the cooler in the shade with the lid shut. Bag the meat. Put ice around it. Drain the melt water so the meat does not sit in blood.", style: "simple", drawing: "meat-heat" },
        { text: "Bacteria grow fastest from 40°F to 140°F. You cannot see them. Hold raw meat at 40°F or colder. Above 90°F air, you have 1 hour. In cooler air, you have 2 hours. Then cook it or do not eat it.", style: "detailed", drawing: "meat-time", caption: "Cold is 40°F and below. The red band is the danger zone. 140°F and hotter is for holding cooked food." },
        { text: "Keep flies off with a light cloth that still lets air through. Do not use a sealed bag on warm meat.", style: "simple", drawing: "meat-heat" }
      ]
    },
    {
      id: "cook-wild-game",
      title: "Cook wild game safely",
      helpLabel: "COOK GAME",
      helpIcon: "food",
      helpNow: false,
      type: "card",
      category: "food",
      synonyms: ["jerky", "temperature", "160", "165", "145", "venison", "internal temp", "cook", "undercooked", "bear", "javelina"],
      source: src.gameTemps,
      headerAction: null,
      stopIf: [
        "You cannot tell that the center reached the temperature on this card. Do not eat it.",
        "The meat was already spoiled. Cooking does not make spoiled meat safe. See the meat-safety card.",
        "It is bear, wild pig, or javelina and you only froze it. Freezing does not make that meat safe. Cook it to 160°F."
      ],
      steps: [
        { text: "Put the thermometer in the center of the thickest part. Do not let it touch bone. Color is not a test.", style: "detailed", drawing: "cook-temps", caption: "The tip is in the middle of the meat, not on a bone." },
        { text: "Deer and elk, steaks and roasts and ground meat: 160°F. Do not stop at 145°F. That beef rule is not the wild-game rule.", style: "detailed", drawing: "cook-temps", caption: "Deer and elk 160°F." },
        { text: "Rabbit and squirrel: 165°F. All birds, including ground bird: 165°F. Fish: 145°F, or cook until it is opaque and flakes. Do not eat raw freshwater fish.", style: "detailed", drawing: "cook-temps", caption: "Rabbit and squirrel 165°F. Birds 165°F. Fish 145°F." },
        { text: "Bear, wild pig, and javelina: 160°F in the center. Drying, smoking, curing, or freezing alone does not make this meat safe.", style: "simple", drawing: "cook-temps" },
        { text: "Any meat that was shot through the gut, or poked full of holes, is treated like ground meat: 160°F, because bacteria are in the middle. Ground bird is 165°F.", style: "simple", drawing: "cook-temps" },
        { text: "No thermometer: cut the meat into about 1-inch chunks. Simmer until the center of a chunk is gray-brown all the way through and the pot has been at a simmer, not just hot on the outside. If you are not sure, do not eat it.", style: "simple", drawing: "cook-temps" },
        { text: "Jerky: slice no thicker than 1/4 inch and trim the fat. Boil the strips until the center of one reads 160°F. Quarter-inch strips often take about 5 minutes. Thicker strips take longer. Birds must reach 165°F. If you cannot measure a bird strip, do not dry it.", style: "detailed", drawing: "cook-temps", caption: "The heat step is what makes jerky safe. Drying alone does not." },
        { text: "If you have an oven, you can dry first and then heat quarter-inch strips for 10 minutes at 275°F. Dry until a cooled piece cracks when you bend it but does not snap in two. Do not make jerky from meat that gut contents soaked. In desert heat, if you are not sure it is fully dry, keep it cold.", style: "detailed", drawing: "cook-temps", caption: "Cracks when bent. Does not break in two." },
        { text: "Reheat leftovers to 165°F. Cool them in shallow pans so they get cold fast.", style: "simple", drawing: "meat-time" }
      ]
    },
    {
      id: "meat-safe-signs",
      title: "Is this meat safe?",
      helpLabel: "MEAT SAFE",
      helpIcon: "food",
      helpNow: false,
      type: "card",
      category: "food",
      synonyms: ["spoil", "spoiled", "spoilage", "disease", "abscess", "slime", "lymph", "cwd", "tularemia", "safe to eat", "rotten"],
      source: src.meatSigns,
      headerAction: null,
      stopIf: [
        "You found the animal dead, or it acted tame, stumbling, drooling, or very thin. Do not eat it.",
        "You see pus, many spots on the liver, a bad smell from the organs, or green discharge. Do not eat it.",
        "The meat smells sour, rotten, or like ammonia or sulfur, or it is sticky and green. Do not eat it. Heat will not fix it."
      ],
      steps: [
        { text: "Do not eat an animal you found already dead. Do not eat one that let you walk up to it, or that was stumbling, drooling, or very thin.", style: "detailed", drawing: "meat-disease", caption: "You cannot tell why a sick or dead animal died." },
        { text: "Look at the liver before you keep the meat. Smooth, wet, and dark red or purple is normal to look at. Many white or yellow spots, or a swollen spleen: do not eat the animal.", style: "detailed", drawing: "meat-disease", caption: "Spotted liver means the whole animal is out." },
        { text: "A pocket of white, yellow, or green pus in the meat, in a lymph node, or as a soft lump under the jaw: do not eat the animal. A bad smell or green discharge from the organs: do not eat the meat.", style: "detailed", drawing: "meat-disease", caption: "Do not trim a diseased carcass and hope the rest is fine." },
        { text: "Deer and elk: do not eat the brain, spinal cord, eyes, spleen, tonsils, or lymph nodes. Do not saw through the backbone. You cannot see chronic wasting disease in a deer that still looks fine.", style: "simple", drawing: "meat-disease" },
        { text: "Spoiled meat smells sour, rotten, like ammonia, or like sulfur. It may be sticky with slime, or green or gray-green into the meat. A drum-tight carcass that smells foul when you open it is spoiled. Hide that slips, with green skin underneath, is spoiled.", style: "detailed", drawing: "meat-spoil", caption: "Green, sticky, or foul: do not eat it." },
        { text: "A rainbow shine on a dry, firm cut can be normal if there is no slime and no bad smell. Shine plus slime or a bad smell is spoiled. Cooking does not make spoiled meat safe.", style: "detailed", drawing: "meat-spoil", caption: "Rainbow alone, on dry firm meat, is not spoilage." },
        { text: "Gut contents or urine on the meat: cut off all of it plus a margin with a clean knife. Do not rinse that mess into the rest of the carcass. If you cannot remove all of it, do not eat the meat.", style: "simple", drawing: "deer-organs" },
        { text: "Looks can lie. If the meat was warmer than 40°F for more than 2 hours, or more than 1 hour when the air is above 90°F, do not eat it even if it still looks all right.", style: "simple", drawing: "meat-time" },
        { text: "Cook it only when the animal acted normal, you dressed it soon, the organs looked normal, the gut did not soak the meat, you cooled it fast or you are still inside the time limit, and the meat smells mild and is firm, not sticky and not green. Then use the cooking temperatures.", style: "simple", drawing: "cook-temps" }
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
    food: "Dressing game, fish, snares, and how to keep meat safe to eat.",
    power: "Batteries, solar, and light. Sample pages are marked.",
    maps: "If you are lost, start here. Then maps and trails.",
    comms: "PLACEHOLDER. Radio and signaling pages will go here.",
    repair: "PLACEHOLDER. Hand-tool repairs, knots, and building without a shop.",
    security: "PLACEHOLDER. Safety around the home and camp. No how-to-harm pages.",
    learning: "School and how-to books, including Wikipedia in Kiwix."
  };

  return { src, cards, helpNowOrder, categories, docs, categoryCopy };
})();
