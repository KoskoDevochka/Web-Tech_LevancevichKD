const dishes = [
    {
        keyword: 'chicken_soup',
        name: 'Куриный суп с лапшой',
        price: 180,
        category: 'soup',
        count: '300 г',
        image: 'images/chicken_soup.png',
        kind: 'meat'
    },
    {
        keyword: 'borsch',
        name: 'Борщ с говядиной',
        price: 270,
        category: 'soup',
        count: '300 г',
        image: 'images/borsch.png',
        kind: 'meat'
    },
    {
        keyword: 'pumpkin_soup',
        name: 'Тыквенный крем-суп',
        price: 210,
        category: 'soup',
        count: '300 г',
        image: 'images/pumpkin_soup.png',
        kind: 'veg'
    },
    {
        keyword: 'lentil_soup',
        name: 'Суп пряный чечевичный',
        price: 300,
        category: 'soup',
        count: '300 г',
        image: 'images/lentil_soup.png',
        kind: 'veg'
    },
    {
        keyword: 'uha',
        name: 'Уха с сёмгой',
        price: 400,
        category: 'soup',
        count: '300 г',
        image: 'images/uha.png',
        kind: 'fish'
    },
    {
        keyword: 'tomyam',
        name: 'Суп том-ям с креветками',
        price: 450,
        category: 'soup',
        count: '400 г',
        image: 'images/tomyam.png',
        kind: 'fish'
    },
//главные блюда
    {
        keyword: 'grechka_beef',
        name: 'Гречка с говядиной',
        price: 260,
        category: 'main',
        count: '250 г',
        image: 'images/grechka_beef.png',
        kind: 'meat'
    },
    {
        keyword: 'udon',
        name: 'Удон с курицей терияки',
        price: 475,
        category: 'main',
        count: '400 г',
        image: 'images/udon.png',
        kind: 'meat'
    },
    {
        keyword: 'bolognese_pumpkin',
        name: 'Паста с тыквой',
        price: 270,
        category: 'main',
        count: '300 г',
        image: 'images/bolognese_pumpkin.png',
        kind: 'veg'
    },
    {
        keyword: 'zapekanka',
        name: 'Запеканка картофельная с грибами и овощами',
        price: 425,
        category: 'main',
        count: '300 г',
        image: 'images/zapekanka.png',
        kind: 'veg'
    },
    {
        keyword: 'poke',
        name: 'Поке с лососем',
        price: 500,
        category: 'main',
        count: '250 г',
        image: 'images/poke.png',
        kind: 'fish'
    },
    {
        keyword: 'salmon_pasta',
        name: 'Лосось с пастой в сливочно-шпинатном соусе',
        price: 550,
        category: 'main',
        count: '300 г',
        image: 'images/salmon_pasta.png',
        kind: 'fish'
    },
//салаты
    {
        keyword: 'cesar',
        name: 'Салат Цезарь с куриной грудкой',
        price: 400,
        category: 'salad',
        count: '200 г',
        image: 'images/cesar.png',
        kind: 'meat'
    },
    {
        keyword: 'seld_shuba',
        name: 'Салат Сельдь под шубой',
        price: 350,
        category: 'salad',
        count: '500 г',
        image: 'images/seld_shuba.png',
        kind: 'fish'
    },
    {
        keyword: 'greek_salad',
        name: 'Салат Греческий',
        price: 450,
        category: 'salad',
        count: '250 г',
        image: 'images/greek_salad.png',
        kind: 'veg'
    },
    {
        keyword: 'beet_salad',
        name: 'Салат из свёклы и феты с соусом песто',
        price: 270,
        category: 'salad',
        count: '200 г',
        image: 'images/beet_salad.png',
        kind: 'veg'
    },
    {
        keyword: 'cucumber_salad',
        name: 'Салат Битые огурцы',
        price: 250,
        category: 'salad',
        count: '200 г',
        image: 'images/cucumber_salad.png',
        kind: 'veg'
    },
    {
        keyword: 'cabbage_salad',
        name: 'Капуста краснокочанная маринованная',
        price: 130,
        category: 'salad',
        count: '150 г',
        image: 'images/cabbage_salad.png',
        kind: 'veg'
    },
//напитки
    {
        keyword: 'compot',
        name: 'Компот из сухофруктов',
        price: 90,
        category: 'drink',
        count: '250 мл',
        image: 'images/compot.png',
        kind: 'cold'
    },
    {
        keyword: 'mors',
        name: 'Морс клюквенный',
        price: 140,
        category: 'drink',
        count: '500 мл',
        image: 'images/mors.png',
        kind: 'cold'
    },
    {
        keyword: 'smoothie',
        name: 'Смузи киви-яблоко',
        price: 115,
        category: 'drink',
        count: '300 мл',
        image: 'images/smoothie.png',
        kind: 'cold'
    },
    {
        keyword: 'cappuccino',
        name: 'Капучино',
        price: 230,
        category: 'drink',
        count: '300 мл',
        image: 'images/cappuccino.png',
        kind: 'hot'
    },
    {
        keyword: 'latte',
        name: 'Латте',
        price: 300,
        category: 'drink',
        count: '300 мл',
        image: 'images/latte.png',
        kind: 'hot'
    },
    {
        keyword: 'americano',
        name: 'Американо',
        price: 320,
        category: 'drink',
        count: '300 мл',
        image: 'images/americano.png',
        kind: 'hot'
    },
//десесрты
    {
        keyword: 'pistachio_cake',
        name: 'Пирожное с малиновой начинкой в глазури со вкусом фисташки',
        price: 250,
        category: 'dessert',
        count: '100 г',
        image: 'images/pistachio_cake.png',
        kind: 'small'
    },
    {
        keyword: 'fluf_cake',
        name: 'Пирожное Воздушное с ягодами',
        price: 285,
        category: 'dessert',
        count: '65 г',
        image: 'images/fluf_cake.png',
        kind: 'small'
    },
    {
        keyword: 'korzinka_cake',
        name: 'Пирожное Корзиночка с фруктами',
        price: 300,
        category: 'dessert',
        count: '100 г',
        image: 'images/korzinka_cake.png',
        kind: 'small'
    },
    {
        keyword: 'eclair',
        name: 'Эклеры заварные',
        price: 300,
        category: 'dessert',
        count: '250 г',
        image: 'images/eclair.png',
        kind: 'medium'
    },
    {
        keyword: 'cherry_cake',
        name: 'Вишнёвый пирог',
        price: 250,
        category: 'dessert',
        count: '250 г',
        image: 'images/cherry_cake.png',
        kind: 'medium'
    },
    {
        keyword: 'choco_cake',
        name: 'Торт Прага бисквитный',
        price: 800,
        category: 'dessert',
        count: '600 г',
        image: 'images/choco_cake.png',
        kind: 'large'
    },
];