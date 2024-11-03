document.addEventListener('DOMContentLoaded', function () {
    var urlParams = new URLSearchParams(window.location.search);
    var populateElement = function (id, param) {
        var element = document.getElementById(id);
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
    var profilePicture = document.getElementById('profilePicture');
    if (profilePicture) {
        var storedPicture = sessionStorage.getItem('profilePicture');
        if (storedPicture) {
            profilePicture.src = storedPicture;
        }
        else {
            profilePicture.style.display = 'none';
        }
    }
    makeEditable();
});
function makeEditable() {
    var editableElements = document.querySelectorAll('.editable');
    editableElements.forEach(function (element) {
        element.addEventListener('click', function () {
            var _a;
            var currentElement = element;
            var currentValue = currentElement.textContent || "";
            if (currentElement.tagName === "P" || currentElement.tagName === 'SPAN') {
                var input_1 = document.createElement('input');
                input_1.type = 'text';
                input_1.value = currentValue;
                input_1.classList.add('editing', 'input');
                var updateField_1 = function () {
                    currentElement.textContent = input_1.value;
                    currentElement.style.display = 'inline';
                    input_1.remove();
                };
                input_1.addEventListener('blur', updateField_1);
                // Add event listener for the Enter key
                input_1.addEventListener('keypress', function (e) {
                    if (e.key === 'Enter') {
                        e.preventDefault(); // Prevent form submission if inside a form
                        updateField_1();
                    }
                });
                currentElement.style.display = 'none';
                (_a = currentElement.parentNode) === null || _a === void 0 ? void 0 : _a.insertBefore(input_1, currentElement);
                input_1.focus();
            }
        });
    });
}
