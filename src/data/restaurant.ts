// Central source of truth for restaurant info + menu.
// Keeping this in one place mirrors the project goal: a single, consistent
// source of restaurant information instead of fragmented third-party listings.

export const RESTAURANT = {
  name: 'WokWise',
  tagline: 'Modern Chinese Kitchen',
  blurb:
    'A neighborhood kitchen serving hand-pulled noodles, clay-pot classics, and wok-fired favorites in the heart of Brooklyn.',
  phone: '(718) 555-0147',
  phoneHref: 'tel:+17185550147',
  email: 'hello@wokwise.nyc',
  address: '7524 18th Ave, Brooklyn, NY 11214',
  neighborhood: 'Bensonhurst, Brooklyn',
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=7524+18th+Ave+Brooklyn+NY+11214',
  hours: [
    { day: 'Monday – Thursday', time: '11:30 AM – 9:30 PM' },
    { day: 'Friday', time: '11:30 AM – 10:30 PM' },
    { day: 'Saturday', time: '12:00 PM – 10:30 PM' },
    { day: 'Sunday', time: '12:00 PM – 9:00 PM' },
  ],
  socials: {
    instagram: 'https://instagram.com',
    tiktok: 'https://tiktok.com',
  },
  taxRate: 0.08875, // NYC sales tax — used by the on-site ordering flow
}

export const ORDER_PLATFORMS = [
  {
    name: 'DoorDash',
    desc: 'Fast delivery across Brooklyn, usually 25–40 min.',
    eta: '25–40 min',
    color: '#ef4123',
    url: 'https://www.doordash.com',
  },
  {
    name: 'Uber Eats',
    desc: 'Live order tracking and contactless drop-off.',
    eta: '30–45 min',
    color: '#06c167',
    url: 'https://www.ubereats.com',
  },
  {
    name: 'Grubhub',
    desc: 'Scheduled delivery and group ordering options.',
    eta: '30–50 min',
    color: '#f63440',
    url: 'https://www.grubhub.com',
  },
  {
    name: 'Pickup',
    desc: 'Call ahead and skip the line — ready in about 20 min.',
    eta: '~20 min',
    color: '#fe5d26',
    url: 'tel:+17185550147',
  },
]

/* ------------------------------------------------------------------ */
/* Menu types + dish option model (used by the direct ordering flow)  */
/* ------------------------------------------------------------------ */

export type OptionChoice = { label: string; priceDelta?: number }

export type OptionGroup = {
  id: string
  label: string
  type: 'single' | 'multi'
  required?: boolean
  choices: OptionChoice[]
}

export type MenuItem = {
  id: string
  name: string
  zh?: string
  desc: string
  price: number
  image: string
  tags?: ('popular' | 'spicy' | 'veg')[]
  options?: OptionGroup[]
}

export type MenuCategory = {
  id: string
  label: string
  items: MenuItem[]
}

// Reusable option groups, shared across many dishes.
const spice: OptionGroup = {
  id: 'spice',
  label: 'Spice Level',
  type: 'single',
  required: true,
  choices: [{ label: 'Mild' }, { label: 'Medium' }, { label: 'Hot' }, { label: 'Extra Hot 🌶' }],
}

const size: OptionGroup = {
  id: 'size',
  label: 'Portion',
  type: 'single',
  required: true,
  choices: [{ label: 'Regular' }, { label: 'Large', priceDelta: 4 }],
}

const protein: OptionGroup = {
  id: 'protein',
  label: 'Protein',
  type: 'single',
  required: true,
  choices: [
    { label: 'Chicken' },
    { label: 'Pork', priceDelta: 1 },
    { label: 'Beef', priceDelta: 2 },
    { label: 'Shrimp', priceDelta: 3 },
    { label: 'Tofu (V)' },
  ],
}

const addOns: OptionGroup = {
  id: 'addons',
  label: 'Add-ons',
  type: 'multi',
  choices: [
    { label: 'Extra steamed rice', priceDelta: 2.5 },
    { label: 'Fried egg', priceDelta: 2 },
    { label: 'Extra chili oil', priceDelta: 1 },
    { label: 'Side of dumplings (3)', priceDelta: 5 },
  ],
}

// Photos from Unsplash (royalty-free) referenced by hot-link for the prototype.
const img = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=900&q=70`

export const MENU: MenuCategory[] = [
  {
    id: 'appetizers',
    label: 'Appetizers',
    items: [
      {
        id: 'soup-dumplings',
        name: 'Pork Soup Dumplings',
        zh: '小笼包',
        desc: 'Eight handmade xiao long bao with a rich, gingered broth.',
        price: 11.5,
        image: img('1496116218417-1a781b1c416c'),
        tags: ['popular'],
        options: [addOns],
      },
      {
        id: 'scallion-pancake',
        name: 'Scallion Pancakes',
        zh: '葱油饼',
        desc: 'Flaky, pan-fried layers with a soy-vinegar dipping sauce.',
        price: 8,
        image: img('1541696432-82c6da8ce7bf'),
        tags: ['veg'],
      },
      {
        id: 'spicy-wontons',
        name: 'Spicy Wontons in Chili Oil',
        zh: '红油抄手',
        desc: 'Silky pork wontons bathed in Sichuan chili oil.',
        price: 10,
        image: img('1455619452474-d2be8b1e70cd'),
        tags: ['spicy', 'popular'],
        options: [spice],
      },
      {
        id: 'spring-rolls',
        name: 'Crispy Spring Rolls',
        zh: '春卷',
        desc: 'Four golden vegetable rolls with sweet chili sauce.',
        price: 7,
        image: img('1606471191009-63994c53433b'),
        tags: ['veg'],
      },
      {
        id: 'pan-fried-buns',
        name: 'Pan-Fried Pork Buns',
        zh: '生煎包',
        desc: 'Crisp-bottomed sheng jian bao, juicy on the inside.',
        price: 9.5,
        image: img('1563245372-f21724e3856d'),
      },
      {
        id: 'salt-pepper-squid',
        name: 'Salt & Pepper Squid',
        zh: '椒盐鱿鱼',
        desc: 'Crispy squid tossed with chili, garlic, and scallion.',
        price: 12,
        image: img('1626082927389-6cd097cee6a6'),
        tags: ['spicy'],
        options: [spice],
      },
      {
        id: 'sesame-noodles',
        name: 'Cold Sesame Noodles',
        zh: '麻酱面',
        desc: 'Chilled noodles in a nutty sesame-peanut sauce.',
        price: 9,
        image: img('1552611052-33e04de081de'),
        tags: ['veg'],
      },
      {
        id: 'chicken-dumplings',
        name: 'Steamed Chicken Dumplings',
        zh: '鸡肉饺',
        desc: 'Six dumplings with ginger-chicken filling.',
        price: 9.5,
        image: img('1534422298391-e4f8c172dddb'),
        options: [addOns],
      },
    ],
  },
  {
    id: 'soups',
    label: 'Soups',
    items: [
      {
        id: 'hot-sour-soup',
        name: 'Hot & Sour Soup',
        zh: '酸辣汤',
        desc: 'Tofu, bamboo, and wood-ear in a peppery broth.',
        price: 6,
        image: img('1547592180-85f173990554'),
        tags: ['spicy'],
        options: [size],
      },
      {
        id: 'wonton-soup',
        name: 'Wonton Soup',
        zh: '云吞汤',
        desc: 'Pork-and-shrimp wontons in a clear chicken broth.',
        price: 7,
        image: img('1569718212165-3a8278d5f624'),
        options: [size],
      },
      {
        id: 'egg-drop-soup',
        name: 'Egg Drop Soup',
        zh: '蛋花汤',
        desc: 'Silky ribbons of egg in a golden broth.',
        price: 5.5,
        image: img('1604908176997-125f25cc6f3d'),
        options: [size],
      },
      {
        id: 'seafood-tofu-soup',
        name: 'Seafood & Tofu Soup',
        zh: '海鲜豆腐汤',
        desc: 'Shrimp, scallop, and silken tofu in a light broth.',
        price: 9,
        image: img('1607301405390-d831c242f59b'),
        options: [size],
      },
    ],
  },
  {
    id: 'noodles',
    label: 'Noodles',
    items: [
      {
        id: 'dan-dan',
        name: 'Dan Dan Noodles',
        zh: '担担面',
        desc: 'Hand-pulled noodles, minced pork, peanut, and chili.',
        price: 15,
        image: img('1552611052-33e04de081de'),
        tags: ['spicy', 'popular'],
        options: [spice, size, addOns],
      },
      {
        id: 'beef-brisket-noodle',
        name: 'Beef Brisket Noodle Soup',
        zh: '牛腩面',
        desc: 'Slow-braised brisket in a five-spice broth.',
        price: 17,
        image: img('1547928576-b822bc410bdf'),
        options: [size, addOns],
      },
      {
        id: 'veg-lo-mein',
        name: 'Vegetable Lo Mein',
        zh: '素捞面',
        desc: 'Wok-tossed egg noodles with seasonal greens.',
        price: 13,
        image: img('1585032226651-759b368d7246'),
        tags: ['veg'],
        options: [protein, size, addOns],
      },
      {
        id: 'beef-chow-fun',
        name: 'Beef Chow Fun',
        zh: '干炒牛河',
        desc: 'Wide rice noodles with beef and bean sprouts.',
        price: 16,
        image: img('1634864572865-1cf8ff8bd23d'),
        tags: ['popular'],
        options: [size, addOns],
      },
      {
        id: 'singapore-noodles',
        name: 'Singapore Rice Noodles',
        zh: '星洲炒米',
        desc: 'Curried vermicelli with shrimp, pork, and pepper.',
        price: 15,
        image: img('1626804475297-41608ea09aeb'),
        tags: ['spicy'],
        options: [spice, size],
      },
      {
        id: 'shrimp-wonton-noodle',
        name: 'Shrimp Wonton Noodle Soup',
        zh: '虾云吞面',
        desc: 'Plump shrimp wontons over thin egg noodles.',
        price: 16,
        image: img('1623341214825-9f4f963727da'),
        options: [size, addOns],
      },
      {
        id: 'chongqing-noodles',
        name: 'Chongqing Spicy Noodles',
        zh: '重庆小面',
        desc: 'Bold, numbing chili noodles with pickled greens.',
        price: 14,
        image: img('1612927601601-6638404737ce'),
        tags: ['spicy', 'veg'],
        options: [spice, size, addOns],
      },
    ],
  },
  {
    id: 'rice',
    label: 'Fried Rice',
    items: [
      {
        id: 'yangzhou-rice',
        name: 'Yangzhou Fried Rice',
        zh: '扬州炒饭',
        desc: 'Classic fried rice with shrimp, char siu, and egg.',
        price: 13,
        image: img('1603133872878-684f208fb84b'),
        tags: ['popular'],
        options: [size, addOns],
      },
      {
        id: 'house-fried-rice',
        name: 'House Special Fried Rice',
        zh: '招牌炒饭',
        desc: 'Your choice of protein, wok-fried with egg and scallion.',
        price: 15,
        image: img('1512058564366-18510be2db19'),
        options: [protein, size, addOns],
      },
      {
        id: 'veg-fried-rice',
        name: 'Vegetable Fried Rice',
        zh: '素炒饭',
        desc: 'Wok-fried rice with mixed vegetables and egg.',
        price: 11,
        image: img('1516684732162-798a0062be99'),
        tags: ['veg'],
        options: [size, addOns],
      },
      {
        id: 'salted-fish-rice',
        name: 'Salted Fish & Chicken Fried Rice',
        zh: '咸鱼鸡粒炒饭',
        desc: 'Cantonese-style rice with savory salted fish.',
        price: 14,
        image: img('1567982047351-76b6f93e34ef'),
        options: [size],
      },
    ],
  },
  {
    id: 'mains',
    label: 'Mains',
    items: [
      {
        id: 'kung-pao',
        name: 'Kung Pao Chicken',
        zh: '宫保鸡丁',
        desc: 'Diced chicken, peanuts, and dried chilies in a glossy sauce.',
        price: 18,
        image: img('1525755662778-989d0524087e'),
        tags: ['spicy', 'popular'],
        options: [spice, size, addOns],
      },
      {
        id: 'general-tso',
        name: "General Tso's Chicken",
        zh: '左宗棠鸡',
        desc: 'Crispy chicken in a sweet-and-tangy chili glaze.',
        price: 17,
        image: img('1623689043725-bff8d8c52229'),
        tags: ['popular'],
        options: [size, addOns],
      },
      {
        id: 'sweet-sour-pork',
        name: 'Sweet & Sour Pork',
        zh: '咕咾肉',
        desc: 'Battered pork with pineapple and bell pepper.',
        price: 17,
        image: img('1604908554007-f8a1c5b3b6f0'),
        options: [size, addOns],
      },
      {
        id: 'beef-broccoli',
        name: 'Beef with Broccoli',
        zh: '西兰花牛肉',
        desc: 'Tender beef and broccoli in an oyster-garlic sauce.',
        price: 18,
        image: img('1606333259737-7f5d2c0d8d2a'),
        options: [size, addOns],
      },
      {
        id: 'black-pepper-beef',
        name: 'Black Pepper Beef',
        zh: '黑椒牛柳',
        desc: 'Sizzling beef with onion and cracked black pepper.',
        price: 19,
        image: img('1432139555190-58524dae6a55'),
        tags: ['popular'],
        options: [size, addOns],
      },
      {
        id: 'orange-chicken',
        name: 'Orange Chicken',
        zh: '陈皮鸡',
        desc: 'Crispy chicken in a bright dried-tangerine sauce.',
        price: 17,
        image: img('1617093727343-374698b1b08d'),
        options: [size, addOns],
      },
      {
        id: 'twice-cooked-pork',
        name: 'Twice-Cooked Pork',
        zh: '回锅肉',
        desc: 'Pork belly stir-fried with leeks and chili-bean paste.',
        price: 18,
        image: img('1582878826629-29b7ad1cdc43'),
        tags: ['spicy'],
        options: [spice, size, addOns],
      },
      {
        id: 'cumin-lamb',
        name: 'Cumin Lamb',
        zh: '孜然羊肉',
        desc: 'Wok-seared lamb with cumin, chili, and scallion.',
        price: 21,
        image: img('1559847844-5315695dadae'),
        tags: ['spicy', 'popular'],
        options: [spice, size, addOns],
      },
    ],
  },
  {
    id: 'veg-tofu',
    label: 'Vegetables & Tofu',
    items: [
      {
        id: 'mapo-tofu',
        name: 'Mapo Tofu',
        zh: '麻婆豆腐',
        desc: 'Silken tofu in a numbing chili-bean sauce.',
        price: 16,
        image: img('1582576163090-09d3b5ff0a5a'),
        tags: ['spicy', 'veg'],
        options: [spice, size, addOns],
      },
      {
        id: 'clay-pot-eggplant',
        name: 'Clay Pot Eggplant',
        zh: '砂锅茄子',
        desc: 'Braised eggplant with garlic and Thai basil.',
        price: 16,
        image: img('1625938145312-c98c0a54f4ec'),
        tags: ['veg'],
        options: [spice, size],
      },
      {
        id: 'dry-fried-green-beans',
        name: 'Dry-Fried Green Beans',
        zh: '干煸四季豆',
        desc: 'Blistered green beans with garlic and preserved veg.',
        price: 14,
        image: img('1546069901-ba9599a7e63c'),
        tags: ['veg'],
        options: [size],
      },
      {
        id: 'garlic-bok-choy',
        name: 'Garlic Baby Bok Choy',
        zh: '蒜蓉白菜',
        desc: 'Tender bok choy in a light garlic sauce.',
        price: 12,
        image: img('1512621776951-a57141f2eefd'),
        tags: ['veg'],
      },
      {
        id: 'buddhas-delight',
        name: "Buddha's Delight",
        zh: '罗汉斋',
        desc: 'Mixed vegetables, tofu, and glass noodles braised together.',
        price: 15,
        image: img('1505253716362-afaea1d3d1af'),
        tags: ['veg'],
        options: [size, addOns],
      },
      {
        id: 'braised-tofu-mushroom',
        name: 'Braised Tofu with Mushrooms',
        zh: '香菇豆腐',
        desc: 'Pan-fried tofu and shiitake in a savory brown sauce.',
        price: 15,
        image: img('1623428187969-5da2dcea5ebf'),
        tags: ['veg'],
        options: [size, addOns],
      },
    ],
  },
  {
    id: 'specials',
    label: 'Chef Specials',
    items: [
      {
        id: 'peking-duck',
        name: 'Peking-Style Duck',
        zh: '北京烤鸭',
        desc: 'Half duck with house pancakes, scallion, and hoisin.',
        price: 34,
        image: img('1518983546435-91f8b87fe561'),
        tags: ['popular'],
        options: [addOns],
      },
      {
        id: 'salt-pepper-shrimp',
        name: 'Salt & Pepper Shrimp',
        zh: '椒盐虾',
        desc: 'Crispy head-on shrimp with chili, garlic, and scallion.',
        price: 24,
        image: img('1565299624946-b28f40a0ae38'),
        tags: ['spicy'],
        options: [spice, addOns],
      },
      {
        id: 'steamed-sea-bass',
        name: 'Whole Steamed Sea Bass',
        zh: '清蒸鲈鱼',
        desc: 'Ginger-scallion steamed fish with hot oil finish.',
        price: 32,
        image: img('1535140728325-a4d3707eee61'),
        options: [addOns],
      },
      {
        id: 'honey-walnut-shrimp',
        name: 'Honey Walnut Shrimp',
        zh: '核桃虾',
        desc: 'Crispy shrimp in a creamy glaze with candied walnuts.',
        price: 23,
        image: img('1565557623262-b51c2513a641'),
        tags: ['popular'],
        options: [size, addOns],
      },
      {
        id: 'sizzling-beef',
        name: 'Sizzling Beef Hot Plate',
        zh: '铁板牛肉',
        desc: 'Beef and peppers served on a sizzling cast-iron plate.',
        price: 26,
        image: img('1544025162-d76694265947'),
        tags: ['spicy'],
        options: [spice, addOns],
      },
    ],
  },
  {
    id: 'sides',
    label: 'Sides',
    items: [
      {
        id: 'jasmine-rice',
        name: 'Steamed Jasmine Rice',
        zh: '白饭',
        desc: 'A bowl of fragrant steamed rice.',
        price: 2.5,
        image: img('1516684732162-798a0062be99'),
        tags: ['veg'],
      },
      {
        id: 'brown-rice',
        name: 'Brown Rice',
        zh: '糙米饭',
        desc: 'A bowl of steamed brown rice.',
        price: 3,
        image: img('1586201375761-83865001e31c'),
        tags: ['veg'],
      },
      {
        id: 'steamed-buns',
        name: 'Steamed Buns',
        zh: '馒头',
        desc: 'Three soft, fluffy mantou.',
        price: 4,
        image: img('1563245372-f21724e3856d'),
        tags: ['veg'],
      },
    ],
  },
  {
    id: 'beverages',
    label: 'Beverages',
    items: [
      {
        id: 'jasmine-tea',
        name: 'Hot Jasmine Tea',
        zh: '茉莉花茶',
        desc: 'A pot of fragrant jasmine green tea.',
        price: 3,
        image: img('1576092768241-dec231879fc3'),
        tags: ['veg'],
      },
      {
        id: 'thai-iced-tea',
        name: 'Thai Iced Tea',
        zh: '泰式奶茶',
        desc: 'Sweet, creamy iced tea over ice.',
        price: 5,
        image: img('1558857563-b371033873b8'),
        tags: ['veg'],
      },
      {
        id: 'lychee-soda',
        name: 'Lychee Soda',
        desc: 'Sparkling soda with sweet lychee.',
        price: 4.5,
        image: img('1437418747212-8d9709afab22'),
        tags: ['veg'],
      },
      {
        id: 'soy-milk',
        name: 'Fresh Soybean Milk',
        zh: '豆浆',
        desc: 'House-made, lightly sweetened soy milk.',
        price: 3.5,
        image: img('1556679343-c7306c1976bc'),
        tags: ['veg'],
      },
    ],
  },
]

// Price formatter: $11 stays clean, $11.50 keeps cents.
export const money = (n: number) =>
  '$' + (Number.isInteger(n) ? n.toString() : n.toFixed(2))
