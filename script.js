(function() {
    'use strict';

    // ========================================
    // RENDER BUKU DARI DATA
    // ========================================
    function renderBooks(books) {
        const container = document.getElementById('booksContainer');
        container.innerHTML = '';
        
        books.forEach(book => {
            const bookEl = document.createElement('div');
            bookEl.className = 'book';
            bookEl.dataset.category = book.category;
            bookEl.dataset.url = book.url;
            bookEl.dataset.synopsis = book.synopsis;
            bookEl.dataset.author = book.author;
            
            const title = book.title.replace(/&/g, '&amp;').replace(/"/g, '&quot;');
            const authorDisplay = book.author.split(' ')[0] || book.author;
            
            bookEl.innerHTML = `
                <div class="book-front-cover">
                    <div class="book-spine-line"></div>
                    <div class="book-title">${title}</div>
                    <div class="book-author">${authorDisplay}</div>
                </div>
            `;
            
            container.appendChild(bookEl);
        });
    }

    // ========================================
    // ELEMENT REFERENCES
    // ========================================
    const scrollContainer = document.getElementById('booksScroll');
    const scrollArea = document.getElementById('scrollArea');
    const closeBtn = document.getElementById('closeBtn');
    const searchInput = document.getElementById('searchInput');
    const searchContainer = document.getElementById('searchContainer');
    const synopsisPanel = document.getElementById('synopsisPanel');
    const panelTitle = document.getElementById('panelTitle');
    const panelAuthor = document.getElementById('panelAuthor');
    const panelBody = document.getElementById('panelBody');
    const panelLink = document.getElementById('panelLink');
    const shelfWrapper = document.getElementById('shelfWrapper');
    const scrollIndicator = document.getElementById('scrollIndicator');
    const dots = scrollIndicator.querySelectorAll('.scroll-dot');
    const bookCount = document.getElementById('bookCount');

    const filterDropdown = document.getElementById('filterDropdown');
    const filterSelect = document.getElementById('filterSelect');
    const filterMenu = document.getElementById('filterMenu');
    const filterSelectedText = document.getElementById('filterSelectedText');
    const filterCount = document.getElementById('filterCount');
    const menuItems = filterMenu.querySelectorAll('.filter-menu-item');
    const countAll = document.getElementById('countAll');
    const countInggris = document.getElementById('countInggris');
    const countNovel = document.getElementById('countNovel');
    const countLainnya = document.getElementById('countLainnya');

    let activeCategory = 'all';
    let isAnimating = false;
    let isOpened = false;
    let scrollTimeout = null;
    let isDown = false;
    let startX, scrollLeft;
    let activeBook = null;
    let books = [];

    // ========================================
    // UPDATE BOOK COUNTS
    // ========================================
    function updateCounts() {
        let total = books.length;
        let inggris = 0, novel = 0, lainnya = 0;

        books.forEach(book => {
            const cat = book.dataset.category;
            if (cat === 'inggris') inggris++;
            else if (cat === 'novel') novel++;
            else if (cat === 'lainnya') lainnya++;
        });

        countAll.textContent = total;
        countInggris.textContent = inggris;
        countNovel.textContent = novel;
        countLainnya.textContent = lainnya;
        filterCount.textContent = total;
        bookCount.textContent = total + ' buku dalam koleksi';
    }

    // ========================================
    // FILTER FUNCTION
    // ========================================
    function filterBooks(category) {
        activeCategory = category;

        menuItems.forEach(item => {
            item.classList.toggle('active', item.dataset.value === category);
        });

        const labels = {
            'all': 'Semua Buku',
            'inggris': 'Buku Bahasa Inggris',
            'novel': 'Novel',
            'lainnya': 'Lainnya'
        };
        filterSelectedText.textContent = labels[category] || 'Semua Buku';

        let count = 0;
        books.forEach(book => {
            const cat = book.dataset.category;
            if (category === 'all' || cat === category) count++;
        });
        filterCount.textContent = count;

        if (category === 'all') {
            bookCount.textContent = books.length + ' buku dalam koleksi';
        } else {
            const label = labels[category] || '';
            bookCount.textContent = count + ' ' + label.toLowerCase();
        }

        const container = document.getElementById('booksContainer');
        container.classList.add('filtering');

        setTimeout(() => {
            books.forEach(book => {
                const cat = book.dataset.category;
                if (category === 'all' || cat === category) {
                    book.classList.remove('category-hidden');
                } else {
                    book.classList.add('category-hidden');
                }
            });

            setTimeout(() => {
                container.classList.remove('filtering');
                updateScrollIndicator();
                updateShelfGlow();
            }, 100);

        }, 200);
    }

    // ========================================
    // DROPDOWN TOGGLE
    // ========================================
    filterSelect.addEventListener('click', function(e) {
        e.stopPropagation();
        filterDropdown.classList.toggle('open');
    });

    menuItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.stopPropagation();
            const value = this.dataset.value;
            if (value !== activeCategory) {
                filterBooks(value);
            }
            filterDropdown.classList.remove('open');
        });
    });

    document.addEventListener('click', function(e) {
        if (!filterDropdown.contains(e.target)) {
            filterDropdown.classList.remove('open');
        }
    });

    // ========================================
    // DRAG SCROLL
    // ========================================
    function handleDragStart(e) {
        if (isOpened) return;
        isDown = true;
        const pageX = e.pageX || e.touches[0].pageX;
        startX = pageX - scrollContainer.offsetLeft;
        scrollLeft = scrollContainer.scrollLeft;
        scrollContainer.style.cursor = 'grabbing';
        shelfWrapper.style.cursor = 'grabbing';
    }

    function handleDragEnd() {
        if (isDown) {
            isDown = false;
            scrollContainer.style.cursor = 'grab';
            shelfWrapper.style.cursor = 'grab';
            updateScrollIndicator();
            updateShelfGlow();
        }
    }

    function handleDragMove(e) {
        if (!isDown || isOpened) return;
        e.preventDefault();
        const pageX = e.pageX || e.touches[0].pageX;
        const x = pageX - scrollContainer.offsetLeft;
        const walk = (x - startX) * 1.5;
        scrollContainer.scrollLeft = scrollLeft - walk;
        updateScrollIndicator();
        updateShelfGlow();
    }

    scrollArea.addEventListener('mousedown', handleDragStart);
    scrollArea.addEventListener('mouseleave', handleDragEnd);
    scrollArea.addEventListener('mouseup', handleDragEnd);
    scrollArea.addEventListener('mousemove', handleDragMove);

    scrollArea.addEventListener('touchstart', handleDragStart, { passive: true });
    scrollArea.addEventListener('touchend', handleDragEnd, { passive: true });
    scrollArea.addEventListener('touchmove', handleDragMove, { passive: false });

    scrollContainer.addEventListener('mousedown', handleDragStart);
    scrollContainer.addEventListener('mouseleave', handleDragEnd);
    scrollContainer.addEventListener('mouseup', handleDragEnd);
    scrollContainer.addEventListener('mousemove', handleDragMove);

    scrollContainer.addEventListener('touchstart', handleDragStart, { passive: true });
    scrollContainer.addEventListener('touchend', handleDragEnd, { passive: true });
    scrollContainer.addEventListener('touchmove', handleDragMove, { passive: false });

    function updateScrollIndicator() {
        const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;
        if (maxScroll <= 0) {
            scrollIndicator.classList.add('hidden');
            return;
        }
        scrollIndicator.classList.remove('hidden');
        const progress = scrollContainer.scrollLeft / maxScroll;
        const totalDots = dots.length;
        const activeIndex = Math.round(progress * (totalDots - 1));
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === activeIndex);
        });
    }

    function updateShelfGlow() {
        const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;
        if (maxScroll > 0 && scrollContainer.scrollLeft < maxScroll - 10) {
            shelfWrapper.classList.add('has-scroll');
        } else {
            shelfWrapper.classList.remove('has-scroll');
        }
    }

    scrollContainer.addEventListener('scroll', function() {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            updateScrollIndicator();
            updateShelfGlow();
        }, 50);
    });

    // ========================================
    // FLYING BOOK
    // ========================================
    function openBook(book) {
        if (isAnimating || !book) return;
        isAnimating = true;

        try {
            books.forEach(b => {
                if (b !== book) b.classList.add('dimmed');
            });

            book.classList.add('flying');
            activeBook = book;
            isOpened = true;

            if (window.innerWidth <= 768) {
                searchContainer.classList.add('search-hidden');
            }

            const titleEl = book.querySelector('.book-title');
            const title = titleEl ? titleEl.textContent : 'Naskah Tanpa Judul';
            const synopsis = book.dataset.synopsis || 'Sinopsis belum tersedia untuk naskah ini.';
            const author = book.dataset.author || 'Penulis Tidak Diketahui';
            const url = book.dataset.url || '#';

            panelTitle.textContent = title;
            panelAuthor.textContent = 'oleh ' + author;
            panelBody.textContent = synopsis;
            panelLink.href = url;

            if (url === '#' || url === '') {
                panelLink.style.opacity = '0.5';
                panelLink.style.pointerEvents = 'none';
                panelLink.textContent = 'Link Tidak Tersedia';
            } else {
                panelLink.style.opacity = '1';
                panelLink.style.pointerEvents = 'auto';
                panelLink.textContent = 'Buka Halaman Lengkap ↗';
            }

            setTimeout(() => {
                synopsisPanel.classList.add('visible');
                closeBtn.classList.add('visible');
                isAnimating = false;
            }, 250);

        } catch (err) {
            console.error("BiluneShelf Error:", err);
            isAnimating = false;
        }
    }

    function closeBook() {
        if (isAnimating || !isOpened) return;
        isAnimating = true;

        searchContainer.classList.remove('search-hidden');

        synopsisPanel.classList.remove('visible');
        closeBtn.classList.remove('visible');

        setTimeout(() => {
            books.forEach(b => {
                b.classList.remove('dimmed');
                b.classList.remove('flying');
            });
            activeBook = null;
            isOpened = false;
            isAnimating = false;
        }, 250);
    }

    // ========================================
    // SEARCH
    // ========================================
    let searchTimeout = null;
    searchInput.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            try {
                const query = e.target.value.toLowerCase().trim();
                let visibleCount = 0;
                books.forEach(book => {
                    const title = book.querySelector('.book-title')?.textContent.toLowerCase() || '';
                    const author = book.dataset.author?.toLowerCase() || '';
                    const match = title.includes(query) || author.includes(query);

                    const cat = book.dataset.category;
                    const isFiltered = activeCategory === 'all' || cat === activeCategory;

                    if (match && isFiltered) {
                        book.classList.remove('search-dimmed');
                        visibleCount++;
                    } else {
                        book.classList.add('search-dimmed');
                    }
                });

                if (query.length > 0) {
                    const label = activeCategory === 'all' ? 'buku' : filterSelectedText.textContent.toLowerCase();
                    bookCount.textContent = visibleCount + ' ' + label + ' ditemukan';
                } else {
                    if (activeCategory === 'all') {
                        bookCount.textContent = books.length + ' buku dalam koleksi';
                    } else {
                        const labels = {
                            'inggris': 'Buku Bahasa Inggris',
                            'novel': 'Novel',
                            'lainnya': 'Lainnya'
                        };
                        const count = document.querySelectorAll('.book:not(.category-hidden)').length;
                        bookCount.textContent = count + ' ' + (labels[activeCategory] || '').toLowerCase();
                    }
                }
            } catch (err) {
                console.warn("Search error:", err);
            }
        }, 150);
    });

    // ========================================
    // CLOSE ACTIONS
    // ========================================
    closeBtn.addEventListener('click', closeBook);

    document.addEventListener('click', (e) => {
        if (isOpened &&
            !e.target.closest('.book') &&
            !e.target.closest('.synopsis-panel') &&
            !e.target.closest('.close-btn')) {
            closeBook();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeBook();
    });

    // ========================================
    // SETUP EVENT LISTENERS UNTUK BUKU
    // ========================================
    function setupBookListeners() {
        books.forEach(book => {
            book.addEventListener('click', function(e) {
                e.stopPropagation();
                if (isAnimating) return;

                if (this.classList.contains('flying')) {
                    const targetUrl = this.dataset.url;
                    if (targetUrl && targetUrl !== '#') {
                        window.open(targetUrl, '_blank', 'noopener,noreferrer');
                    }
                    return;
                }

                if (isOpened) {
                    closeBook();
                    setTimeout(() => openBook(book), 300);
                    return;
                }

                openBook(book);
            });
        });
    }

    // ========================================
    // INITIALIZE (SATU FUNGSI SAJA!)
    // ========================================
    function init() {
        // Render buku dari data.js
        renderBooks(bookData);
        
        // Ambil referensi ulang setelah render
        books = document.querySelectorAll('.book');
        
        // Update counts
        updateCounts();
        
        // Setup event listeners untuk buku
        setupBookListeners();
        
        // Update scroll indicator
        setTimeout(() => {
            updateScrollIndicator();
            updateShelfGlow();
        }, 100);

        // ========================================
        // SEMBUNYIKAN LOADING (PASTIKAN 2 DETIK)
        // ========================================
        if (typeof hideLoading === 'function') {
            setTimeout(function() {
                hideLoading();
            }, 2000);
        }
    }

    // ========================================
    // JALANKAN INIT
    // ========================================
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // ========================================
    // RESIZE HANDLER
    // ========================================
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            updateScrollIndicator();
            updateShelfGlow();
        }, 200);
    });

})();