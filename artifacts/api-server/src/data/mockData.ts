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
  {
    id: "1",
    name: "Classic Vanilla Dream",
    description: "Our signature vanilla layer cake with velvety buttercream frosting. Made with real Madagascar vanilla beans and fresh farm eggs, this cake is the perfect centerpiece for any celebration.",
    price: 48.99,
    category: "classic",
    imageUrl: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&q=80",
      "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=800&q=80",
      "https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=800&q=80"
    ],
    rating: 4.8,
    reviewCount: 124,
    isAvailable: true,
    isFeatured: true,
    tags: ["vanilla", "classic", "bestseller"],
    ingredients: ["All-purpose flour", "Madagascar vanilla beans", "Unsalted butter", "Sugar", "Farm-fresh eggs", "Whole milk", "Baking powder"],
    allergens: ["Gluten", "Dairy", "Eggs"],
    servingSize: "8-10 slices",
    weight: "1.2 kg"
  },
  {
    id: "2",
    name: "Decadent Chocolate Fudge",
    description: "Rich, moist chocolate cake layered with dark chocolate ganache and fudge frosting. A chocolate lover's paradise made with 70% Belgian dark chocolate.",
    price: 54.99,
    category: "chocolate",
    imageUrl: "https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?w=800&q=80",
      "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800&q=80",
      "https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=800&q=80"
    ],
    rating: 4.9,
    reviewCount: 203,
    isAvailable: true,
    isFeatured: true,
    tags: ["chocolate", "fudge", "bestseller"],
    ingredients: ["Belgian dark chocolate (70%)", "Cocoa powder", "All-purpose flour", "Eggs", "Butter", "Sugar", "Heavy cream"],
    allergens: ["Gluten", "Dairy", "Eggs"],
    servingSize: "8-10 slices",
    weight: "1.4 kg"
  },
  {
    id: "3",
    name: "Strawberry Garden Delight",
    description: "Fresh strawberry cake with layers of strawberry compote and whipped cream. Topped with hand-picked seasonal strawberries for a beautiful garden-fresh presentation.",
    price: 52.99,
    category: "fruit",
    imageUrl: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=800&q=80",
      "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&q=80"
    ],
    rating: 4.7,
    reviewCount: 98,
    isAvailable: true,
    isFeatured: true,
    tags: ["strawberry", "fruit", "seasonal"],
    ingredients: ["Fresh strawberries", "All-purpose flour", "Eggs", "Butter", "Sugar", "Heavy cream", "Strawberry compote"],
    allergens: ["Gluten", "Dairy", "Eggs"],
    servingSize: "8-10 slices",
    weight: "1.3 kg"
  },
  {
    id: "4",
    name: "Elegant Wedding Tier",
    description: "Our signature three-tier wedding cake with fondant icing, edible flowers, and your choice of flavors for each tier. A breathtaking centerpiece for your special day.",
    price: 249.99,
    category: "wedding",
    imageUrl: "https://images.unsplash.com/photo-1535254973040-607b474cb50d?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1535254973040-607b474cb50d?w=800&q=80",
      "https://images.unsplash.com/photo-1519500528352-2d1460418d41?w=800&q=80"
    ],
    rating: 5.0,
    reviewCount: 47,
    isAvailable: true,
    isFeatured: true,
    tags: ["wedding", "luxury", "custom"],
    ingredients: ["Fondant", "Edible flowers", "Vanilla sponge", "Buttercream", "Sugar paste", "Natural food colors"],
    allergens: ["Gluten", "Dairy", "Eggs", "Soy"],
    servingSize: "60-80 slices",
    weight: "6.0 kg"
  },
  {
    id: "5",
    name: "Lemon Lavender Bliss",
    description: "Delicate lemon sponge infused with culinary lavender, topped with lemon curd and honey buttercream. A sophisticated floral treat that's both refreshing and indulgent.",
    price: 46.99,
    category: "specialty",
    imageUrl: "https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=800&q=80",
      "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=800&q=80"
    ],
    rating: 4.6,
    reviewCount: 76,
    isAvailable: true,
    isFeatured: false,
    tags: ["lemon", "lavender", "floral"],
    ingredients: ["Lemons", "Culinary lavender", "All-purpose flour", "Eggs", "Butter", "Sugar", "Honey", "Lemon curd"],
    allergens: ["Gluten", "Dairy", "Eggs"],
    servingSize: "8-10 slices",
    weight: "1.1 kg"
  },
  {
    id: "6",
    name: "Red Velvet Royale",
    description: "Classic Southern red velvet cake with layers of cream cheese frosting. Our iconic recipe features a hint of cocoa and natural red color from fresh beets.",
    price: 51.99,
    category: "classic",
    imageUrl: "https://images.unsplash.com/photo-1586788680434-30d324b2d46f?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1586788680434-30d324b2d46f?w=800&q=80",
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&q=80"
    ],
    rating: 4.8,
    reviewCount: 156,
    isAvailable: true,
    isFeatured: false,
    tags: ["red velvet", "classic", "cream cheese"],
    ingredients: ["Beet juice", "Cocoa powder", "All-purpose flour", "Eggs", "Cream cheese", "Butter", "Sugar", "Buttermilk"],
    allergens: ["Gluten", "Dairy", "Eggs"],
    servingSize: "8-10 slices",
    weight: "1.3 kg"
  },
  {
    id: "7",
    name: "Salted Caramel Crunch",
    description: "Buttery caramel cake with layers of salted caramel sauce, caramelized almonds, and a silky caramel buttercream. The perfect balance of sweet and salty.",
    price: 56.99,
    category: "specialty",
    imageUrl: "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=800&q=80",
      "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=800&q=80"
    ],
    rating: 4.9,
    reviewCount: 89,
    isAvailable: true,
    isFeatured: true,
    tags: ["caramel", "salted", "nuts"],
    ingredients: ["Caramel sauce", "Sea salt", "Almonds", "All-purpose flour", "Eggs", "Butter", "Brown sugar", "Heavy cream"],
    allergens: ["Gluten", "Dairy", "Eggs", "Tree Nuts"],
    servingSize: "8-10 slices",
    weight: "1.4 kg"
  },
  {
    id: "8",
    name: "Assorted Cupcake Box",
    description: "A delightful selection of 12 mini cupcakes featuring our most popular flavors: vanilla, chocolate, strawberry, and lemon. Perfect for parties and gatherings.",
    price: 34.99,
    category: "cupcakes",
    imageUrl: "https://images.unsplash.com/photo-1599785209707-a456fc1337bb?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1599785209707-a456fc1337bb?w=800&q=80",
      "https://images.unsplash.com/photo-1587668178277-295251f900ce?w=800&q=80"
    ],
    rating: 4.7,
    reviewCount: 211,
    isAvailable: true,
    isFeatured: false,
    tags: ["cupcakes", "assorted", "party"],
    ingredients: ["All-purpose flour", "Eggs", "Butter", "Sugar", "Various frostings", "Natural flavors"],
    allergens: ["Gluten", "Dairy", "Eggs"],
    servingSize: "12 cupcakes",
    weight: "0.9 kg"
  },
  {
    id: "9",
    name: "Matcha Green Tea Cake",
    description: "Japanese-inspired matcha cake with ceremonial grade matcha powder, white chocolate ganache, and delicate azuki bean filling. An exotic and sophisticated choice.",
    price: 57.99,
    category: "specialty",
    imageUrl: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800&q=80"
    ],
    rating: 4.6,
    reviewCount: 62,
    isAvailable: true,
    isFeatured: false,
    tags: ["matcha", "japanese", "specialty"],
    ingredients: ["Ceremonial matcha powder", "White chocolate", "Azuki beans", "All-purpose flour", "Eggs", "Butter"],
    allergens: ["Gluten", "Dairy", "Eggs", "Soy"],
    servingSize: "8-10 slices",
    weight: "1.2 kg"
  },
  {
    id: "10",
    name: "Rainbow Celebration Cake",
    description: "A fun and colorful seven-layer rainbow cake with vanilla buttercream. Made with natural food colors from fruits and vegetables. Perfect for birthdays!",
    price: 64.99,
    category: "celebration",
    imageUrl: "https://images.unsplash.com/photo-1498931299472-f7a63a5a1cfa?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1498931299472-f7a63a5a1cfa?w=800&q=80",
      "https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=800&q=80"
    ],
    rating: 4.8,
    reviewCount: 143,
    isAvailable: true,
    isFeatured: false,
    tags: ["rainbow", "birthday", "celebration"],
    ingredients: ["All-purpose flour", "Natural food coloring (from fruits)", "Eggs", "Butter", "Sugar", "Vanilla", "Buttercream"],
    allergens: ["Gluten", "Dairy", "Eggs"],
    servingSize: "12-14 slices",
    weight: "1.8 kg"
  },
  {
    id: "11",
    name: "Blueberry Cheesecake",
    description: "Creamy New York-style cheesecake with a buttery graham cracker crust and fresh blueberry compote topping. Rich, smooth, and utterly irresistible.",
    price: 44.99,
    category: "cheesecake",
    imageUrl: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=800&q=80"
    ],
    rating: 4.9,
    reviewCount: 178,
    isAvailable: true,
    isFeatured: false,
    tags: ["cheesecake", "blueberry", "new york"],
    ingredients: ["Cream cheese", "Fresh blueberries", "Graham crackers", "Butter", "Eggs", "Sugar", "Sour cream"],
    allergens: ["Gluten", "Dairy", "Eggs"],
    servingSize: "8-10 slices",
    weight: "1.1 kg"
  },
  {
    id: "12",
    name: "Mango Coconut Tropical",
    description: "A tropical escape in cake form! Layers of mango mousse and coconut sponge, topped with fresh mango slices and toasted coconut flakes.",
    price: 53.99,
    category: "fruit",
    imageUrl: "https://images.unsplash.com/photo-1587334274328-64186a80aeee?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1587334274328-64186a80aeee?w=800&q=80"
    ],
    rating: 4.7,
    reviewCount: 71,
    isAvailable: true,
    isFeatured: false,
    tags: ["mango", "coconut", "tropical"],
    ingredients: ["Fresh mango", "Coconut milk", "Toasted coconut", "All-purpose flour", "Eggs", "Butter", "Sugar"],
    allergens: ["Gluten", "Dairy", "Eggs", "Tree Nuts"],
    servingSize: "8-10 slices",
    weight: "1.3 kg"
  }
];

export const categories: Category[] = [
  {
    id: "classic",
    name: "Classic Cakes",
    description: "Timeless recipes loved by generations",
    imageUrl: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&q=80",
    productCount: products.filter(p => p.category === "classic").length
  },
  {
    id: "chocolate",
    name: "Chocolate Collection",
    description: "For the true chocolate connoisseur",
    imageUrl: "https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?w=800&q=80",
    productCount: products.filter(p => p.category === "chocolate").length
  },
  {
    id: "wedding",
    name: "Wedding Cakes",
    description: "Make your special day unforgettable",
    imageUrl: "https://images.unsplash.com/photo-1535254973040-607b474cb50d?w=800&q=80",
    productCount: products.filter(p => p.category === "wedding").length
  },
  {
    id: "fruit",
    name: "Fruit Cakes",
    description: "Fresh seasonal fruits in every bite",
    imageUrl: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=800&q=80",
    productCount: products.filter(p => p.category === "fruit").length
  },
  {
    id: "specialty",
    name: "Specialty",
    description: "Unique and artisan creations",
    imageUrl: "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=800&q=80",
    productCount: products.filter(p => p.category === "specialty").length
  },
  {
    id: "cupcakes",
    name: "Cupcakes",
    description: "Perfect little individual treats",
    imageUrl: "https://images.unsplash.com/photo-1599785209707-a456fc1337bb?w=800&q=80",
    productCount: products.filter(p => p.category === "cupcakes").length
  },
  {
    id: "celebration",
    name: "Celebration",
    description: "Perfect for birthdays and milestones",
    imageUrl: "https://images.unsplash.com/photo-1498931299472-f7a63a5a1cfa?w=800&q=80",
    productCount: products.filter(p => p.category === "celebration").length
  },
  {
    id: "cheesecake",
    name: "Cheesecakes",
    description: "Creamy, indulgent cheesecakes",
    imageUrl: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=800&q=80",
    productCount: products.filter(p => p.category === "cheesecake").length
  }
];

export const reviews: Review[] = [
  {
    id: "r1",
    productId: "1",
    userId: "u1",
    userName: "Sarah M.",
    rating: 5,
    title: "Absolutely divine!",
    comment: "This vanilla cake was the highlight of my daughter's birthday party. The frosting is so creamy and the cake is perfectly moist. Will definitely order again!",
    createdAt: "2025-03-10T14:30:00Z"
  },
  {
    id: "r2",
    productId: "1",
    userId: "u2",
    userName: "James K.",
    rating: 5,
    title: "Best vanilla cake I've ever had",
    comment: "I've tried many bakeries but Sweet Cakes is on another level. The Madagascar vanilla flavor is so authentic and the texture is perfect.",
    createdAt: "2025-03-05T09:15:00Z"
  },
  {
    id: "r3",
    productId: "2",
    userId: "u3",
    userName: "Emily R.",
    rating: 5,
    title: "Chocolate heaven!",
    comment: "The Belgian chocolate is truly premium quality. Rich without being overwhelming. The ganache is silky smooth. A must-try for chocolate lovers.",
    createdAt: "2025-03-12T16:45:00Z"
  },
  {
    id: "r4",
    productId: "2",
    userId: "u4",
    userName: "Michael T.",
    rating: 5,
    title: "Worth every penny",
    comment: "Got this for our anniversary and my wife was thrilled. The chocolate flavor is deep and complex. Absolutely restaurant quality.",
    createdAt: "2025-03-08T11:20:00Z"
  },
  {
    id: "r5",
    productId: "3",
    userId: "u5",
    userName: "Lisa P.",
    rating: 4,
    title: "Fresh and delightful",
    comment: "The strawberries are so fresh and the whipped cream is light as air. Perfect summer treat. Shipping was excellent too.",
    createdAt: "2025-03-01T13:00:00Z"
  },
  {
    id: "r6",
    productId: "4",
    userId: "u6",
    userName: "Amanda W.",
    rating: 5,
    title: "Made our wedding magical",
    comment: "We ordered the three-tier wedding cake and it was absolutely stunning. Not only beautiful but also incredibly delicious. Our guests are still talking about it!",
    createdAt: "2025-02-20T10:30:00Z"
  }
];

export const users: User[] = [
  {
    id: "u1",
    name: "Sarah M.",
    email: "sarah@example.com",
    password: "$2b$10$demohashedpassword1",
    createdAt: "2025-01-01T00:00:00Z"
  }
];

export const carts: Cart[] = [];
export const orders: Order[] = [];
