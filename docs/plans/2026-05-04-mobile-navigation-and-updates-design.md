# Mobile Navigation & Updates Design

**Date**: 2026-05-04
**Status**: Approved
**Target Commit**: f7dc1b7

## Overview

Revert portfolio to commit f7dc1b7, remove QR code, ensure WhatsApp icon is prominent, and implement mobile-first hamburger navigation.

## Changes

### 1. Git Operations
- Hard reset to commit `f7dc1b7` (fix: mobile-first responsive tables, contrast, arrow simplicity)
- Removes commits ce40845 and a8e1291

### 2. Link Verification
All links already correct in `lib/data.js`:
- Phone: +20 115 468 8628 ✓
- LinkedIn: https://www.linkedin.com/in/omar-ashraf-176790262/ ✓
- Instagram: https://www.instagram.com/omarashraf871/ ✓
- GitHub: https://github.com/www-e ✓
- Upwork: https://www.upwork.com/freelancers/~016247fec408960a4d ✓

### 3. QR Code Removal
- Remove `.nav-wa-qr` CSS class from `app/styles/navbar.css`
- Remove any QR code image references
- Ensure WhatsApp icon (`.nav-bar__whatsapp-svg`) is prominent
- Link: `https://wa.me/20115468628`

### 4. Mobile Navigation: Hamburger Menu

**Desktop (>768px)**: Keep existing layout

**Mobile (≤768px)**:
- Hamburger icon (☰) top-left
- Omar logo centered
- Slide-in drawer from right with:
  - Nav links: Home, About, Projects (expandable), Experience, Careers Guide
  - WhatsApp CTA
  - Social icons
- Backdrop overlay
- GSAP animations for open/close
- Click outside or Escape to close

## Technical Implementation

**Parallel Agent Tasks**:
1. Git revert and link verification
2. QR removal and WhatsApp setup
3. Mobile hamburger menu implementation

## Success Criteria

- [x] Repository at commit f7dc1b7 + new changes
- [x] QR code removed, WhatsApp icon visible
- [x] Mobile hamburger menu functional
- [x] All links correct and working
- [x] Responsive design tested
- [x] Committed and pushed to main
