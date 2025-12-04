# INJECTION SCRIPT DESIGN - 107 Test Users

**Date:** 2025-12-03  
**Objective:** Generate and inject 107 believable test users with Discord-style usernames

## Username Generation Strategy

### Discord Username Patterns (Realistic & Believable)

#### Pattern Categories:
1. **Word + Number** (25 users)
   - Format: `{adjective}{number}` or `{noun}{number}`
   - Examples: `shadow47`, `cosmic89`, `pixel23`

2. **Word_Word** (25 users)
   - Format: `{adjective}_{noun}`
   - Examples: `dark_phoenix`, `neon_dragon`, `cyber_knight`

3. **Word_Word_Number** (30 users)
   - Format: `{adjective}_{noun}_{number}`
   - Examples: `mystic_wolf_42`, `quantum_fox_88`, `stellar_hawk_99`

4. **Word + Suffix** (15 users)
   - Format: `{noun}{cool_suffix}`
   - Examples: `shadowxxx`, `cyberz`, `pixelgod`, `neontv`

5. **Short Edgy Names** (12 users)
   - Format: Single words or compounds
   - Examples: `void`, `glitch`, `nexus`, `prism`, `cipher`

### Word Banks

#### Adjectives (Cool/Gaming Style):
```
dark, neon, cyber, quantum, stellar, cosmic, mystic, void, shadow, pixel,
techno, phantom, ghost, chaos, crimson, azure, frost, thunder, electric, toxic,
digital, chrome, vapor, lunar, solar, crystal, omega, alpha, hyper, ultra
```

#### Nouns (Gaming/Fantasy):
```
wolf, dragon, phoenix, knight, wizard, reaper, hunter, raven, viper, titan,
specter, warrior, sentinel, guardian, demon, angel, ghost, wraith, samurai, ninja,
fox, hawk, eagle, bear, lion, tiger, panther, cobra, falcon, shark
```

#### Cool Suffixes:
```
xd, tv, yt, ttv, god, pro, king, lord, master, z, zz, xxx, gg, elite, prime
```

### Number Range:
- Use numbers: 1-9999
- Prefer: 2-4 digit numbers (looks more natural)
- Avoid: 69, 420, 666, 1337 (too obvious meme numbers)

---

## Email Generation Strategy

### Email Patterns (Fake but Realistic):

1. **Pattern 1:** `{username}@testmail.com` (40 users)
2. **Pattern 2:** `test{number}@fakemail.io` (35 users)
3. **Pattern 3:** `user{random}@example.dev` (32 users)

### Requirements:
- All emails MUST be unique
- Keep consistent domains for easy cleanup
- Use sequential or random numbers to ensure uniqueness

---

## Script Structure

```typescript
import { createClient } from '@supabase/supabase-js';

// Supabase config
const SUPABASE_URL = process.env.VITE_SUPABASE_URL || '';
const SUPABASE_KEY = process.env.VITE_SUPABASE_PUBLISHABLE_KEY || '';

// Word banks
const adjectives = [...];
const nouns = [...];
const suffixes = [...];

// Generation functions
function generateUsername(pattern: string, index: number): string {...}
function generateEmail(username: string, index: number, pattern: number): string {...}
function getRandomElement<T>(arr: T[]): T {...}
function getRandomNumber(min: number, max: number): number {...}

// Main generator
function generateTestUsers(count: number): Array<{username: string, email: string}> {
  const users = [];
  const usedUsernames = new Set();
  const usedEmails = new Set();
  
  for (let i = 0; i < count; i++) {
    // Generate unique username
    let username, email;
    do {
      username = generateUsername(...);
      email = generateEmail(username, i, ...);
    } while (usedUsernames.has(username) || usedEmails.has(email));
    
    usedUsernames.add(username);
    usedEmails.add(email);
    users.push({ username, email });
  }
  
  return users;
}

// Insertion function
async function injectUsers() {
  const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
  const users = generateTestUsers(107);
  
  console.log('Generated 107 test users...');
  console.log('Sample:', users.slice(0, 5));
  
  // Batch insert (Supabase allows up to 1000 per request)
  const { data, error } = await supabase
    .from('waitlist')
    .insert(users);
  
  if (error) {
    console.error('Injection failed:', error);
  } else {
    console.log('✅ Successfully injected 107 users!');
  }
}

injectUsers();
```

---

## Sample Output (First 10 Users):

```
1.  username: "shadow_wolf_2847"      email: "shadow_wolf_2847@testmail.com"
2.  username: "neon_dragon"           email: "neon_dragon@testmail.com"
3.  username: "cyber_phantom_99"      email: "cyber_phantom_99@testmail.com"
4.  username: "mystic_reaper_42"      email: "test001@fakemail.io"
5.  username: "quantum_viper"         email: "test002@fakemail.io"
6.  username: "pixel_hunter_88"       email: "test003@fakemail.io"
7.  username: "void_sentinel"         email: "user7734@example.dev"
8.  username: "ghostxxx"              email: "user9281@example.dev"
9.  username: "stellar_hawk_77"       email: "stellar_hawk_77@testmail.com"
10. username: "crimson_titan"         email: "test010@fakemail.io"
```

---

## Validation Rules:
- [x] All usernames unique
- [x] All emails unique
- [x] Usernames: 3-30 characters
- [x] Usernames: alphanumeric + underscores only
- [x] Emails: valid format
- [x] No profanity or inappropriate terms
- [x] Realistic Discord naming conventions

---

## Execution Command:
```bash
# Option 1: Direct TypeScript execution
tsx inject_test_users.ts

# Option 2: Compile then run
tsc inject_test_users.ts && node inject_test_users.js

# Option 3: Node with ESM
node --loader ts-node/esm inject_test_users.ts
```
