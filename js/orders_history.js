const ordersBody = document.getElementById('orders-body');
const ordersTable = document.getElementById('orders-table');
const noOrders = document.getElementById('no-orders');

let orders = [];

//какое поле заказа соответствует какой категории
const dishFields = [
    { field: 'soup_id', title: 'Суп' },
    { field: 'main_course_id', title: 'Основное блюдо' },
    { field: 'salad_id', title: 'Салат' },
    { field: 'drink_id', title: 'Напиток' },
    { field: 'dessert_id', title: 'Десерт' }
];

function orderUrl(id) {
    return API_BASE + '/orders' + (id !== undefined ? '/' + id : '') + '?api_key=' + API_KEY;
}

async function request(url, options) {
    const response = await fetch(url, options);

    let data = null;
    try {
        data = await response.json();
    } catch (e) {
        data = null;
    }

    if (!response.ok) {
        throw new Error(data && data.error ? data.error : 'Ошибка сервера: ' + response.status);
    }
    return data;
}


function findDish(id) {
    if (id === null || id === undefined) return null;
    return dishes.find(function (d) {
        return Number(d.id) === Number(id);
    }) || null;
}

//список блюд заказа: [{ title, dish, id }]
function getOrderItems(order) {
    const items = [];
    dishFields.forEach(function (item) {
        const id = order[item.field];
        if (id === null || id === undefined) return;
        items.push({ title: item.title, id: id, dish: findDish(id) });
    });
    return items;
}

function getDishName(item) {
    return item.dish ? item.dish.name : 'Блюдо №' + item.id;
}

function getOrderTotal(order) {
    let total = 0;
    getOrderItems(order).forEach(function (item) {
        if (item.dish) total += Number(item.dish.price);
    });
    return total;
}

function pad(n) {
    return String(n).padStart(2, '0');
}

function formatDate(str) {
    const d = new Date(str);
    if (isNaN(d.getTime())) return str;
    return pad(d.getDate()) + '.' + pad(d.getMonth() + 1) + '.' + d.getFullYear() +
        ' ' + pad(d.getHours()) + ':' + pad(d.getMinutes());
}

function formatDelivery(order) {
    if (order.delivery_type === 'by_time' && order.delivery_time) {
        return String(order.delivery_time).slice(0, 5);
    }
    return 'Как можно скорее (с 7:00 до 23:00)';
}

function el(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
}

//список заказов
function renderOrders() {
    ordersBody.innerHTML = '';

    const isEmpty = orders.length === 0;
    noOrders.hidden = !isEmpty;
    ordersTable.hidden = isEmpty;

    orders.forEach(function (order, index) {
        const tr = el('tr');

        const names = getOrderItems(order).map(getDishName).join(', ');

        tr.append(
            el('td', '', index + 1),
            el('td', '', formatDate(order.created_at)),
            el('td', 'orders-composition', names),
            el('td', '', getOrderTotal(order) + ' ₽'),
            el('td', '', formatDelivery(order))
        );

        const actions = el('td', 'orders-actions');
        actions.append(
            createIconButton('bi-eye', 'view', order.id, 'Подробнее'),
            createIconButton('bi-pencil', 'edit', order.id, 'Редактирование'),
            createIconButton('bi-trash', 'delete', order.id, 'Удаление')
        );
        tr.append(actions);

        ordersBody.append(tr);
    });
}

function createIconButton(icon, action, id, title) {
    const button = el('button', 'icon-button');
    button.type = 'button';
    button.title = title;
    button.setAttribute('aria-label', title);
    button.setAttribute('data-action', action);
    button.setAttribute('data-id', id);

    const i = el('i', 'bi ' + icon);
    button.append(i);
    return button;
}

ordersBody.addEventListener('click', function (event) {
    const button = event.target.closest('button[data-action]');
    if (!button) return;

    const id = Number(button.getAttribute('data-id'));
    const order = orders.find(function (o) {
        return Number(o.id) === id;
    });
    if (!order) return;

    const action = button.getAttribute('data-action');
    if (action === 'view') openViewModal(order);
    if (action === 'edit') openEditModal(order);
    if (action === 'delete') openDeleteModal(order);
});

async function loadOrders() {
    const data = await request(orderUrl());

    // сначала новые
    orders = data.slice().sort(function (a, b) {
        return new Date(b.created_at) - new Date(a.created_at);
    });
    renderOrders();
}

//кнопки: [{ text, className, onClick }]
//возвращает функцию закрытия окна
function openModal(title, bodyNode, buttons) {
    const overlay = el('div', 'modal-overlay');
    const modal = el('div', 'modal-window');

    const header = el('div', 'modal-header');
    const heading = el('h3', '', title);
    const closeBtn = el('button', 'modal-close', '×');
    closeBtn.type = 'button';
    closeBtn.setAttribute('aria-label', 'Закрыть');
    header.append(heading, closeBtn);

    const body = el('div', 'modal-body');
    body.append(bodyNode);

    const footer = el('div', 'modal-footer');

    function close() {
        document.removeEventListener('keydown', onKey);
        overlay.remove();
    }

    function onKey(event) {
        if (event.key === 'Escape') close();
    }

    buttons.forEach(function (b) {
        const button = el('button', 'modal-btn ' + (b.className || ''), b.text);
        button.type = 'button';
        button.addEventListener('click', function () {
            b.onClick(close, button);
        });
        footer.append(button);
    });

    closeBtn.addEventListener('click', close);
    overlay.addEventListener('mousedown', function (event) {
        if (event.target === overlay) close();
    });
    document.addEventListener('keydown', onKey);

    modal.append(header, body, footer);
    overlay.append(modal);
    document.body.append(overlay);

    return close;
}

//строка "название — значение" для просмотра
function infoRow(label, value) {
    const row = el('div', 'modal-row');
    row.append(el('span', 'modal-label', label), el('span', 'modal-value', value));
    return row;
}

function sectionTitle(text) {
    return el('h4', 'modal-section', text);
}

//блок "состав заказа" + стоимость (общий для просмотра и редактирования)
function compositionBlock(order) {
    const block = el('div');
    block.append(sectionTitle('Состав заказа'));

    getOrderItems(order).forEach(function (item) {
        const price = item.dish ? ' (' + item.dish.price + '₽)' : '';
        block.append(infoRow(item.title, getDishName(item) + price));
    });

    block.append(el('p', 'modal-total', 'Стоимость: ' + getOrderTotal(order) + '₽'));
    return block;
}

//просмотр
function openViewModal(order) {
    const body = el('div');

    body.append(infoRow('Дата оформления', formatDate(order.created_at)));

    body.append(sectionTitle('Доставка'));
    body.append(infoRow('Имя получателя', order.full_name));
    body.append(infoRow('Адрес доставки', order.delivery_address));
    body.append(infoRow('Время доставки', formatDelivery(order)));
    body.append(infoRow('Телефон', order.phone));
    body.append(infoRow('Email', order.email));

    body.append(sectionTitle('Комментарий'));
    body.append(el('p', 'modal-comment', order.comment ? order.comment : '—'));

    body.append(compositionBlock(order));

    openModal('Просмотр заказа', body, [
        { text: 'Ок', className: 'modal-btn-light', onClick: function (close) { close(); } }
    ]);
}

//редактирование
function formRow(labelText, inputNode, inputId) {
    const row = el('div', 'modal-row');
    const label = el('label', 'modal-label', labelText);
    if (inputId) label.setAttribute('for', inputId);
    row.append(label, inputNode);
    return row;
}

function textInput(type, id, value, required) {
    const input = document.createElement('input');
    input.type = type;
    input.id = id;
    input.name = id;
    input.value = value || '';
    input.required = !!required;
    return input;
}

function openEditModal(order) {
    const form = document.createElement('form');
    form.noValidate = false;

    form.append(infoRow('Дата оформления', formatDate(order.created_at)));
    form.append(sectionTitle('Доставка'));

    const nameInput = textInput('text', 'edit_full_name', order.full_name, true);
    const addressInput = textInput('text', 'edit_delivery_address', order.delivery_address, true);
    const phoneInput = textInput('tel', 'edit_phone', order.phone, true);
    const emailInput = textInput('email', 'edit_email', order.email, true);

    form.append(formRow('Имя получателя', nameInput, 'edit_full_name'));
    form.append(formRow('Адрес доставки', addressInput, 'edit_delivery_address'));

    //тип доставки + время
    const deliveryBox = el('div', 'modal-delivery');

    const nowRadio = document.createElement('input');
    nowRadio.type = 'radio';
    nowRadio.name = 'edit_delivery_type';
    nowRadio.id = 'edit_delivery_now';
    nowRadio.value = 'now';
    const nowLabel = el('label', '', 'Как можно скорее');
    nowLabel.setAttribute('for', 'edit_delivery_now');

    const timeRadio = document.createElement('input');
    timeRadio.type = 'radio';
    timeRadio.name = 'edit_delivery_type';
    timeRadio.id = 'edit_delivery_by_time';
    timeRadio.value = 'by_time';
    const timeLabel = el('label', '', 'К указанному времени');
    timeLabel.setAttribute('for', 'edit_delivery_by_time');

    const timeInput = textInput('time', 'edit_delivery_time',
        order.delivery_time ? String(order.delivery_time).slice(0, 5) : '', false);
    timeInput.min = '07:00';
    timeInput.max = '23:00';
    timeInput.step = 300;

    const isByTime = order.delivery_type === 'by_time';
    nowRadio.checked = !isByTime;
    timeRadio.checked = isByTime;
    timeInput.disabled = !isByTime;
    timeInput.required = isByTime;

    function syncTime() {
        const byTime = timeRadio.checked;
        timeInput.disabled = !byTime;
        timeInput.required = byTime;
        if (!byTime) timeInput.value = '';
    }
    nowRadio.addEventListener('change', syncTime);
    timeRadio.addEventListener('change', syncTime);

    const r1 = el('div', 'modal-radio');
    r1.append(nowRadio, nowLabel);
    const r2 = el('div', 'modal-radio');
    r2.append(timeRadio, timeLabel);
    deliveryBox.append(r1, r2, timeInput);

    form.append(formRow('Время доставки', deliveryBox));
    form.append(formRow('Телефон', phoneInput, 'edit_phone'));
    form.append(formRow('Email', emailInput, 'edit_email'));

    form.append(sectionTitle('Комментарий'));
    const comment = document.createElement('textarea');
    comment.id = 'edit_comment';
    comment.value = order.comment || '';
    form.append(comment);

    form.append(compositionBlock(order));

    //чтобы Enter в поле не перезагружал страницу
    form.addEventListener('submit', function (event) {
        event.preventDefault();
    });

    openModal('Редактирование заказа', form, [
        { text: 'Отмена', className: 'modal-btn-light', onClick: function (close) { close(); } },
        {
            text: 'Сохранить',
            className: 'modal-btn-green',
            onClick: async function (close, button) {
                if (!form.reportValidity()) return;

                const body = {
                    full_name: nameInput.value.trim(),
                    email: emailInput.value.trim(),
                    phone: phoneInput.value.trim(),
                    delivery_address: addressInput.value.trim(),
                    delivery_type: timeRadio.checked ? 'by_time' : 'now',
                    comment: comment.value
                };

                if (timeRadio.checked) {
                    body.delivery_time = timeInput.value;
                }

                button.disabled = true;
                try {
                    await request(orderUrl(order.id), {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(body)
                    });
                    close();
                    await loadOrders();
                    showNotification('Заказ успешно изменён');
                } catch (error) {
                    console.error(error);
                    button.disabled = false;
                    showNotification('Не удалось изменить заказ: ' + error.message);
                }
            }
        }
    ]);
}

//удаление
function openDeleteModal(order) {
    const body = el('p', 'modal-question', 'Вы уверены, что хотите удалить заказ?');

    openModal('Удаление заказа', body, [
        { text: 'Отмена', className: 'modal-btn-light', onClick: function (close) { close(); } },
        {
            text: 'Да',
            className: 'modal-btn-red',
            onClick: async function (close, button) {
                button.disabled = true;
                try {
                    await request(orderUrl(order.id), { method: 'DELETE' });
                    close();
                    await loadOrders();
                    showNotification('Заказ успешно удалён');
                } catch (error) {
                    console.error(error);
                    button.disabled = false;
                    showNotification('Не удалось удалить заказ: ' + error.message);
                }
            }
        }
    ]);
}

//старт
async function initOrders() {
    try {
        //названия и цены блюд берём из списка блюд
        await loadDishes();
        await loadOrders();
    } catch (error) {
        console.error(error);
        showNotification('Не удалось загрузить заказы: ' + error.message);
    }
}

initOrders();