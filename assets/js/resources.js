/**
 * RESOURCES HUB LOGIC (Kho Tài Nguyên Tạ Ngọc Dũng)
 * Client-side Data Fetching, Filtering, Router & VIP Lead Conversion
 */

(function () {
    'use strict';

    // Application State
    let allResources = [];
    let activeCategory = 'all';
    let activeAccess = 'all';
    let searchQuery = '';
    let currentVipItem = null;
    let vipTrigger = null;
    let previousBodyOverflow = '';

    // DOM Elements
    const gridEl = document.getElementById('resources-grid');
    const listViewEl = document.getElementById('resources-list-view');
    const detailViewEl = document.getElementById('resources-detail-view');
    const detailContentEl = document.getElementById('detail-content');
    const searchInput = document.getElementById('res-search');
    const filterPills = document.querySelectorAll('.res-pill');
    const accessTabs = document.querySelectorAll('.res-access-tab');
    const resultsCountEl = document.getElementById('res-count');

    // VIP Modal Elements
    const vipModalOverlay = document.getElementById('vip-modal');
    const vipModalClose = document.getElementById('vip-modal-close');
    const vipTargetName = document.getElementById('vip-target-name');
    const vipCodeTag = document.getElementById('vip-code-tag');
    const vipTemplateText = document.getElementById('vip-template-text');
    const btnCopyTemplate = document.getElementById('btn-copy-template');
    const btnZaloDirect = document.getElementById('btn-zalo-direct');
    const toastEl = document.getElementById('res-toast');
    const toastMessageEl = document.getElementById('toast-message');

    // Detect Base Path for JSON
    function getDataUrl() {
        const isSubdir = window.location.pathname.includes('/tai-nguyen');
        return isSubdir ? '../assets/data/resources.json?v=1.1' : './assets/data/resources.json?v=1.1';
    }

    // 1. Fetch Resources
    async function loadResources() {
        try {
            const res = await fetch(getDataUrl());
            if (!res.ok) throw new Error('Không thể tải dữ liệu tài nguyên');
            allResources = await res.json();
            
            updatePillCounts();
            handleRouter();
        } catch (err) {
            console.error('Error loading resources:', err);
            if (gridEl) {
                gridEl.innerHTML = `
                    <div class="res-empty-state">
                        <i class="uil uil-exclamation-triangle res-empty-icon"></i>
                        <p>Đã xảy ra lỗi khi tải danh sách tài nguyên. Vui lòng tải lại trang.</p>
                    </div>
                `;
            }
        }
    }

    // 2. Count statistics for Pills
    function updatePillCounts() {
        filterPills.forEach(pill => {
            const cat = pill.getAttribute('data-cat');
            const countSpan = pill.querySelector('.pill-count');
            if (countSpan) {
                if (cat === 'all') {
                    countSpan.textContent = allResources.length;
                } else {
                    const count = allResources.filter(r => r.category === cat).length;
                    countSpan.textContent = count;
                }
            }
        });
    }

    // 3. Filter Logic
    function filterResources() {
        const query = searchQuery.trim().toLowerCase();

        const filtered = allResources.filter(item => {
            // Category match
            const matchCat = activeCategory === 'all' || item.category === activeCategory;
            // Access match
            const matchAccess = activeAccess === 'all' || item.access === activeAccess;
            // Search query match
            const matchSearch = !query || (
                item.title.toLowerCase().includes(query) ||
                item.description.toLowerCase().includes(query) ||
                (item.leadCode && item.leadCode.toLowerCase().includes(query)) ||
                (item.tags && item.tags.some(t => t.toLowerCase().includes(query)))
            );

            return matchCat && matchAccess && matchSearch;
        });

        renderGrid(filtered);
    }

    // 4. Render Resource Cards
    function renderGrid(items) {
        if (!gridEl) return;

        if (resultsCountEl) {
            resultsCountEl.textContent = `Hiển thị ${items.length} / ${allResources.length} tài nguyên`;
        }

        if (items.length === 0) {
            gridEl.innerHTML = `
                <div class="res-empty-state">
                    <i class="uil uil-search-minus res-empty-icon"></i>
                    <h3>Không tìm thấy tài nguyên phù hợp</h3>
                    <p>Hãy thử tìm kiếm với từ khóa khác hoặc xóa bộ lọc để xem toàn bộ danh sách.</p>
                </div>
            `;
            return;
        }

        gridEl.innerHTML = items.map(item => {
            const isVip = item.access === 'vip';
            const accessBadge = isVip
                ? `<span class="res-badge badge-vip"><i class="uil uil-shield-check"></i> VIP</span>`
                : `<span class="res-badge badge-public"><i class="uil uil-check-circle"></i> MIỄN PHÍ</span>`;

            const tagsHtml = (item.tags || []).map(t => `<span class="res-tag-chip">#${t}</span>`).join('');

            const actionBtn = isVip
                ? `<button type="button" class="btn-dl-vip" onclick="window.ResourcesApp.openVipModal('${item.id}')">
                     Nhận VIP ↗
                   </button>`
                : `<a href="#${item.slug}" class="btn-dl-direct">
                     Xem chi tiết <i class="uil uil-arrow-right"></i>
                   </a>`;

            return `
                <article class="res-card" data-cat="${item.category}">
                    <div class="res-card-meta">
                        <div class="res-card-badges">
                            <span class="res-letter-block">[${item.typeCode || 'AI'}]</span>
                            ${accessBadge}
                        </div>
                        <div class="res-card-action">
                            ${actionBtn}
                        </div>
                    </div>

                    <h3 class="res-card-title">
                        <a href="#${item.slug}" onclick="window.ResourcesApp.navigateTo('${item.slug}', event)">
                            ${item.title}
                        </a>
                    </h3>
                    <p class="res-card-desc">${item.description}</p>
                    
                    <div class="res-card-tags">
                        ${tagsHtml}
                    </div>
                </article>
            `;
        }).join('');
    }

    // 5. Render Detail View (Technical Report Format)
    function renderDetail(item) {
        if (!detailContentEl) return;

        const isVip = item.access === 'vip';
        const accessBadge = isVip
            ? `<span class="res-badge badge-vip"><i class="uil uil-shield-check"></i> VIP</span>`
            : `<span class="res-badge badge-public"><i class="uil uil-check-circle"></i> MIỄN PHÍ</span>`;

        const tagsHtml = (item.tags || []).map(t => `<span class="res-tag-chip">#${t}</span>`).join('');

        const gateHtml = isVip ? `
            <div class="res-download-gate">
                <div class="res-gate-info">
                    <span class="res-gate-ver">TÀI NGUYÊN ĐỘC QUYỀN · ${item.version} · MÃ: ${item.leadCode}</span>
                    <p>Tài nguyên chuyên sâu dành cho thành viên kết nối. Nhận toàn bộ mã nguồn, tài liệu và kịch bản qua Zalo/Telegram.</p>
                </div>
                <div class="res-gate-actions">
                    <button type="button" class="btn-dl-vip" style="padding: 0.75rem 1.4rem; font-size: 0.95rem;" onclick="window.ResourcesApp.openVipModal('${item.id}')">
                        <i class="uil uil-comment-dots"></i> Nhận tài nguyên VIP ngay ↗
                    </button>
                </div>
            </div>
        ` : `
            <div class="res-download-gate">
                <div class="res-gate-info">
                    <span class="res-gate-ver">TẢI TRỰC TIẾP MIỄN PHÍ · ${item.version}</span>
                    <p>${item.downloadUrl ? 'Tài nguyên chia sẻ cộng đồng miễn phí. Bạn có thể tải ngay bản cập nhật mới nhất.' : 'Tài nguyên miễn phí; đường dẫn tải đang được cập nhật.'}</p>
                </div>
                <div class="res-gate-actions">
                    ${item.downloadUrl ? `<a href="${item.downloadUrl}" target="_blank" rel="noopener noreferrer" class="btn-dl-direct" style="padding: 0.75rem 1.4rem; font-size: 0.95rem;">
                        <i class="uil uil-arrow-circle-down"></i> Tải bản mới nhất (${item.version}) ↗
                    </a>` : '<span class="res-download-unavailable">Đang cập nhật liên kết tải</span>'}
                </div>
            </div>
        `;

        // Why Created list
        const whyCreatedHtml = (item.whyCreated || []).map(r => `<li>${r}</li>`).join('');

        // Features list
        const featuresHtml = (item.features || []).map(f => `<li>${f}</li>`).join('');

        // Related items
        const related = allResources.filter(r => r.category === item.category && r.id !== item.id).slice(0, 3);
        const relatedHtml = related.length > 0 ? `
            <div class="res-related-section">
                <h3 class="res-section-title"><i class="uil uil-layers"></i> TÀI NGUYÊN CÙNG PHÂN LOẠI</h3>
                <div class="res-grid" style="margin-top: 1.5rem;">
                    ${related.map(r => {
                        const relVip = r.access === 'vip';
                        const relAccessBadge = relVip
                            ? `<span class="res-badge badge-vip"><i class="uil uil-shield-check"></i> VIP</span>`
                            : `<span class="res-badge badge-public"><i class="uil uil-check-circle"></i> MIỄN PHÍ</span>`;
                        const relActionBtn = relVip
                            ? `<button type="button" class="btn-dl-vip" onclick="window.ResourcesApp.openVipModal('${r.id}')">Nhận VIP ↗</button>`
                            : `<a href="#${r.slug}" class="btn-dl-direct">Xem chi tiết <i class="uil uil-arrow-right"></i></a>`;
                        return `
                        <div class="res-card" data-cat="${r.category}" style="padding: 1.15rem 1.25rem;">
                            <div class="res-card-meta" style="margin-bottom: 0.65rem;">
                                <div class="res-card-badges">
                                    <span class="res-letter-block">[${r.typeCode}]</span>
                                    ${relAccessBadge}
                                </div>
                                <div class="res-card-action">
                                    ${relActionBtn}
                                </div>
                            </div>
                            <h4 style="font-size: 1rem; margin-bottom: 0.4rem; color: var(--text-main);">
                                <a href="#${r.slug}" onclick="window.ResourcesApp.navigateTo('${r.slug}', event)" style="color: inherit;">
                                    ${r.title}
                                </a>
                            </h4>
                            <p style="font-size: 0.85rem; color: var(--text-muted); line-height: 1.5; margin-bottom: 0;">
                                ${r.description}
                            </p>
                        </div>
                    `;}).join('')}
                </div>
            </div>
        ` : '';

        detailContentEl.innerHTML = `
            <!-- Detail Hero -->
            <div class="res-detail-hero">
                <div class="res-detail-hero-head">
                    <div style="flex: 1;">
                        <div class="res-card-meta" style="margin-bottom: 1rem;">
                            <span class="res-letter-block">[${item.typeCode || 'AI'}]</span>
                            ${accessBadge}
                        </div>
                        <h1 class="res-detail-title">${item.title}</h1>
                        <p class="res-detail-desc">${item.description}</p>
                        <div class="res-card-tags">
                            ${tagsHtml}
                        </div>
                    </div>
                </div>

                ${gateHtml}
            </div>

            <!-- Technical Article Content -->
            <div class="res-article-body">
                ${item.alert ? `
                    <div class="res-alert-box">
                        <i class="uil uil-shield-exclamation res-alert-icon"></i>
                        <div class="res-alert-text">
                            <strong>Lưu ý kỹ thuật:</strong> ${item.alert}
                        </div>
                    </div>
                ` : ''}

                <section class="res-section-block">
                    <h2 class="res-section-title"><i class="uil uil-info-circle"></i> 1. TỔNG QUAN TÀI NGUYÊN</h2>
                    <p class="res-prose">${item.overview || item.description}</p>
                </section>

                ${whyCreatedHtml ? `
                    <section class="res-section-block">
                        <h2 class="res-section-title"><i class="uil uil-question-circle"></i> 2. VÌ SAO TÀI NGUYÊN NÀY RA ĐỜI</h2>
                        <ul class="res-bullet-list">
                            ${whyCreatedHtml}
                        </ul>
                    </section>
                ` : ''}

                ${featuresHtml ? `
                    <section class="res-section-block">
                        <h2 class="res-section-title"><i class="uil uil-star"></i> 3. ĐẶC ĐIỂM NỔI BẬT & CÔNG NĂNG</h2>
                        <ul class="res-bullet-list">
                            ${featuresHtml}
                        </ul>
                    </section>
                ` : ''}

                ${item.caseStudy ? `
                    <section class="res-section-block">
                        <h2 class="res-section-title"><i class="uil uil-flask"></i> 4. VÍ DỤ THỰC CHIẾN (CASE STUDY)</h2>
                        <div class="res-prose" style="background: rgba(255, 255, 255, 0.03); border-left: 3px solid var(--accent-cyan); padding: 1.25rem; border-radius: 0 var(--radius-md) var(--radius-md) 0;">
                            ${item.caseStudy}
                        </div>
                    </section>
                ` : ''}

                ${item.installation ? `
                    <section class="res-section-block">
                        <h2 class="res-section-title"><i class="uil uil-cog"></i> 5. HƯỚNG DẪN CÀI ĐẶT & KÍCH HOẠT</h2>
                        <div class="res-prose" style="white-space: pre-line; margin-bottom: 1rem;">
                            ${item.installation}
                        </div>
                    </section>
                ` : ''}

                ${item.usage ? `
                    <section class="res-section-block">
                        <h2 class="res-section-title"><i class="uil uil-terminal"></i> 6. CÚ PHÁP & MẪU LỆNH SỬ DỤNG</h2>
                        <div class="res-code-box">
                            <button type="button" class="res-code-copy-btn">
                                <i class="uil uil-copy"></i> Sao chép
                            </button>
                            <code>${escapeHtml(item.usage)}</code>
                        </div>
                    </section>
                ` : ''}

                ${relatedHtml}
            </div>
        `;
    }

    // Helper: Escape HTML
    function escapeHtml(str) {
        return str
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }

    // 6. Router & Navigation
    function handleRouter() {
        const hash = window.location.hash.replace('#', '').trim();
        const urlParams = new URLSearchParams(window.location.search);
        const slug = hash || urlParams.get('slug');

        if (slug) {
            const target = allResources.find(r => r.slug === slug || r.id === slug);
            if (target) {
                showDetailView(target);
                return;
            }
        }

        showListView();
    }

    function showDetailView(item) {
        if (!listViewEl || !detailViewEl) return;
        listViewEl.style.display = 'none';
        detailViewEl.classList.add('active');
        renderDetail(item);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function showListView() {
        if (!listViewEl || !detailViewEl) return;
        detailViewEl.classList.remove('active');
        listViewEl.style.display = 'block';
        filterResources();
    }

    function navigateTo(slug, event) {
        if (event) event.preventDefault();
        window.location.hash = slug;
        const target = allResources.find(r => r.slug === slug || r.id === slug);
        if (target) {
            showDetailView(target);
        }
    }

    function backToList() {
        window.location.hash = '';
        history.pushState(null, '', window.location.pathname);
        showListView();
    }

    // 7. VIP Lead Modal Logic
    function openVipModal(id) {
        const item = allResources.find(r => r.id === id);
        if (!item) return;

        currentVipItem = item;
        vipTrigger = document.activeElement;
        if (vipTargetName) vipTargetName.textContent = item.title;
        if (vipCodeTag) vipCodeTag.textContent = `Mã: ${item.leadCode || 'VIP-MEMBER'}`;

        const templateMsg = `Chào anh Dũng, tôi muốn nhận tài nguyên VIP: "${item.title}" (Mã: ${item.leadCode || 'VIP'}). Nhờ anh gửi file giúp tôi qua kênh này nhé!`;
        if (vipTemplateText) vipTemplateText.textContent = templateMsg;

        if (btnZaloDirect) {
            btnZaloDirect.href = 'https://zalo.me/0969080811';
        }

        if (vipModalOverlay) {
            vipModalOverlay.classList.add('active');
            vipModalOverlay.setAttribute('aria-hidden', 'false');
            previousBodyOverflow = document.body.style.overflow;
            document.body.style.overflow = 'hidden';
            setTimeout(() => vipModalClose?.focus(), 50);
        }
    }

    function closeVipModal() {
        if (vipModalOverlay) {
            vipModalOverlay.classList.remove('active');
            vipModalOverlay.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = previousBodyOverflow;
            vipTrigger?.focus();
        }
        currentVipItem = null;
        vipTrigger = null;
    }

    function copyTemplate() {
        if (!vipTemplateText) return;
        const text = vipTemplateText.textContent;
        navigator.clipboard.writeText(text).then(() => {
            showToast('Đã sao chép tin nhắn mẫu! Hãy mở Zalo và dán tin nhắn gửi ngay.');
        }).catch(err => {
            console.error('Clipboard copy error:', err);
        });
    }

    function copyCode(code) {
        navigator.clipboard.writeText(code).then(() => {
            showToast('Đã sao chép mã lệnh vào clipboard!');
        }).catch(() => {
            showToast('Không thể sao chép tự động. Hãy chọn và sao chép đoạn mã.');
        });
    }

    // Toast Notification
    let toastTimeout = null;
    function showToast(msg) {
        if (!toastEl || !toastMessageEl) return;
        toastMessageEl.textContent = msg;
        toastEl.classList.add('active');
        clearTimeout(toastTimeout);
        toastTimeout = setTimeout(() => {
            toastEl.classList.remove('active');
        }, 3500);
    }

    // 8. Event Listeners
    function setupEvents() {
        detailContentEl?.addEventListener('click', (event) => {
            if (event.target.closest('.res-code-copy-btn')) {
                copyCode(detailContentEl.querySelector('.res-code-box code')?.textContent || '');
            }
        });
        // Category Pills
        filterPills.forEach(pill => {
            pill.addEventListener('click', () => {
                filterPills.forEach(p => p.classList.remove('active'));
                pill.classList.add('active');
                activeCategory = pill.getAttribute('data-cat') || 'all';
                filterResources();
            });
        });

        // Access Tabs (All / Public / VIP)
        accessTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                accessTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                activeAccess = tab.getAttribute('data-access') || 'all';
                filterResources();
            });
        });

        // Search Input (Instant with Debounce)
        let searchDebounce = null;
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                clearTimeout(searchDebounce);
                searchDebounce = setTimeout(() => {
                    searchQuery = e.target.value;
                    filterResources();
                }, 150);
            });
        }

        // VIP Modal Events
        if (vipModalClose) {
            vipModalClose.addEventListener('click', closeVipModal);
        }

        if (vipModalOverlay) {
            vipModalOverlay.addEventListener('click', (e) => {
                if (e.target === vipModalOverlay) closeVipModal();
            });
        }

        document.addEventListener('keydown', (e) => {
            if (!vipModalOverlay?.classList.contains('active')) return;
            if (e.key === 'Escape') {
                closeVipModal();
            } else if (e.key === 'Tab') {
                const focusables = [...vipModalOverlay.querySelectorAll('button, a[href]')]
                    .filter(el => el.getClientRects().length);
                const first = focusables[0];
                const last = focusables[focusables.length - 1];
                if (!vipModalOverlay.contains(document.activeElement)) {
                    e.preventDefault();
                    first?.focus();
                } else if (e.shiftKey && document.activeElement === first) {
                    e.preventDefault();
                    last.focus();
                } else if (!e.shiftKey && document.activeElement === last) {
                    e.preventDefault();
                    first.focus();
                }
            }
        });

        if (btnCopyTemplate) {
            btnCopyTemplate.addEventListener('click', copyTemplate);
        }

        // Back to list button
        const backBtn = document.getElementById('btn-back-to-list');
        if (backBtn) {
            backBtn.addEventListener('click', backToList);
        }

        // Hash change event (Browser Back/Forward)
        window.addEventListener('hashchange', handleRouter);
    }

    // Expose public API
    window.ResourcesApp = {
        navigateTo,
        backToList,
        openVipModal,
        closeVipModal,
        copyCode,
        showToast
    };

    // Initialize
    document.addEventListener('DOMContentLoaded', () => {
        setupEvents();
        loadResources();
    });

})();
