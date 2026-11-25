/* Site settings. Edit hostUrl when the app is published somewhere other than where it is served from. */
window.SHTF_CONFIG = {
  // Where the published copy of the app lives (version.json, sources.json and all app files).
  // "" means the same place this copy was loaded from. Example: "https://example.org/shtf-search/"
  // A different host must send CORS headers (Access-Control-Allow-Origin) for these files.
  hostUrl: "",
  versionFile: "version.json",
  sourcesFile: "sources.json"
};
