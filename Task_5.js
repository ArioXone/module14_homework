const pageInput = document.getElementById('pageInput');
const limitInput = document.getElementById('limitInput');
const requestBtn = document.getElementById('requestBtn');
const errorText = document.getElementById('errorText');
const imagesContainer = document.getElementById('imagesContainer');

function isValidNumber(num) {
    return !isNaN(num) && num >= 1 && num <= 10;
}

function makeRequest() {
    const page = parseInt(pageInput.value);
    const limit = parseInt(limitInput.value);

    if (!isValidNumber(page) || !isValidNumber(limit)) {
        errorText.textContent = 'Номер страницы и/или лимит вне диапазона от 1 до 10';
        return;
    }

    fetch(`https://jsonplaceholder.typicode.com/photos?_page=${page}&_limit=${limit}`)
        .then(response => response.json())
        .then(data => {
            localStorage.setItem('lastRequestData', JSON.stringify(data));
            displayImages(data);
        })
        .catch(error => console.error('Error:', error));
}

function displayImages(data) {
    imagesContainer.innerHTML = '';
    data.forEach(photo => {
        const img = document.createElement('img');
        img.src = photo.url;
        imagesContainer.appendChild(img);
    });
}

requestBtn.addEventListener('click', () => {
    errorText.textContent = '';
    makeRequest();
});

const lastRequestData = JSON.parse(localStorage.getItem('lastRequestData'));
if (lastRequestData) {
    displayImages(lastRequestData);
}
