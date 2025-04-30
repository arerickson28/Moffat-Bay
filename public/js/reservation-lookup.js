document.addEventListener('DOMContentLoaded', function() {
    // Get all the elements we need
    const searchResButton = document.getElementById('searchRes');
    const confNumberInput = document.getElementById('confNumber');
    const lastNameInput = document.getElementById('lastName');
    const checkInInput = document.getElementById('checkIn');
    const errorMessage = document.getElementById('errorMessage');
    const resDetails = document.getElementById('resDetails');

    // Initialize elements
    if (resDetails) resDetails.style.display = 'none';
    if (errorMessage) errorMessage.style.display = 'none';

    // Format date function
    function formatDate(dateString) {
        const options = {year: 'numeric', month: 'long', day: 'numeric'};
        return new Date(dateString).toLocaleDateString('en-US', options);
    }

    // Function to compare dates (ignoring time)
    function areDatesEqual(date1, date2) {
        // Create Date objects
        const d1 = new Date(date1);
        const d2 = new Date(date2);
        
        // Compare year, month, and day
        return d1.getFullYear() === d2.getFullYear() && 
               d1.getMonth() === d2.getMonth() && 
               d1.getDate() === d2.getDate();
    }

    // Function for robust string comparison
    function areStringsEqual(str1, str2) {
        if (!str1 || !str2) return false;
        
        // Normalize strings: trim whitespace, convert to lowercase
        const normalizedStr1 = str1.trim().toLowerCase();
        const normalizedStr2 = str2.trim().toLowerCase();
        
        return normalizedStr1 === normalizedStr2;
    }

    // Function to lookup reservation
    async function findRes(confNumber) {
        try {
            // Get auth token from localStorage due to endpoints being protected with middleware 
            const token = localStorage.getItem('token');
            
            // Create API URL with confirmation number
            const apiUrl = '/api/reservations/getOneRes/' + encodeURIComponent(confNumber);

            console.log('Fetching reservation from:', apiUrl);
            
            const response = await fetch(apiUrl, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                if (response.status === 400) {
                    throw new Error('Reservation not found');
                } else if (response.status === 401 || response.status === 403) {
                    throw new Error('Authentication error. Please log in again.');
                } else {
                    throw new Error('Server error: ' + response.status);
                }
            }

            // Parse the response
            const data = await response.json();
            console.log('API response data:', data);
            
            if (!data || !data.reservation) {
                throw new Error('Invalid response format from server');
            }
            
            return data.reservation;
        } catch (error) {
            console.error('Error looking up reservation:', error);
            throw error;
        }
    }

    // Validation function to check last name and check-in date
    function validateReservation(reservation, lastName, checkInDate) {
        // Create an array to collect validation errors
        const errors = [];
        
        // Check last name if user data is available
        if (reservation.User && reservation.User.last_name) {
            if (!areStringsEqual(lastName, reservation.User.last_name)) {
                errors.push('Last name does not match reservation');
            }
        } else {
            console.warn('User information missing, skipping name validation');
        }
        
        // Check check-in date
        if (reservation.check_in_date) {
            if (!areDatesEqual(checkInDate, reservation.check_in_date)) {
                errors.push('Check-in date does not match reservation');
            }
        } else {
            console.warn('Check-in date missing, skipping date validation');
        }
        
        // Return validation results
        return {
            valid: errors.length === 0,
            errors: errors
        };
    }

    function calculateTotal(checkInDate, checkOutDate, pricePerNight) {
        try {
            // Parse price with fallback to default
            pricePerNight = pricePerNight ? parseFloat(pricePerNight) : 150;
            
            // Create date objects with no time component
            const checkIn = new Date(checkInDate);
            checkIn.setHours(0, 0, 0, 0);
            
            const checkOut = new Date(checkOutDate);
            checkOut.setHours(0, 0, 0, 0);
            
            // Calculate difference in days
            const diffTime = checkOut.getTime() - checkIn.getTime();
            const nights = Math.round(diffTime / (1000 * 60 * 60 * 24));
            
            // Calculate total cost
            const total = pricePerNight * nights;
            
            return {
                nights: nights,
                total: total,
                pricePerNight: pricePerNight.toFixed(2),
                formatted: `$${total.toFixed(2)} (${nights} nights at $${pricePerNight.toFixed(2)}/night)`
            };
        } catch (error) {
            console.error('Error calculating total:', error);
            return { formatted: 'Total: Not available' };
        }
    }

    // Function to display reservation details
    function displayReservation(reservation) {
        console.log('Displaying reservation with structure:', JSON.stringify(reservation, null, 2));
        
        try {
            // Display confirmation number
            document.getElementById('confDisplay').textContent = `Confirmation: ${reservation.confirmation_number}`;
            
            // Display the logged in user (assumably primary guest) name if available
            if (reservation.User && reservation.User.first_name && reservation.User.last_name) {
                const fullName = `${reservation.User.first_name} ${reservation.User.last_name}`;
                document.getElementById('guestName').textContent = fullName;
            } else {
                document.getElementById('guestName').textContent = 'Guest information not available';
            }
            
            // Get price per night
            let roomType = 'Room information not available';
            let pricePerNight = null;
            
            console.log('Looking for room information');
            
            if (reservation.Room) {
                console.log('Found Room object:', reservation.Room);
                
                if (reservation.Room.type) {
                    roomType = reservation.Room.type;
                    console.log('Room type:', roomType);
                }
                
                if (reservation.Room.price_per_night !== undefined) {
                    pricePerNight = reservation.Room.price_per_night;
                    console.log('Room price_per_night', pricePerNight);
                }
            } else {
                console.log('No room object found');
            }
            
            //Allow for the heading to be displayed when the other detilas are found/displayed
            document.getElementById('res-heading').textContent = 'Stay Information';
            // Display room type and price per night
            if (pricePerNight) {
                document.getElementById('roomType').textContent = `${roomType} - $${parseFloat(pricePerNight).toFixed(2)} per night`;
            } else {
                document.getElementById('roomType').textContent = roomType;
            }
            
            // Format and display dates
            if (reservation.check_in_date && reservation.check_out_date) {
                const formattedCheckIn = formatDate(reservation.check_in_date);
                const formattedCheckOut = formatDate(reservation.check_out_date);
                document.getElementById('stayDates').textContent = `${formattedCheckIn} to ${formattedCheckOut}`;
            } else {
                document.getElementById('stayDates').textContent = 'Date information not available';
            }
            
            // Calculate and display total cost
            if (reservation.check_in_date && reservation.check_out_date) {
                const costInfo = calculateTotal(
                    reservation.check_in_date, 
                    reservation.check_out_date, 
                    pricePerNight
                );
                
                document.getElementById('totalAmount').textContent = costInfo.formatted;
            } else {
                document.getElementById('totalAmount').textContent = 'Total: Not available';
            }
            
            // Update guest count
            if (reservation.guest_count) {
                document.getElementById('guestCount').textContent = reservation.guest_count + ' Guest';
            } else {
                document.getElementById('guestCount').textContent = '?';
            }
            
            // Show the details
            resDetails.style.display = 'block';
        } catch (error) {
            console.error('Error displaying reservation:', error);
            errorMessage.textContent = 'Error displaying reservation details';
            errorMessage.style.display = 'block';
        }
    }

    // Handle the button click
    if (searchResButton) {
        searchResButton.addEventListener('click', async function() {
            const confNumber = confNumberInput.value.trim();
            const lastName = lastNameInput.value.trim();
            const checkInDate = checkInInput.value;
        
            // Basic input validation
            if (!confNumber) {
                errorMessage.textContent = 'Please enter a confirmation number';
                errorMessage.style.display = 'block';
                return;
            }
        
            if (!/^[A-Za-z0-9]{8}$/i.test(confNumber)) {
                errorMessage.textContent = 'Must be a valid confirmation number';
                errorMessage.style.display = 'block';
                return;
            }
        
            if (!lastName) {
                errorMessage.textContent = 'Please enter the last name on the reservation';
                errorMessage.style.display = 'block';
                return;
            }
        
            if (!checkInDate) {
                errorMessage.textContent = 'Please enter your check-in date';
                errorMessage.style.display = 'block';
                return;
            }
        
            // Hide previous results/errors
            errorMessage.style.display = 'none';
            resDetails.style.display = 'none';
        
            try {
                // Get the reservation by confirmation number
                const reservation = await findRes(confNumber);
                
                // Validate the reservation details against input
                const validationResult = validateReservation(reservation, lastName, checkInDate);
                
                if (validationResult.valid) {
                    // Display the reservation if validation passes
                    displayReservation(reservation);
                } else {
                    // Show error message with validation failures
                    errorMessage.textContent = validationResult.errors.join('. ');
                    errorMessage.style.display = 'block';
                }
                
            } catch (error) {
                // Handle API errors
                if (error.message.includes('Authentication')) {
                    errorMessage.textContent = 'Please log in to view your reservation';
                } else if (error.message.includes('Reservation not found')) {
                    errorMessage.textContent = 'We couldn\'t find a reservation with that confirmation number';
                } else {
                    errorMessage.textContent = 'An error occurred while looking up your reservation. Please try again later.';
                }
                
                errorMessage.style.display = 'block';
                console.error('Lookup error:', error);
            } finally {
                // Reset button state
                searchResButton.disabled = false;
                searchResButton.textContent = 'Find your reservation';
            }
        });
    }

    // Add "Enter" key support to all input fields, this helps with UX
    [confNumberInput, lastNameInput, checkInInput].forEach(input => {
        if (input) {
            input.addEventListener('keypress', function(e) {
                if (e.key === 'Enter' && searchResButton) {
                    searchResButton.click();
                }
            });
        }
    });

    // Toggle collapsible content
    window.toggleCollapsible = function(id) {
        const content = document.getElementById(id);
        if (content) {
            content.style.display = content.style.display === 'block' ? 'none' : 'block';
        }
    };
});