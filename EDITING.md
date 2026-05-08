# How to Edit Your Blog

## Make Edits Locally

Open your blog folder in a code editor, then edit any file.

## What to Edit

| What you want to change | File |
|---|---|
| Homepage layout/content | `app/page.tsx` |
| Pregnancy post | `app/posts/hey-pregnant-mama/page.tsx` |
| Sattvik eating post | `app/posts/the-sattvik-way-of-eating/page.tsx` |
| Global styles | `app/globals.css` |
| Site layout/fonts | `app/layout.tsx` |

## Push Changes to GitHub

After saving your changes, run:

```bash
cd ~/Desktop/personal-blog
git add .
git commit -m "your change description"
git push
```

## Live Site

Vercel auto-deploys every time you push to GitHub. Your live site updates in ~1 minute.

Live URL: https://fellowfemi9.vercel.app
