/* Search corpus and MiniSearch options, shared by the app and scripts/build_version.mjs (prebuilt index). */
window.SEARCH_OPTIONS = {
  fields: ["title", "text"],
  storeFields: ["title", "type", "category", "path", "placeholder"],
  searchOptions: { boost: { title: 3 }, fuzzy: 0.2, prefix: true }
};

window.buildSearchDocs = function (LIBRARY) {
  const docs = [];
  for (const c of LIBRARY.cards) {
    docs.push({
      id: "card:" + c.id,
      title: c.title,
      type: "card",
      category: c.category,
      text: [c.title, c.helpLabel, c.helpSub || "", (c.synonyms || []).join(" "), c.steps.map((s) => s.text + " " + (s.caption || "")).join(" "), c.stopIf.join(" ")].join(" ")
    });
  }
  for (const d of LIBRARY.docs) {
    docs.push({
      id: "doc:" + d.id,
      title: d.title,
      type: d.type,
      category: d.category,
      path: d.path || "",
      placeholder: !!d.placeholder,
      text: [d.title, d.body, (d.synonyms || []).join(" ")].join(" ")
    });
  }
  return docs;
};
