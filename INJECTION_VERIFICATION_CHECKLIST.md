# INJECTION VERIFICATION CHECKLIST

**Date:** 2025-12-03  
**Critical Mission:** Verify BOTH "Latest usernames" AND "x joined so far" update correctly

---

## PRE-INJECTION CHECKLIST

### Phase 1: Code Implementation
- [ ] **File: `/src/components/WaitlistButton.tsx` modified**
  - [ ] Added `latestUsernames` state
  - [ ] Added `fetchLatestUsernames()` function
  - [ ] Updated `useEffect` to fetch usernames
  - [ ] Updated real-time subscription to refresh usernames
  - [ ] Added UI component to display usernames list
  - [ ] File saved without syntax errors

### Phase 2: Local Testing (Before Injection)
- [ ] **React app running locally** (`npm run dev`)
- [ ] **WaitlistButton component renders** without errors
- [ ] **"x joined so far" displays** current count
- [ ] **"Latest usernames" section visible** (even if empty/few users)
- [ ] **No console errors** in browser dev tools

### Phase 3: Script Preparation
- [ ] **File: `/LP/inject_test_users.ts` created**
- [ ] **Script generates 107 unique usernames** (tested dry-run)
- [ ] **Script generates 107 unique emails** (tested dry-run)
- [ ] **Supabase credentials loaded** from env vars
- [ ] **Script syntax validated** (no TypeScript errors)

### Phase 4: Baseline Recording
- [ ] **Current user count recorded:** _______ users
- [ ] **Current usernames visible (if any):** _______
- [ ] **Supabase dashboard checked:** Current row count = _______

---

## INJECTION EXECUTION CHECKLIST

### Step 1: Execute Injection Script
- [ ] Run command: `tsx inject_test_users.ts` (or equivalent)
- [ ] **Console output shows:** "Generating 107 test users..."
- [ ] **Console output shows:** Sample usernames preview
- [ ] **Console output shows:** "✅ Successfully injected 107 users!"
- [ ] **No error messages** during execution

### Step 2: Database Verification
- [ ] **Open Supabase dashboard** → Navigate to `waitlist` table
- [ ] **Row count increased by 107**
- [ ] **Scroll through new entries** - all have:
  - [ ] Unique usernames (Discord-style)
  - [ ] Unique emails
  - [ ] Valid `created_at` timestamps
- [ ] **No duplicate usernames** detected
- [ ] **No duplicate emails** detected

---

## POST-INJECTION UI VERIFICATION (THE CRITICAL PART!)

### VERIFICATION 1: "x joined so far" Counter
**Location:** WaitlistButton component (both instances in Index.tsx)

#### Steps:
1. [ ] **Refresh browser** (or wait for real-time update)
2. [ ] **Check counter value**
   - Expected: (Baseline count + 107)
   - Actual: _______
3. [ ] **Counter updated?** ✅ YES / ❌ NO

**If NO:**
- [ ] Check browser console for errors
- [ ] Check network tab for Supabase requests
- [ ] Verify `fetchCount()` function in WaitlistButton.tsx
- [ ] Check Supabase RLS policies (should allow SELECT)

---

### VERIFICATION 2: "Latest Usernames" Display
**Location:** WaitlistButton component (below the counter)

#### Steps:
1. [ ] **"Latest usernames" section visible**
2. [ ] **Username list populated** with Discord-style names
3. [ ] **Count visible usernames:** Should show ~10 (or however many fit)
4. [ ] **Usernames match** recent entries from Supabase
5. [ ] **Usernames are newest-first** (descending order by created_at)

#### Expected Display:
```
Latest usernames
┌─────────────────────────┐
│ quantum_viper_88        │
│ shadow_wolf_2847        │
│ neon_dragon             │
│ cyber_phantom_99        │
│ mystic_reaper_42        │
│ ... (more)              │
└─────────────────────────┘
```

**If NOT visible:**
- [ ] Check browser console for errors
- [ ] Verify `fetchLatestUsernames()` is called in useEffect
- [ ] Check if `latestUsernames` state is populated (React DevTools)
- [ ] Verify Supabase query returns data
- [ ] Check UI conditional rendering logic

---

### VERIFICATION 3: Real-Time Updates Still Work

#### Test New Signup:
1. [ ] **Click "Join Waitlist" button**
2. [ ] **Fill form:**
   - Username: `test_realtime_check`
   - Email: `realtime@test.com`
3. [ ] **Submit form**
4. [ ] **Observe UI:**
   - [ ] Counter increments by 1
   - [ ] "Latest usernames" list updates
   - [ ] New username appears at top of list
   - [ ] Update happens **without manual refresh**

**If real-time breaks:**
- [ ] Check Supabase channel subscription in useEffect
- [ ] Verify Supabase Realtime is enabled on `waitlist` table
- [ ] Check browser console for WebSocket errors

---

## FINAL VERIFICATION MATRIX

| Feature | Expected | Actual | Status |
|---------|----------|--------|--------|
| **Database Rows** | Baseline + 107 | _____ | ☐ |
| **"x joined so far"** | Shows correct total | _____ | ☐ |
| **"Latest Usernames"** | Shows Discord names | _____ | ☐ |
| **Real-time Updates** | Counter updates live | _____ | ☐ |
| **Username List Updates** | List updates live | _____ | ☐ |
| **No Console Errors** | Clean console | _____ | ☐ |

---

## SUCCESS CRITERIA (ALL MUST BE ✅)

- ✅ **107 test users in Supabase** with unique Discord usernames & fake emails
- ✅ **"x joined so far" displays correct total** (baseline + 107)
- ✅ **"Latest Usernames" displays Discord-style names** from database
- ✅ **Both features update in real-time** when new users join
- ✅ **No console errors** in browser dev tools
- ✅ **UI is responsive** and displays correctly on desktop/mobile

---

## ROLLBACK INSTRUCTIONS (If Something Goes Wrong)

### Remove Test Users from Database:
```sql
-- Option 1: Delete by email pattern
DELETE FROM waitlist 
WHERE email LIKE '%@testmail.com' 
   OR email LIKE '%@fakemail.io' 
   OR email LIKE '%@example.dev';

-- Option 2: Delete by created_at (if injected recently)
DELETE FROM waitlist 
WHERE created_at > '2025-12-03 19:00:00';

-- Option 3: Delete specific count (dangerous!)
DELETE FROM waitlist 
WHERE id IN (
  SELECT id FROM waitlist 
  ORDER BY created_at DESC 
  LIMIT 107
);
```

### Revert Code Changes:
```bash
cd /path/to/LP
git checkout src/components/WaitlistButton.tsx
```

---

## NOTES SECTION

**Issues Encountered:**
- _______

**Solutions Applied:**
- _______

**Final Outcome:**
- _______

**Sign-off:**
- Injection completed: ☐ YES / ☐ NO
- All verifications passed: ☐ YES / ☐ NO
- Ready for production: ☐ YES / ☐ NO
