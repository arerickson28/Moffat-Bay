console.log("hellooooooooo");

// if the confirmation div has been revealed from a previous reservation, hide it
const confimrationDiv = document.getElementById("confirmationDiv")
confimrationDiv.classList.add("hidden")

// if the confirmation code has been set from a previous reservation, reset it
let confirmationCode = document.getElementById("confirmationCode")
confirmationCode.innerHTML = ""

// function to generate a confirmation number to present to user and send to backend
function generateConfirmationNumber() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';

    for (let i = 0; i < 8; i++) {
        const randomIndex = Math.floor(Math.random() * chars.length);
        result += chars[randomIndex];
    }

    return result;
}

// Submit button logic
let submitButton = document.getElementById("submitButton");
submitButton.addEventListener('click', async () => {

    // gather data for POST request body
    const guestCountRetrieved = document.getElementById("guestCount").value;
    const bedSelectionRetrieved = document.getElementById("roomSelection").value;
    const dateRange = document.getElementById("dateselect").value;
    const [checkInDate, checkOutDate] = dateRange.split(" - ");
    const confirmationNumber = generateConfirmationNumber();

    try {
        let response = await fetch("/api/session/getSession", {
            method: 'GET'
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const sessionData = await response.json();

        let preparedBody = {
            "guestCount": guestCountRetrieved,
            "userId": sessionData.userId,
            "roomId": bedSelectionRetrieved,
            "checkInDate": checkInDate,
            "checkOutDate": checkOutDate,
            "confirmationNumber": confirmationNumber
        }

        const response2 = await fetch('/api/reservations/newRes', {
            method: 'POST',
            body: JSON.stringify(preparedBody),
            headers: { 'Content-Type': 'application/json' }
        })

        if (!response2.ok) throw new Error('Second fetch failed');
        const data2 = await response2.json();
        console.log(data2)

        // clear input fields
        document.getElementById('dateselect').value = '';
        document.getElementById('guestCount').value = '';
        document.getElementById('roomSelection').selectedIndex = 0;

        // clear calendar selection
        if (picker) {
            picker.clear();
        }

        // reveal confirmation message and load confirmation number
        confimrationDiv.classList.remove("hidden");
        confirmationCode.innerHTML = `${confirmationNumber}`
        console.log(preparedBody);
    } catch (error) {
        console.error("Error fetching session data:", error);
    }
});

// defining picker in the global scope
let picker;
// Once the HTML strucutre is ready then the code can execute for the date picker
document.addEventListener("DOMContentLoaded", function () {
    picker = new easepick.create({
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
