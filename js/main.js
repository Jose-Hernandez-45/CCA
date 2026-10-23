document.addEventListener('DOMContentLoaded', () => {

    // =====================================
    // CARRUSEL DE IMÁGENES
    // =====================================

    let currentIndex = 0;

    const galleryContainer = document.querySelector('.gallery-container');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const prevButton = document.querySelector('.prev-button');
    const nextButton = document.querySelector('.next-button');

    // Crear el fondo desenfocado para cada imagen
    galleryItems.forEach((item) => {
        const img = item.querySelector('img');

        if (img) {
            item.style.setProperty(
                '--gallery-bg',
                `url("${img.src}")`
            );
        }
    });

    // Verificar que existan los elementos del carrusel
    if (
        galleryContainer &&
        prevButton &&
        nextButton &&
        galleryItems.length > 0
    ) {

        // Botón anterior
        prevButton.addEventListener('click', () => {
            navigate(-1);
        });

        // Botón siguiente
        nextButton.addEventListener('click', () => {
            navigate(1);
        });

        // Cambiar de imagen
        function navigate(direction) {
            const totalImages = galleryItems.length;

            currentIndex =
                (currentIndex + direction + totalImages) % totalImages;

            const offset = -currentIndex * 100;

            galleryContainer.style.transform =
                `translateX(${offset}%)`;
        }
    }


    // =====================================
    // MENÚ HAMBURGUESA PARA CELULARES
    // =====================================

    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const menuIcon = menuToggle
        ? menuToggle.querySelector('i')
        : null;

    // Verificar que existan los elementos del menú
    if (menuToggle && navLinks && menuIcon) {

        // Función para abrir o cerrar el menú
        function toggleMenu(forceClose = false) {
            const isCurrentlyOpen = navLinks.classList.contains('active');
            const isOpen = forceClose ? false : !isCurrentlyOpen;

            navLinks.classList.toggle('active', isOpen);

            menuToggle.setAttribute(
                'aria-expanded',
                String(isOpen)
            );

            menuToggle.setAttribute(
                'aria-label',
                isOpen ? 'Cerrar menú' : 'Abrir menú'
            );

            // Cambiar el icono de hamburguesa por una X
            menuIcon.classList.toggle('bi-list', !isOpen);
            menuIcon.classList.toggle('bi-x-lg', isOpen);
        }

        // Abrir y cerrar al pulsar el botón
        menuToggle.addEventListener('click', (event) => {
            event.stopPropagation();
            toggleMenu();
        });

        // Cerrar al seleccionar una opción
        navLinks.querySelectorAll('a').forEach((link) => {
            link.addEventListener('click', () => {
                toggleMenu(true);
            });
        });

        // Cerrar al pulsar fuera del menú
        document.addEventListener('click', (event) => {
            if (
                !navLinks.contains(event.target) &&
                !menuToggle.contains(event.target)
            ) {
                toggleMenu(true);
            }
        });

        // Cerrar con la tecla Escape
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                toggleMenu(true);
            }
        });

        // Si la ventana vuelve al tamaño de escritorio,
        // cerrar el menú móvil
        window.addEventListener('resize', () => {
            if (window.innerWidth > 600) {
                toggleMenu(true);
            }
        });
    }

});
