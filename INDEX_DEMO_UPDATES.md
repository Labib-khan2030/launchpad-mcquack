# Index.tsx Demo Media Updates

**Exact code changes to add your demos**

---

## Current Placeholder Code (Line 88-104):

```tsx
<div className="grid md:grid-cols-2 gap-6">
  <div className="bg-muted/10 border border-border/50 rounded-xl overflow-hidden aspect-[4/3] flex items-center justify-center hover:border-accent/50 transition-colors">
    <div className="text-center p-8">
      <p className="text-muted-foreground text-sm">
        Add your demo image here
      </p>
    </div>
  </div>
  <div className="bg-muted/10 border border-border/50 rounded-xl overflow-hidden aspect-[4/3] flex items-center justify-center hover:border-accent/50 transition-colors">
    <div className="text-center p-8">
      <p className="text-muted-foreground text-sm">
        Add your demo image here
      </p>
    </div>
  </div>
</div>
```

## Updated Code (With Media):

```tsx
<div className="grid md:grid-cols-2 gap-6">
  {/* Demo 1 - Left Image */}
  <div className="bg-muted/10 border border-border/50 rounded-xl overflow-hidden aspect-[4/3] hover:border-accent/50 transition-colors">
    <img 
      src="/demos/demo1.png" 
      alt="Feature Demo 1" 
      className="w-full h-full object-cover"
    />
  </div>
  
  {/* Demo 2 - Right Image */}
  <div className="bg-muted/10 border border-border/50 rounded-xl overflow-hidden aspect-[4/3] hover:border-accent/50 transition-colors">
    <img 
      src="/demos/demo2.png" 
      alt="Feature Demo 2" 
      className="w-full h-full object-cover"
    />
  </div>
</div>
```

---

## Current Video Placeholder (Line 117-125):

```tsx
<div className="space-y-6">
  <div className="bg-muted/10 border border-border/50 rounded-xl overflow-hidden aspect-video flex items-center justify-center hover:border-accent/50 transition-colors">
    <div className="text-center p-8">
      <p className="text-muted-foreground text-sm">
        Add your demo GIF or video here
      </p>
    </div>
  </div>
</div>
```

## Updated Code (GIF Version):

```tsx
<div className="space-y-6">
  {/* Demo 3 - GIF/Video */}
  <div className="bg-muted/10 border border-border/50 rounded-xl overflow-hidden aspect-video hover:border-accent/50 transition-colors">
    <img 
      src="/demos/demo3.gif" 
      alt="Feature Demo 3 - Animated" 
      className="w-full h-full object-cover"
    />
  </div>
</div>
```

## Updated Code (MP4 Version):

```tsx
<div className="space-y-6">
  {/* Demo 3 - Video */}
  <div className="bg-muted/10 border border-border/50 rounded-xl overflow-hidden aspect-video hover:border-accent/50 transition-colors">
    <video 
      src="/demos/demo3.mp4" 
      autoPlay 
      loop 
      muted 
      playsInline
      className="w-full h-full object-cover"
    />
  </div>
</div>
```

---

## What Changes:

1. **Remove:** Placeholder `<div>` with text
2. **Add:** `<img>` tag with `src="/demos/demoN.png"`
3. **Keep:** All className styling (borders, hover effects, aspect ratios)

---

## File Structure After Update:

```
LP/
├── public/
│   ├── demos/              ← CREATE THIS
│   │   ├── demo1.png      ← YOUR FILE
│   │   ├── demo2.png      ← YOUR FILE
│   │   └── demo3.gif      ← YOUR FILE
│   ├── C.png
│   ├── favicon.ico
│   └── ...
├── src/
│   ├── pages/
│   │   └── Index.tsx      ← I'LL UPDATE THIS
│   └── ...
```

---

## The Simplest Workflow:

**Option 1: You have files NOW**
1. Tell me "I have the files"
2. Drop them in `LP/public/demos/`
3. I'll update Index.tsx immediately
4. You run `npm run dev` and see them

**Option 2: You'll add files LATER**
1. I update Index.tsx NOW (references will just 404 until you add files)
2. You drop files whenever ready
3. Refresh browser - they appear automatically

**Which do you prefer?**

---

## File Extensions Supported:

### Images (demo1, demo2):
- ✅ `.png` (best for screenshots with transparency)
- ✅ `.jpg` / `.jpeg` (best for photos, smaller file size)
- ✅ `.gif` (animated, but consider MP4 for better quality)
- ✅ `.webp` (modern, good compression)

### Video (demo3):
- ✅ `.gif` (simple, auto-plays, works in `<img>`)
- ✅ `.mp4` (best quality, smaller size, needs `<video>`)
- ✅ `.webm` (modern, good compression, needs `<video>`)

---

## Ready to Update?

**Just say:**
- "Update it now" → I'll change Index.tsx immediately
- "Wait, let me add files first" → I'll wait
- "Use placeholder images" → I'll add placeholder.svg references

**Your call!**
