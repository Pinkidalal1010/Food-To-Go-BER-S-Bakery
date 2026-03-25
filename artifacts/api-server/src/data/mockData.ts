export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  images: string[];
  rating: number;
  reviewCount: number;
  isAvailable: boolean;
  isFeatured: boolean;
  tags: string[];
  ingredients: string[];
  allergens: string[];
  servingSize: string;
  weight: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  productCount: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: string;
}

export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  rating: number;
  title: string;
  comment: string;
  createdAt: string;
}

export interface CartItem {
  productId: string;
  quantity: number;
}

export interface Cart {
  userId: string;
  items: CartItem[];
}

export interface Order {
  id: string;
  userId: string;
  items: {
    productId: string;
    productName: string;
    productImage: string;
    quantity: number;
    price: number;
    subtotal: number;
  }[];
  shippingAddress: {
    fullName: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
  };
  status: "pending" | "confirmed" | "processing" | "shipped" | "delivered" | "cancelled";
  subtotal: number;
  shippingCost: number;
  total: number;
  estimatedDelivery: string;
  createdAt: string;
  updatedAt: string;
}

export const products: Product[] = [
  // ── CAKES ──────────────────────────────────────────────────
  {
    id: "c1",
    name: "Homemade Coffee Cake",
    description: "A beautifully moist coffee-flavoured sponge, baked fresh in store every morning. Light, fluffy and rich with real coffee — perfect with a cup of tea.",
    price: 1.98,
    category: "cakes",
    imageUrl: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&q=80",
    images: ["https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&q=80"],
    rating: 4.8, reviewCount: 42, isAvailable: true, isFeatured: true,
    tags: ["coffee", "homemade", "freshly baked"],
    ingredients: ["Flour", "Butter", "Eggs", "Sugar", "Coffee", "Baking powder"],
    allergens: ["Gluten", "Dairy", "Eggs"],
    servingSize: "1 slice", weight: "150g"
  },
  {
    id: "c2",
    name: "Homemade Lemon Madeira Cake",
    description: "Classic Madeira sponge with a fresh lemon twist. Dense, buttery and wonderfully fragrant — a timeless favourite baked fresh every day.",
    price: 1.98,
    category: "cakes",
    imageUrl: "https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=800&q=80",
    images: ["https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=800&q=80"],
    rating: 4.7, reviewCount: 38, isAvailable: true, isFeatured: true,
    tags: ["lemon", "madeira", "homemade"],
    ingredients: ["Flour", "Butter", "Eggs", "Sugar", "Lemon zest", "Baking powder"],
    allergens: ["Gluten", "Dairy", "Eggs"],
    servingSize: "1 slice", weight: "150g"
  },
  {
    id: "c3",
    name: "Buttercream & Jam Swiss Roll",
    description: "Light sponge rolled with smooth buttercream and sweet strawberry jam. A classic bakery treat that's been loved for generations.",
    price: 1.98,
    category: "cakes",
    imageUrl: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=800&q=80",
    images: ["https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=800&q=80"],
    rating: 4.6, reviewCount: 29, isAvailable: true, isFeatured: false,
    tags: ["swiss roll", "jam", "buttercream"],
    ingredients: ["Flour", "Eggs", "Sugar", "Butter", "Strawberry jam", "Buttercream"],
    allergens: ["Gluten", "Dairy", "Eggs"],
    servingSize: "1 slice", weight: "120g"
  },
  {
    id: "c4",
    name: "Homemade Fruit Cake",
    description: "Traditional rich fruit cake packed with dried fruits, cherries and mixed peel. Moist, hearty and full of flavour — a true bakery classic.",
    price: 1.98,
    category: "cakes",
    imageUrl: "https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?w=800&q=80",
    images: ["https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?w=800&q=80"],
    rating: 4.7, reviewCount: 33, isAvailable: true, isFeatured: false,
    tags: ["fruit cake", "homemade", "traditional"],
    ingredients: ["Flour", "Butter", "Eggs", "Sugar", "Mixed dried fruit", "Cherries", "Mixed peel"],
    allergens: ["Gluten", "Dairy", "Eggs"],
    servingSize: "1 slice", weight: "150g"
  },
  {
    id: "c5",
    name: "Fresh Cream Vanilla Slice",
    description: "Crisp pastry layers filled with smooth vanilla custard and freshly whipped cream. A bakery favourite that's impossible to resist.",
    price: 1.76,
    category: "cakes",
    imageUrl: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=800&q=80",
    images: ["https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=800&q=80"],
    rating: 4.9, reviewCount: 61, isAvailable: true, isFeatured: true,
    tags: ["vanilla", "fresh cream", "pastry"],
    ingredients: ["Puff pastry", "Cream", "Vanilla custard", "Sugar", "Eggs"],
    allergens: ["Gluten", "Dairy", "Eggs"],
    servingSize: "1 slice", weight: "130g"
  },
  {
    id: "c6",
    name: "Homemade Apple Tart",
    description: "Golden shortcrust pastry filled with sweet cinnamon apple filling. Baked fresh in store each morning — best enjoyed warm.",
    price: 2.22,
    category: "cakes",
    imageUrl: "https://images.unsplash.com/photo-1568571780765-9276ac8b75a2?w=800&q=80",
    images: ["https://images.unsplash.com/photo-1568571780765-9276ac8b75a2?w=800&q=80"],
    rating: 4.8, reviewCount: 54, isAvailable: true, isFeatured: true,
    tags: ["apple tart", "homemade", "pastry"],
    ingredients: ["Shortcrust pastry", "Apples", "Sugar", "Cinnamon", "Butter"],
    allergens: ["Gluten", "Dairy", "Eggs"],
    servingSize: "1 slice", weight: "180g"
  },
  {
    id: "c7",
    name: "Black Forest Cake 8\"",
    description: "Indulgent layers of moist chocolate sponge, whipped cream and cherries, finished with chocolate shavings. A stunning showstopper from our bakery.",
    price: 5.70,
    category: "cakes",
    imageUrl: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800&q=80",
    images: ["https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800&q=80"],
    rating: 4.9, reviewCount: 72, isAvailable: true, isFeatured: true,
    tags: ["black forest", "chocolate", "cherries"],
    ingredients: ["Chocolate sponge", "Whipped cream", "Cherries", "Chocolate shavings", "Kirsch"],
    allergens: ["Gluten", "Dairy", "Eggs"],
    servingSize: "6–8 slices", weight: "900g"
  },
  {
    id: "c8",
    name: "Homemade Mixed Ring Doughnuts",
    description: "Freshly made ring doughnuts glazed and sugared. Light, fluffy and irresistibly delicious — a real bakery treat baked fresh every morning.",
    price: 2.68,
    category: "cakes",
    imageUrl: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=800&q=80",
    images: ["https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=800&q=80"],
    rating: 4.7, reviewCount: 48, isAvailable: true, isFeatured: false,
    tags: ["doughnuts", "fresh", "homemade"],
    ingredients: ["Flour", "Yeast", "Eggs", "Butter", "Sugar", "Glaze"],
    allergens: ["Gluten", "Dairy", "Eggs"],
    servingSize: "Pack of assorted", weight: "280g"
  },
  {
    id: "c9",
    name: "Milkybar Cheesecake",
    description: "Creamy white chocolate Milkybar cheesecake on a buttery biscuit base. Smooth, rich and utterly indulgent — a crowd-pleasing favourite.",
    price: 1.76,
    category: "cakes",
    imageUrl: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=800&q=80",
    images: ["https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=800&q=80"],
    rating: 4.8, reviewCount: 39, isAvailable: true, isFeatured: false,
    tags: ["cheesecake", "white chocolate", "milkybar"],
    ingredients: ["Cream cheese", "White chocolate", "Digestive biscuits", "Butter", "Cream"],
    allergens: ["Gluten", "Dairy", "Eggs"],
    servingSize: "1 slice", weight: "140g"
  },
  {
    id: "c10",
    name: "Fresh Cream Large Sherry Trifle",
    description: "Layers of sponge soaked in sherry, topped with fruit, custard and freshly whipped cream. A classic celebration dessert made in store.",
    price: 3.36,
    category: "cakes",
    imageUrl: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&q=80",
    images: ["https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&q=80"],
    rating: 4.7, reviewCount: 27, isAvailable: true, isFeatured: false,
    tags: ["trifle", "sherry", "fresh cream"],
    ingredients: ["Sponge fingers", "Sherry", "Custard", "Cream", "Strawberries", "Jelly"],
    allergens: ["Gluten", "Dairy", "Eggs"],
    servingSize: "1 portion", weight: "300g"
  },
  {
    id: "c11",
    name: "Fresh Cream Cheesecake",
    description: "Light and creamy cheesecake on a buttery biscuit base, finished with fresh whipped cream. Simple, delicious and freshly made in store.",
    price: 1.76,
    category: "cakes",
    imageUrl: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=800&q=80",
    images: ["https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=800&q=80"],
    rating: 4.8, reviewCount: 44, isAvailable: true, isFeatured: false,
    tags: ["cheesecake", "fresh cream", "homemade"],
    ingredients: ["Cream cheese", "Digestive biscuits", "Butter", "Cream", "Sugar"],
    allergens: ["Gluten", "Dairy", "Eggs"],
    servingSize: "1 slice", weight: "130g"
  },
  {
    id: "c12",
    name: "Homemade Brownie Tray",
    description: "Rich, fudgy chocolate brownies baked fresh in a tray. Dense, moist and packed with deep chocolate flavour — a real treat.",
    price: 3.20,
    category: "cakes",
    imageUrl: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800&q=80",
    images: ["https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800&q=80"],
    rating: 4.9, reviewCount: 67, isAvailable: true, isFeatured: true,
    tags: ["brownies", "chocolate", "homemade"],
    ingredients: ["Dark chocolate", "Butter", "Eggs", "Sugar", "Flour", "Cocoa powder"],
    allergens: ["Gluten", "Dairy", "Eggs"],
    servingSize: "Tray (6 pieces)", weight: "350g"
  },
  {
    id: "c13",
    name: "Pavlova",
    description: "Light, crisp meringue base topped with freshly whipped cream and seasonal fruit. A show-stopping dessert that's as beautiful as it is delicious.",
    price: 4.38,
    category: "cakes",
    imageUrl: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&q=80",
    images: ["https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&q=80"],
    rating: 4.9, reviewCount: 51, isAvailable: true, isFeatured: true,
    tags: ["pavlova", "meringue", "fresh cream"],
    ingredients: ["Egg whites", "Sugar", "Cream", "Mixed berries", "Passion fruit"],
    allergens: ["Dairy", "Eggs"],
    servingSize: "1 portion", weight: "250g"
  },
  {
    id: "c14",
    name: "Homemade Luxury Ginger Cookie 2pk",
    description: "Two thick, spiced ginger cookies with a satisfying snap and warming flavour. Made with real ground ginger and treacle — a proper homemade biscuit.",
    price: 3.46,
    category: "cakes",
    imageUrl: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=800&q=80",
    images: ["https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=800&q=80"],
    rating: 4.6, reviewCount: 23, isAvailable: true, isFeatured: false,
    tags: ["ginger", "cookies", "homemade"],
    ingredients: ["Flour", "Butter", "Sugar", "Ginger", "Treacle", "Eggs"],
    allergens: ["Gluten", "Dairy", "Eggs"],
    servingSize: "2 cookies", weight: "100g"
  },
  {
    id: "c15",
    name: "Homemade Profiteroles",
    description: "Delicate choux pastry puffs filled with fresh cream and drizzled with dark chocolate sauce. Light, airy and utterly irresistible.",
    price: 2.62,
    category: "cakes",
    imageUrl: "https://images.unsplash.com/photo-1603532648955-039310d9ed75?w=800&q=80",
    images: ["https://images.unsplash.com/photo-1603532648955-039310d9ed75?w=800&q=80"],
    rating: 4.8, reviewCount: 36, isAvailable: true, isFeatured: false,
    tags: ["profiteroles", "choux", "chocolate"],
    ingredients: ["Choux pastry", "Cream", "Dark chocolate", "Butter", "Eggs"],
    allergens: ["Gluten", "Dairy", "Eggs"],
    servingSize: "3 profiteroles", weight: "120g"
  },
  {
    id: "c16",
    name: "Homemade Gingerbread Man",
    description: "Freshly baked gingerbread man with crisp edges, soft centre and decorated with icing. A fun and delicious treat for all ages.",
    price: 3.01,
    category: "cakes",
    imageUrl: "https://images.unsplash.com/photo-1481391319762-47dff72954d9?w=800&q=80",
    images: ["https://images.unsplash.com/photo-1481391319762-47dff72954d9?w=800&q=80"],
    rating: 4.7, reviewCount: 31, isAvailable: true, isFeatured: false,
    tags: ["gingerbread", "homemade", "festive"],
    ingredients: ["Flour", "Butter", "Sugar", "Ginger", "Treacle", "Eggs", "Icing"],
    allergens: ["Gluten", "Dairy", "Eggs"],
    servingSize: "1 gingerbread man", weight: "80g"
  },
  {
    id: "c17",
    name: "Homemade Protein Balls",
    description: "Nutritious and delicious homemade protein balls packed with oats, nut butter and natural sweeteners. A healthy treat that tastes indulgent.",
    price: 2.16,
    category: "cakes",
    imageUrl: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&q=80",
    images: ["https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&q=80"],
    rating: 4.5, reviewCount: 18, isAvailable: true, isFeatured: false,
    tags: ["protein", "healthy", "homemade"],
    ingredients: ["Oats", "Peanut butter", "Honey", "Chocolate chips", "Protein powder"],
    allergens: ["Gluten", "Tree Nuts", "Peanuts"],
    servingSize: "3 balls", weight: "90g"
  },
  {
    id: "c18",
    name: "Homemade Cheesecake",
    description: "Classic baked cheesecake with a smooth, creamy filling and golden biscuit base. Rich, satisfying and freshly made in Ber's Bakery every day.",
    price: 1.76,
    category: "cakes",
    imageUrl: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=800&q=80",
    images: ["https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=800&q=80"],
    rating: 4.8, reviewCount: 45, isAvailable: true, isFeatured: false,
    tags: ["cheesecake", "baked", "classic"],
    ingredients: ["Cream cheese", "Eggs", "Sugar", "Digestive biscuits", "Butter", "Cream"],
    allergens: ["Gluten", "Dairy", "Eggs"],
    servingSize: "1 slice", weight: "130g"
  },
  {
    id: "c19",
    name: "Battoffee Pie",
    description: "Our take on the classic banoffee pie — layers of biscuit, toffee sauce and fresh banana topped with whipped cream. Utterly dreamy.",
    price: 1.76,
    category: "cakes",
    imageUrl: "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=800&q=80",
    images: ["https://images.unsplash.com/photo-1551024601-bec78aea704b?w=800&q=80"],
    rating: 4.8, reviewCount: 52, isAvailable: true, isFeatured: false,
    tags: ["banoffee", "toffee", "banana"],
    ingredients: ["Digestive biscuits", "Butter", "Toffee", "Bananas", "Cream"],
    allergens: ["Gluten", "Dairy"],
    servingSize: "1 slice", weight: "140g"
  },
  {
    id: "c20",
    name: "Buttercream Sherry Trifle",
    description: "Generous portion of classic trifle with sherry-soaked sponge, fruit, custard and rich buttercream topping. A proper dessert from the bakery.",
    price: 5.70,
    category: "cakes",
    imageUrl: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&q=80",
    images: ["https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&q=80"],
    rating: 4.7, reviewCount: 22, isAvailable: true, isFeatured: false,
    tags: ["trifle", "sherry", "buttercream"],
    ingredients: ["Sponge", "Sherry", "Custard", "Fruit", "Buttercream"],
    allergens: ["Gluten", "Dairy", "Eggs"],
    servingSize: "1 large portion", weight: "400g"
  },
  {
    id: "c21",
    name: "Homemade Christmas Sherry Trifle",
    description: "A festive extra-large trifle bursting with seasonal flavour — sherry sponge, fruit compote, thick custard and generous fresh cream topping.",
    price: 7.16,
    category: "cakes",
    imageUrl: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&q=80",
    images: ["https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&q=80"],
    rating: 4.9, reviewCount: 19, isAvailable: true, isFeatured: false,
    tags: ["christmas", "trifle", "festive"],
    ingredients: ["Sponge", "Sherry", "Custard", "Mixed fruit", "Cream"],
    allergens: ["Gluten", "Dairy", "Eggs"],
    servingSize: "1 large portion", weight: "500g"
  },
  {
    id: "c22",
    name: "Homemade Mince Pie 6pk",
    description: "Six golden shortcrust pastry mince pies filled with rich spiced fruit mincemeat. Baked fresh in store — a seasonal must-have.",
    price: 2.23,
    category: "cakes",
    imageUrl: "https://images.unsplash.com/photo-1481391319762-47dff72954d9?w=800&q=80",
    images: ["https://images.unsplash.com/photo-1481391319762-47dff72954d9?w=800&q=80"],
    rating: 4.8, reviewCount: 34, isAvailable: true, isFeatured: false,
    tags: ["mince pies", "christmas", "homemade"],
    ingredients: ["Shortcrust pastry", "Mincemeat", "Butter", "Sugar", "Flour"],
    allergens: ["Gluten", "Dairy", "Eggs"],
    servingSize: "6 mince pies", weight: "360g"
  },
  {
    id: "c23",
    name: "Red Velvet Cake",
    description: "Vibrant red velvet sponge with a smooth cream cheese frosting. Stunning to look at and delicious to eat — a real bakery showstopper.",
    price: 1.98,
    category: "cakes",
    imageUrl: "https://images.unsplash.com/photo-1586788680434-30d324b2d46f?w=800&q=80",
    images: ["https://images.unsplash.com/photo-1586788680434-30d324b2d46f?w=800&q=80"],
    rating: 4.9, reviewCount: 58, isAvailable: true, isFeatured: true,
    tags: ["red velvet", "cream cheese", "classic"],
    ingredients: ["Flour", "Cocoa", "Buttermilk", "Eggs", "Butter", "Cream cheese", "Red colouring"],
    allergens: ["Gluten", "Dairy", "Eggs"],
    servingSize: "1 slice", weight: "150g"
  },
  {
    id: "c24",
    name: "Lemon Cheesecake",
    description: "Zesty lemon cheesecake on a buttery biscuit base. Fresh, tangy and gloriously creamy — a refreshing treat from Ber's Bakery.",
    price: 4.00,
    category: "cakes",
    imageUrl: "https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=800&q=80",
    images: ["https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=800&q=80"],
    rating: 4.8, reviewCount: 41, isAvailable: true, isFeatured: false,
    tags: ["lemon", "cheesecake", "zesty"],
    ingredients: ["Cream cheese", "Lemon", "Digestive biscuits", "Butter", "Cream", "Sugar"],
    allergens: ["Gluten", "Dairy", "Eggs"],
    servingSize: "1 portion", weight: "200g"
  },
  {
    id: "c25",
    name: "Strawberry Cheesecake",
    description: "Creamy cheesecake topped with fresh strawberry compote and whole strawberries. A beautiful, indulgent treat — perfect for a special occasion.",
    price: 20.00,
    category: "cakes",
    imageUrl: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=800&q=80",
    images: ["https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=800&q=80"],
    rating: 4.9, reviewCount: 37, isAvailable: true, isFeatured: false,
    tags: ["strawberry", "cheesecake", "whole cake"],
    ingredients: ["Cream cheese", "Strawberries", "Digestive biscuits", "Butter", "Cream", "Sugar"],
    allergens: ["Gluten", "Dairy", "Eggs"],
    servingSize: "8–10 slices", weight: "1.2kg"
  },
  {
    id: "c26",
    name: "Homemade Christmas Cake",
    description: "Traditional rich Christmas cake packed with fruits and nuts, finished with a smooth marzipan and royal icing layer. A festive centrepiece.",
    price: 4.00,
    category: "cakes",
    imageUrl: "https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?w=800&q=80",
    images: ["https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?w=800&q=80"],
    rating: 4.8, reviewCount: 26, isAvailable: true, isFeatured: false,
    tags: ["christmas", "fruit cake", "festive"],
    ingredients: ["Mixed fruit", "Flour", "Butter", "Eggs", "Sugar", "Brandy", "Marzipan", "Royal icing"],
    allergens: ["Gluten", "Dairy", "Eggs", "Tree Nuts"],
    servingSize: "1 slice", weight: "200g"
  },
  {
    id: "c27",
    name: "Homemade Swiss Roll",
    description: "Soft, light sponge rolled with fresh cream and jam. A bakery classic made fresh in store every day — simple and simply delicious.",
    price: 5.00,
    category: "cakes",
    imageUrl: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=800&q=80",
    images: ["https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=800&q=80"],
    rating: 4.7, reviewCount: 32, isAvailable: true, isFeatured: false,
    tags: ["swiss roll", "fresh cream", "homemade"],
    ingredients: ["Sponge", "Fresh cream", "Strawberry jam", "Sugar"],
    allergens: ["Gluten", "Dairy", "Eggs"],
    servingSize: "Whole roll (6 slices)", weight: "350g"
  },
  {
    id: "c28",
    name: "Apple Turnover 2pk",
    description: "Two flaky puff pastry turnovers filled with sweet cinnamon apple. Warm, golden and freshly baked — a perfect bakery snack.",
    price: 4.00,
    category: "cakes",
    imageUrl: "https://images.unsplash.com/photo-1568571780765-9276ac8b75a2?w=800&q=80",
    images: ["https://images.unsplash.com/photo-1568571780765-9276ac8b75a2?w=800&q=80"],
    rating: 4.7, reviewCount: 29, isAvailable: true, isFeatured: false,
    tags: ["apple", "pastry", "turnover"],
    ingredients: ["Puff pastry", "Apples", "Cinnamon", "Sugar", "Butter"],
    allergens: ["Gluten", "Dairy"],
    servingSize: "2 turnovers", weight: "200g"
  },
  {
    id: "c29",
    name: "Fresh Cream Carrot Cake",
    description: "Moist spiced carrot cake layered with smooth cream cheese frosting and topped with fresh cream. A bakery staple that everyone loves.",
    price: 5.00,
    category: "cakes",
    imageUrl: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&q=80",
    images: ["https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&q=80"],
    rating: 4.8, reviewCount: 47, isAvailable: true, isFeatured: false,
    tags: ["carrot cake", "cream cheese", "fresh cream"],
    ingredients: ["Carrots", "Flour", "Eggs", "Oil", "Walnuts", "Cream cheese", "Cream"],
    allergens: ["Gluten", "Dairy", "Eggs", "Tree Nuts"],
    servingSize: "1 slice", weight: "180g"
  },

  // ── BIRTHDAY CAKES ─────────────────────────────────────────
  {
    id: "b1",
    name: "Fresh Cream Birthday Cake 10\"",
    description: "A gorgeous 10\" fresh cream birthday cake, beautifully decorated and ready to celebrate. Customisable with a message — just ask in store.",
    price: 40.00,
    category: "birthday",
    imageUrl: "https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=800&q=80",
    images: ["https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=800&q=80"],
    rating: 5.0, reviewCount: 88, isAvailable: true, isFeatured: true,
    tags: ["birthday", "celebration", "10 inch"],
    ingredients: ["Vanilla sponge", "Fresh cream", "Buttercream", "Sugar decorations", "Jam"],
    allergens: ["Gluten", "Dairy", "Eggs"],
    servingSize: "12–14 slices", weight: "1.5kg"
  },
  {
    id: "b2",
    name: "Fresh Cream Birthday Cake 14\"",
    description: "Our grand 14\" celebration cake — spectacular fresh cream layers, elegant decoration and enough to feed a big party. A real centrepiece.",
    price: 60.00,
    category: "birthday",
    imageUrl: "https://images.unsplash.com/photo-1535254973040-607b474cb50d?w=800&q=80",
    images: ["https://images.unsplash.com/photo-1535254973040-607b474cb50d?w=800&q=80"],
    rating: 5.0, reviewCount: 54, isAvailable: true, isFeatured: true,
    tags: ["birthday", "celebration", "14 inch", "large"],
    ingredients: ["Vanilla sponge", "Fresh cream", "Buttercream", "Sugar decorations", "Jam"],
    allergens: ["Gluten", "Dairy", "Eggs"],
    servingSize: "20–25 slices", weight: "2.5kg"
  },
  {
    id: "b3",
    name: "Fresh Cream Birthday Cake",
    description: "Our classic fresh cream birthday cake, beautifully presented and freshly made in store. Perfect for birthdays, parties and special celebrations.",
    price: 12.95,
    category: "birthday",
    imageUrl: "https://images.unsplash.com/photo-1498931299472-f7a63a5a1cfa?w=800&q=80",
    images: ["https://images.unsplash.com/photo-1498931299472-f7a63a5a1cfa?w=800&q=80"],
    rating: 4.9, reviewCount: 76, isAvailable: true, isFeatured: true,
    tags: ["birthday", "fresh cream", "celebration"],
    ingredients: ["Vanilla sponge", "Fresh cream", "Buttercream", "Jam", "Sugar decorations"],
    allergens: ["Gluten", "Dairy", "Eggs"],
    servingSize: "8–10 slices", weight: "1.0kg"
  },

  // ── ECLAIRS & PASTRIES ─────────────────────────────────────
  {
    id: "e1",
    name: "Fresh Cream Biscoff Eclair 2pk",
    description: "Two indulgent choux pastry eclairs filled with fresh cream and topped with smooth Biscoff spread and caramelised biscuit crumble. Irresistible.",
    price: 4.00,
    category: "eclairs",
    imageUrl: "https://images.unsplash.com/photo-1603532648955-039310d9ed75?w=800&q=80",
    images: ["https://images.unsplash.com/photo-1603532648955-039310d9ed75?w=800&q=80"],
    rating: 4.9, reviewCount: 63, isAvailable: true, isFeatured: true,
    tags: ["eclair", "biscoff", "fresh cream"],
    ingredients: ["Choux pastry", "Fresh cream", "Biscoff spread", "Caramelised biscuit"],
    allergens: ["Gluten", "Dairy", "Eggs", "Soy"],
    servingSize: "2 eclairs", weight: "160g"
  },
  {
    id: "e2",
    name: "Fresh Cream Coffee Eclair 2pk",
    description: "Two classic coffee-glazed choux eclairs filled with luscious fresh cream. A bakery staple with a beautiful coffee flavour in every bite.",
    price: 4.00,
    category: "eclairs",
    imageUrl: "https://images.unsplash.com/photo-1603532648955-039310d9ed75?w=800&q=80",
    images: ["https://images.unsplash.com/photo-1603532648955-039310d9ed75?w=800&q=80"],
    rating: 4.8, reviewCount: 49, isAvailable: true, isFeatured: true,
    tags: ["eclair", "coffee", "fresh cream"],
    ingredients: ["Choux pastry", "Fresh cream", "Coffee icing", "Eggs", "Butter"],
    allergens: ["Gluten", "Dairy", "Eggs"],
    servingSize: "2 eclairs", weight: "160g"
  },
  {
    id: "e3",
    name: "Fresh Cream Chocolate Eclairs 2pk",
    description: "Two light choux pastry eclairs filled with fresh whipped cream and topped with rich chocolate icing. A timeless bakery treat.",
    price: 2.23,
    category: "eclairs",
    imageUrl: "https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=800&q=80",
    images: ["https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=800&q=80"],
    rating: 4.9, reviewCount: 82, isAvailable: true, isFeatured: true,
    tags: ["eclair", "chocolate", "fresh cream"],
    ingredients: ["Choux pastry", "Fresh cream", "Dark chocolate icing", "Eggs", "Butter"],
    allergens: ["Gluten", "Dairy", "Eggs"],
    servingSize: "2 eclairs", weight: "150g"
  },
  {
    id: "e4",
    name: "Eclair Single",
    description: "One freshly made choux pastry eclair filled with cream and topped with chocolate icing. A perfect individual treat from our bakery counter.",
    price: 2.50,
    category: "eclairs",
    imageUrl: "https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=800&q=80",
    images: ["https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=800&q=80"],
    rating: 4.8, reviewCount: 71, isAvailable: true, isFeatured: false,
    tags: ["eclair", "single", "chocolate"],
    ingredients: ["Choux pastry", "Fresh cream", "Chocolate icing"],
    allergens: ["Gluten", "Dairy", "Eggs"],
    servingSize: "1 eclair", weight: "75g"
  },

  // ── BREAD ──────────────────────────────────────────────────
  {
    id: "br1",
    name: "Homemade Soda Bread",
    description: "Traditional Irish soda bread made fresh in store every day. Dense, hearty and delicious — best enjoyed with real butter while still warm.",
    price: 3.00,
    category: "bread",
    imageUrl: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&q=80",
    images: ["https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&q=80"],
    rating: 4.9, reviewCount: 94, isAvailable: true, isFeatured: true,
    tags: ["soda bread", "irish", "homemade"],
    ingredients: ["Wholemeal flour", "Bicarbonate of soda", "Buttermilk", "Salt"],
    allergens: ["Gluten", "Dairy"],
    servingSize: "Whole loaf (6–8 slices)", weight: "500g"
  },
  {
    id: "br2",
    name: "Homemade Banana Bread with Walnut",
    description: "Moist, sweet banana loaf studded with crunchy walnuts. Baked fresh daily using ripe bananas — a proper homemade bake that's impossible to resist.",
    price: 2.50,
    category: "bread",
    imageUrl: "https://images.unsplash.com/photo-1605714925349-43f9346d6818?w=800&q=80",
    images: ["https://images.unsplash.com/photo-1605714925349-43f9346d6818?w=800&q=80"],
    rating: 4.8, reviewCount: 67, isAvailable: true, isFeatured: true,
    tags: ["banana bread", "walnuts", "homemade"],
    ingredients: ["Ripe bananas", "Flour", "Butter", "Eggs", "Sugar", "Walnuts", "Baking soda"],
    allergens: ["Gluten", "Dairy", "Eggs", "Tree Nuts"],
    servingSize: "1 slice", weight: "150g"
  },
  {
    id: "br3",
    name: "Homemade Fruit Soda Bread",
    description: "A beautiful fruited soda bread packed with sultanas and raisins. Slightly sweet, wonderfully soft and baked fresh every morning in store.",
    price: 3.95,
    category: "bread",
    imageUrl: "https://images.unsplash.com/photo-1486887396153-fa416526c108?w=800&q=80",
    images: ["https://images.unsplash.com/photo-1486887396153-fa416526c108?w=800&q=80"],
    rating: 4.8, reviewCount: 53, isAvailable: true, isFeatured: true,
    tags: ["fruit soda bread", "sultanas", "homemade"],
    ingredients: ["Flour", "Bicarbonate of soda", "Buttermilk", "Sultanas", "Raisins", "Sugar"],
    allergens: ["Gluten", "Dairy"],
    servingSize: "Whole loaf (6–8 slices)", weight: "550g"
  },
  {
    id: "br4",
    name: "Homemade Brown Bread",
    description: "Wholesome homemade brown bread with a golden crust and soft crumb. Freshly baked in store every day — perfect for sandwiches or with soup.",
    price: 3.00,
    category: "bread",
    imageUrl: "https://images.unsplash.com/photo-1549931319-a545dcf3bc7b?w=800&q=80",
    images: ["https://images.unsplash.com/photo-1549931319-a545dcf3bc7b?w=800&q=80"],
    rating: 4.8, reviewCount: 79, isAvailable: true, isFeatured: true,
    tags: ["brown bread", "wholemeal", "homemade"],
    ingredients: ["Wholemeal flour", "Yeast", "Water", "Salt", "Treacle", "Bran"],
    allergens: ["Gluten"],
    servingSize: "Whole loaf (8–10 slices)", weight: "600g"
  },
  {
    id: "br5",
    name: "Overnight Oats Pot",
    description: "Creamy overnight oats prepared fresh in store — a healthy, filling and delicious breakfast or snack. Ready to grab and go.",
    price: 3.00,
    category: "bread",
    imageUrl: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&q=80",
    images: ["https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&q=80"],
    rating: 4.6, reviewCount: 34, isAvailable: true, isFeatured: false,
    tags: ["oats", "healthy", "breakfast"],
    ingredients: ["Rolled oats", "Milk", "Yoghurt", "Honey", "Mixed berries"],
    allergens: ["Gluten", "Dairy"],
    servingSize: "1 pot", weight: "250g"
  }
];

export const categories: Category[] = [
  {
    id: "cakes",
    name: "Cakes",
    description: "Freshly baked cakes, cheesecakes, trifles and more",
    imageUrl: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&q=80",
    productCount: products.filter(p => p.category === "cakes").length
  },
  {
    id: "bread",
    name: "Bread",
    description: "Homemade breads baked fresh every morning in store",
    imageUrl: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&q=80",
    productCount: products.filter(p => p.category === "bread").length
  },
  {
    id: "birthday",
    name: "Birthday Cakes",
    description: "Beautiful celebration cakes for every special occasion",
    imageUrl: "https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=800&q=80",
    productCount: products.filter(p => p.category === "birthday").length
  },
  {
    id: "eclairs",
    name: "Eclairs & Pastries",
    description: "Light choux pastry eclairs and freshly made pastries",
    imageUrl: "https://images.unsplash.com/photo-1603532648955-039310d9ed75?w=800&q=80",
    productCount: products.filter(p => p.category === "eclairs").length
  }
];

export const reviews: Review[] = [
  {
    id: "r1",
    productId: "c1",
    userId: "u1",
    userName: "Margaret O'Brien",
    rating: 5,
    title: "Best coffee cake I've ever had!",
    comment: "Absolutely gorgeous coffee cake — moist, light and full of flavour. I pick one up every week!",
    createdAt: "2026-03-10T14:30:00Z"
  },
  {
    id: "r2",
    productId: "b1",
    userId: "u2",
    userName: "James Fitzpatrick",
    rating: 5,
    title: "Perfect birthday cake!",
    comment: "Ordered the 10\" birthday cake for my daughter — it was stunning and absolutely delicious. Guests couldn't stop talking about it!",
    createdAt: "2026-03-05T09:15:00Z"
  },
  {
    id: "r3",
    productId: "e1",
    userId: "u3",
    userName: "Siobhan Kelly",
    rating: 5,
    title: "Biscoff eclairs are incredible!",
    comment: "The Biscoff eclairs are something else. Light choux, loads of cream and that biscoff topping — just wow.",
    createdAt: "2026-03-12T16:45:00Z"
  },
  {
    id: "r4",
    productId: "br1",
    userId: "u4",
    userName: "Declan Murphy",
    rating: 5,
    title: "Best soda bread in Ireland!",
    comment: "Nothing beats Ber's Bakery soda bread — warm out of the oven with a bit of butter. Absolute perfection.",
    createdAt: "2026-03-08T11:20:00Z"
  }
];

export const users: User[] = [
  {
    id: "u1",
    name: "Margaret O'Brien",
    email: "margaret@example.com",
    password: "$2b$10$demohashedpassword1",
    createdAt: "2026-01-01T00:00:00Z"
  }
];

export const carts: Cart[] = [];
export const orders: Order[] = [];
