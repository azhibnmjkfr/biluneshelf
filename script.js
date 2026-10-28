(function() {
    'use strict';

    // === ELEMENT REFERENCES ===
    const stage = document.getElementById('coverflowStage');
    const gridContainer = document.getElementById('gridContainer');
    const coverflowWrapper = document.getElementById('coverflowWrapper');
    const gridWrapper = document.getElementById('gridWrapper');
    
    // Info Korsel
    const coverflowInfo = document.getElementById('coverflowInfo');
    const cfInfoTitle = document.getElementById('cfInfoTitle');
    const cfInfoAuthor = document.getElementById('cfInfoAuthor');

    const btnViewCoverflow = document.getElementById('viewCoverflow');
    const btnViewGrid = document.getElementById('viewGrid');
    
    const searchInput = document.getElementById('searchInput');
    const filterDropdown = document.getElementById('filterDropdown');
    const filterSelect = document.getElementById('filterSelect');
    const filterSelectedText = document.getElementById('filterSelectedText');
    const menuItems = document.querySelectorAll('.filter-menu-item');
    const bookCount = document.getElementById('bookCount');

    // Panel Detail (Modal)
    const detailPanel = document.getElementById('detailPanel');
    const closePanelBtn = document.getElementById('closePanelBtn');
    const panelCover = document.getElementById('panelCover');
    const panelTitle = document.getElementById('panelTitle');
    const panelAuthor = document.getElementById('panelAuthor');
    const panelCategory = document.getElementById('panelCategory');
    const panelBody = document.getElementById('panelBody');
    const panelLink = document.getElementById('panelLink');

    // State
    let currentView = 'coverflow';
    let activeCategory = 'all';
    let currentIndex = 0;
    let filteredBooks = [];
    let allBooks = [];

    // === RENDER FUNCTIONS ===
    function initData() {
        allBooks = bookData;
        filteredBooks = [...allBooks];
        
        renderCoverflow();
        renderGrid();
        updateFooterCount();
        setCoverflowPosition(currentIndex);
    }

    function renderCoverflow() {
        stage.innerHTML = '';
        filteredBooks.forEach((book, index) => {
            const el = document.createElement('div');
            el.className = 'cf-book';
            el.dataset.index = index;
            
            // FALLBACK COVER: Jika gambar tidak ada/gagal load
            const style = book.cover ? `background-image: url('${book.cover}')` : 'background: linear-gradient(135deg, #1e293b, #0f172a);';
            el.style.cssText = style;
            
            el.addEventListener('click', (e) => {
                e.stopPropagation();
                if (currentIndex !== index) {
                    currentIndex = index;
                    setCoverflowPosition(currentIndex);
                }
            });

            stage.appendChild(el);
        });
        
        // Pesan Kosong Coverflow
        if (filteredBooks.length === 0) {
            cfInfoTitle.textContent = "Buku Tidak Ditemukan";
            cfInfoAuthor.textContent = "Coba kata kunci lain";
        }
    }

    function renderGrid() {
        gridContainer.innerHTML = '';
        
        if (filteredBooks.length === 0) {
            gridContainer.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: #8b9bb4; margin-top: 20px;">Buku tidak ditemukan. Coba kata kunci lain.</p>`;
            return;
        }

        filteredBooks.forEach(book => {
            const el = document.createElement('div');
            el.className = 'grid-book';
            
            const style = book.cover ? `background-image: url('${book.cover}')` : 'background: linear-gradient(135deg, #1e293b, #0f172a);';
            
            el.innerHTML = `
                <div class="grid-title">${book.title}</div>
            `;
            el.style.cssText = style;
            
            el.addEventListener('click', () => openDetailPanel(book));
            gridContainer.appendChild(el);
        });
    }

    // === INFINITE COVERFLOW LOGIC ===
    function setCoverflowPosition(index) {
        const books = stage.querySelectorAll('.cf-book');
        const totalBooks = books.length;
        if (totalBooks === 0) return;

        if (index < 0) index = totalBooks - 1;
        if (index >= totalBooks) index = 0;
        currentIndex = index;

        books.forEach((book, i) => {
            book.className = 'cf-book'; 
            let diff = i - currentIndex;
            
            if (diff > totalBooks / 2) diff -= totalBooks;
            if (diff < -totalBooks / 2) diff += totalBooks;
            
            if (diff === 0) book.classList.add('active');
            else if (diff === -1) book.classList.add('left-1');
            else if (diff === 1) book.classList.add('right-1');
            else if (diff === -2) book.classList.add('left-2');
            else if (diff === 2) book.classList.add('right-2');
            else book.classList.add('hidden');
        });

        if (filteredBooks[currentIndex]) {
            cfInfoTitle.textContent = filteredBooks[currentIndex].title;
            cfInfoAuthor.textContent = 'oleh ' + filteredBooks[currentIndex].author;
        }
    }

    coverflowInfo.addEventListener('click', () => {
        if (filteredBooks[currentIndex]) {
            openDetailPanel(filteredBooks[currentIndex]);
        }
    });

    document.addEventListener('keydown', (e) => {
        if (currentView === 'coverflow' && !detailPanel.classList.contains('visible')) {
            if (e.key === 'ArrowLeft') { currentIndex--; setCoverflowPosition(currentIndex); }
            if (e.key === 'ArrowRight') { currentIndex++; setCoverflowPosition(currentIndex); }
        }
        if (e.key === 'Escape' && detailPanel.classList.contains('visible')) {
            closeDetailPanel();
        }
    });

    // === SWIPE / GESTURE (Mobile) ===
    let touchStartX = 0;
    let touchMoved = false;

    coverflowWrapper.addEventListener('touchstart', e => {
        if (e.target.closest('.coverflow-info')) return; 
        touchStartX = e.changedTouches[0].screenX;
        touchMoved = false;
    }, {passive: true});

    coverflowWrapper.addEventListener('touchmove', () => {
        touchMoved = true;
    }, {passive: true});

    coverflowWrapper.addEventListener('touchend', e => {
        if (currentView !== 'coverflow' || touchMoved || e.target.closest('.coverflow-info')) return;
        let touchEndX = e.changedTouches[0].screenX;
        
        if (touchEndX < touchStartX - 40) { currentIndex++; setCoverflowPosition(currentIndex); } 
        else if (touchEndX > touchStartX + 40) { currentIndex--; setCoverflowPosition(currentIndex); }
    }, {passive: true});

    // === DETAIL PANEL (MODAL) ===
    function openDetailPanel(book) {
        // FALLBACK GAMBAR DI MODAL
        if(book.cover) {
            panelCover.src = book.cover;
            panelCover.style.display = 'block';
            panelCover.onerror = function() {
                this.style.display = 'none'; // Sembunyikan jika gambar error/404
            };
        } else {
            panelCover.style.display = 'none';
        }
        
        panelTitle.textContent = book.title;
        panelAuthor.textContent = 'oleh ' + book.author;
        panelBody.textContent = book.synopsis;
        panelLink.href = book.url;
        
        let catText = 'Lainnya';
        if(book.category === 'novel') catText = 'Novel & Fiksi';
        if(book.category === 'inggris') catText = 'Bahasa Inggris';
        panelCategory.textContent = catText;

        detailPanel.classList.add('visible');
        document.body.classList.add('modal-open');
    }

    function closeDetailPanel() {
        detailPanel.classList.remove('visible');
        document.body.classList.remove('modal-open');
    }

    closePanelBtn.addEventListener('click', closeDetailPanel);

    detailPanel.addEventListener('click', (e) => {
        if (e.target === detailPanel) closeDetailPanel();
    });

    // === VIEW TOGGLE (Korsel / Grid) ===
    btnViewCoverflow.addEventListener('click', () => {
        currentView = 'coverflow';
        btnViewCoverflow.classList.add('active');
        btnViewGrid.classList.remove('active');
        
        gridWrapper.classList.remove('active');
        setTimeout(() => {
            gridWrapper.style.display = 'none';
            coverflowWrapper.style.display = 'flex';
            setTimeout(() => coverflowWrapper.style.opacity = '1', 50);
        }, 300);
    });

    btnViewGrid.addEventListener('click', () => {
        currentView = 'grid';
        btnViewGrid.classList.add('active');
        btnViewCoverflow.classList.remove('active');
        
        coverflowWrapper.style.opacity = '0';
        setTimeout(() => {
            coverflowWrapper.style.display = 'none';
            gridWrapper.style.display = 'block';
            setTimeout(() => gridWrapper.classList.add('active'), 50);
        }, 300);
    });

    // === SEARCH & FILTER ===
    filterSelect.addEventListener('click', (e) => {
        e.stopPropagation();
        filterDropdown.classList.toggle('open');
    });

    document.addEventListener('click', (e) => {
        if (!filterDropdown.contains(e.target)) filterDropdown.classList.remove('open');
    });

    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            const val = item.dataset.value;
            activeCategory = val;
            
            filterSelectedText.textContent = item.textContent;
            menuItems.forEach(m => m.classList.remove('active'));
            item.classList.add('active');
            
            applyFilterAndSearch();
            filterDropdown.classList.remove('open');
        });
    });

    searchInput.addEventListener('input', () => {
        applyFilterAndSearch();
    });

    function applyFilterAndSearch() {
        const query = searchInput.value.toLowerCase().trim();
        
        filteredBooks = allBooks.filter(book => {
            const matchSearch = book.title.toLowerCase().includes(query) || book.author.toLowerCase().trim().includes(query);
            const matchFilter = activeCategory === 'all' || book.category === activeCategory;
            return matchSearch && matchFilter;
        });

        currentIndex = 0; 
        renderCoverflow();
        renderGrid();
        updateFooterCount();
        setCoverflowPosition(0);
    }

    function updateFooterCount() {
        if (filteredBooks.length === allBooks.length) {
            bookCount.textContent = filteredBooks.length + ' buku dalam koleksi';
        } else {
            bookCount.textContent = filteredBooks.length + ' buku ditemukan';
        }
    }

    // === INIT ===
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initData);
    } else {
        initData();
    }

    // === PERBAIKAN: PAKSA LOADING SELESAI SETELAH 2 DETIK ===
    if (typeof hideLoading === 'function') {
        setTimeout(hideLoading, 2000); 
    }

})();