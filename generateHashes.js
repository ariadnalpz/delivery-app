const bcrypt = require('bcrypt');

const password = 'password123';
const saltRounds = 10;

async function generateHashes() {
  for (let i = 1; i <= 4; i++) {
    const hash = await bcrypt.hash(password, saltRounds);
    console.log(`Hash para usuario ${i}: ${hash}`);
  }
}

generateHashes();