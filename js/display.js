function createDishCard(dish) {
    const card = document.createElement('div');
    card.classList.add('dish');
    card.setAttribute('data-dish', dish.keyword);

    const img = document.createElement('img');
    img.src = dish.image;
    img.alt = dish.name;

    const price = document.createElement('p');
    price.classList.add('price');
    price.textContent = dish.price + ' ₽';

    const name = document.createElement('p');
    name.classList.add('name');
    name.textContent = dish.name;

    const weight = document.createElement('p');
    weight.classList.add('weight');
    weight.textContent = dish.count;

    const button = document.createElement('button');
    button.textContent = 'Добавить';

    card.append(img, price, name, weight, button);
    return card;
}

dishes.sort(function (a, b) {
    return a.name.localeCompare(b.name, 'ru');
});

function renderDishes(category, kind) {
    const container = document.querySelector('.dishes[data-category="' + category + '"]');
    container.innerHTML = '';

    dishes
        .filter(function (dish) {
            return dish.category === category && (!kind || dish.kind === kind);
        })
        .forEach(function (dish) {
            container.append(createDishCard(dish));
        });
}

const categories = ['soup', 'main', 'salad', 'drink', 'dessert'];

categories.forEach(function (category) {
    renderDishes(category);
});