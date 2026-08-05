
// Keep browser autocomplete/autofill text aligned with dynamic form value styling.
(function () {
    const fieldSelector = 'input:not([type="checkbox"]):not([type="radio"]):not([type="file"]), textarea';

    function applyFieldValueColor(scope = document) {
        scope.querySelectorAll(fieldSelector).forEach(field => {
            const fieldColor = getComputedStyle(field).color;
            field.style.setProperty('--field-text-color', fieldColor);
            field.style.webkitTextFillColor = fieldColor;
            field.style.caretColor = fieldColor;
        });
    }

    document.addEventListener('DOMContentLoaded', () => {
        applyFieldValueColor();
        setTimeout(applyFieldValueColor, 100);
        setTimeout(applyFieldValueColor, 500);
    });

    window.addEventListener('pageshow', () => {
        applyFieldValueColor();
        setTimeout(applyFieldValueColor, 100);
    });

    document.addEventListener('input', event => {
        if (event.target.matches(fieldSelector)) {
            applyFieldValueColor(event.target.parentElement || document);
        }
    }, true);

    document.addEventListener('change', event => {
        if (event.target.matches(fieldSelector)) {
            applyFieldValueColor(event.target.parentElement || document);
        }
    }, true);
})();




//==================Modal=====================//
const modalTriggerButtons = document.querySelectorAll("[data-modal-target]");
const modals = document.querySelectorAll(".modalTrigger");
const modalCloseButtons = document.querySelectorAll(".modal-close");
const CloseButtons = document.querySelectorAll(".close-btn");
const overlay = document.querySelector(".overlay-modal");

modalTriggerButtons.forEach(elem => {
    elem.addEventListener("click", event => {
        const targetModalId = event.currentTarget.getAttribute("data-modal-target");

        // Close all modals before opening the target modal
        modals.forEach(modal => {
            if (modal.id !== targetModalId) {
                closeModal(modal.id, false); // Close without hiding the overlay
            }
        });

        toggleModal(targetModalId);

        // Show the overlay
        overlay.style.opacity = "1";
        overlay.style.zIndex = "1000";
        overlay.style.visibility = "visible";
        overlay.style.transition = "opacity 0.3s ease"; // Optional transition
    });
});

modalCloseButtons.forEach(elem => {
    elem.addEventListener("click", () => {
        closeAllModals(); // Close all modals and hide overlay
    });
});

CloseButtons.forEach(elem => {
    elem.addEventListener("click", () => {
        closeAllModals(); // Close all modals and hide overlay
    });
});

modals.forEach(elem => {
    elem.addEventListener("click", event => {
        if (event.currentTarget === event.target) closeModal(event.currentTarget.id, true);
    });
});

// Close Modal with "Esc" key
document.addEventListener("keydown", event => {
    if (event.key === "Escape" || event.keyCode === 27) {
        closeAllModals(); // Close all modals and hide overlay
    }
});

// Helper Functions

function toggleModal(modalId) {
    const modal = document.getElementById(modalId);

    if (getComputedStyle(modal).display === "flex") {
        closeModal(modalId, true);
    } else {
        modal.style.display = "flex";
        modal.classList.add("modal-show");
    }
}

function closeModal(modalId, hideOverlay = true) {
    const modal = document.getElementById(modalId);

    if (modal) {
        modal.classList.add("modal-hide");
        setTimeout(() => {
            modal.classList.remove("modal-show", "modal-hide");
            modal.style.display = "none";
        }, 200);
    }

    // Hide overlay if specified
    if (hideOverlay) {
        overlay.style.opacity = "0";
        overlay.style.zIndex = "-1";
        overlay.style.visibility = "hidden";
        overlay.style.transition = "opacity 0.3s ease"; // Optional transition
    }
}

function closeAllModals() {
    modals.forEach(modal => closeModal(modal.id, true));
}





