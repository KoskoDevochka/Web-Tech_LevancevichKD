let dishes = [];

const API_KEY = 'd1fb075a-a3ce-3b1d-9133-a5cd37f91b7c';
const API_BASE = 'https://web-basics-api-gagashaggy.msk1.amvera.tech/labs/api';
const API_URL = API_BASE + '/dishes/my?api_key=' + API_KEY;
const ORDERS_URL = API_BASE + '/orders?api_key=' + API_KEY;

async function loadDishes() {
    const response = await fetch(API_URL);

    if (!response.ok) {
        throw new Error('Ошибка сервера: ' + response.status);
    }

    const data = await response.json();

    data.forEach(function (dish) {
        if (dish.category === 'main-course') {
            dish.category = 'main';
        }
    });

    dishes = data;
}

// id блюда для отправки заказа
function getDishId(dish) {
    return dish.id !== undefined ? dish.id : null;
}