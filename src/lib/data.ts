
export const currentUser = {
  id: 0,
  name: "You",
  profile: `Loves hiking and exploring new cafes. A software engineer by day, a novelist by night. Looking for someone to share adventures and quiet moments with.`,
  photo: 'https://placehold.co/100x100.png?text=You',
  address: '123, Tech Park, Silicon Valley, Bangalore, 560100'
};

export const profiles = [
  {
    id: 1,
    name: 'Alia, 28',
    bio: 'Wandering soul with a love for art, music, and spontaneous road trips. Let\'s find a gallery to get lost in.',
    interests: ['Art', 'Indie Music', 'Travel', 'Photography', 'Museums'],
    photos: [
        'https://placehold.co/600x800.png?1', 
        'https://placehold.co/600x800.png?11', 
        'https://placehold.co/600x800.png?12',
        'https://placehold.co/600x800.png?13',
        'https://placehold.co/600x800.png?14',
    ],
    data_ai_hint: 'woman portrait',
    fullProfile: 'Art gallery enthusiast, plays the ukulele, and has a cat named "Pixel". Prefers rainy days and cozy coffee shops. Favorite movie genre is documentary.',
    address: 'A-1, 4th Floor, Art House, Colaba, Mumbai, 400001'
  },
  {
    id: 2,
    name: 'Priya, 26',
    bio: 'Fitness enthusiast and dog lover. My golden retriever is my world. Looking for a workout partner and fellow foodie.',
    interests: ['Fitness', 'Dogs', 'Cooking', 'Marathons', 'Meal Prep'],
    photos: [
        'https://placehold.co/600x800.png?2',
        'https://placehold.co/600x800.png?21',
        'https://placehold.co/600x800.png?22',
    ],
    data_ai_hint: 'woman smiling',
    fullProfile: 'Enjoys morning runs and weightlifting. Passionate about healthy eating but can\'t resist a good pizza. Volunteers at a local animal shelter on weekends.',
    address: 'Plot 42, Gymkhana Road, Sector 15, Gurgaon, 122001'
  },
  {
    id: 3,
    name: 'Samira, 29',
    bio: 'Bookworm, tech geek, and aspiring chef. I can probably beat you at chess. Challenge me?',
    interests: ['Reading', 'Tech', 'Chess', 'Board Games', 'Podcasts'],
    photos: [
        'https://placehold.co/600x800.png?3',
        'https://placehold.co/600x800.png?31',
        'https://placehold.co/600x800.png?32',
        'https://placehold.co/600x800.png?33',
    ],
    data_ai_hint: 'woman glasses',
    fullProfile: 'Works in AI research. Loves sci-fi novels and classic films. Trying to perfect the art of making sourdough bread. Believes pineapple on pizza is a crime.',
    address: 'No. 25, 3rd Main Road, Indiranagar, Bangalore, 560038'
  },
  {
    id: 4,
    name: 'Nisha, 27',
    bio: 'Musician and nature lover. You can find me playing my guitar at the park or hiking up a mountain. Adventure awaits!',
    interests: ['Guitar', 'Hiking', 'Concerts', 'Camping', 'Stargazing'],
    photos: [
        'https://placehold.co/600x800.png?4',
        'https://placehold.co/600x800.png?41',
    ],
    data_ai_hint: 'woman nature',
    fullProfile: 'Singer-songwriter for a local band. Loves camping and stargazing. A bit of an adrenaline junkie - has tried bungee jumping and skydiving. Learning Spanish.',
    address: '7, Mountain View Road, Rishikesh, Uttarakhand, 249201'
  },
];

export type Match = {
  id: number;
  name: string;
  photo: string;
  data_ai_hint: string;
};

// This is now the initial state for the match store, not the definitive list.
export const matches: Match[] = [];

export type Gift = {
  name: string;
  icon: string;
  type: 'virtual' | 'real';
  description: string;
  cost: number;
  image: string;
};

export const gifts: Gift[] = [
    // Virtual Gifts
    { name: 'Virtual Rose', icon: 'Flower', type: 'virtual', description: 'A single, elegant virtual rose.', cost: 50, image: 'https://placehold.co/600x400.png?text=Virtual+Rose' },
    { name: 'Digital Kiss', icon: 'Mail', type: 'virtual', description: 'Send a sweet, animated kiss.', cost: 25, image: 'https://placehold.co/600x400.png?text=Digital+Kiss' },
    { name: 'Sparkle Effect', icon: 'Sparkles', type: 'virtual', description: 'Make their profile sparkle for a day.', cost: 100, image: 'https://placehold.co/600x400.png?text=Sparkle+Effect' },
    { name: 'Virtual Cake', icon: 'CakeSlice', type: 'virtual', description: 'A delicious-looking virtual cake slice.', cost: 75, image: 'https://placehold.co/600x400.png?text=Virtual+Cake' },
    
    // Real Gifts
    { name: 'Bouquet of Roses', icon: 'Flower', type: 'real', description: 'A beautiful bouquet delivered to them.', cost: 1500, image: 'https://placehold.co/600x400.png?text=Bouquet' },
    { name: 'Gourmet Chocolates', icon: 'Package', type: 'real', description: 'A box of artisanal chocolates.', cost: 800, image: 'https://placehold.co/600x400.png?text=Chocolates' },
    { name: 'Cafe Date Voucher', icon: 'Coffee', type: 'real', description: 'A voucher for a coffee date at a popular cafe.', cost: 500, image: 'https://placehold.co/600x400.png?text=Cafe+Voucher' },
];

export const interests = [
    'Photography', 'Hiking', 'Reading', 'Cooking', 'Gaming', 'Yoga', 'Traveling',
    'Concerts', 'Art', 'Movies', 'Dancing', 'Podcasts', 'DIY Projects', 'Volunteering',
    'Coffee', 'Wine Tasting', 'Board Games', 'Stand-up Comedy', 'Blogging', 'Stargazing',
];
