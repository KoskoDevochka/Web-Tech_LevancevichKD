function renderDishes(category, kind) {
    const container = document.querySelector('.dishes[data-category="' + category + '"]');
    container.innerHTML = '';

    dishes
        .filter(function (dish) {
            return dish.category === category && (!kind || dish.kind === kind);
        })
        .forEach(function (dish) {
            const card = createDishCard(dish, 'Добавить');
            if (selected[category] === dish) {
                card.classList.add('selected');
            }
            container.append(card);
        });
}

async function init() {
    try {
        await loadDishes();
    } catch (error) {
        console.error(error);
        alert('Не удалось загрузить блюда. Попробуйте обновить страницу.');
        return;
    }

    dishes.sort(function (a, b) {
        return a.name.localeCompare(b.name, 'ru');
    });

    restoreSelected();

    categories.forEach(function (category) {
        renderDishes(category);
    });

    updatePanel();
}

init();