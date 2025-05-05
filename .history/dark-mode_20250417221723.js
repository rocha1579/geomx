document.addEventListener("DOMContentLoaded", () => {
    // Dark Mode Toggle
    const body = document.body
    const darkModeToggle = document.createElement("div")
    darkModeToggle.className = "dark-mode-toggle"
    darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>'
    document.body.appendChild(darkModeToggle)
  
    // Check for saved dark mode preference
    if (localStorage.getItem("darkMode") === "enabled") {
      body.classList.add("dark-mode")
      darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>'
    }
  
    // Toggle dark mode
    darkModeToggle.addEventListener("click", () => {
      if (body.classList.contains("dark-mode")) {
        body.classList.remove("dark-mode")
        localStorage.setItem("darkMode", "disabled")
        darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>'
      } else {
        body.classList.add("dark-mode")
        localStorage.setItem("darkMode", "enabled")
        darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>'
      }
    })
  
    // Cookie Consent
    const cookieConsent = document.createElement("div")
    cookieConsent.className = "cookie-consent"
    cookieConsent.innerHTML = `
          <div class="cookie-text">
              <h4>Utilizamos cookies</h4>
              <p>Este site utiliza cookies para melhorar sua experiência. Ao continuar navegando, você concorda com nossa política de cookies.</p>
          </div>
          <div class="cookie-buttons">
              <button class="cookie-btn cookie-btn-settings">Configurações</button>
              <button class="cookie-btn cookie-btn-accept">Aceitar Todos</button>
          </div>
      `
    document.body.appendChild(cookieConsent)
  
    // Cookie Settings Modal
    const cookieSettingsModal = document.createElement("div")
    cookieSettingsModal.className = "cookie-settings-modal"
    cookieSettingsModal.innerHTML = `
          <div class="cookie-settings-content">
              <div class="cookie-settings-close"><i class="fas fa-times"></i></div>
              <div class="cookie-settings-header">
                  <h3>Configurações de Cookies</h3>
                  <p>Você pode escolher quais categorias de cookies deseja aceitar. Clique em "Salvar configurações" para confirmar sua escolha.</p>
              </div>
              <div class="cookie-settings-options">
                  <div class="cookie-option">
                      <div class="cookie-option-info">
                          <h4>Cookies Necessários</h4>
                          <p>Essenciais para o funcionamento básico do site. Não podem ser desativados.</p>
                      </div>
                      <label class="cookie-toggle">
                          <input type="checkbox" checked disabled>
                          <span class="cookie-toggle-slider"></span>
                      </label>
                  </div>
                  <div class="cookie-option">
                      <div class="cookie-option-info">
                          <h4>Cookies de Preferências</h4>
                          <p>Permitem que o site lembre de suas preferências, como tema escuro ou claro.</p>
                      </div>
                      <label class="cookie-toggle">
                          <input type="checkbox" id="preference-cookies" checked>
                          <span class="cookie-toggle-slider"></span>
                      </label>
                  </div>
                  <div class="cookie-option">
                      <div class="cookie-option-info">
                          <h4>Cookies Analíticos</h4>
                          <p>Ajudam a entender como você interage com o site, melhorando a experiência.</p>
                      </div>
                      <label class="cookie-toggle">
                          <input type="checkbox" id="analytics-cookies" checked>
                          <span class="cookie-toggle-slider"></span>
                      </label>
                  </div>
                  <div class="cookie-option">
                      <div class="cookie-option-info">
                          <h4>Cookies de Marketing</h4>
                          <p>Usados para rastrear visitantes em sites. A intenção é exibir anúncios relevantes.</p>
                      </div>
                      <label class="cookie-toggle">
                          <input type="checkbox" id="marketing-cookies">
                          <span class="cookie-toggle-slider"></span>
                      </label>
                  </div>
              </div>
              <div class="cookie-settings-buttons">
                  <button class="cookie-settings-save">Salvar Configurações</button>
              </div>
          </div>
      `
    document.body.appendChild(cookieSettingsModal)
  
    // Show cookie consent if not accepted
    if (!localStorage.getItem("cookiesAccepted")) {
      setTimeout(() => {
        cookieConsent.classList.add("show")
      }, 1000)
    }
  
    // Accept all cookies
    document.querySelector(".cookie-btn-accept").addEventListener("click", () => {
      localStorage.setItem("cookiesAccepted", "all")
      localStorage.setItem("preferencesCookies", "accepted")
      localStorage.setItem("analyticsCookies", "accepted")
      localStorage.setItem("marketingCookies", "accepted")
      cookieConsent.classList.remove("show")
    })
  
    // Open cookie settings
    document.querySelector(".cookie-btn-settings").addEventListener("click", () => {
      cookieSettingsModal.classList.add("show")
    })
  
    // Close cookie settings
    document.querySelector(".cookie-settings-close").addEventListener("click", () => {
      cookieSettingsModal.classList.remove("show")
    })
  
    // Save cookie settings
    document.querySelector(".cookie-settings-save").addEventListener("click", () => {
      localStorage.setItem("cookiesAccepted", "custom")
  
      localStorage.setItem(
        "preferencesCookies",
        document.getElementById("preference-cookies").checked ? "accepted" : "rejected",
      )
  
      localStorage.setItem(
        "analyticsCookies",
        document.getElementById("analytics-cookies").checked ? "accepted" : "rejected",
      )
  
      localStorage.setItem(
        "marketingCookies",
        document.getElementById("marketing-cookies").checked ? "accepted" : "rejected",
      )
  
      cookieSettingsModal.classList.remove("show")
      cookieConsent.classList.remove("show")
    })
  
    // Load saved cookie preferences
    if (localStorage.getItem("cookiesAccepted") === "custom") {
      if (localStorage.getItem("preferencesCookies") === "rejected") {
        document.getElementById("preference-cookies").checked = false
      }
  
      if (localStorage.getItem("analyticsCookies") === "rejected") {
        document.getElementById("analytics-cookies").checked = false
      }
  
      if (localStorage.getItem("marketingCookies") === "accepted") {
        document.getElementById("marketing-cookies").checked = true
      }
    }
  
    // Close modal when clicking outside
    cookieSettingsModal.addEventListener("click", (e) => {
      if (e.target === cookieSettingsModal) {
        cookieSettingsModal.classList.remove("show")
      }
    })
  })
  