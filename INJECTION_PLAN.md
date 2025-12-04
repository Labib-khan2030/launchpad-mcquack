# INJECTION PLAN - Adding "Latest Usernames" & Injecting 107 Users

**Date:** 2025-12-03  
**Critical Requirement:** BOTH "Latest usernames" AND "x joined so far" MUST update when injection completes

## Phase 1: Add "Latest Usernames" to React App

### Implementation Location
**File:** `/src/components/WaitlistButton.tsx`

### Changes Required:
1. **Add state for latest usernames:**
   ```tsx
   const [latestUsernames, setLatestUsernames] = useState<string[]>([]);
   ```

2. **Create fetch function for usernames:**
   ```tsx
   const fetchLatestUsernames = async () => {
     const { data, error } = await supabase
       .from("waitlist")
       .select("username")
       .order("created_at", { ascending: false })
       .limit(10); // Show last 10 usernames
     
     if (!error && data) {
       setLatestUsernames(data.map(row => row.username));
     }
   };
   ```

3. **Update useEffect to fetch both count AND usernames:**
   ```tsx
   useEffect(() => {
     fetchCount();
     fetchLatestUsernames(); // ADD THIS
     
     const channel = supabase
       .channel("waitlist-changes")
       .on("postgres_changes", {
         event: "INSERT",
         schema: "public",
         table: "waitlist",
       }, () => {
         fetchCount();
         fetchLatestUsernames(); // ADD THIS
       })
       .subscribe();
   }, []);
   ```

4. **Add UI component to display usernames:**
   ```tsx
   {latestUsernames.length > 0 && (
     <div className="mt-2 w-full max-w-md">
       <p className="text-xs text-gray-400 mb-1">Latest usernames</p>
       <div className="bg-slate-900/50 border border-slate-700 rounded-lg max-h-32 overflow-y-auto p-2">
         <ul className="space-y-1">
           {latestUsernames.map((username, idx) => (
             <li key={idx} className="text-xs text-slate-200 truncate">
               {username}
             </li>
           ))}
         </ul>
       </div>
     </div>
   )}
   ```

### Expected Behavior After Implementation:
- Real-time updates via Supabase channel
- Shows last 10 usernames, newest first
- Auto-scrollable if list exceeds max height
- Matches styling of existing components

---

## Phase 2: Create Injection Script

### Script Location
**File:** `/LP/inject_test_users.ts`

### Requirements:
1. **Generate 107 unique entries:**
   - Believable Discord-style usernames
   - Fake but realistic emails
   - Unique combinations (no duplicates)

2. **Discord Username Patterns:**
   - Format: `word_word_number` or `word_number` or `wordword`
   - Examples:
     - `shadow_knight_2847`
     - `cosmic_gamer`
     - `pixel_wizard_42`
     - `neon_dragon`
     - `techno_phantom_99`

3. **Email Patterns:**
   - Use fake but realistic formats:
     - `{username}@testmail.com`
     - `test{number}@fakemail.io`
     - `user{number}@example.dev`

4. **Batch Insertion:**
   - Use Supabase client
   - Insert all 107 in single transaction if possible
   - Handle errors gracefully
   - Log success/failure for each batch

### Dependencies Needed:
- `@supabase/supabase-js` (already installed)
- `dotenv` or direct env var access for Supabase credentials
- TypeScript/Node runtime

---

## Phase 3: Execution & Verification

### Pre-Injection Checklist:
- [ ] "Latest Usernames" feature added to React app
- [ ] React app tested locally - both features visible
- [ ] Injection script created and syntax-checked
- [ ] Supabase credentials configured
- [ ] Current user count noted (baseline)

### Injection Process:
1. Run injection script: `node inject_test_users.ts`
2. Monitor console for success/error logs
3. Verify Supabase dashboard shows 107 new entries

### Post-Injection Verification (CRITICAL):
- [ ] **Supabase Database:** 107 new rows with unique usernames/emails
- [ ] **"x joined so far" Counter:** Shows (baseline + 107)
- [ ] **"Latest Usernames" Display:** Shows newest Discord usernames
- [ ] **Real-time Updates:** New signups still trigger updates
- [ ] **No Duplicates:** All usernames and emails are unique

---

## Rollback Plan (If Needed)
If injection causes issues:
```sql
-- Delete test users by email pattern
DELETE FROM waitlist WHERE email LIKE '%@testmail.com';
DELETE FROM waitlist WHERE email LIKE '%@fakemail.io';
DELETE FROM waitlist WHERE email LIKE '%@example.dev';
```

---

## Success Criteria
✅ Both "x joined so far" AND "Latest usernames" update automatically  
✅ All 107 test users in database with unique, believable data  
✅ UI components responsive and display correctly  
✅ Real-time subscription still works for new signups
