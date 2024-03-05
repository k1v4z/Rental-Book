const username = document.getElementById("username");
const password = document.getElementById("password");
const notify = document.querySelector('.signup-message');
const checkbox = document.querySelector('.checkbox');

async function signUp() {
    const role = getSelectedValue();

    var statusMessage = document.getElementById("statusMessage");
    // Check the current value of "display"
    await fetch(`http://localhost:8081/api/v1/signup?username=${username.value}&passwords=${password.value}&roles=${role}`,
        { method: 'POST' })
        .then(response => response.json())
        .then((response) => {
            if (response.status === 200) {
                statusMessage.textContent = response.message;
                statusMessage.classList.remove("login-fail");
                statusMessage.classList.add("login-success");

                setTimeout(() => {
                    window.location.href = '/login';
                }, 2000)
            } else {
                statusMessage.textContent = response.message;
                statusMessage.classList.remove("login-success");
                statusMessage.classList.add("login-fail");
            }
        }).catch((error) => {
            console.log(error);
        });
    statusMessage.classList.remove("hidden");

}
function getSelectedValue() {
    var roleSelect = document.getElementById("role");
    var selectedValue = roleSelect.value;

    return selectedValue;
}