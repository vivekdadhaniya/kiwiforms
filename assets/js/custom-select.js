
// (function () {
//     // find all custom dropdown wrappers
//     document.querySelectorAll('.custom-dropdown').forEach(dropdown => {
//         const style = dropdown.dataset.style || 'default';
//         const copyHtml = dropdown.dataset.copyHtml === 'true';

//         const button = dropdown.querySelector('.dropdown-button');
//         const menu = dropdown.querySelector('.dropdown-menu');
//         const arrow = dropdown.querySelector('.dropdown-arrow');
//         const selected = dropdown.querySelector('.selected-option');
//         const items = dropdown.querySelectorAll('.dropdown-item');
//         const search = dropdown.querySelector('.dropdown-search');

//         // toggle open/close
//         const toggle = (e) => {
//             e?.stopPropagation();
//             // close other dropdowns
//             document.querySelectorAll('.dropdown-menu').forEach(m => {
//                 if (m !== menu) m.classList.add('hidden');
//             });
//             menu.classList.toggle('hidden');
//             arrow?.classList.toggle('rotate-180');
//         };

//         button?.addEventListener('click', toggle);

//         // prevent dropdown from closing when clicking inside (especially search)
//         menu?.addEventListener('click', (e) => {
//             e.stopPropagation();
//         });

//         // item click handler
//         items.forEach(item => {
//             item.addEventListener('click', (e) => {
//                 e.stopPropagation();

//                 // remove active from siblings
//                 items.forEach(it => {
//                     it.classList.remove('!bg-[#F8F6F6]', '!rounded-[5px]', 'active');
//                     const svg = it.querySelector('.check-svg');
//                     if (svg) svg.classList.add('hidden');
//                 });

//                 // add active to selected
//                 item.classList.add('!bg-[#F8F6F6]', '!rounded-[5px]', 'active');

//                 if (copyHtml) {
//                     const li = item.tagName.toLowerCase() === 'li' ? item : item.closest('li');
//                     if (li) {
//                         selected.innerHTML = li.innerHTML;
//                         const btnText = dropdown.querySelector('.dropdown-button .selected-option');
//                         btnText?.classList?.remove('text-[#8C8484]');
//                         btnText?.classList?.add('text-Theme-Black');
//                     } else {
//                         selected.innerHTML = item.innerHTML;
//                     }
//                 } else {
//                     const label = item.querySelector('span')?.textContent || item.textContent.trim();
//                     selected.textContent = label;
//                     const svg = item.querySelector('.check-svg');
//                     if (svg) svg.classList.remove('hidden');

//                     const btnText = dropdown.querySelector('.dropdown-button');
//                     btnText?.classList?.remove('text-[#8C8484]');
//                     btnText?.classList?.add('text-Theme-Black');
//                 }

//                 // close menu
//                 menu.classList.add('hidden');
//                 arrow?.classList.remove('rotate-180');
//             });
//         });

//         // search filtering
//         if (search) {
//             // prevent dropdown from closing when clicking or typing in search
//             search.addEventListener('click', (e) => e.stopPropagation());
//             search.addEventListener('input', () => {
//                 const q = search.value.trim().toLowerCase();
//                 const allItems = dropdown.querySelectorAll('.dropdown-list > li, .dropdown-item');
//                 allItems.forEach(it => {
//                     const text = it.textContent.trim().toLowerCase();
//                     const show = q === '' || text.includes(q);
//                     if (it.tagName.toLowerCase() === 'li') {
//                         it.style.display = show ? '' : 'none';
//                     } else {
//                         it.style.display = show ? 'flex' : 'none';
//                     }
//                 });
//             });
//         }
//     });

//     // close dropdowns when clicking outside
//     window.addEventListener('click', (e) => {
//         document.querySelectorAll('.dropdown-menu').forEach(m => m.classList.add('hidden'));
//         document.querySelectorAll('.dropdown-arrow').forEach(a => a.classList.remove('rotate-180'));
//     });

//     // close on ESC key
//     window.addEventListener('keydown', (e) => {
//         if (e.key === 'Escape') {
//             document.querySelectorAll('.dropdown-menu').forEach(m => m.classList.add('hidden'));
//             document.querySelectorAll('.dropdown-arrow').forEach(a => a.classList.remove('rotate-180'));
//         }
//     });
// })();


(function () {
    // find all custom dropdown wrappers
    document.querySelectorAll('.custom-dropdown').forEach(dropdown => {
        const style = dropdown.dataset.style || 'default';
        const copyHtml = dropdown.dataset.copyHtml === 'true';

        const button = dropdown.querySelector('.dropdown-button');
        const menu = dropdown.querySelector('.dropdown-menu');
        const arrow = dropdown.querySelector('.dropdown-arrow');
        const selected = dropdown.querySelector('.selected-option');
        const items = dropdown.querySelectorAll('.dropdown-item');
        const search = dropdown.querySelector('.dropdown-search');

        // toggle open/close
        const toggle = (e) => {
            e?.stopPropagation();
            // close other dropdowns
            document.querySelectorAll('.dropdown-menu').forEach(m => {
                if (m !== menu) m.classList.add('hidden');
            });
            menu.classList.toggle('hidden');
            arrow?.classList.toggle('rotate-180');
        };

        button?.addEventListener('click', toggle);

        // prevent dropdown from closing when clicking inside (especially search)
        menu?.addEventListener('click', (e) => {
            e.stopPropagation();
        });

        // item click handler
        items.forEach(item => {
            item.addEventListener('click', (e) => {
                e.stopPropagation();

                // remove active from siblings
                items.forEach(it => {
                    it.classList.remove('!bg-[#F8F6F6]', '!rounded-[5px]', 'active');
                    const svg = it.querySelector('.check-svg');
                    if (svg) svg.classList.add('hidden');
                });

                // add active to selected
                item.classList.add('!bg-[#F8F6F6]', '!rounded-[5px]', 'active');

                const checkIcon = item.querySelector('.check-svg');
                if (checkIcon) checkIcon.classList.remove('hidden');

                const btnText = dropdown.querySelector('.dropdown-button .selected-option');
                btnText?.classList?.remove('text-[#8C8484]');
                btnText?.classList?.add('text-Theme-Black');

                // ✅ Copy both SVG + text to selected area
                if (copyHtml) {
                    const li = item.tagName.toLowerCase() === 'li' ? item : item.closest('li');
                    if (li) {
                        const clone = li.cloneNode(true);
                        // remove check icon if you don’t want it shown in button
                        const check = clone.querySelector('.check-svg');
                        if (check) check.remove();
                        selected.innerHTML = clone.innerHTML;
                    } else {
                        const clone = item.cloneNode(true);
                        const check = clone.querySelector('.check-svg');
                        if (check) check.remove();
                        selected.innerHTML = clone.innerHTML;
                    }
                } else {
                    const clone = item.cloneNode(true);
                    const check = clone.querySelector('.check-svg');
                    if (check) check.remove(); // hide check icon in selected view
                    selected.innerHTML = clone.innerHTML;
                }

                // close menu
                menu.classList.add('hidden');
                arrow?.classList.remove('rotate-180');
            });
        });

        // search filtering
        if (search) {
            // prevent dropdown from closing when clicking or typing in search
            search.addEventListener('click', (e) => e.stopPropagation());
            search.addEventListener('input', () => {
                const q = search.value.trim().toLowerCase();
                const allItems = dropdown.querySelectorAll('.dropdown-list > li, .dropdown-item');
                allItems.forEach(it => {
                    const text = it.textContent.trim().toLowerCase();
                    const show = q === '' || text.includes(q);
                    if (it.tagName.toLowerCase() === 'li') {
                        it.style.display = show ? '' : 'none';
                    } else {
                        it.style.display = show ? 'flex' : 'none';
                    }
                });
            });
        }
    });

    // close dropdowns when clicking outside
    window.addEventListener('click', (e) => {
        document.querySelectorAll('.dropdown-menu').forEach(m => m.classList.add('hidden'));
        document.querySelectorAll('.dropdown-arrow').forEach(a => a.classList.remove('rotate-180'));
    });

    // close on ESC key
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            document.querySelectorAll('.dropdown-menu').forEach(m => m.classList.add('hidden'));
            document.querySelectorAll('.dropdown-arrow').forEach(a => a.classList.remove('rotate-180'));
        }
    });
})();
