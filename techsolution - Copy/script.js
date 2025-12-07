document.addEventListener('DOMContentLoaded', function() {
    
    const totalClients = 11;      
    const filePrefix = 'client';  
    const showInitially = 10;      

    const clientGrid = document.getElementById('clientGrid');
    const loadMoreBtn = document.getElementById('loadMoreBtn');

    for (let i = 1; i <= totalClients; i++) {
        const slotDiv = document.createElement('div');
        slotDiv.classList.add('client-logo-slot');

        if (i > showInitially) {
            slotDiv.classList.add('hidden-slot');
            slotDiv.style.display = 'none';
        }

        const img = document.createElement('img');
        
        img.src = `${filePrefix}${i}.png`; 
        img.alt = `Klien ${i}`;

        img.onerror = function() {
            if (this.src.includes('.png')) {
                this.src = `${filePrefix}${i}.jpg`;
            } else {
                this.style.display = 'none'; 
                slotDiv.innerText = `Logo ${i}`; 
            }
        };

        slotDiv.appendChild(img);
        clientGrid.appendChild(slotDiv);
    }

    let hiddenSlots = document.querySelectorAll('.hidden-slot');

    if (hiddenSlots.length === 0 && loadMoreBtn) {
        loadMoreBtn.style.display = 'none';
    }

    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            hiddenSlots = document.querySelectorAll('.hidden-slot');
            
            if (hiddenSlots.length === 0) {
                loadMoreBtn.style.display = 'none';
                return;
            }

            let itemsToShow = 4; 

            hiddenSlots.forEach((slot, index) => {
                if (index < itemsToShow) {
                    slot.style.display = 'flex';
                    slot.classList.remove('hidden-slot');
                    
                    slot.style.opacity = 0;
                    slot.style.transition = "opacity 0.5s ease";
                    setTimeout(() => slot.style.opacity = 1, 50);
                }
            });

            if (document.querySelectorAll('.hidden-slot').length === 0) {
                loadMoreBtn.style.display = 'none';
            }
        });
    }

    const scrollLinks = document.querySelectorAll('.scroll-link');
    const navbar = document.querySelector('.navbar');

    scrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navHeight = navbar ? navbar.offsetHeight : 0;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - navHeight - 20;
                window.scrollTo({ top: offsetPosition, behavior: "smooth" });
            }
        });
    });
});

/* --- LANGUAGE TRANSLATION LOGIC --- */
document.addEventListener('DOMContentLoaded', () => {
    const langBtns = document.querySelectorAll('.lang-btn');
    const translatableElements = document.querySelectorAll('[data-en]');

    // 1. Cek apakah ada simpanan bahasa di memori browser
    const currentLang = localStorage.getItem('selectedLang') || 'id';
    updateLanguage(currentLang);

    // 2. Event Listener untuk tombol
    langBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.getAttribute('data-lang');
            updateLanguage(lang);
            localStorage.setItem('selectedLang', lang); // Simpan pilihan user
        });
    });

    function updateLanguage(lang) {
        // Update tampilan tombol aktif
        langBtns.forEach(btn => {
            if (btn.getAttribute('data-lang') === lang) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        // Update semua teks
        translatableElements.forEach(el => {
            if (lang === 'en') {
                // Simpan teks asli (ID) jika belum disimpan
                if (!el.getAttribute('data-id')) {
                    el.setAttribute('data-id', el.innerHTML);
                }
                el.innerHTML = el.getAttribute('data-en');
            } else {
                // Kembalikan ke teks asli (ID)
                if (el.getAttribute('data-id')) {
                    el.innerHTML = el.getAttribute('data-id');
                }
            }
        });
    }
});