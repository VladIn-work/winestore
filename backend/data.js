import bcrypt from "bcryptjs";

const data = {
    users: [
      {
        name: 'Vlad',
        email: 'vladtarnov@yahoo.com',
        password: bcrypt.hashSync('989898', 8),
        isAdmin: true,
      },
      {
        name: 'Jhon',
        email: 'user@yahoo.com',
        password: bcrypt.hashSync('989898', 8),
        isAdmin: false,
      },
    ],
    products: [
        {
            name: 'Cabernet Dry',
            year: 2011,
            image: "/images/res-cabernet.png",
            certified: "/images/certified-green-5.jpg",
            price: 50,
            brand: 'Bostavan',
            rating: 4.5,
            numReviews: 10,
            itemInStock: 5,
            description: 'A whiff of cotton candy leads the nose to aromas of black raspberry, black currant and tobacco leaf.',
        },
        {
            name: 'Chardonnay Dry',
            year: 2011,
            image: '/images/res-chardonnay.png',
            certified: "/images/certified-green-5.jpg",
            price: 20,
            brand: 'Bostavan',
            rating: 5,
            numReviews: 15,
            itemInStock: 9,
            description: 'Chardonnay Dry is made in a lighter style with an emphasis on crisp, refreshing notes of fresh citrus.',
        },
        {
            name: 'Cabernet Dor',
            year: 2015,
            image: '/images/res-cabernet-sauvignon.png',
            certified: "/images/certified-green-5.jpg",
            price: 28,
            brand: 'Bostavan',
            rating: 4.9,
            numReviews: 19,
            itemInStock: 5,
            description: 'Cabernet Sauvignon will show aromas of black fruit, violet and green bell pepper. With time it will develop notes of cedar wood, coffee, and eucalyptus.',
        },
        {
            name: 'Chardonnay Dor',
            year: 2014,
            image: '/images/res-feteasca-alba-chardoney.png',
            certified: "/images/certified-green-5.jpg",
            price: 55,
            brand: 'Bostavan',
            rating: 4.5,
            numReviews: 7,
            itemInStock: 25,
            description: 'A full bodied wine with mint and cassis aromas, rich berries, vanilla complexity and a very soft finish.',
        },
        {
            name: 'Merlot Saperavi',
            year: 2012,
            image: '/images/res-merlot-saperavi.png',
            certified: "/images/certified-green-5.jpg",
            price: 60,
            brand: 'Bostavan',
            rating: 4.7,
            numReviews: 15,
            itemInStock: 0,
            description: 'A rosé wine created with a longing for love. Unique combination of Merlot and Saperavi, which has a soft taste, harmonious shades of berries.',
        },
        {
            name: 'Muscat Rose',
            year: 2016,
            image: '/images/res-muscat-rose.png',
            certified: "/images/certified-green-5.jpg",
            price: 70,
            brand: 'Bostavan',
            rating: 5.4,
            numReviews: 25,
            itemInStock: 12,
            description: 'Muscat Rose is a traditional French grape cultivated in Moldova. The wine has a fresh aroma of harmonious taste.',
        },
    ],
};

export default data;