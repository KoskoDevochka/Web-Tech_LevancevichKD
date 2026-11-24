const emptyText = document.getElementById('nothing-selected');
const totalBlock = document.getElementById('order-total');
const totalPrice = document.getElementById('order-total-price');
const orderDishes = document.getElementById('order-dishes');
const form = document.querySelector('.order-form');
const timeInput = document.getElementById('delivery_time');

const emptyMessages = {
    soup: 'Не выбран',
    main: 'Не выбрано',
    salad: 'Не выбран',
    drink: 'Не выбран',
    dessert: 'Не выбран'
};

// поле в запросе для каждой категории
const idFields = {
    soup: 'soup_id',
    main: 'main_course_id',
    salad: 'salad_id',
    drink: 'drink_id',
    dessert: 'dessert_id'
};

function renderOrder() {
    orderDishes.innerHTML = '';
    let any = false;

    categories.forEach(function (category) {
        const dish = selected[category];
        const valueEl = document.querySelector('#order-' + category + ' .order-value');

        if (dish) {
            any = true;
            valueEl.textContent = dish.name + ' ' + dish.price + ' ₽';
            orderDishes.append(createDishCard(dish, 'Удалить'));
        } else {
            valueEl.textContent = emptyMessages[category];
        }
    });

    emptyText.hidden = any;
    totalBlock.hidden = !any;
    totalPrice.textContent = getTotal() + ' ₽';
}

// удаление блюда из заказа
orderDishes.addEventListener('click', function (event) {
    const button = event.target.closest('button');
    if (!button) return;

    const card = button.closest('.dish');
    const keyword = card.getAttribute('data-dish');
    const dish = dishes.find(function (d) {
        return d.keyword === keyword;
    });

    selected[dish.category] = null;
    saveSelected();
    renderOrder();
});

// поле времени нужно только для "К указанному времени"
document.querySelectorAll('input[name="delivery_type"]').forEach(function (radio) {
    radio.addEventListener('change', function () {
        const byTime = form.elements['delivery_type'].value === 'by_time';
        timeInput.disabled = !byTime;
        timeInput.required = byTime;
        if (!byTime) timeInput.value = '';
    });
});

form.addEventListener('submit', async function (event) {
    event.preventDefault();

    const message = checkOrder();
    if (message !== null) {
        showNotification(message);
        return;
    }

    const deliveryType = form.elements['delivery_type'].value;

    if (deliveryType === 'by_time') {
        const parts = timeInput.value.split(':');
        const chosen = Number(parts[0]) * 60 + Number(parts[1]);
        const now = new Date();
        if (chosen < now.getHours() * 60 + now.getMinutes()) {
            showNotification('Время доставки не может быть раньше текущего времени');
            return;
        }
    }

    const body = {
        full_name: form.elements['full_name'].value,
        email: form.elements['email'].value,
        subscribe: form.elements['subscribe'].checked ? 1 : 0,
        phone: form.elements['phone'].value,
        delivery_address: form.elements['delivery_address'].value,
        delivery_type: deliveryType,
        comment: form.elements['comment'].value
    };

    if (deliveryType === 'by_time') {
        body.delivery_time = timeInput.value;
    }

    const noId = [];
    categories.forEach(function (category) {
        const dish = selected[category];
        if (!dish) return;

        const id = getDishId(dish);
        if (id === null) {
            noId.push(dish.name);
        } else {
            body[idFields[category]] = id;
        }
    });

    if (noId.length > 0) {
        showNotification('Не нашла id для блюд: ' + noId.join(', '));
        return;
    }

    try {
        const response = await fetch(ORDERS_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });

        let data = null;
        try {
            data = await response.json();
        } catch (e) {
            data = null;
        }

        if (!response.ok) {
            throw new Error(data && data.error ? data.error : 'Ошибка сервера: ' + response.status);
        }

        // успех: чистим localStorage и страницу
        clearSelected();
        renderOrder();
        form.reset();
        timeInput.disabled = true;
        timeInput.required = false;
        showNotification('Заказ успешно оформлен!');
    } catch (error) {
        console.error(error);
        showNotification('Не удалось оформить заказ: ' + error.message);
    }
});

async function initCheckout() {
    try {
        await loadDishes();
    } catch (error) {
        console.error(error);
        showNotification('Не удалось загрузить блюда. Попробуйте обновить страницу.');
        return;
    }

    restoreSelected();
    renderOrder();
}

initCheckout();