import dotenv from "dotenv";
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import Hotel from './models/Hotel.js';
import Room from './models/Room.js';
import User from './models/User.js';
import Review from './models/Review.js';

dotenv.config();

// MongoDB connection URI
const MONGO_URI = process.env.MONGO

// Connect to MongoDB
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('MongoDB Connected');
    seedData();
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

// Function to seed data
async function seedData() {
  try {
    // Clear existing data
    await Promise.all([
      User.deleteMany({}),
      Hotel.deleteMany({}),
      Room.deleteMany({}),
      Review.deleteMany({}),
    ]);

    console.log('Existing data cleared.');

    // Create Admin User
    const adminPassword = bcrypt.hashSync('Admin@123', 10);
    const adminUser = new User({
      username: 'adminUser',
      email: 'admin@hotelbooking.com',
      city: 'Nairobi',
      phone: '0700000000',
      password: adminPassword,
      isAdmin: true,
      isSuperAdmin: true,
    });

    await adminUser.save();
    console.log('Admin user created.');

    // Create Regular Users
    const usersData = [
      {
        username: 'johnDoe',
        email: 'john@doe.com',
        city: 'Mombasa',
        phone: '0700000001',
        password: 'User@123',
      },
      {
        username: 'janeSmith',
        email: 'jane@smith.com',
        city: 'Kisumu',
        phone: '0700000002',
        password: 'User@123',
      },
      {
        username: 'aliceJones',
        email: 'alice@jones.com',
        city: 'Nakuru',
        phone: '0700000003',
        password: 'User@123',
      },
      {
        username: 'bobBrown',
        email: 'bob@brown.com',
        city: 'Eldoret',
        phone: '0700000004',
        password: 'User@123',
      },
      {
        username: 'charlieDavis',
        email: 'charlie@davis.com',
        city: 'Thika',
        phone: '0700000005',
        password: 'User@123',
      },
    ];

    const userPromises = usersData.map(async (userData) => {
        const hashedPassword = bcrypt.hashSync(userData.password, 10);
        const user = new User({
          ...userData,
          password: hashedPassword,
        });
        return user.save();
      });
  
      const regularUsers = await Promise.all(userPromises);
      console.log('Regular users created.');

    // List of Kenyan towns for hotels
    const towns = [
      'Nairobi',
      'Mombasa',
      'Kisumu',
      'Nakuru',
      'Eldoret',
      'Thika',
      'Kitale',
      'Naivasha',
      'Meru',
      'Nyeri',
    ];

    // Sample images
    const sampleImages = [
      'https://lh6.googleusercontent.com/proxy/x1gCneyRpzyBDKY6MHeLkiu_B9ulbpFNwA6p4a51kTR8LVNjz-EepvA58_ZI8akuiAksboIuX1Gm1-nE4_ZWmYMllx-8C0x5jwc5S0BimSx5KmspzJuOZnuw96B_TB7LPbTP-NM0LpDdOdxTLzItZ3BRir0RcQ=w252-h166-k-no',
      'https://lh5.googleusercontent.com/p/AF1QipN6E8WmF2DtCeJGY6z7M1DxBQzmFDYgbMn50Mtm=w252-h166-k-no',
      'https://lh5.googleusercontent.com/p/AF1QipN1a5D2HTaLVkkd_i5GDcShc7KNss2X7zH9Omuu=w252-h166-k-no',
    ];

    // Create Hotels and their Rooms
    const hotelPromises = towns.map(async (town, index) => {
      const hotel = new Hotel({
        name: `Grand ${town} Hotel`,
        type: 'Hotel',
        city: town,
        address: `${index + 1} ${town} Avenue, Kenya`,
        distance: `${Math.floor(Math.random() * 10) + 1} km from center`,
        images: sampleImages,
        title: `Experience luxury at Grand ${town} Hotel`,
        description:
          'A premier hotel offering exceptional services and amenities for a comfortable stay.',
        rating: (Math.random() * 10).toFixed(1),
        rooms: [],
        cheapestPrice: (Math.floor(Math.random() * 100) + 50),
        featured: Math.random() < 0.5,
        admin: adminUser._id,
        reviews: [],
      });

      await hotel.save();

      // Create Rooms for each Hotel
      const roomTypes = [
        {
          title: 'Standard Room',
          description: 'A cozy room with all the basic amenities.',
          price: hotel.cheapestPrice,
          maxPeople: 2,
        },
        {
          title: 'Deluxe Room',
          description: 'A spacious room with premium facilities.',
          price: hotel.cheapestPrice + 30,
          maxPeople: 3,
        },
      ];

      const roomPromises = roomTypes.map(async (roomType) => {
        const room = new Room({
          ...roomType,
          unavailableDates: [],
        });
        await room.save();
        hotel.rooms.push(room._id);
      });

      await Promise.all(roomPromises);
      await hotel.save();

      // Create a Review for the Hotel
      const randomUser =
        regularUsers[Math.floor(Math.random() * regularUsers.length)];

      const review = new Review({
        user: randomUser._id,
        hotel: hotel._id,
        content:
          'Had a wonderful stay! The staff were friendly and the services were top-notch.',
        rating: Math.floor(Math.random() * 5) + 6, // Rating between 6 and 10
      });

      await review.save();
      hotel.reviews.push(review._id);
      await hotel.save();
    });

    await Promise.all(hotelPromises);

    console.log('Hotels, rooms, and reviews created successfully.');
    console.log('Database seeding completed.');
    process.exit();
  } catch (error) {
    console.error('Error during database seeding:', error);
    process.exit(1);
  }
}