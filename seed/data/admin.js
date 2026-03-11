import bcrypt from 'bcrypt';

const hashedPassword = await bcrypt.hash(
  'Admin@123',
  process.env.BCRYPT_SALT ? parseInt(process.env.BCRYPT_SALT) : 10
);

const adminSeedData = {
  name: 'Super Admin',
  email: 'admin@test.com',
  password: hashedPassword,
  role: 'admin',
  phone: '0000000000',
};

export default adminSeedData;
