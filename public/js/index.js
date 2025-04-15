window.addEventListener("scroll", function () {
    const floatingText = document.querySelector('.floating-text');
    const rect = floatingText.getBoundingClientRect();

    // If the top of the element is within the viewport
    if (rect.top < window.innerHeight && rect.bottom >= 0) {
        floatingText.classList.add('visible');
    } else {
        floatingText.classList.remove('visible');
    }
});
// Once the HTML strucutre is ready then the code can execute
document.addEventListener("DOMContentLoaded", function () {
    const floatingText = document.querySelector('.floating-text');

    // add a small delay before the text actually shows
    setTimeout(function () {
        // The visable clas is to make the text appear and triggers the css notated
        floatingText.classList.add('visible');
    }, 100);
});

// Once the HTML strucutre is ready then the code can execute for the date picker
document.addEventListener("DOMContentLoaded", function () {
    const picker = new easepick.create({
        element: document.getElementById('dateselect'),
        css: [
            'https://cdn.jsdelivr.net/npm/@easepick/bundle@1.2.1/dist/index.css',
        ],
        setup(picker) {
            picker.on('select', (e) => {
                const { view, date, target } = e.detail;
            });
        },
        RangePlugin: {
            tooltip: true,
        },
        AmpPlugin: {
            dropdown: {
                months: true,
                years: true,
                minYear: new Date().getFullYear(),
            },
        },
        LockPlugin: {
            minDate: new Date(),
        },
        plugins: ['RangePlugin', 'LockPlugin', 'AmpPlugin'],
        grid: 2,
        calanders: 2
    });
});

// Once the HTML strucutre is ready then the code can execute the slide
document.addEventListener("DOMContentLoaded", function () {

    let slides = document.querySelectorAll('.slides img');
    if (slides.length > 0) {
        slides[0].classList.add('active');
    }

    window.slideIndex = 0

    // fucntion to change slides - must be in global scope
    window.changeSlide = function (n) {
        let slides = document.querySelectorAll('.slides img');

        if (slides.length === 0) return;

        window.slideIndex += n;

        // Handles boundaries 
        if (window.slideIndex >= slides.length) { window.slideIndex = 0 }
        if (window.slideIndex < 0) { window.slideIndex = slides.length - 1 }

        // Hide the slides
        for (let i = 0; i < slides.length; i++) {
            slides[i].classList.remove('active');
        }

        // Show the current slide
        slides[window.slideIndex].classList.add('active');
    };

    // Autoplays the slideshow in a 5 sec. period
    setInterval(function () {
        changeSlide(1);
    }, 5000);
});
