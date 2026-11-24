// buttonText: 'Добавить' на странице "Собрать ланч", 'Удалить' на странице заказа
function createDishCard(dish, buttonText) {
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
    button.type = 'button';
    button.textContent = buttonText;

    card.append(img, price, name, weight, button);
    return card;
}