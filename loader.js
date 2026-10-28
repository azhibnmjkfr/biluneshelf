(function() {
    'use strict';

    const loadingHTML = `
        <div class="loading-screen" id="loadingScreen" style="position:fixed; inset:0; z-index:99999; background:#05070a; display:flex; align-items:center; justify-content:center; transition:opacity 0.6s ease, visibility 0.6s ease;">
            <div style="display:flex; flex-direction:column; align-items:center; gap:20px;">
                <div style="font-family:'Playfair Display', serif; font-size:32px; font-weight:600; color:#00e5ff; text-shadow: 0 0 20px rgba(0,229,255,0.3);">BiluneShelf</div>
                
                <div style="width:200px; height:2px; background:rgba(255,255,255,0.1); border-radius:2px; overflow:hidden;">
                    <div id="loaderBar" style="width:0%; height:100%; background:#00e5ff; transition:width 0.3s ease;"></div>
                </div>
                
                <!-- Teks Acak (Scramble Text) -->
                <div id="loaderText" style="font-family:'Inter', sans-serif; font-size:10px; color:#8b9bb4; letter-spacing:2px; text-transform:uppercase; height:14px;">MENGINISIALISASI SISTEM...</div>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('afterbegin', loadingHTML);
    const bar = document.getElementById('loaderBar');
    const textEl = document.getElementById('loaderText');
    
    // Karakter untuk efek acak
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
    const finalText = 'KOLEKSI SIAP DIBACA';
    let progress = 0;
    let textInterval;

    // Fungsi untuk mengacak teks
    function scrambleText() {
        let displayText = '';
        let scrambleCount = 0;
        const maxScramble = 10; // Jumlah huruf yang diacak

        for (let i = 0; i < finalText.length; i++) {
            if (finalText[i] === ' ') {
                displayText += ' ';
            } else if (scrambleCount < maxScramble) {
                displayText += chars[Math.floor(Math.random() * chars.length)];
                scrambleCount++;
            } else {
                displayText += finalText[i];
            }
        }
        textEl.textContent = displayText;
    }

    // Jalankan animasi teks acak
    textInterval = setInterval(scrambleText, 50);

    // Simulasi Progress Bar
    const barInterval = setInterval(() => {
        progress += Math.floor(Math.random() * 8) + 2; // Naik acak 2-10%
        bar.style.width = Math.min(progress, 100) + '%';
        
        if (progress >= 100) {
            clearInterval(barInterval);
            clearInterval(textInterval); // Hentikan teks acak
            textEl.textContent = finalText; // Kunci teks final
            textEl.style.color = '#00e5ff'; // Ubah warna jadi cyan
        }
    }, 100);

    window.hideLoading = function() {
        const el = document.getElementById('loadingScreen');
        if (el) setTimeout(() => el.style.display = 'none', 500);
    };
})();