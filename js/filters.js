document.querySelectorAll('.filters').forEach(function (block) {
    block.addEventListener('click', function (event) {
        const button = event.target.closest('button');
        if (!button) return;

        const category = block.getAttribute('data-category');
        const wasActive = button.classList.contains('active');

        block.querySelectorAll('button').forEach(function (b) {
            b.classList.remove('active');
        });

        if (wasActive) {
            renderDishes(category);
        } else {
            button.classList.add('active');
            renderDishes(category, button.getAttribute('data-kind'));
        }
    });
});