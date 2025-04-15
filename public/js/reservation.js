// Mock database of rooms
const rooms = [
    {
        id: 1,
        name: "Ocean View Suite",
        price: 249,
        image: "/images/sea-bedroom.jpg",
        description: "Spacious suite with panoramic ocean views and private balcony",
        capacity: 2,
        amenities: ["King bed", "Ocean view", "Private bathroom", "Breakfast included"]
    },
    {
        id: 2,
        name: "Garden Retreat",
        price: 189,
        image: "/images/garden-room.jpg",
        description: "Cozy room overlooking our private flower garden",
        capacity: 2,
        amenities: ["Queen bed", "Garden view", "Private bathroom", "Breakfast included"]
    },
    {
        id: 3,
        name: "Lighthouse Suite",
        price: 349,
        image: "/images/lighthouse-suite.jpg",
        description: "Unique suite in historic lighthouse with 360° views",
        capacity: 4,
        amenities: ["Two queen beds", "Private terrace", "Jacuzzi", "Champagne welcome"]
    }
];

// Initialize date picker
let picker;
document.addEventListener("DOMContentLoaded", () => {
    picker = new easepick.create({
        element: document.getElementById('dateselect'),
        css: ['https://cdn.jsdelivr.net/npm/@easepick/bundle@1.2.1/dist/index.css'],
        plugins: ['RangePlugin', 'LockPlugin'],
        RangePlugin: {
            tooltip: true,
        },
        LockPlugin: {
            minDate: new Date(),
        }
    });
});

async function checkAvailability() {
    const dates = picker.getDatePicker();
    if (!dates || dates.length < 2) {
        alert("Please select both check-in and check-out dates");
        return;
    }

    showLoading(true);

    // Simulate API call
    setTimeout(() => {
        showLoading(false);
        displayRooms(rooms);
    }, 1000);
}

function displayRooms(availableRooms) {
    const container = document.getElementById('roomsContainer');

    if (availableRooms.length === 0) {
        container.innerHTML = `
            <div class="availability-message">
                No rooms available for selected dates. Please try different dates.
            </div>
        `;
        return;
    }

    container.innerHTML = `
        <div class="room-grid">
            ${availableRooms.map(room => `
                <div class="room-card">
                    <img src="${room.image}" alt="${room.name}" class="room-image">
                    <div class="room-details">
                        <h3 class="room-title">${room.name}</h3>
                        <p>${room.description}</p>
                        <ul style="margin: 1rem 0; padding-left: 1.5rem;">
                            ${room.amenities.map(a => `<li>✔️ ${a}</li>`).join('')}
                        </ul>
                        <p class="room-price">$${room.price}/night</p>
                        <button class="book-btn" onclick="startBooking(${room.id})">
                            Book Now
                        </button>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

function showLoading(show) {
    document.getElementById('loadingSpinner').style.display = show ? 'block' : 'none';
}

function startBooking(roomId) {
    const selectedRoom = rooms.find(r => r.id === roomId);
    const dates = picker.getDatePicker();

    if (!dates || dates.length < 2) {
        alert("Please select dates first");
        return;
    }

    const checkIn = dates[0].toLocaleDateString();
    const checkOut = dates[1].toLocaleDateString();

    const confirmation = confirm(
        `Confirm booking:\n
        Room: ${selectedRoom.name}\n
        Check-in: ${checkIn}\n
        Check-out: ${checkOut}\n
        Total: $${calculateTotal(selectedRoom.price, dates)}`
    );

    if (confirmation) {
        // Here you would typically redirect to a payment page
        alert("Booking confirmed! Redirecting to payment...");
    }
}

function calculateTotal(pricePerNight, dates) {
    const nights = Math.ceil((dates[1] - dates[0]) / (1000 * 60 * 60 * 24));
    return pricePerNight * nights;
}
