document.querySelectorAll('.btn-return').forEach((button) => {
    button.addEventListener('click', async () => {
        const rentid = button.dataset.rentid;
        const bookid = button.dataset.bookid;

        await fetch(`http://localhost:8081/api/v1/return-book?rentid=${rentid}&bookid=${bookid}`,
            { method: 'PATCH' })
            .then(response => response.json())
            .then((data) => {
                alert(data.message);
                location.reload();
            })
    })
})