document.addEventListener('DOMContentLoaded', function() {
    // Menu Toggle para dispositivos móveis
    const menuToggle = document.querySelector('.menu-toggle');
    const menu = document.querySelector('.menu');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            menu.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            if (menu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
    
    // Fechar menu ao clicar em um link
    const menuLinks = document.querySelectorAll('.menu a');
    menuLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (menu.classList.contains('active')) {
                menu.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });
    
    // Header com efeito de scroll
    const header = document.querySelector('header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.style.padding = '10px 0';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.padding = '15px 0';
            header.style.boxShadow = 'none';
        }
    });
    
    // Tabs para a seção de soluções
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Remover classe active de todos os botões e conteúdos
            tabBtns.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Adicionar classe active ao botão e conteúdo clicado
            this.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // Slider de depoimentos
    const depoimentos = document.querySelectorAll('.depoimento');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentIndex = 0;
    
    // Esconder todos os depoimentos exceto o primeiro
    if (depoimentos.length > 1) {
        for (let i = 1; i < depoimentos.length; i++) {
            depoimentos[i].style.display = 'none';
        }
        
        // Função para mostrar depoimento atual
        function showDepoimento(index) {
            depoimentos.forEach(depo => {
                depo.style.display = 'none';
            });
            depoimentos[index].style.display = 'block';
        }
        
        // Event listeners para os botões de navegação
        if (prevBtn && nextBtn) {
            prevBtn.addEventListener('click', function() {
                currentIndex--;
                if (currentIndex < 0) {
                    currentIndex = depoimentos.length - 1;
                }
                showDepoimento(currentIndex);
            });
            
            nextBtn.addEventListener('click', function() {
                currentIndex++;
                if (currentIndex >= depoimentos.length) {
                    currentIndex = 0;
                }
                showDepoimento(currentIndex);
            });
        }
    }
    
    // Formulário de contato
    const contactForm = document.getElementById('formulario-contato');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Aqui você adicionaria a lógica para enviar o formulário
            // Por exemplo, usando fetch para enviar os dados para um servidor
            
            // Simulação de envio bem-sucedido
            alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
            contactForm.reset();
        });
    }
    
    // Animação de elementos ao scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.servico-card, .sobre-image, .sobre-text, .tab-image, .tab-text, .cliente-logo');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Inicialmente, definir os elementos como invisíveis
    const elementsToAnimate = document.querySelectorAll('.servico-card, .sobre-image, .sobre-text, .tab-image, .tab-text, .cliente-logo');
    elementsToAnimate.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Executar a animação no carregamento e no scroll
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);
    
    // Smooth scroll para links de âncora
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});