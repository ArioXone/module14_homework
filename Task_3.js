/*Задание 3

Напишите код приложения, интерфейс которого представляет собой input и кнопку. В input можно ввести любое число. При клике на кнопку происходит следующее:

Если число не попадает в диапазон от 1 до 10 — выводить ниже текст «число вне диапазона от 1 до 10».
Если число попадает в диапазон от 1 до 10 — сделать запрос c помощью XHR по URL https://jsonplaceholder.typicode.com/photos?_limit=5, где get-параметр limit — это введённое число.
Пример. Если пользователь ввёл 8, то запрос будет вида: https://jsonplaceholder.typicode.com/photos?_limit=8.
После получения данных вывести ниже картинки на экран.*/

const input = document.querySelector('input');
const button = document.querySelector('button');
const resultDiv = document.querySelector('#result');

button.addEventListener('click', function() {
    const number = parseInt(input.value);

    if (number < 1 || number > 10) {
        resultDiv.textContent = 'Введенное число вне диапазона от 1 до 10';
    } else {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', `https://jsonplaceholder.typicode.com/photos?_limit=${number}`);
        xhr.onload = function() {
            if (xhr.status === 200) {
                const data = JSON.parse(xhr.responseText);
                resultDiv.innerHTML = '';
                data.forEach(item => {
                    const img = document.createElement('img');
                    img.src = item.url;
                    resultDiv.appendChild(img);
                });
            } else {
                resultDiv.textContent = 'Ошибка при загрузке данных';
            }
        };
        xhr.send();
    }
});
