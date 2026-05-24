import { ThriftDropItem, Testimonial } from '../types';

// Let's generate dynamic ISO timestamps for our drops relative to now.
const now = new Date();

export const MOCK_DROPS: ThriftDropItem[] = [
  {
    id: 'drop_1',
    title: 'Vintage 1992 Carhartt Canvas Active Jacket',
    brand: 'Carhartt',
    category: 'jackets',
    size: 'XL',
    condition: '9.4/10 Vintage Fade',
    priceRp: 850000,
    imageUrl: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80&w=600',
    // Drops in 5 minutes for general public. Premium early access is already open!
    // Since premium gets 10 minutes early access, they can buy it right now, whereas free users wait.
    dropTime: new Date(now.getTime() + 5 * 60 * 1000).toISOString(),
    isClaimed: false,
    tags: ['Detroit', 'Canvas', 'Grunge', 'Y2K Workwear']
  },
  {
    id: 'drop_2',
    title: '1994 Nike Single-Stitch Embroidered Crewneck',
    brand: 'Nike',
    category: 'sweaters',
    size: 'L',
    condition: '9.0/10 Excellent',
    priceRp: 420000,
    imageUrl: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=600',
    // Drops in 14 minutes for public, 4 minutes for premium!
    dropTime: new Date(now.getTime() + 14 * 60 * 1000).toISOString(),
    isClaimed: false,
    tags: ['Center Swoosh', 'USA Made', 'Athletic']
  },
  {
    id: 'drop_3',
    title: 'Retro Levi\'s 501 Big E Selvedge Corduroy',
    brand: 'Levi\'s',
    category: 'pants',
    size: '32/34',
    condition: '9.8/10 Deadstock Condition',
    priceRp: 550000,
    imageUrl: 'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&q=80&w=600',
    // Drops in 8 minutes for public (premium can claim immediately because they are <10 minute early!)
    dropTime: new Date(now.getTime() + 8 * 60 * 1000).toISOString(),
    isClaimed: false,
    tags: ['Corduroy', 'Red Tab', '90s Relaxed']
  },
  {
    id: 'drop_4',
    title: 'Air Jordan 1 Retro High OG Bred Royal',
    brand: 'Jordan',
    category: 'sneakers',
    size: 'US 10 / 44',
    condition: '9.2/10 OG All',
    priceRp: 1850000,
    imageUrl: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&q=80&w=600',
    // Drops in 25 minutes for public, 15 minutes for premium.
    dropTime: new Date(now.getTime() + 25 * 60 * 1000).toISOString(),
    isClaimed: false,
    tags: ['High Top', 'Jumpman', 'Leather']
  },
  {
    id: 'drop_5',
    title: 'Vintage 1991 Harley-Davidson 3D Emblem Tee',
    brand: 'Harley-Davidson',
    category: 'tees',
    size: 'M',
    condition: '8.8/10 Beautiful Faded Black',
    priceRp: 950000,
    imageUrl: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=600',
    // Drops in 42 minutes for public.
    dropTime: new Date(now.getTime() + 42 * 60 * 1000).toISOString(),
    isClaimed: false,
    tags: ['3D Emblem', 'Single Stitch', 'Biker Culture']
  },
  {
    id: 'drop_6',
    title: 'Vintage Patagonia Synchilla Fleece Snap-T',
    brand: 'Patagonia',
    category: 'sweaters',
    size: 'S',
    condition: '9.5/10 Ultra Soft',
    priceRp: 680000,
    imageUrl: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&q=80&w=600',
    // Already dropped 2 minutes ago - Claimable by anyone!
    dropTime: new Date(now.getTime() - 2 * 60 * 1000).toISOString(),
    isClaimed: false,
    tags: ['Synchilla', 'Outdoor', 'Retro Snap']
  },
  {
    id: 'drop_7',
    title: 'Stussy Champion Edition Varsity Coach Jacket',
    brand: 'Stussy',
    category: 'jackets',
    size: 'L',
    condition: '9.6/10 Crisp Graphic',
    priceRp: 750000,
    imageUrl: 'https://images.unsplash.com/photo-1544923246-77307dd654cb?auto=format&fit=crop&q=80&w=600',
    // Drops in 1 hour 15 min
    dropTime: new Date(now.getTime() + 75 * 60 * 1000).toISOString(),
    isClaimed: false,
    tags: ['Varsity', 'Streetwear', 'Coats']
  },
  {
    id: 'drop_w1',
    title: 'Vintage 1970s Silk Floral Blouse',
    brand: 'Saint Laurent',
    category: 'blouses',
    size: 'M',
    condition: '9.5/10 Mint Silk',
    priceRp: 380000,
    imageUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=600',
    // Drops in 2 minutes for general public. Premium already open!
    dropTime: new Date(now.getTime() + 2 * 60 * 1000).toISOString(),
    isClaimed: false,
    tags: ['Silk', 'Floral', '70s', 'Coquette']
  },
  {
    id: 'drop_w2',
    title: 'Retro Oversized Cable-Knit Cardigan',
    brand: 'Ralph Lauren',
    category: 'cardigans',
    size: 'S-M',
    condition: '9.2/10 Super Warm',
    priceRp: 450000,
    imageUrl: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&q=80&w=600',
    // Drops in 18 minutes for public
    dropTime: new Date(now.getTime() + 18 * 60 * 1000).toISOString(),
    isClaimed: false,
    tags: ['CableKnit', 'Grandma Style', 'Autumn', 'Chunky']
  },
  {
    id: 'drop_w3',
    title: '90s Tartan Pleated Wool Skirt',
    brand: 'Burberry Vintage',
    category: 'skirts',
    size: 'S',
    condition: '9.6/10 Pristine Pleats',
    priceRp: 490000,
    imageUrl: 'https://images.unsplash.com/photo-1582533561751-ef6f6ab93a2e?auto=format&fit=crop&q=80&w=600',
    // Already dropped 1m ago!
    dropTime: new Date(now.getTime() - 1 * 60 * 1000).toISOString(),
    isClaimed: false,
    tags: ['Tartan', 'Burberry Check', 'Clueless', '90s Preppy']
  },
  {
    id: 'drop_8',
    title: 'Vintage 1996 Nirvana Insecticide Album Tee',
    brand: 'Nirvana',
    category: 'tees',
    size: 'XL',
    condition: '8.5/10 Heavily Distressed Grails',
    priceRp: 1200000,
    imageUrl: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&q=80&w=600',
    // Already sniped (Claimed) to show real-time claimed indicator as a simulated competition
    dropTime: new Date(now.getTime() - 15 * 60 * 1000).toISOString(),
    isClaimed: true,
    claimedByUserId: 'user_alex_snipes',
    claimedAt: new Date(now.getTime() - 14 * 60 * 1000 - 45 * 1000).toISOString(),
    tags: ['Band Tee', 'Grails', 'Grunge Rock']
  }
];

export const MOCK_TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Bagus Wicaksono',
    username: 'bagus_snipz',
    avatar: 'BW',
    review: 'Gokil! SnipeDrop premium beneran worth-it banget. Gara-gara early access 10 menit, gue berhasil ngamanin Carhartt Detroit Jacket inceran gue sebelum diperebutin jutaan jastip hunter di luar sana!',
    rating: 5,
    itemsSniped: 12,
    avatarBgColor: 'bg-indigo-600'
  },
  {
    id: 't2',
    name: 'Amara Rengganis',
    username: 'amara.re',
    avatar: 'AR',
    review: 'Fitur Radar Alert-nya super akurat! Langsung dapet notif chat Telegram begitu jacket Nike vintage yang gue incar masuk catalog. Cuma sekali klik Instant Sniper langsung checkout aman!',
    rating: 5,
    itemsSniped: 8,
    avatarBgColor: 'bg-emerald-600'
  },
  {
    id: 't3',
    name: 'Kevin Pratama',
    username: 'kevinthrift_co',
    avatar: 'KP',
    review: 'Awalnya ragu langganan Rp15rb/bulan, tapi ternyata dalam seminggu jastip slot gue laku terus. Dashboard rapi, update stock real-time ga pake kibul. Recommended buat thrift seller maupun collector!',
    rating: 5,
    itemsSniped: 24,
    avatarBgColor: 'bg-blue-600'
  }
];

export const PLATFORM_STATS = {
  activeUsersOnline: 1421,
  averageSnipingTime: '0.82 seconds',
  radarAlertsDispatchedToday: 12480,
  successfulJastipSecured: 5319
};
