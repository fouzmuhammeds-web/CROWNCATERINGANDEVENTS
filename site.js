const menuToggle = document.getElementById('menu-toggle');
                const mobileNav = document.getElementById('mobile-nav');
                function closeMenu() {
                    mobileNav.classList.add('hidden');
                    menuToggle.setAttribute('aria-expanded', 'false');
                    menuToggle.setAttribute('aria-label', 'Open navigation');
                }
                menuToggle.addEventListener('click', () => {
                    const opening = mobileNav.classList.contains('hidden');
                    mobileNav.classList.toggle('hidden', !opening);
                    menuToggle.setAttribute('aria-expanded', String(opening));
                    menuToggle.setAttribute('aria-label', opening ? 'Close navigation' : 'Open navigation');
                });
                mobileNav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
                document.addEventListener('keydown', event => {
                    if (event.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') {
                        closeMenu();
                        menuToggle.focus();
                    }
                });
                // Gallery Lightbox Controller
                (function initGallery() {
                    const items = Array.from(document.querySelectorAll('.gallery-item'));
                    const modal = document.getElementById('lightbox-modal');
                    if (!modal || !items.length) return;
                    const modalImg = document.getElementById('lightbox-img');
                    const modalTitle = document.getElementById('lightbox-title');
                    const modalDesc = document.getElementById('lightbox-desc');
                    const modalTag = document.getElementById('lightbox-tag');
                    const closeBtn = document.getElementById('lightbox-close');
                    const prevBtn = document.getElementById('lightbox-prev');
                    const nextBtn = document.getElementById('lightbox-next');

                    let currentIndex = -1;
                    let lastFocusedElement = null;

                    function openModal(index) {
                        if (index < 0 || index >= items.length) return;
                        currentIndex = index;
                        const trigger = items[currentIndex];
                        const img = trigger.querySelector('img');

                        if (modal.classList.contains("hidden")) lastFocusedElement = trigger;

                        modalImg.src = img.src;
                        modalImg.alt = img.alt;
                        modalTitle.textContent = trigger.dataset.title || '';
                        modalDesc.textContent = trigger.dataset.desc || '';
                        modalTag.textContent = trigger.dataset.tag || 'Catering Showcase';

                        modal.classList.remove('hidden');
                        modal.classList.add('flex');
                        document.body.style.overflow = 'hidden';

                        closeBtn.focus();
                    }

                    function closeModal() {
                        modal.classList.add('hidden');
                        modal.classList.remove('flex');
                        document.body.style.overflow = '';
                        if (lastFocusedElement) {
                            lastFocusedElement.focus();
                        }
                    }

                    function showPrev() {
                        const nextIdx = (currentIndex - 1 + items.length) % items.length;
                        openModal(nextIdx);
                    }

                    function showNext() {
                        const nextIdx = (currentIndex + 1) % items.length;
                        openModal(nextIdx);
                    }

                    items.forEach((item, idx) => {
                        item.addEventListener('click', () => openModal(idx));
                    });

                    closeBtn.addEventListener('click', closeModal);
                    prevBtn.addEventListener('click', showPrev);
                    nextBtn.addEventListener('click', showNext);

                    // Keyboard trap & accessibility
                    window.addEventListener('keydown', (e) => {
                        if (modal.classList.contains('hidden')) return;

                        if (e.key === 'Tab') {
                            const controls = [closeBtn, prevBtn, nextBtn];
                            const index = controls.indexOf(document.activeElement);
                            e.preventDefault();
                            controls[(index + (e.shiftKey ? -1 : 1) + controls.length) % controls.length].focus();
                        } else if (e.key === 'Escape') {
                            closeModal();
                        } else if (e.key === 'ArrowLeft') {
                            showPrev();
                        } else if (e.key === 'ArrowRight') {
                            showNext();
                        }
                    });

                    modal.addEventListener('click', (e) => {
                        if (e.target === modal) {
                            closeModal();
                        }
                    });
                })();
