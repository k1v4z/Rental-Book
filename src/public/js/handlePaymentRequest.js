document.querySelectorAll('.approve-button').forEach((approve_btn) => {
    approve_btn.addEventListener('click', async () => {
        const id = approve_btn.dataset.id;
        const amountHTML = document.querySelector(`.amount-${id}`).innerHTML;
        //regex
        let amount = amountHTML.match(/\d+/)[0];
        await fetch(`http://localhost:8081/api/v1/accept-request?id=${id}`, {
            method: 'PATCH'
        })
            .then(response => response.json())
            .then((message) => {
                console.log(message);
                location.reload();
            })
            .catch((error) => {
                console.log(error);
            });

        await fetch(`http://localhost:8081/api/v1/recharge?id=${id}&amount=${amount}`, {
            method: 'PATCH'
        })
        .then(response => response.json())
        .then((message) => {
            alert(message);
        });
    })
});

document.querySelectorAll('.reject-button').forEach((approve_btn) => {
    approve_btn.addEventListener('click', async () => {
        const id = approve_btn.dataset.id;
        await fetch(`http://localhost:8081/api/v1/reject-request?id=${id}`, {
            method: 'PATCH'
        })
            .then(response => response.json())
            .then((message) => {
                console.log(message);
                location.reload();
            })
            .catch((error) => {
                console.log(error);
            })
    })
});