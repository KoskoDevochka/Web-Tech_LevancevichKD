const panel = document.getElementById('order-panel');
const panelTotal = document.getElementById('order-panel-total');
const panelLink = document.getElementById('order-panel-link');

function updatePanel() {
    const hasAny = categories.some(function (category) {
        return selected[category] !== null;
    });

    panel.hidden = !hasAny;
    panelTotal.textContent = getTotal() + ' ₽';

    // ссылка доступна только если состав подходит под одно из комбо
    const ok = checkOrder() === null;
    panelLink.classList.toggle('disabled', !ok);
    panelLink.setAttribute('aria-disabled', ok ? 'false' : 'true');
}

function highlightSelected() {
    document.querySelectorAll('.dish').forEach(function (card) {
        const keyword = card.getAttribute('data-dish');
        const dish = dishes.find(function (d) {
            return d.keyword === keyword;
        });
        card.classList.toggle('selected', selected[dish.category] === dish);
    });
}

document.addEventListener('click', function (event) {
    const card = event.target.closest('.dish');
    if (!card) return;

    const keyword = card.getAttribute('data-dish');
    const dish = dishes.find(function (d) {
        return d.keyword === keyword;
    });

    selected[dish.category] = dish;
    saveSelected();
    highlightSelected();
    updatePanel();
});

panelLink.addEventListener('click', function (event) {
    if (panelLink.classList.contains('disabled')) {
        event.preventDefault();
    }
});