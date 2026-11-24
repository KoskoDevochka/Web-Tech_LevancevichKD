function checkOrder() {
    const soup = selected.soup !== null;
    const main = selected.main !== null;
    const salad = selected.salad !== null;
    const drink = selected.drink !== null;
    const dessert = selected.dessert !== null;

    //вообще ничего не выбрано
    if (!soup && !main && !salad && !drink && !dessert) {
        return 'Ничего не выбрано. Выберите блюда для заказа';
    }

    const foodOk = main || (soup && salad);

    //всe в порядке
    if (foodOk && drink) {
        return null;
    }

    //еды достаточно, не хватает напитка
    if (foodOk && !drink) {
        return 'Выберите напиток';
    }

    //выбран суп, но нет главного блюда и салата
    if (soup && !main && !salad) {
        return 'Выберите главное блюдо или салат';
    }

    //выбран салат, но нет супа и главного блюда
    if (salad && !soup && !main) {
        return 'Выберите суп или главное блюдо';
    }

    //остались только напиток и/или десерт
    return 'Выберите главное блюдо';
}


function showNotification(text) {
    const old = document.querySelector('.notification-overlay');
    if (old) old.remove();

    const overlay = document.createElement('div');
    overlay.classList.add('notification-overlay');

    const box = document.createElement('div');
    box.classList.add('notification');

    const message = document.createElement('p');
    message.textContent = text;

    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = 'Окей';
    button.addEventListener('click', function () {
        overlay.remove();
    });

    box.append(message, button);
    overlay.append(box);
    document.body.append(overlay);
}