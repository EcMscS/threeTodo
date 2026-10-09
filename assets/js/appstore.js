(function () {
  var root = document.documentElement;
  var appId = root.getAttribute("data-ios-app-id");
  var country = root.getAttribute("data-ios-country") || "us";
  if (!appId) return;

  window.__threeTodoAppStore = function (json) {
    if (!json || !json.results || !json.results.length) return;
    var app = json.results[0];

    if (app.formattedPrice) {
      document.querySelectorAll("[data-app-price]").forEach(function (el) {
        el.textContent = app.formattedPrice;
      });
    }

    if (app.artworkUrl512) {
      document.querySelectorAll("[data-app-icon]").forEach(function (el) {
        if (!el.getAttribute("src")) el.setAttribute("src", app.artworkUrl512);
      });
    }

    if (app.trackViewUrl) {
      document.querySelectorAll("[data-app-store-link]").forEach(function (el) {
        if (!el.getAttribute("href")) el.setAttribute("href", app.trackViewUrl);
      });
    }
  };

  var script = document.createElement("script");
  script.src =
    "https://itunes.apple.com/lookup?id=" +
    encodeURIComponent(appId) +
    "&country=" +
    encodeURIComponent(country) +
    "&callback=__threeTodoAppStore";
  script.async = true;
  document.head.appendChild(script);
})();
