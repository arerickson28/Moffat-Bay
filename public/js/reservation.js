console.log("hellooooooooo");

let guestCountRetrieved;
let bedSelectionRetrieved;
let dateRange;
let checkInDate;
let checkOutDate;
let confirmationNumber;

let confirmResBtn = document.getElementById("confirmRes");

function repopWithConf() {
    let modalContent = document.getElementsByClassName("modal-content") [0];
    const keepId = "closeModalBtn";
    for (let i = modalContent.children.length -1; i >= 0; i--) {
        const child = modalContent.children[i];
        if (child.id !== keepId) {
            modalContent.removeChild(child);
        }
    }
    let resCreatedMsg = document.createElement("h2")
    resCreatedMsg.innerHTML = "Reservation Created!";

    let confNumber = document.createElement("p")
    confNumber.innerHTML = `Your confirmation number is: ${confirmationNumber}`

    modalContent.appendChild(resCreatedMsg);
    modalContent.appendChild(confNumber)
}

// if the confirmation div has been revealed from a previous reservation, hide it
// const confimrationDiv = document.getElementById("confirmationDiv")
// confimrationDiv.classList.add("hidden")

// if the confirmation code has been set from a previous reservation, reset it
// let confirmationCode = document.getElementById("confirmationCode")
// confirmationCode.innerHTML = ""

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

    guestCountRetrieved = document.getElementById("guestCount").value;
    bedSelectionRetrieved = document.getElementById("roomSelection").value;
    dateRange = document.getElementById("dateselect").value;
    [checkInDate, checkOutDate] = dateRange.split(" - ");
    confirmationNumber = generateConfirmationNumber();

       // show modal and set confirmation code
        // document.getElementById("confirmationCode").textContent = confirmationNumber;
        // document.getElementById("modalConfirmationNumber").textContent = confirmationNumber;
        document.getElementById("modalCheckIn").textContent = checkInDate;
        document.getElementById("modalCheckOut").textContent = checkOutDate;
        document.getElementById("modalGuests").textContent = guestCountRetrieved;
        const roomSelect = document.getElementById("roomSelection");
        const roomOption = roomSelect.querySelector(`option[value="${bedSelectionRetrieved}"]`);
        document.getElementById("modalRoomType").textContent = roomOption ? roomOption.textContent : "Room not found";

        document.getElementById("confirmationModal").style.display = "block";
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

function closeModal() {
    document.getElementById("confirmationModal").style.display = "none";
    location.reload();
  }

// Close modal on 'X' click
document.getElementById("closeModalBtn").addEventListener("click", closeModal);

  document.getElementById("cancelRes").addEventListener("click", closeModal);

 async function sendResToBackend() {
        // // gather data for POST request body
        // guestCountRetrieved = document.getElementById("guestCount").value;
        // bedSelectionRetrieved = document.getElementById("roomSelection").value;
        // dateRange = document.getElementById("dateselect").value;
        // [checkInDate, checkOutDate] = dateRange.split(" - ");
        // confirmationNumber = generateConfirmationNumber();
    
        try {
            let response = await fetch("/api/session/getSession", {
                method: 'GET'
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
    
            const sessionData = await response.json();
            console.log(sessionData)
    
            let preparedBody = {
                "guestCount": guestCountRetrieved,
                "userId": sessionData.userId,
                "roomId": bedSelectionRetrieved,
                "checkInDate": checkInDate,
                "checkOutDate": checkOutDate,
                "confirmationNumber": confirmationNumber
            }

            console.log(preparedBody)
    
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
        } catch (error) {
            console.error("Error fetching session data:", error);
        }
  }

  confirmResBtn.addEventListener('click', () => {

  sendResToBackend()
  repopWithConf()
})
