document.getElementById('registerPatientForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const formData = new FormData(this);

    try {
        const response = await fetch('/api/patients/register', {
            method: 'POST',
            body: formData,
        });

        const result = await response.json();

        if (response.ok) {
            alert('Patient registered successfully');
        } else {
            alert('Error: ' + result.msg);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred');
    }
});

document.getElementById('viewPsychiatristsForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const hospitalId = document.getElementById('hospitalId').value;

    try {
        const response = await fetch('/api/psychiatrists/hospital', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ hospitalId }),
        });

        const result = await response.json();

        if (response.ok) {
            // Display psychiatrists
            const psychiatristsList = document.getElementById('psychiatristsList');
            psychiatristsList.innerHTML = `
                <h3>Hospital: ${result.hospitalName}</h3>
                <p>Total Psychiatrists: ${result.totalPsychiatristsCount}</p>
                <p>Total Patients: ${result.totalPatientsCount}</p>
                <ul>
                    ${result.psychiatristDetails.map(p => `
                        <li>
                            <p>ID: ${p.id}</p>
                            <p>Name: ${p.name}</p>
                            <p>Patients Count: ${p.patientsCount}</p>
                        </li>
                    `).join('')}
                </ul>
            `;
        } else {
            alert('Error: ' + result.msg);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred');
    }
});

function showSection(sectionId) {
    document.getElementById('registerPatient').style.display = 'none';
    document.getElementById('viewPsychiatrists').style.display = 'none';
    document.getElementById(sectionId).style.display = 'block';
}
