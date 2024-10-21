// Function to show the add form
function openAddForm() { 
    const formContainer = document.getElementById('addForm');
    if (formContainer) {
        formContainer.style.display = 'block'; // Show the form
    } else {
        console.error('Element with ID "addForm" not found.');
    }
}

// Handle add deadbeat form submission
document.getElementById('addDeadbeatForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const name = document.getElementById('deadbeatName').value;
    const children = document.getElementById('deadbeatChildren').value;
    const image = document.getElementById('deadbeatImage').files[0];

    const formData = new FormData();
    formData.append('file', image);

    // Upload image first
    fetch('upload.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.path) {
            // Add deadbeat to the database
            fetch('deadbeat.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: new URLSearchParams({
                    add_deadbeat: '1',
                    name: name,
                    children: children,
                    image: data.path
                })
            })
            .then(response => response.json())
            .then(data => {
                alert(data.message);
                displayDeadbeats();

                // Hide the form after adding the deadbeat
                const formContainer = document.getElementById('addForm');
                if (formContainer) {
                    formContainer.style.display = 'none';  // Hide the form
                }

                // Reset the form fields
                document.getElementById('addDeadbeatForm').reset();
            })
            .catch(error => console.error('Error adding deadbeat:', error));
        }
    })
    .catch(error => console.error('Error uploading image:', error));
});

// Function to display all deadbeats
function displayDeadbeats() {
    fetch('deadbeat.php?get_deadbeats=1')
    .then(response => response.json())
    .then(data => {
        const container = document.getElementById('deadbeatContainer');
        container.innerHTML = '';  // Clear previous content
        data.forEach(deadbeat => {
            const deadbeatCard = `
                <div class="deadbeat-card">
                    <img src="${deadbeat.image}" alt="${deadbeat.name}">
                    <h3>${deadbeat.name}</h3>
                    <p>Children: ${deadbeat.children}</p>
                    <button onclick="openDeleteModal(${deadbeat.id})">Remove</button>
                </div>
            `;
            container.innerHTML += deadbeatCard;
        });
    })
    .catch(error => console.error('Error fetching deadbeats:', error));
}
// Function to remove deadbeat with modal authentication
let deadbeatIdToDelete = null;

function openDeleteModal(id) {
    deadbeatIdToDelete = id;  // Store the ID of the deadbeat to delete
    document.getElementById('deleteModal').style.display = 'block';
    document.getElementById('modalOverlay').classList.remove('hidden'); // Show overlay
}

function closeModal() {
    document.getElementById('deleteModal').style.display = 'none';
    document.getElementById('modalOverlay').classList.add('hidden');  // Hide overlay
    deadbeatIdToDelete = null;  // Reset the ID when the modal is closed
}

// Handle the delete form submission
document.getElementById('deleteDeadbeatForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const adminUsername = document.getElementById('adminUsername').value;
    const adminPassword = document.getElementById('adminPassword').value;

    // Ensure that an ID is stored
    if (!deadbeatIdToDelete) {
        alert('No deadbeat selected to delete.');
        return;
    }

    // Send admin credentials and deadbeat ID to the backend for validation
    fetch('deadbeat.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
            admin_username: adminUsername,
            admin_password: adminPassword,
            remove_deadbeat: '1',
            id: deadbeatIdToDelete
        })
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        if (data.success) {
            displayDeadbeats();  // Reload deadbeats if deletion is successful
            closeModal();  // Close the modal
            document.getElementById('deleteDeadbeatForm').reset(); // Reset the form after deletion
        } else {
            alert(data.message);  // Show error message, like invalid credentials
        }
    })
    .catch(error => console.error('Error removing deadbeat:', error));
});

window.onload = displayDeadbeats;