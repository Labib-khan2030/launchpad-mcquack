import { createClient } from '@supabase/supabase-js';

// Supabase configuration
const SUPABASE_URL = process.env.VITE_SUPABASE_URL || '';
const SUPABASE_KEY = process.env.VITE_SUPABASE_PUBLISHABLE_KEY || '';

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error('❌ Missing Supabase credentials!');
  console.error('Please set VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY environment variables.');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Word banks for Discord-style username generation
const adjectives = [
  'dark', 'neon', 'cyber', 'quantum', 'stellar', 'cosmic', 'mystic', 'void', 'shadow', 'pixel',
  'techno', 'phantom', 'ghost', 'chaos', 'crimson', 'azure', 'frost', 'thunder', 'electric', 'toxic',
  'digital', 'chrome', 'vapor', 'lunar', 'solar', 'crystal', 'omega', 'alpha', 'hyper', 'ultra',
  'obsidian', 'plasma', 'nether', 'astral', 'primal', 'vortex', 'nexus', 'spectrum', 'infinity', 'echo'
];

const nouns = [
  'wolf', 'dragon', 'phoenix', 'knight', 'wizard', 'reaper', 'hunter', 'raven', 'viper', 'titan',
  'specter', 'warrior', 'sentinel', 'guardian', 'demon', 'angel', 'ghost', 'wraith', 'samurai', 'ninja',
  'fox', 'hawk', 'eagle', 'bear', 'lion', 'tiger', 'panther', 'cobra', 'falcon', 'shark',
  'blade', 'storm', 'forge', 'frost', 'flame', 'spirit', 'soul', 'void', 'shade', 'cipher'
];

const suffixes = ['xd', 'tv', 'yt', 'ttv', 'god', 'pro', 'king', 'lord', 'z', 'zz', 'xxx', 'gg', 'elite', 'prime'];

// Helper functions
function getRandomElement<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Username generation patterns
function generateUsername(pattern: number, index: number): string {
  switch (pattern) {
    case 0: // word_number (e.g., shadow47)
      return `${getRandomElement(adjectives)}${getRandomNumber(10, 9999)}`;
    
    case 1: // word_word (e.g., dark_phoenix)
      return `${getRandomElement(adjectives)}_${getRandomElement(nouns)}`;
    
    case 2: // word_word_number (e.g., mystic_wolf_42)
      return `${getRandomElement(adjectives)}_${getRandomElement(nouns)}_${getRandomNumber(10, 999)}`;
    
    case 3: // word + suffix (e.g., shadowxxx)
      return `${getRandomElement(nouns)}${getRandomElement(suffixes)}`;
    
    case 4: // simple noun + number
      return `${getRandomElement(nouns)}${getRandomNumber(1, 9999)}`;
    
    default: // fallback
      return `user_${index}_${getRandomNumber(1000, 9999)}`;
  }
}

// Email generation
function generateEmail(username: string, index: number): string {
  const pattern = index % 3;
  
  switch (pattern) {
    case 0:
      return `${username}@testmail.com`;
    case 1:
      return `test${String(index).padStart(3, '0')}@fakemail.io`;
    case 2:
      return `user${getRandomNumber(1000, 9999)}@example.dev`;
    default:
      return `${username}@testmail.com`;
  }
}

// Main user generator
function generateTestUsers(count: number): Array<{ username: string; email: string }> {
  const users: Array<{ username: string; email: string }> = [];
  const usedUsernames = new Set<string>();
  const usedEmails = new Set<string>();
  
  let attempts = 0;
  const maxAttempts = count * 10; // Prevent infinite loops
  
  while (users.length < count && attempts < maxAttempts) {
    attempts++;
    
    // Cycle through patterns to get variety
    const pattern = users.length % 5;
    const username = generateUsername(pattern, users.length);
    const email = generateEmail(username, users.length);
    
    // Check for uniqueness
    if (!usedUsernames.has(username) && !usedEmails.has(email)) {
      usedUsernames.add(username);
      usedEmails.add(email);
      users.push({ username, email });
    }
  }
  
  if (users.length < count) {
    console.warn(`⚠️  Could only generate ${users.length} unique users out of ${count} requested.`);
  }
  
  return users;
}

// Main injection function
async function injectUsers() {
  console.log('🚀 Starting injection of 107 test users...\n');
  
  // Generate users
  const users = generateTestUsers(107);
  
  console.log(`✅ Generated ${users.length} unique test users`);
  console.log('\n📋 Sample usernames (first 10):');
  users.slice(0, 10).forEach((user, idx) => {
    console.log(`   ${idx + 1}. ${user.username.padEnd(30)} → ${user.email}`);
  });
  
  console.log('\n💾 Inserting into Supabase...');
  
  // Insert into database
  const { data, error } = await supabase
    .from('waitlist')
    .insert(users)
    .select();
  
  if (error) {
    console.error('\n❌ Injection FAILED:', error.message);
    console.error('Details:', error);
    process.exit(1);
  }
  
  console.log(`\n✅ SUCCESS! Injected ${users.length} users into Supabase`);
  console.log(`📊 Database now contains ${data?.length || users.length} new entries`);
  console.log('\n🎯 Next steps:');
  console.log('   1. Open your React app in the browser');
  console.log('   2. Check "x joined so far" counter');
  console.log('   3. Check "Latest usernames" display');
  console.log('   4. Verify real-time updates still work\n');
}

// Run the injection
injectUsers().catch((err) => {
  console.error('❌ Unexpected error:', err);
  process.exit(1);
});
