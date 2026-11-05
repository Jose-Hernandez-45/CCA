// =====================================
// CARRUSEL DE IMÁGENES
// =====================================

let currentIndex = 0;

const galleryContainer = document.querySelector('.gallery-container');
const galleryItems = document.querySelectorAll('.gallery-item');
const prevButton = document.querySelector('.prev-button');
const nextButton = document.querySelector('.next-button');

let autoSlide;

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

    // Cambiar de imagen
    function navigate(direction) {
        const totalImages = galleryItems.length;

        currentIndex =
            (currentIndex + direction + totalImages) % totalImages;

        const offset = -currentIndex * 100;

        galleryContainer.style.transform =
            `translateX(${offset}%)`;
    }

    // Iniciar movimiento automático
    function startAutoSlide() {
        autoSlide = setInterval(() => {
            navigate(1);
        },5000);
    }

    // Reiniciar temporizador al interactuar
    function resetAutoSlide() {
        clearInterval(autoSlide);
        startAutoSlide();
    }

    // Botón anterior
    prevButton.addEventListener('click', () => {
        navigate(-1);
        resetAutoSlide();
    });

    // Botón siguiente
    nextButton.addEventListener('click', () => {
        navigate(1);
        resetAutoSlide();
    });

    // Iniciar carrusel automáticamente
    startAutoSlide();
}

// Login & register
const passwordInput = document.querySelector('#password');
const togglePassword = document.querySelector('.toggle-password');

togglePassword.addEventListener('click', () => {

    const isPassword = passwordInput.type === 'password';

    passwordInput.type = isPassword ? 'text' : 'password';

    togglePassword.classList.toggle('bi-eye');
    togglePassword.classList.toggle('bi-eye-slash');

});