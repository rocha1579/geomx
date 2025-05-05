document.addEventListener("DOMContentLoaded", () => {
    // Função para dividir o conteúdo em chunks e carregá-los progressivamente
    function initContentSplitting() {
      // Identifica as seções que podem ser carregadas sob demanda
      const deferredSections = [
        "#telemetria",
        "#rede-can",
        "#sensor-fadiga",
        "#controle-passageiros",
        "#video-veicular",
        "#camera-corporal",
      ]
  
      // Inicialmente, esconde as seções que serão carregadas sob demanda
      deferredSections.forEach((sectionId) => {
        const section = document.querySelector(sectionId)
        if (section) {
          section.style.display = "none"
          section.setAttribute("data-deferred", "true")
        }
      })
  
      // Adiciona um observador de interseção para carregar as seções quando necessário
      const sectionObserver = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const targetId = entry.target.getAttribute("href").substring(1)
              const targetSection = document.querySelector(`#${targetId}`)
  
              if (targetSection && targetSection.getAttribute("data-deferred") === "true") {
                // Mostra a seção quando o link correspondente está visível
                targetSection.style.display = "block"
                targetSection.removeAttribute("data-deferred")
  
                // Adiciona uma animação suave de fade-in
                targetSection.style.opacity = "0"
                setTimeout(() => {
                  targetSection.style.transition = "opacity 0.5s ease"
                  targetSection.style.opacity = "1"
                }, 10)
              }
  
              observer.unobserve(entry.target)
            }
          })
        },
        { rootMargin: "200px" },
      ) // Carrega um pouco antes do elemento entrar na viewport
  
      // Observa os links de navegação para as seções diferidas
      deferredSections.forEach((sectionId) => {
        const links = document.querySelectorAll(`a[href="${sectionId}"]`)
        links.forEach((link) => {
          sectionObserver.observe(link)
        })
      })
    }
  
    // Função para otimizar o carregamento de scripts de terceiros
    function optimizeThirdPartyScripts() {
      // Identifica scripts que podem ser carregados posteriormente
      const deferScripts = [
        "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/js/all.min.js",
        "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/js/all.min.js",
      ]
  
      // Remove os scripts existentes para evitar carregamento imediato
      document.querySelectorAll("script").forEach((script) => {
        if (deferScripts.includes(script.src)) {
          script.parentNode.removeChild(script)
        }
      })
  
      // Carrega os scripts após o carregamento inicial da página
      setTimeout(() => {
        deferScripts.forEach((scriptSrc) => {
          const script = document.createElement("script")
          script.src = scriptSrc
          script.defer = true
          document.body.appendChild(script)
        })
      }, 2000) // Atrasa o carregamento em 2 segundos
  
      // Enquanto isso, carrega apenas os ícones necessários para a navegação inicial
      const criticalIcons = `
        <style>
          .fa-bars:before { content: "\\f0c9"; }
          .fa-times:before { content: "\\f00d"; }
          .fa-moon:before { content: "\\f186"; }
          .fa-sun:before { content: "\\f185"; }
          .fa-whatsapp:before { content: "\\f232"; }
        </style>
      `
  
      const iconStyle = document.createElement("div")
      iconStyle.innerHTML = criticalIcons
      document.head.appendChild(iconStyle)
    }
  
    // Inicializa as otimizações
    initContentSplitting()
    optimizeThirdPartyScripts()
  
    // Adiciona um indicador de carregamento para melhorar a experiência do usuário
    const loadingIndicator = document.createElement("div")
    loadingIndicator.className = "loading-indicator"
    loadingIndicator.innerHTML = `
      <style>
        .loading-indicator {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 3px;
          background: linear-gradient(to right, transparent, var(--primary-color), transparent);
          z-index: 9999;
          animation: loading 2s ease-in-out infinite;
        }
        
        @keyframes loading {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      </style>
    `
    document.body.appendChild(loadingIndicator)
  
    // Remove o indicador de carregamento quando a página estiver completamente carregada
    window.addEventListener("load", () => {
      setTimeout(() => {
        loadingIndicator.style.display = "none"
      }, 500)
    })
  })
  