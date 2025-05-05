document.addEventListener("DOMContentLoaded", () => {
    // 1. Lazy loading para imagens
    const lazyImages = document.querySelectorAll("img")
    lazyImages.forEach((img) => {
      // Adiciona atributo loading="lazy" para todas as imagens
      img.setAttribute("loading", "lazy")
  
      // Converte src para data-src para imagens que não estão na viewport inicial
      if (!isInViewport(img) && !img.hasAttribute("data-src")) {
        img.setAttribute("data-src", img.src)
        img.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1"%3E%3C/svg%3E'
        img.classList.add("lazy")
      }
    })
  
    // Função para verificar se elemento está na viewport
    function isInViewport(element) {
      const rect = element.getBoundingClientRect()
      return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
      )
    }
  
    // Observer para carregar imagens quando entrarem na viewport
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target
          if (img.hasAttribute("data-src")) {
            img.src = img.getAttribute("data-src")
            img.removeAttribute("data-src")
            img.classList.remove("lazy")
          }
          observer.unobserve(img)
        }
      })
    })
  
    document.querySelectorAll("img.lazy").forEach((img) => {
      imageObserver.observe(img)
    })
  
    // 2. Otimização de animações no scroll
    let scrollTimeout
    const animateElements = document.querySelectorAll(
      ".section-header, .servico-content, .servico-image, .oferecemos-item, .confianca-card, .rede-can-feature, .sensor-image, .funcionamento-item",
    )
  
    // Declare animateOnScroll here to avoid the error
    const animateOnScroll = () => {}
  
    function optimizedAnimateOnScroll() {
      clearTimeout(scrollTimeout)
      scrollTimeout = setTimeout(() => {
        const windowHeight = window.innerHeight
  
        animateElements.forEach((element) => {
          const elementPosition = element.getBoundingClientRect().top
  
          if (elementPosition < windowHeight - 100) {
            element.classList.add("animated")
          }
        })
      }, 10) // Pequeno delay para não sobrecarregar o scroll
    }
  
    // Substituir o evento de scroll existente por um otimizado
    window.removeEventListener("scroll", animateOnScroll)
    window.addEventListener("scroll", optimizedAnimateOnScroll, { passive: true })
  
    // 3. Carregamento progressivo de seções
    const sections = document.querySelectorAll("section")
    let visibleSections = 3 // Número inicial de seções visíveis
  
    // Esconde seções que não são inicialmente visíveis
    for (let i = visibleSections; i < sections.length; i++) {
      sections[i].style.opacity = "0"
      sections[i].style.transition = "opacity 0.5s ease"
    }
  
    // Carrega mais seções conforme o usuário rola a página
    function loadMoreSections() {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000) {
        // Quando o usuário está próximo do final do conteúdo visível
        if (visibleSections < sections.length) {
          sections[visibleSections].style.opacity = "1"
          visibleSections++
        }
      }
    }
  
    window.addEventListener("scroll", loadMoreSections, { passive: true })
  
    // 4. Otimização do menu de navegação
    const menuItems = document.querySelectorAll(".menu a, .servicos-menu a")
    menuItems.forEach((item) => {
      item.addEventListener("click", function (e) {
        // Previne comportamento padrão apenas se for link interno
        if (this.getAttribute("href").startsWith("#")) {
          e.preventDefault()
  
          const targetId = this.getAttribute("href")
          const targetElement = document.querySelector(targetId)
  
          if (targetElement) {
            // Scroll suave otimizado
            window.scrollTo({
              top: targetElement.offsetTop - 80,
              behavior: "smooth",
            })
  
            // Fecha o menu móvel se estiver aberto
            const menu = document.querySelector(".menu")
            if (menu.classList.contains("active")) {
              menu.classList.remove("active")
              const menuToggle = document.querySelector(".menu-toggle")
              const icon = menuToggle.querySelector("i")
              icon.classList.remove("fa-times")
              icon.classList.add("fa-bars")
            }
          }
        }
      })
    })
  
    // 5. Otimização do dark mode e cookies
    // Atrasa a inicialização do dark mode e cookies para priorizar o carregamento do conteúdo principal
    setTimeout(() => {
      // Inicializa dark mode
      initDarkMode()
  
      // Inicializa cookies apenas se não tiverem sido aceitos
      if (!localStorage.getItem("cookiesAccepted")) {
        initCookieConsent()
      }
    }, 1000)
  
    function initDarkMode() {
      const darkModeToggle = document.querySelector(".dark-mode-toggle")
      if (!darkModeToggle) return
  
      darkModeToggle.style.display = "flex"
    }
  
    function initCookieConsent() {
      const cookieConsent = document.querySelector(".cookie-consent")
      if (!cookieConsent) return
  
      cookieConsent.classList.add("show")
    }
  })
  