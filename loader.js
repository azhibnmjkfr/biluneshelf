// ========================================
// LOADING SCREEN PREMIUM
// ========================================

(function() {
    'use strict';

    // Buat elemen loading screen dengan loading bar premium
    const loadingHTML = `
        <div class="loading-screen" id="loadingScreen">
            <div class="loading-content">
                <!-- Logo / Brand -->
                <div class="loading-brand">
                    <span class="loading-brand-icon">📚</span>
                    <span class="loading-brand-name">BiluneShelf</span>
                </div>
                
                <!-- Loading Bar Premium -->
                <div class="loading-bar-wrapper">
                    <div class="loading-bar-track">
                        <div class="loading-bar-fill" id="loadingBarFill"></div>
                    </div>
                    <div class="loading-bar-info">
                        <span class="loading-bar-text" id="loadingBarText">Memuat Koleksi Buku</span>
                        <span class="loading-bar-percent" id="loadingBarPercent">0%</span>
                    </div>
                </div>

                <!-- Loading Dots Decorative -->
                <div class="loading-dots">
                    <span class="dot"></span>
                    <span class="dot"></span>
                    <span class="dot"></span>
                    <span class="dot"></span>
                    <span class="dot"></span>
                </div>
            </div>
        </div>
    `;

    // Inject ke body
    document.body.insertAdjacentHTML('afterbegin', loadingHTML);

    // CSS untuk loading premium (inject lewat JS)
    const style = document.createElement('style');
    style.textContent = `
        /* ======================================== */
        /* LOADING SCREEN PREMIUM                    */
        /* ======================================== */
        .loading-screen {
            position: fixed;
            inset: 0;
            z-index: 99999;
            background: #0b0d12;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: opacity 0.8s ease, transform 0.8s ease;
        }

        .loading-screen.hidden {
            opacity: 0;
            visibility: hidden;
            pointer-events: none;
            transform: scale(1.05);
        }

        .loading-content {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 32px;
            max-width: 360px;
            width: 100%;
            padding: 0 20px;
        }

        /* Brand */
        .loading-brand {
            display: flex;
            align-items: center;
            gap: 12px;
            font-family: 'Georgia', serif;
            font-size: 28px;
            font-weight: 700;
            background: linear-gradient(135deg, #ffffff 25%, #e2b874 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            letter-spacing: 2px;
        }

        .loading-brand-icon {
            font-size: 32px;
            -webkit-text-fill-color: initial;
        }

        /* Loading Bar Premium */
        .loading-bar-wrapper {
            width: 100%;
            display: flex;
            flex-direction: column;
            gap: 10px;
        }

        .loading-bar-track {
            width: 100%;
            height: 4px;
            background: rgba(255, 255, 255, 0.06);
            border-radius: 4px;
            overflow: hidden;
            position: relative;
            box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04);
        }

        .loading-bar-fill {
            height: 100%;
            width: 0%;
            background: linear-gradient(90deg, #e2b874, #f0d494, #e2b874);
            background-size: 200% 100%;
            border-radius: 4px;
            transition: width 0.3s ease;
            animation: shimmer 1.5s infinite;
            position: relative;
        }

        .loading-bar-fill::after {
            content: '';
            position: absolute;
            right: 0;
            top: 0;
            height: 100%;
            width: 20px;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3));
            border-radius: 4px;
            filter: blur(2px);
        }

        @keyframes shimmer {
            0% { background-position: -200% 0; }
            100% { background-position: 200% 0; }
        }

        .loading-bar-info {
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 12px;
            letter-spacing: 1px;
            color: #9ca3af;
            opacity: 0.6;
            font-weight: 300;
        }

        .loading-bar-text {
            transition: opacity 0.3s ease;
        }

        .loading-bar-percent {
            font-weight: 600;
            color: #e2b874;
            opacity: 0.8;
            font-size: 13px;
            min-width: 40px;
            text-align: right;
        }

        /* Loading Dots Decorative */
        .loading-dots {
            display: flex;
            gap: 8px;
            align-items: center;
            opacity: 0.3;
        }

        .loading-dots .dot {
            width: 6px;
            height: 6px;
            border-radius: 50%;
            background: #e2b874;
            animation: dotPulse 1.4s ease-in-out infinite;
        }

        .loading-dots .dot:nth-child(1) { animation-delay: 0s; }
        .loading-dots .dot:nth-child(2) { animation-delay: 0.2s; }
        .loading-dots .dot:nth-child(3) { animation-delay: 0.4s; }
        .loading-dots .dot:nth-child(4) { animation-delay: 0.6s; }
        .loading-dots .dot:nth-child(5) { animation-delay: 0.8s; }

        @keyframes dotPulse {
            0%, 80%, 100% { transform: scale(0.6); opacity: 0.2; }
            40% { transform: scale(1); opacity: 1; }
        }

        /* Transisi saat hidden */
        .loading-screen.hidden .loading-brand {
            opacity: 0;
            transform: translateY(-10px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }

        .loading-screen.hidden .loading-bar-wrapper {
            opacity: 0;
            transform: translateY(10px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }

        .loading-screen.hidden .loading-dots {
            opacity: 0;
            transform: scale(0.8);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }

        /* Responsive */
        @media (max-width: 480px) {
            .loading-brand {
                font-size: 22px;
            }
            .loading-brand-icon {
                font-size: 26px;
            }
            .loading-content {
                gap: 24px;
            }
            .loading-bar-info {
                font-size: 10px;
            }
            .loading-bar-percent {
                font-size: 11px;
                min-width: 34px;
            }
        }
    `;
    document.head.appendChild(style);

    // ========================================
    // LOADING BAR PROGRESS
    // ========================================
    let progress = 0;
    const barFill = document.getElementById('loadingBarFill');
    const barPercent = document.getElementById('loadingBarPercent');
    const barText = document.getElementById('loadingBarText');

    // Teks yang berubah sesuai progress
    const loadingTexts = [
        { max: 20, text: 'Menyusun Rak Buku' },
        { max: 40, text: 'Mengoleksi Naskah' },
        { max: 60, text: 'Merapikan Koleksi' },
        { max: 80, text: 'Menata Katalog' },
        { max: 100, text: 'Siap Dibaca!' }
    ];

    function updateProgress(value) {
        progress = Math.min(value, 100);
        barFill.style.width = progress + '%';
        barPercent.textContent = progress + '%';

        // Update teks sesuai progress
        for (let i = 0; i < loadingTexts.length; i++) {
            if (progress <= loadingTexts[i].max) {
                barText.textContent = loadingTexts[i].text;
                break;
            }
        }
    }

    // Simulasi loading progress (2 detik)
    function startLoading() {
        let current = 0;
        const step = 1;
        const interval = 20; // 20ms per step = 50 step/detik
        const totalSteps = 100;
        const duration = 2000; // 2 detik
        const stepDuration = duration / totalSteps; // 20ms

        const timer = setInterval(() => {
            current += step;
            if (current > 100) {
                current = 100;
                clearInterval(timer);
                // Selesai, panggil hideLoading dari luar
                if (typeof window._loadingComplete === 'function') {
                    window._loadingComplete();
                }
            }
            updateProgress(current);
        }, stepDuration);
    }

    // Simpan fungsi ke window agar bisa dipanggil dari script.js
    window._startLoading = startLoading;

    // Fungsi sembunyikan loading (dipanggil dari script.js)
    window.hideLoading = function() {
        const el = document.getElementById('loadingScreen');
        if (el) {
            // Tunggu sebentar lalu hidden
            setTimeout(() => {
                el.classList.add('hidden');
            }, 300);
        }
    };

    // Jalankan loading otomatis
    startLoading();

})();