document.addEventListener("DOMContentLoaded", function () {
  const localHosts = ["localhost:4000", "127.0.0.1:5500"];
  if (localHosts.includes(window.location.host)) {
    document.querySelectorAll("a").forEach(function (anchor) {
      let href = anchor.getAttribute("href");
      if (!href.startsWith("/sites/") && href !== "/" && !href.includes("#")) {
        let newHref = "/sites" + href;
        anchor.setAttribute("href", newHref);
      }
    });
  } else {
    console.log("No adjustment needed for production environment.");
  }
});
