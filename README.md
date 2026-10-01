# Samuh Production Planner — GitHub version

This is a no-login, mobile-friendly static web app for GitHub Pages.

## Publish

1. Create a GitHub repository, e.g. `samuh-production-planner`.
2. Upload `index.html`, `app.js`, and `styles.css`.
3. Open **Settings → Pages**.
4. Select **Deploy from a branch**.
5. Select branch **main** and folder **/(root)**.
6. Save.

GitHub will give you a public URL.

## Features

- No login or OTP
- Dashboard
- Monthly plan upload from Excel/CSV
- Plan editing
- Rescheduling
- Cancellation
- Material readiness
- Change history
- Mobile layout
- Browser local storage

## Important

This version is static. Data is saved in the browser that made the change. If several managers need to see the same live data, the next version should connect this frontend to a shared database such as Supabase/Firebase.
