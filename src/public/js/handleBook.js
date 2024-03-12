
document.querySelectorAll('.add-button').forEach((button) => {
    button.addEventListener('click', () => {
        const bookId = button.dataset.bookid;
        increase(bookId);
    })
})

document.querySelectorAll('.btn-subtract').forEach((button) => {
    button.addEventListener('click', () => {
        const bookId = button.dataset.bookid;
        decrease(bookId);
    })
})

document.querySelectorAll('.delete-button').forEach((button) => {
    button.addEventListener('click', () => {
        const bookId = button.dataset.bookid;

        if (confirm('Do you want to delete this book') == true) {
            deleteB(bookId);
        }
    })
})

const increase = async (id) => {
    await fetch(`http://localhost:8081/api/v1/increase-amount?id=${id}`, {
        method: 'PATCH'
    })
        .then(res => res.json())
        .then((data) => {
            alert(data.message);
            location.reload();
        })
}

const decrease = async (id) => {
    await fetch(`http://localhost:8081/api/v1/decrease-amount?id=${id}`, {
        method: 'PATCH'
    })
        .then(res => res.json())
        .then((data) => {
            alert(data.message);
            location.reload();
        })
}

const deleteB = async (id) => {
    await fetch(`http://localhost:8081/api/v1/delete-book?id=${id}`, {
        method: 'PATCH'
    })
        .then(res => res.json())
        .then((data) => {
            alert(data.message);
            location.reload();
        })
}