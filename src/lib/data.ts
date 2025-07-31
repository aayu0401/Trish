

export const currentUser = {
  id: 0,
  name: "You",
  profile: `Loves hiking and exploring new cafes. A software engineer by day, a novelist by night. Looking for someone to share adventures and quiet moments with.`,
  photo: 'https://placehold.co/100x100.png?text=You',
  address: '123, Tech Park, Silicon Valley, Bangalore, 560100',
  identityVerified: false,
  kycVerified: false,
  gender: 'Man',
  interestedIn: 'Women', // Can be 'Men', 'Women', or 'Everyone'
  searchRadius: 50, // in km
  location: { lat: 12.9716, lon: 77.5946 }, // Bangalore
};

export const profiles = [
    {
    id: 1,
    name: 'Alia, 28',
    bio: 'Wandering soul with a love for art, music, and spontaneous road trips. Let\'s find a gallery to get lost in.',
    interests: ['Art', 'Indie Music', 'Travel', 'Photography', 'Museums'],
    photos: [
        'https://placehold.co/600x800.png?text=woman+portrait+1', 
        'https://placehold.co/600x800.png?text=woman+portrait+2', 
        'https://placehold.co/600x800.png?text=woman+portrait+3',
        'https://placehold.co/600x800.png?text=woman+portrait+4',
        'https://placehold.co/600x800.png?text=woman+portrait+5',
    ],
    data_ai_hint: 'woman portrait',
    fullProfile: 'Art gallery enthusiast, plays the ukulele, and has a cat named "Pixel". Prefers rainy days and cozy coffee shops. Favorite movie genre is documentary.',
    address: 'A-1, 4th Floor, Art House, Colaba, Mumbai, 400001',
    gender: 'Woman',
    location: { lat: 12.9345, lon: 77.6262 }, // Mumbai (coords are for HSR Layout, Bangalore for demo) - 5km away
  },
  {
    id: 2,
    name: 'Priya, 26',
    bio: 'Fitness enthusiast and dog lover. My golden retriever is my world. Looking for a workout partner and fellow foodie.',
    interests: ['Fitness', 'Dogs', 'Cooking', 'Marathons', 'Meal Prep'],
    photos: [
        'https://placehold.co/600x800.png?text=woman+smiling+1',
        'https://placehold.co/600x800.png?text=woman+smiling+2',
        'https://placehold.co/600x800.png?text=woman+smiling+3',
        'https://placehold.co/600x800.png?text=woman+smiling+4',
    ],
    data_ai_hint: 'woman smiling',
    fullProfile: 'Enjoys morning runs and weightlifting. Passionate about healthy eating but can\'t resist a good pizza. Volunteers at a local animal shelter on weekends.',
    address: 'Plot 42, Gymkhana Road, Sector 15, Gurgaon, 122001',
    gender: 'Woman',
    location: { lat: 12.9716, lon: 77.5946 }, // Gurgaon (coords are for Bangalore) - 0km away
  },
  {
    id: 3,
    name: 'Samira, 29',
    bio: 'Bookworm, tech geek, and aspiring chef. I can probably beat you at chess. Challenge me?',
    interests: ['Reading', 'Tech', 'Chess', 'Board Games', 'Podcasts'],
    photos: [
        'https://placehold.co/600x800.png?text=woman+glasses+1',
        'https://placehold.co/600x800.png?text=woman+glasses+2',
        'https://placehold.co/600x800.png?text=woman+glasses+3',
        'https://placehold.co/600x800.png?text=woman+glasses+4',
    ],
    data_ai_hint: 'woman glasses',
    fullProfile: 'Works in AI research. Loves sci-fi novels and classic films. Trying to perfect the art of making sourdough bread. Believes pineapple on pizza is a crime.',
    address: 'No. 25, 3rd Main Road, Indiranagar, Bangalore, 560038',
    gender: 'Woman',
    location: { lat: 13.0400, lon: 77.6420 }, // Indiranagar, Bangalore - 10km away
  },
  {
    id: 4,
    name: 'Nisha, 27',
    bio: 'Musician and nature lover. You can find me playing my guitar at the park or hiking up a mountain. Adventure awaits!',
    interests: ['Guitar', 'Hiking', 'Concerts', 'Camping', 'Stargazing'],
    photos: [
        'https://placehold.co/600x800.png?text=woman+nature+1',
        'https://placehold.co/600x800.png?text=woman+nature+2',
        'https://placehold.co/600x800.png?text=woman+nature+3',
    ],
    data_ai_hint: 'woman nature',
    fullProfile: 'Singer-songwriter for a local band. Loves camping and stargazing. A bit of an adrenaline junkie - has tried bungee jumping and skydiving. Learning Spanish.',
    address: '7, Mountain View Road, Rishikesh, Uttarakhand, 249201',
    gender: 'Woman',
    location: { lat: 13.1989, lon: 77.7068 }, // Rishikesh (coords for outside Bangalore) - 150km away
  },
  {
    id: 5,
    name: 'Rohan, 29',
    bio: 'Startup founder and coffee addict. My weekends are for coding and exploring new brunch spots.',
    interests: ['Startups', 'Coffee', 'Brunch', 'Tech', 'Investing'],
    photos: [ 
        'https://placehold.co/600x800.png?text=man+portrait+1',
        'https://placehold.co/600x800.png?text=man+portrait+2',
        'https://placehold.co/600x800.png?text=man+portrait+3',
     ],
    data_ai_hint: 'man portrait',
    fullProfile: 'Building the next big thing in fintech. Passionate about product design and user experience. Enjoys playing tennis and reading non-fiction.',
    address: 'Flat 101, Venture Capital Towers, Koramangala, Bangalore, 560095',
    gender: 'Man',
    location: { lat: 12.9279, lon: 77.6271 }, // Koramangala, Bangalore - 8km away
  },
  {
    id: 6,
    name: 'Kabir, 31',
    bio: 'Filmmaker and storyteller. Always looking for the next great story to tell. Let\'s create one together.',
    interests: ['Filmmaking', 'Storytelling', 'Photography', 'Cinema', 'Travel'],
    photos: [ 
        'https://placehold.co/600x800.png?text=man+smiling+1',
        'https://placehold.co/600x800.png?text=man+smiling+2',
    ],
    data_ai_hint: 'man smiling',
    fullProfile: 'Independent filmmaker with a passion for documentaries. Spends his free time at film festivals or writing scripts. A big fan of classic rock music.',
    address: 'Studio 5, Film City, Goregaon, Mumbai, 400065',
    gender: 'Man',
    location: { lat: 12.8452, lon: 77.6602 }, // Mumbai (coords for Electronic City) - 25km away
  },
  {
    id: 7,
    name: 'Meera, 25',
    bio: 'Yoga instructor and vegan foodie. I believe in mindful living and positive energy. Looking for a deep connection.',
    interests: ['Yoga', 'Meditation', 'Veganism', 'Spirituality', 'Sustainability'],
    photos: [ 
        'https://placehold.co/600x800.png?text=woman+yoga+1',
        'https://placehold.co/600x800.png?text=woman+yoga+2',
        'https://placehold.co/600x800.png?text=woman+yoga+3',
    ],
    data_ai_hint: 'woman yoga',
    fullProfile: 'Teaches vinyasa flow yoga. Spends her weekends at farmers markets and exploring vegan cafes. Loves documentary films about nature.',
    address: '12, Yoga Path, Whitefield, Bangalore, 560066',
    gender: 'Woman',
    location: { lat: 12.9698, lon: 77.7499 }, // Whitefield, Bangalore - 18km away
  },
  {
    id: 8,
    name: 'Arjun, 30',
    bio: 'Architect with a passion for design, history, and travel. I enjoy sketching old buildings and trying new cuisines.',
    interests: ['Architecture', 'History', 'Sketching', 'Foodie', 'Travel'],
    photos: [ 
        'https://placehold.co/600x800.png?text=man+architect+1',
        'https://placehold.co/600x800.png?text=man+architect+2',
        'https://placehold.co/600x800.png?text=man+architect+3',
    ],
    data_ai_hint: 'man architect',
    fullProfile: 'Designs modern, sustainable buildings. His hobbies include photography and cycling around the city. Is a massive fan of historical fiction novels.',
    address: '88, Design Quarters, JP Nagar, Bangalore, 560078',
    gender: 'Man',
    location: { lat: 12.9063, lon: 77.5858 }, // JP Nagar, Bangalore - 12km away
  },
  {
    id: 9,
    name: 'Zara, 27',
    bio: 'Fashion designer and globetrotter. My life is a blend of fabrics, colors, and cultures. Seeking a partner for my next adventure.',
    interests: ['Fashion', 'Travel', 'Salsa Dancing', 'Languages', 'Concerts'],
    photos: [ 
        'https://placehold.co/600x800.png?text=woman+fashion+1',
        'https://placehold.co/600x800.png?text=woman+fashion+2',
        'https://placehold.co/600x800.png?text=woman+fashion+3',
        'https://placehold.co/600x800.png?text=woman+fashion+4',
    ],
    data_ai_hint: 'woman fashion',
    fullProfile: 'Owns a small boutique clothing line. Has traveled to over 20 countries and is fluent in French and Spanish. Loves to dance salsa on weekends.',
    address: 'Design Street, Bandra West, Mumbai, 400050',
    gender: 'Woman',
    location: { lat: 12.972442, lon: 77.580643 }, // Mumbai (coords for another part of central Bangalore) - 2km away
  }
];

export type Match = {
  id: number;
  name: string;
  photo: string;
  data_ai_hint: string;
};

// This is now the initial state for the match store, not the definitive list.
export const matches: Match[] = [];

type Sender = {
    name: string;
    photo: string;
}

export type Gift = {
  id: string;
  name: string;
  icon: string;
  type: 'virtual' | 'real';
  description: string;
  cost: number;
  image: string;
  status?: 'pending' | 'accepted' | 'declined';
  sender?: Sender;
};

export const gifts: Gift[] = [
    // Virtual Gifts
    { id: 'g1', name: 'Virtual Rose', icon: 'Flower', type: 'virtual', description: 'A single, elegant virtual rose.', cost: 50, image: 'https://placehold.co/600x400.png?text=Virtual+Rose' },
    { id: 'g2', name: 'Digital Kiss', icon: 'Mail', type: 'virtual', description: 'Send a sweet, animated kiss.', cost: 25, image: 'https://placehold.co/600x400.png?text=Digital+Kiss' },
    { id: 'g3', name: 'Sparkle Effect', icon: 'Sparkles', type: 'virtual', description: 'Make their profile sparkle for a day.', cost: 100, image: 'https://placehold.co/600x400.png?text=Sparkle+Effect' },
    { id: 'g4', name: 'Virtual Cake', icon: 'CakeSlice', type: 'virtual', description: 'A delicious-looking virtual cake slice.', cost: 75, image: 'https://placehold.co/600x400.png?text=Virtual+Cake' },
    
    // Real Gifts
    { id: 'g5', name: 'Bouquet of Roses', icon: 'Flower', type: 'real', description: 'A beautiful bouquet delivered to them.', cost: 1500, image: 'https://placehold.co/600x400.png?text=Bouquet' },
    { id: 'g6', name: 'Gourmet Chocolates', icon: 'Package', type: 'real', description: 'A box of artisanal chocolates.', cost: 800, image: 'https://placehold.co/600x400.png?text=Chocolates' },
    { id: 'g7', name: 'Cafe Date Voucher', icon: 'Coffee', type: 'real', description: 'A voucher for a coffee date at a popular cafe.', cost: 500, image: 'https://placehold.co/600x400.png?text=Cafe+Voucher' },
];

export const incomingGifts: Gift[] = [
    { 
        id: 'g6', 
        name: 'Gourmet Chocolates', 
        icon: 'Package', 
        type: 'real', 
        description: 'A box of artisanal chocolates.', 
        cost: 800, 
        image: 'https://placehold.co/600x400.png?text=Chocolates',
        status: 'pending',
        sender: { name: 'Rohan, 29', photo: 'https://placehold.co/100x100.png?text=R' }
    },
    { 
        id: 'g5', 
        name: 'Bouquet of Roses', 
        icon: 'Flower', 
        type: 'real', 
        description: 'A beautiful bouquet delivered to them.', 
        cost: 1500, 
        image: 'https://placehold.co/600x400.png?text=Bouquet',
        status: 'pending',
        sender: { name: 'Kabir, 31', photo: 'https://placehold.co/100x100.png?text=K' }
    }
]

export const interests = [
    'Photography', 'Hiking', 'Reading', 'Cooking', 'Gaming', 'Yoga', 'Traveling',
    'Concerts', 'Art', 'Movies', 'Dancing', 'Podcasts', 'DIY Projects', 'Volunteering',
    'Coffee', 'Wine Tasting', 'Board Games', 'Stand-up Comedy', 'Blogging', 'Stargazing',
    'Fitness', 'Startups', 'Tech', 'Fashion', 'Salsa Dancing', 'History', 'Meditation',
    'Indie Music', 'Museums', 'Marathons', 'Chess', 'Filmmaking', 'Sustainability'
];

    
