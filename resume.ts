document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);

    const populateElement = (id: string, param: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = urlParams.get(param) || '';
        }
    };

    populateElement('name', 'name');
    populateElement('email', 'email');
    populateElement('contactNo', 'contactno');
    populateElement('address', 'address');
    populateElement('education', 'education');
    populateElement('experience', 'experience');
    populateElement('skills', 'skills');

    // Handle profile picture
    const profilePicture = document.getElementById('profilePicture') as HTMLImageElement;
    if (profilePicture) {
        const storedPicture = sessionStorage.getItem('profilePicture');
        if (storedPicture) {
            profilePicture.src = storedPicture;
        } else {
            profilePicture.style.display = 'none';
        }
    }

    makeEditable();
});

function makeEditable() {
    const editableElements = document.querySelectorAll('.editable');
    editableElements.forEach(element => {
        element.addEventListener('click', function() {
            const currentElement = element as HTMLElement;
            const currentValue = currentElement.textContent || "";

            if (currentElement.tagName === "P" || currentElement.tagName === 'SPAN') {
                const input = document.createElement('input');
                input.type = 'text';
                input.value = currentValue;
                input.classList.add('editing', 'input');
                
                const updateField = () => {
                    currentElement.textContent = input.value;
                    currentElement.style.display = 'inline';
                    input.remove();
                };

                input.addEventListener('blur', updateField);
                
                // Add event listener for the Enter key
                input.addEventListener('keypress', function(e) {
                    if (e.key === 'Enter') {
                        e.preventDefault(); // Prevent form submission if inside a form
                        updateField();
                    }
                });

                currentElement.style.display = 'none';
                currentElement.parentNode?.insertBefore(input, currentElement);
                input.focus();
            }
        });
    });
}
