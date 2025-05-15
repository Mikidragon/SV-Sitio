// script.js  
document.addEventListener('DOMContentLoaded', function() {  
    // Verificar estado de autenticación  
    function checkAuthStatus() {  
        const userSession = localStorage.getItem('userSession');  
        if (userSession) {  
            const user = JSON.parse(userSession);  
            document.getElementById('guest-actions').style.display = 'none';  
            document.getElementById('user-profile').style.display = 'block';  
            document.getElementById('userName').textContent = user.name;  
            
            if (user.role === 'teacher' || user.role === 'admin') {  
                document.getElementById('teacherPanelLink').style.display = 'block';  
            }  
        } else {  
            document.getElementById('guest-actions').style.display = 'block';  
            document.getElementById('user-profile').style.display = 'none';  
            document.getElementById('teacherPanelLink').style.display = 'none';  
        }  
    }  

    function logout() {  
        localStorage.removeItem('userSession');  
        window.location.href = '../auth.html';  
    }  

    // Animación suave al scroll  
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {  
        anchor.addEventListener('click', function(e) {  
            e.preventDefault();  
            document.querySelector(this.getAttribute('href')).scrollIntoView({  
                behavior: 'smooth'  
            });  
        });  
    });  

    // Animación de entrada para elementos  
    const observerOptions = {  
        threshold: 0.1,  
        rootMargin: '0px'  
    };  

    const observer = new IntersectionObserver((entries) => {  
        entries.forEach(entry => {  
            if (entry.isIntersecting) {  
                entry.target.style.opacity = '1';  
                entry.target.style.transform = 'translateY(0)';  
            }  
        });  
    }, observerOptions);  

    document.querySelectorAll('.course-card, .feature-card').forEach(element => {  
        element.style.opacity = '0';  
        element.style.transform = 'translateY(20px)';  
        element.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';  
        observer.observe(element);  
    });  

    // Inicializar  
    checkAuthStatus();  
});