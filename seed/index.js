import dotenv from 'dotenv';
import connectDB from '../config/db.js';

import User from '../modules/auth/schema.js';
import Bike from '../modules/bike/schema.js';

import adminSeedData from './data/admin.js';
import bikeSeedData from './data/bike.js';

dotenv.config();

class Seed {
  // Main seeding function
  async seedData() {
    try {
      await connectDB();

      console.log('🌱 Starting database seeding...');

      await this.addBikes();
      await this.superAdmin();

      console.log('✅ Seeding completed successfully');
      process.exit(0);
    } catch (error) {
      console.error('❌ Seed error:', error);
      process.exit(1);
    }
  }

  // Seed bikes
  async addBikes() {
    try {
      console.log('🚲 Seeding bikes...');

      const existingCount = await Bike.countDocuments();
      if (existingCount > 0) {
        console.log('⚠️ Bikes already exist. Skipping bike seed.');
        return;
      }

      await Bike.insertMany(bikeSeedData);
      console.log(`✅ ${bikeSeedData.length} bikes inserted`);
    } catch (error) {
      console.error('❌ Error seeding bikes:', error);
    }
  }

  // Seed super admin user
  async superAdmin() {
    try {
      console.log('👑 Seeding super admin...');

      const existingAdmin = await User.findOne({ email: 'admin@test.com' });
      if (existingAdmin) {
        console.log(`⚠️ Admin already exists: ${existingAdmin.email}`);
        return;
      }

      const admin = await User.create(adminSeedData);

      console.log('✅ Super admin created:');
      console.log('   Email:', admin.email);
      console.log('   Password: Admin@123');
      console.log('   Use login API to get JWT token');
    } catch (error) {
      console.error('❌ Error seeding super admin:', error);
    }
  }
}

const seed = new Seed();
seed.seedData();
