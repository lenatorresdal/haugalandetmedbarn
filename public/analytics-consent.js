(() => {
  const CONSENT_KEY = "hmb-analytics-consent";
  const GOOGLE_TAG_ID = "GTM-KTGJ74W5";
  const ANALYTICS_SCRIPT_SELECTOR = "script[data-google-analytics]";

  const readConsent = () => {
    try {
      return window.localStorage.getItem(CONSENT_KEY);
    } catch {
      return null;
    }
  };

  const saveConsent = (value) => {
    try {
      window.localStorage.setItem(CONSENT_KEY, value);
    } catch {
      // Valget gjelder fortsatt for denne sidevisningen dersom lokal lagring er blokkert.
    }
  };

  const prepareGtag = () => {
    window.dataLayer = window.dataLayer || [];
    window.gtag =
      window.gtag ||
      function gtag() {
        window.dataLayer.push(arguments);
      };
  };

  const loadAnalytics = () => {
    if (document.querySelector(ANALYTICS_SCRIPT_SELECTOR)) return;

    prepareGtag();
    window.dataLayer.push({
      "gtm.start": Date.now(),
      event: "gtm.js",
    });

    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtm.js?id=${GOOGLE_TAG_ID}`;
    script.dataset.googleAnalytics = "true";
    document.head.append(script);
  };

  const deleteAnalyticsCookies = () => {
    document.cookie
      .split(";")
      .map((cookie) => cookie.trim().split("=")[0])
      .filter((name) => name === "_ga" || name.startsWith("_ga_"))
      .forEach((name) => {
        document.cookie = `${name}=; Max-Age=0; Path=/; SameSite=Lax`;
        if (window.location.hostname) {
          document.cookie = `${name}=; Max-Age=0; Path=/; Domain=${window.location.hostname}; SameSite=Lax`;
          document.cookie = `${name}=; Max-Age=0; Path=/; Domain=.${window.location.hostname}; SameSite=Lax`;
        }
      });
  };

  const disableAnalytics = () => {
    if (typeof window.gtag === "function") {
      window.gtag("consent", "update", {
        analytics_storage: "denied",
        ad_storage: "denied",
        ad_user_data: "denied",
        ad_personalization: "denied",
      });
    }
    deleteAnalyticsCookies();
  };

  let consentPanel = null;
  let settingsTrigger = null;

  const closeConsentPanel = () => {
    consentPanel?.remove();
    consentPanel = null;
    if (settingsTrigger) {
      settingsTrigger.focus();
      settingsTrigger = null;
    }
  };

  const chooseConsent = (value) => {
    saveConsent(value);
    if (value === "granted") loadAnalytics();
    else disableAnalytics();
    closeConsentPanel();
  };

  const showConsentPanel = (trigger = null) => {
    if (consentPanel) {
      consentPanel.querySelector("button")?.focus();
      return;
    }

    settingsTrigger = trigger;
    const currentChoice = readConsent();
    consentPanel = document.createElement("section");
    consentPanel.className = "analytics-consent";
    consentPanel.setAttribute("role", "region");
    consentPanel.setAttribute("aria-labelledby", "analytics-consent-title");

    const currentChoiceText =
      currentChoice === "granted"
        ? '<p class="analytics-consent-current">Nåværende valg: Analyse er aktivert.</p>'
        : currentChoice === "denied"
          ? '<p class="analytics-consent-current">Nåværende valg: Analyse er deaktivert.</p>'
          : "";

    consentPanel.innerHTML = `
      <div class="analytics-consent-content">
        <h2 id="analytics-consent-title">Kan vi bruke besøksstatistikk?</h2>
        <p>
          Vi ønsker å bruke Google Analytics for å forstå hvordan nettstedet brukes.
          Analyse aktiveres bare hvis du godtar. Du kan endre valget senere.
          <a href="/personvern#analyse">Les om personvern</a>.
        </p>
        ${currentChoiceText}
      </div>
      <div class="analytics-consent-actions">
        <button type="button" class="analytics-consent-button" data-consent-choice="granted">
          Ja, jeg godtar analyse
        </button>
        <button type="button" class="analytics-consent-button" data-consent-choice="denied">
          Nei, avvis analyse
        </button>
      </div>
    `;

    consentPanel
      .querySelector('[data-consent-choice="denied"]')
      .addEventListener("click", () => chooseConsent("denied"));
    consentPanel
      .querySelector('[data-consent-choice="granted"]')
      .addEventListener("click", () => chooseConsent("granted"));
    document.body.append(consentPanel);

    if (trigger) consentPanel.querySelector("button")?.focus();
  };

  const prepareSettingsButtons = () => {
    const buttons = document.querySelectorAll("[data-analytics-settings]");
    buttons.forEach((button) => {
      button.hidden = false;
      if (button.dataset.analyticsSettingsReady === "true") return;
      button.dataset.analyticsSettingsReady = "true";
      button.addEventListener("click", () => showConsentPanel(button));
    });
    return buttons.length > 0;
  };

  if (!prepareSettingsButtons()) {
    const settingsObserver = new MutationObserver(() => {
      if (prepareSettingsButtons()) settingsObserver.disconnect();
    });
    settingsObserver.observe(document.body, { childList: true, subtree: true });
  }

  const savedConsent = readConsent();
  if (savedConsent === "granted") loadAnalytics();
  else if (savedConsent !== "denied") showConsentPanel();
})();
