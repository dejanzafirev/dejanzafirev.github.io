(() => {
  const root = document.documentElement;
  const darkPreference = window.matchMedia("(prefers-color-scheme: dark)");

  function storedTheme() {
    const theme = localStorage.getItem("theme");
    return theme === "dark" || theme === "light" ? theme : null;
  }

  function activeTheme() {
    return storedTheme() || (root.hasAttribute("data-theme") ? "dark" : null) || (darkPreference.matches ? "dark" : "light");
  }

  function setTheme(theme = activeTheme()) {
    const icon = document.getElementById("theme-icon");

    if (theme === "dark") {
      root.setAttribute("data-theme", "dark");
      icon?.classList.remove("fa-sun");
      icon?.classList.add("fa-moon");
      return;
    }

    root.removeAttribute("data-theme");
    icon?.classList.remove("fa-moon");
    icon?.classList.add("fa-sun");
  }

  function syncChromeSpacing() {
    const masthead = document.querySelector(".masthead");
    const footer = document.querySelector(".page__footer");

    if (masthead) document.body.style.paddingTop = `${masthead.offsetHeight}px`;
    document.body.style.marginBottom = footer ? `${footer.offsetHeight}px` : "";
  }

  function initThemeToggle() {
    document.getElementById("theme-toggle")?.addEventListener("click", (event) => {
      event.preventDefault();
      const nextTheme = root.hasAttribute("data-theme") ? "light" : "dark";
      localStorage.setItem("theme", nextTheme);
      setTheme(nextTheme);
    });

    darkPreference.addEventListener("change", (event) => {
      if (!storedTheme()) setTheme(event.matches ? "dark" : "light");
    });
  }

  function initNavigation() {
    const nav = document.getElementById("site-nav");
    const toggle = document.getElementById("nav-toggle");

    toggle?.addEventListener("click", () => {
      const isOpen = nav?.classList.toggle("nav-open") || false;
      toggle.classList.toggle("open", isOpen);
      toggle.setAttribute("aria-expanded", String(isOpen));
    });
  }

  function initAuthorLinks() {
    document.querySelectorAll(".author__urls-wrapper button").forEach((button) => {
      const links = button.closest(".author__urls-wrapper")?.querySelector(".author__urls");

      button.addEventListener("click", () => {
        const isOpen = button.classList.toggle("open");
        if (links) links.style.display = isOpen ? "block" : "";
      });
    });
  }

  function initAnchorScrolling() {
    document.addEventListener("click", (event) => {
      const link = event.target.closest('a[href^="#"], a[href*="/#"]');
      if (!link || link.origin !== window.location.origin || link.pathname !== window.location.pathname || !link.hash) return;

      const target = document.getElementById(decodeURIComponent(link.hash.slice(1)));
      if (!target) return;

      event.preventDefault();
      const mastheadHeight = document.querySelector(".masthead")?.offsetHeight || 0;
      const top = target.getBoundingClientRect().top + window.scrollY - mastheadHeight - 8;
      window.history.pushState(null, "", link.hash);
      window.scrollTo({ top, behavior: "smooth" });
    });
  }

  function initResponsiveVideos() {
    const players = document.querySelectorAll('iframe[src*="youtube.com"], iframe[src*="youtube-nocookie.com"], iframe[src*="player.vimeo.com"]');

    players.forEach((player) => {
      if (player.parentElement?.classList.contains("fluid-width-video-wrapper")) return;

      const width = Number(player.getAttribute("width")) || player.clientWidth || 16;
      const height = Number(player.getAttribute("height")) || player.clientHeight || 9;
      const wrapper = document.createElement("div");

      wrapper.className = "fluid-width-video-wrapper";
      wrapper.style.paddingTop = `${(height / width) * 100}%`;
      player.removeAttribute("width");
      player.removeAttribute("height");
      player.parentNode.insertBefore(wrapper, player);
      wrapper.appendChild(player);
    });
  }

  function init() {
    setTheme();
    initThemeToggle();
    initNavigation();
    initAuthorLinks();
    initAnchorScrolling();
    initResponsiveVideos();
    syncChromeSpacing();

    window.addEventListener("resize", syncChromeSpacing);
    screen.orientation?.addEventListener("change", syncChromeSpacing);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();
