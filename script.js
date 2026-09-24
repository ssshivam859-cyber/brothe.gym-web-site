// ============================================
// BROTHER GYM - script.js
// ============================================

document.addEventListener("DOMContentLoaded", () => {

    // ============================================
    // ELEMENTS
    // ============================================

    const menuToggle = document.querySelector(".menu-toggle");
    const navbar = document.querySelector(".navbar");
    const navLinks = document.querySelectorAll(".navbar a");
    const contactForm = document.querySelector("#contactForm");
    const year = document.querySelector("#year");
    const header = document.querySelector(".header");


    // ============================================
    // CURRENT YEAR
    // ============================================

    if (year) {
        year.textContent = new Date().getFullYear();
    }


    // ============================================
    // MOBILE MENU
    // ============================================

    if (menuToggle && navbar) {

        menuToggle.addEventListener("click", () => {

            navbar.classList.toggle("active");
            document.body.classList.toggle("menu-open");

            const icon = menuToggle.querySelector("i");

            if (icon) {
                icon.classList.toggle("fa-bars");
                icon.classList.toggle("fa-xmark");
            }
        });


        // Close menu when clicking a link
        navLinks.forEach(link => {

            link.addEventListener("click", () => {

                navbar.classList.remove("active");
                document.body.classList.remove("menu-open");

                const icon = menuToggle.querySelector("i");

                if (icon) {
                    icon.classList.remove("fa-xmark");
                    icon.classList.add("fa-bars");
                }
            });

        });


        // Close menu when clicking outside
        document.addEventListener("click", (event) => {

            if (
                navbar.classList.contains("active") &&
                !navbar.contains(event.target) &&
                !menuToggle.contains(event.target)
            ) {

                navbar.classList.remove("active");
                document.body.classList.remove("menu-open");

                const icon = menuToggle.querySelector("i");

                if (icon) {
                    icon.classList.remove("fa-xmark");
                    icon.classList.add("fa-bars");
                }
            }

        });


        // Close menu with Escape key
        document.addEventListener("keydown", (event) => {

            if (event.key === "Escape") {

                navbar.classList.remove("active");
                document.body.classList.remove("menu-open");

                const icon = menuToggle.querySelector("i");

                if (icon) {
                    icon.classList.remove("fa-xmark");
                    icon.classList.add("fa-bars");
                }
            }

        });

    }


    // ============================================
    // HEADER ON SCROLL
    // ============================================

    if (header) {

        const handleHeaderScroll = () => {

            if (window.scrollY > 50) {

                header.classList.add("scrolled");

            } else {

                header.classList.remove("scrolled");

            }

        };

        window.addEventListener("scroll", handleHeaderScroll);

        handleHeaderScroll();
    }


    // ============================================
    // CONTACT FORM
    // ============================================

    if (contactForm) {

        contactForm.addEventListener("submit", (event) => {

            event.preventDefault();


            // Get form values
            const nameInput = document.querySelector("#name");
            const phoneInput = document.querySelector("#phone");
            const messageInput = document.querySelector("#message");

            const name = nameInput ? nameInput.value.trim() : "";
            const phone = phoneInput ? phoneInput.value.trim() : "";
            const message = messageInput ? messageInput.value.trim() : "";


            // ============================================
            // VALIDATION
            // ============================================

            if (name === "") {
                showNotification("Please enter your name.", "error");
                return;
            }

            if (phone === "") {
                showNotification("Please enter your phone number.", "error");
                return;
            }

            // Indian phone number validation
            const phoneRegex = /^[6-9]\d{9}$/;

            if (!phoneRegex.test(phone.replace(/\s/g, ""))) {
                showNotification(
                    "Please enter a valid 10-digit mobile number.",
                    "error"
                );
                return;
            }


            // ============================================
            // WHATSAPP MESSAGE
            // ============================================

            const whatsappNumber = "918802344312";

            const whatsappMessage =
                `Hello Brother Gym!%0A%0A` +
                `Name: ${encodeURIComponent(name)}%0A` +
                `Phone: ${encodeURIComponent(phone)}%0A` +
                `Message: ${encodeURIComponent(
                    message || "I want to know more about Brother Gym."
                )}`;


            const whatsappURL =
                `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;


            // ============================================
            // BUTTON
            // ============================================

            const submitButton = contactForm.querySelector(
                'button[type="submit"]'
            );

            const originalText = submitButton
                ? submitButton.innerHTML
                : "";


            if (submitButton) {

                submitButton.disabled = true;

                submitButton.innerHTML =
                    '<i class="fa-solid fa-spinner fa-spin"></i> Opening...';
            }


            // ============================================
            // OPEN WHATSAPP
            // ============================================

            setTimeout(() => {

                window.open(whatsappURL, "_blank");

                contactForm.reset();

                showNotification(
                    "Opening WhatsApp...",
                    "success"
                );


                if (submitButton) {

                    submitButton.disabled = false;
                    submitButton.innerHTML = originalText;
                }

            }, 500);

        });

    }


    // ============================================
    // NOTIFICATION FUNCTION
    // ============================================

    function showNotification(message, type = "success") {

        // Remove existing notification
        const oldNotification =
            document.querySelector(".gym-notification");

        if (oldNotification) {
            oldNotification.remove();
        }


        // Create notification
        const notification =
            document.createElement("div");

        notification.className =
            `gym-notification ${type}`;


        notification.innerHTML = `
            <div class="notification-icon">
                ${
                    type === "success"
                        ? '<i class="fa-solid fa-check"></i>'
                        : '<i class="fa-solid fa-exclamation"></i>'
                }
            </div>

            <span>${message}</span>

            <button class="notification-close" type="button">
                <i class="fa-solid fa-xmark"></i>
            </button>
        `;


        document.body.appendChild(notification);


        // Show notification
        setTimeout(() => {
            notification.classList.add("show");
        }, 50);


        // Close button
        const closeButton =
            notification.querySelector(
                ".notification-close"
            );

        if (closeButton) {

            closeButton.addEventListener("click", () => {

                notification.classList.remove("show");

                setTimeout(() => {
                    notification.remove();
                }, 300);

            });

        }


        // Automatically remove
        setTimeout(() => {

            if (notification.parentElement) {

                notification.classList.remove("show");

                setTimeout(() => {

                    if (notification.parentElement) {
                        notification.remove();
                    }

                }, 300);
            }

        }, 4000);

    }


    // ============================================
    // SCROLL REVEAL ANIMATION
    // ============================================

    const revealElements = document.querySelectorAll(
        ".service-card, .why-card, .review-card, .about-image, .about-content, .contact-info, .contact-form, .stat-card"
    );


    revealElements.forEach(element => {
        element.classList.add("reveal");
    });


    if ("IntersectionObserver" in window) {

        const observer = new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("revealed");

                        observer.unobserve(entry.target);
                    }

                });

            },
            {
                threshold: 0.12
            }
        );


        revealElements.forEach(element => {
            observer.observe(element);
        });

    } else {

        // Fallback for older browsers
        revealElements.forEach(element => {
            element.classList.add("revealed");
        });

    }


    // ============================================
    // SMOOTH SCROLL
    // ============================================

    navLinks.forEach(link => {

        link.addEventListener("click", (event) => {

            const href = link.getAttribute("href");

            if (!href || !href.startsWith("#")) {
                return;
            }


            const target = document.querySelector(href);

            if (!target) {
                return;
            }


            event.preventDefault();


            const headerHeight =
                header ? header.offsetHeight : 0;


            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                headerHeight;


            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });

        });

    });


    // ============================================
    // PREVENT BODY SCROLL WHEN MOBILE MENU IS OPEN
    // ============================================

    const updateBodyScroll = () => {

        if (
            window.innerWidth <= 768 &&
            navbar &&
            navbar.classList.contains("active")
        ) {

            document.body.style.overflow = "hidden";

        } else {

            document.body.style.overflow = "";
        }

    };


    if (navbar) {

        const menuObserver = new MutationObserver(
            updateBodyScroll
        );

        menuObserver.observe(navbar, {
            attributes: true,
            attributeFilter: ["class"]
        });

        window.addEventListener(
            "resize",
            updateBodyScroll
        );

        updateBodyScroll();
    }

});