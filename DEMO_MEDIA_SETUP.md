# 🎬 Demo Media Setup Guide

**Simple 2-Step Process**

---

## Step 1: Add Your Media Files

Drop your demo files into: `LP/public/demos/`

### Recommended File Names:
```
public/demos/
├── demo1.png or .jpg or .gif    ← First image (top-left)
├── demo2.png or .jpg or .gif    ← Second image (top-right)
└── demo3.gif or .mp4            ← Video/GIF (bottom full-width)
```

### File Format Guide:
- **Images:** `.png`, `.jpg`, `.jpeg` (screenshots)
- **Animated:** `.gif` (auto-plays, no controls needed)
- **Videos:** `.mp4`, `.webm` (need video tag)

### Optimal Sizes:
- **Demo 1 & 2:** 1200x900px (4:3 aspect ratio)
- **Demo 3:** 1920x1080px (16:9 aspect ratio)

---

## Step 2: Update Index.tsx

Replace the placeholder divs with actual media.

### For Images (demo1.png, demo2.png):
```tsx
// Find this in Index.tsx around line 88:
<div className="bg-muted/10 border border-border/50 rounded-xl overflow-hidden aspect-[4/3] flex items-center justify-center hover:border-accent/50 transition-colors">
  <div className="text-center p-8">
    <p className="text-muted-foreground text-sm">
      Add your demo image here
    </p>
  </div>
</div>

// Replace with:
<div className="bg-muted/10 border border-border/50 rounded-xl overflow-hidden aspect-[4/3] hover:border-accent/50 transition-colors">
  <img 
    src="/demos/demo1.png" 
    alt="Demo 1" 
    className="w-full h-full object-cover"
  />
</div>
```

### For GIFs (demo3.gif):
```tsx
// Find this in Index.tsx around line 118:
<div className="bg-muted/10 border border-border/50 rounded-xl overflow-hidden aspect-video flex items-center justify-center hover:border-accent/50 transition-colors">
  <div className="text-center p-8">
    <p className="text-muted-foreground text-sm">
      Add your demo GIF or video here
    </p>
  </div>
</div>

// Replace with:
<div className="bg-muted/10 border border-border/50 rounded-xl overflow-hidden aspect-video hover:border-accent/50 transition-colors">
  <img 
    src="/demos/demo3.gif" 
    alt="Demo 3 - Animated" 
    className="w-full h-full object-cover"
  />
</div>
```

### For MP4 Videos (demo3.mp4):
```tsx
// If using MP4 instead of GIF:
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
```

---

## Full Index.tsx Changes

I'll update the file for you automatically. Just drop your media files in `public/demos/` first!

---

## File Naming Reference:

| Section | File | Location in Code |
|---------|------|------------------|
| **"See it in Action" - Left** | `/demos/demo1.png` | Line ~88 |
| **"See it in Action" - Right** | `/demos/demo2.png` | Line ~96 |
| **"Watch it Work" - Full Width** | `/demos/demo3.gif` or `.mp4` | Line ~118 |

---

## Quick Test:

1. Drop 3 files into `public/demos/`
2. Name them: `demo1.png`, `demo2.png`, `demo3.gif`
3. I'll update the code
4. Run `npm run dev`
5. Check browser - media should display!

---

## Pro Tips:

### Optimize File Sizes:
- **Images:** Use PNG/JPG compression (TinyPNG.com)
- **GIFs:** Keep under 5MB (use Gifski or ezgif.com)
- **Videos:** Use MP4 with H.264 codec, keep under 10MB

### Responsive Design:
- The code auto-handles mobile/desktop
- Images will scale proportionally
- Videos maintain aspect ratio

### Replace Anytime:
- Just overwrite files in `public/demos/`
- No code changes needed after initial setup
- Browser will cache-bust automatically on rebuild

---

## What I'll Do:

Once you confirm you have the media files ready, I'll:
1. ✅ Update Index.tsx with proper `<img>` or `<video>` tags
2. ✅ Reference `/demos/demo1.png`, `/demos/demo2.png`, `/demos/demo3.gif`
3. ✅ Keep all styling intact
4. ✅ Test that it works

**Ready? Drop your files and let me know!**
