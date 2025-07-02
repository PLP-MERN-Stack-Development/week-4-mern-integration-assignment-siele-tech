#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Setting up MERN Blog Application...\n');

// Check if Node.js is installed
try {
  const nodeVersion = execSync('node --version', { encoding: 'utf8' });
  console.log(`✅ Node.js version: ${nodeVersion.trim()}`);
} catch (error) {
  console.error('❌ Node.js is not installed. Please install Node.js v18 or higher.');
  process.exit(1);
}

// Install server dependencies
console.log('\n📦 Installing server dependencies...');
try {
  execSync('npm install', { cwd: './server', stdio: 'inherit' });
  console.log('✅ Server dependencies installed successfully!');
} catch (error) {
  console.error('❌ Failed to install server dependencies');
  process.exit(1);
}

// Install client dependencies
console.log('\n📦 Installing client dependencies...');
try {
  execSync('npm install', { cwd: './client', stdio: 'inherit' });
  console.log('✅ Client dependencies installed successfully!');
} catch (error) {
  console.error('❌ Failed to install client dependencies');
  process.exit(1);
}

// Create .env file if it doesn't exist
const envPath = path.join(__dirname, 'server', '.env');
if (!fs.existsSync(envPath)) {
  console.log('\n🔧 Creating .env file...');
  const envContent = `# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/mern-blog

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRE=30d

# File Upload Configuration
MAX_FILE_SIZE=5242880
UPLOAD_PATH=./uploads
`;
  
  fs.writeFileSync(envPath, envContent);
  console.log('✅ .env file created!');
  console.log('⚠️  Please update the JWT_SECRET in server/.env for production use.');
} else {
  console.log('✅ .env file already exists');
}

console.log('\n🎉 Setup completed successfully!');
console.log('\n📋 Next steps:');
console.log('1. Make sure MongoDB is running on your system');
console.log('2. Start the server: cd server && npm run dev');
console.log('3. Start the client: cd client && npm run dev');
console.log('4. Open http://localhost:3000 in your browser');
console.log('\n📚 For more information, check the README.md file'); 