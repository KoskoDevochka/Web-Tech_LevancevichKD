const selected = { soup: null, main: null, drink: null };

const emptyText = document.getElementById('nothing-selected');
const totalBlock = document.getElementById('order-total');
const totalPrice = document.getElementById('order-total-price');

const emptyMessages = {
    soup: 'Блюдо не выбрано',
    main: 'Блюдо не выбрано',
    drink: 'Напиток не выбран'
};

const blocks = {
    soup: document.getElementById('order-soup'),
    main: document.getElementById('order-main'),
    drink: document.getElementById('order-drink')
};

function updateOrder() {
    emptyText.hidden = true;
    totalBlock.hidden = false;

    let total = 0;

    for (const category in selected) {
        const dish = selected[category];
        const valueEl = blocks[category].querySelector('.order-value');

        blocks[category].hidden = false;

        if (dish) {
            valueEl.textContent = dish.name + ' ' + dish.price + ' ₽';
            total = total + dish.price;
        } else {
            valueEl.textContent = emptyMessages[category];
        }
    }

    totalPrice.textContent = total + ' ₽';
}

document.addEventListener('click', function (event) {
    const card = event.target.closest('.dish');
    if (!card) return;

    const keyword = card.getAttribute('data-dish');
    const dish = dishes.find(function (d) {
        return d.keyword === keyword;
    });

    selected[dish.category] = dish;
    updateOrder();
});

document.querySelector('.order-form').addEventListener('reset', function () {
    selected.soup = null;
    selected.main = null;
    selected.drink = null;

    emptyText.hidden = false;
    totalBlock.hidden = true;
    for (const category in blocks) {
        blocks[category].hidden = true;
    }
});