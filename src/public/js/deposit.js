document.querySelector('.choice').addEventListener('click', () => {
    document.querySelector('.profile-card').innerHTML = `
        <h2>Deposit Money</h2>
        <div>Enter money you want to deposit</div>
        <form action="" method="POST" id="deposit-form">
            <label for="amount">Money:</label>
            <input type="number" id="amount" name="amount" min="100000" max="20000000" step="1" required oninput="validateInput(this)">
            <input type="submit" class="deposit"  value="Deposit">
        </form>
    `;

    document.querySelector('#deposit-form').addEventListener('submit', async (event) => {
        event.preventDefault(); // preven submit form default

        const username = (document.querySelector('.username').innerHTML).trim();
        const amount = document.querySelector('#amount').value;
        if (!amount) {
            alert('Please enter money');
            return;
        }

        await fetch(`http://localhost:8081/api/v1/send-payment-request?username=${username}&amount=${amount}`, {
            method: 'POST'
        }).then(response => response.json())
        .then(respondMessage => alert(respondMessage.message));

        document.querySelector('.profile-card').innerHTML = `
            <h2>Deposit Money</h2>
            <div>Please transfer following information below</div>
            <div>Account Number: 035****768</div>
            <div>Transfer note: [username] nạp [số tiền] vào tài khoản</div>
            <div>Bank: MB Bank</div>
            <img class="bank-logo" src="/images/logo-bank.jpg"></img>
        `;

    });
});

function validateInput(input) {
    // convert input from decimal into integer
    // purpose of this function: refuse user input decimal number
    input.value = parseInt(input.value);
}



