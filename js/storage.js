const STORAGE_KEY = 'selectedDishes';
const categories = ['soup', 'main', 'salad', 'drink', 'dessert'];

// selected[category] = объект блюда (или null)
const selected = { soup: null, main: null, salad: null, drink: null, dessert: null };

// в localStorage хранятся только keyword'ы: {"soup":"borsch","main":null,...}
function saveSelected() {
    const data = {};
    categories.forEach(function (category) {
        data[category] = selected[category] ? selected[category].keyword : null;
    });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

// вызывать ПОСЛЕ loadDishes(), когда массив dishes уже заполнен
function restoreSelected() {
    let data = {};
    try {
        data = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
    } catch (error) {
        data = {};
    }

    categories.forEach(function (category) {
        const keyword = data[category];
        selected[category] = null;
        if (!keyword) return;

        const dish = dishes.find(function (d) {
            return d.keyword === keyword && d.category === category;
        });
        selected[category] = dish || null;
    });
}

function clearSelected() {
    categories.forEach(function (category) {
        selected[category] = null;
    });
    localStorage.removeItem(STORAGE_KEY);
}

function getTotal() {
    let total = 0;
    categories.forEach(function (category) {
        if (selected[category]) total += selected[category].price;
    });
    return total;
}