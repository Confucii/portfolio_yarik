# The Story Behind YarVol Portfolio
## A Development Journey for Non-Technical Readers

### Table of Contents
1. [Introduction](#introduction)
2. [The Challenge](#the-challenge)
3. [Planning Phase](#planning-phase)
4. [Technology Decisions](#technology-decisions)
5. [Building the Foundation](#building-the-foundation)
6. [Design Evolution](#design-evolution)
7. [Making It Work](#making-it-work)
8. [Challenges and Solutions](#challenges-and-solutions)
9. [The Deployment Process](#the-deployment-process)
10. [What We Learned](#what-we-learned)
11. [Looking Forward](#looking-forward)

---

## Introduction

This document tells the story of how YarVol's portfolio website came to life. Think of this as a behind-the-scenes look at building a modern website, written for people who aren't web developers. We'll explore the decisions made, problems solved, and lessons learned along the way.

**What is this project?**
A personal portfolio website for Yaroslav Volikov (YarVol), a Latvian Art Academy jewelry student and independent 3D artist. The site showcases his work in 3D art, physical jewelry pieces, and design projects.

**Where can you see it?**
The website is live at: https://confucii.github.io/portfolio_yarik/

---

## The Challenge

### The Problem We Needed to Solve

Yaroslav needed a professional online portfolio to showcase his artwork. Here's what he needed:

1. **A Beautiful Showcase**: Display high-quality images of 3D models, jewelry, and art projects
2. **Easy to Update**: Add new projects without needing to write code every time
3. **Professional Looking**: Make a good impression on potential clients, galleries, and employers
4. **Mobile Friendly**: Look good on phones, tablets, and computers
5. **Fast Loading**: Visitors shouldn't wait long for images to load
6. **Free to Host**: Keep costs down as a student

### Why Not Just Use a Template?

You might wonder: "Why not just use a website builder like Wix or Squarespace?"

**Reasons we chose to build custom:**
- **Complete Control**: Design exactly what we want, not limited by templates
- **Learning Opportunity**: Understand how websites work from the ground up
- **Portfolio Piece**: The website itself demonstrates technical skills
- **No Monthly Fees**: Free hosting through GitHub Pages
- **Future Flexibility**: Can add any feature we imagine later

---

## Planning Phase

### Understanding the Requirements

Before writing any code, we needed to answer key questions:

**1. What content needs to be displayed?**
- Art projects organized by category (3D, Physical Art, Commissions)
- Each project has multiple images
- Project descriptions and titles
- About/contact information

**2. Who are the users?**
- Art directors and gallery curators (need to see work quickly)
- Potential clients (want to contact Yarik)
- Fellow artists (browsing for inspiration)
- Mobile users (browsing on phones)

**3. What actions should users be able to do?**
- Browse different categories of work
- View project images in detail
- Read about Yarik's background
- Contact Yarik via email or Instagram

### Sketching the Structure

We mapped out the website like a building blueprint:

```
Homepage (Landing)
    ├── Introduction/Hero section
    ├── 3D Art Projects (preview)
    ├── Physical Art Projects (preview)
    └── Works You Might Have Seen (preview)

Category Pages
    └── Full view of all projects in that category
        └── Click to open image gallery

About Page
    ├── Bio and background
    ├── Skills and education
    └── Contact information
```

---

## Technology Decisions

### Choosing the Right Tools

Building a website is like building a house - you need the right tools for each job. Here's what we chose and why, explained in simple terms:

#### 1. **React - The Building Blocks**

**What it is:** A JavaScript library for building user interfaces
**Think of it like:** LEGO blocks for websites

**Why we chose it:**
- **Reusable Components**: Build a "project card" once, use it everywhere
- **Fast Updates**: When data changes, only the necessary parts of the page reload
- **Popular & Well-Supported**: Lots of help available online
- **Industry Standard**: Knowing React is valuable for future projects

**Alternatives we considered:**
- Plain HTML/CSS (too repetitive for many projects)
- Vue.js (also good, but React has more learning resources)
- WordPress (too heavy and requires database hosting)

#### 2. **Vite - The Fast Builder**

**What it is:** A tool that bundles code and runs a development server
**Think of it like:** A construction manager that organizes all materials and workers

**Why we chose it:**
- **Lightning Fast**: Changes show up instantly while developing
- **Modern**: Uses latest web standards
- **Simple Setup**: Works out of the box with minimal configuration

**What it does:**
- Turns our React code into something browsers can understand
- Automatically refreshes the browser when we save changes
- Optimizes everything for fast loading in production

#### 3. **Material-UI (MUI) - The Design System**

**What it is:** A library of pre-made, professional-looking components
**Think of it like:** A furniture catalog where everything matches

**Why we chose it:**
- **Professional Look**: Components designed by UX experts
- **Responsive by Default**: Automatically adapts to different screen sizes
- **Customizable**: Can change colors and styles to match brand
- **Time-Saving**: No need to design buttons, cards, etc. from scratch

**Components we used:**
- Cards (for project thumbnails)
- App Bar (navigation header)
- Typography (consistent text styling)
- Container (for page layout)
- Icons (menu, social media, etc.)

#### 4. **Embla Carousel - The Image Slider**

**What it is:** A smooth, touch-enabled carousel for browsing images
**Think of it like:** A digital photo album that swipes smoothly

**Why we chose it:**
- **Smooth Performance**: Doesn't lag even with many images
- **Touch-Friendly**: Works great on phones and tablets
- **Lightweight**: Doesn't slow down the website
- **Accessible**: Works with keyboard navigation

#### 5. **GitHub Pages - The Free Host**

**What it is:** Free website hosting provided by GitHub
**Think of it like:** Free real estate on the internet

**Why we chose it:**
- **Completely Free**: No monthly fees
- **Easy Deployment**: Automatic updates when code changes
- **Reliable**: Run by GitHub (owned by Microsoft)
- **HTTPS Included**: Secure connection built-in

**How it works:**
1. We push code to GitHub
2. GitHub Actions automatically builds the website
3. Built website is published to the internet
4. Everyone can visit at the GitHub Pages URL

---

## Building the Foundation

### Step 1: Setting Up the Project

**What happened:** Created the basic project structure

**In simple terms:**
Imagine preparing a workspace before starting a craft project. We:
- Created folders for different types of files (like organizing drawers)
- Installed necessary tools (like gathering scissors, glue, etc.)
- Set up the basic template (like preparing a canvas)

**Technical details:**
```bash
npm create vite@latest portfolio_yarik -- --template react
cd portfolio_yarik
npm install
```

This command created:
- A `src/` folder for our React code
- A `public/` folder for images and static files
- Configuration files that tell tools how to work
- A `package.json` file listing all the tools we need

### Step 2: Creating the Color Scheme

**The Vision:** Dark, elegant theme with pink accents

**Color Palette:**
- **Primary Background**: Dark purple (#261F31) - sophisticated and artsy
- **Accent Color**: Pink (#E091CC) - eye-catching and creative
- **Text Color**: Light pink - readable against dark background

**Why these colors?**
- **Dark background**: Makes colorful art images "pop"
- **Pink accent**: Unique and memorable, stands out from typical portfolios
- **Contrast**: Ensures text is readable for accessibility

**The mood:** Modern, artistic, slightly edgy - matches Yarik's creative work

### Step 3: Organizing Portfolio Content

**The Problem:** How to manage dozens of art projects efficiently?

**The Solution:** A smart folder structure

```
public/portfolio/
    ├── 3D/
    │   ├── jugendstil_riga_project/
    │   │   ├── metadata.json        (title, description)
    │   │   └── images/
    │   │       ├── image1.jpg
    │   │       ├── image2.jpg
    │   │       └── ...
    │   ├── pumpkin_seed_collection/
    │   └── ...
    ├── physical/
    │   ├── everyday_miracle/
    │   └── ...
    └── works_you_might_have_seen/
        └── ...
```

**Why this structure?**
- **Organized**: Each project in its own folder
- **Self-Documenting**: Folder structure shows categories
- **Easy to Add**: Drop a new folder to add a project
- **Flexible**: Can have any number of images per project

**The Magic File: metadata.json**

Each project folder has a simple text file describing it:

```json
{
  "title": "Jugendstil Riga Project",
  "description": "3D modeling of historical architecture in Riga",
  "category": "3D"
}
```

**Why this works:**
- **Human-Readable**: Anyone can understand and edit it
- **Machine-Readable**: Code can automatically read it
- **Consistent**: Every project has the same information structure

### Step 4: Automatic Data Generation

**The Challenge:** Manually listing every project would be tedious and error-prone

**The Solution:** A script that automatically scans folders and builds a project index

**How it works (in simple terms):**
1. **Scan**: Look through all folders in `public/portfolio/`
2. **Discover**: Find every project folder
3. **Read**: Open each `metadata.json` file
4. **Catalog**: Create a master list of all projects
5. **Save**: Write the list to `data.json`

**Why this is brilliant:**
- **No Manual Work**: Add a project folder and it appears automatically
- **Error-Proof**: No typos from manual entry
- **Always Up-to-Date**: Runs every time the website is built

**Example of generated data.json:**
```json
{
  "categories": [
    { "name": "3D", "projectCount": 5 },
    { "name": "physical", "projectCount": 7 }
  ],
  "projects": [
    {
      "id": "jugendstil_riga_project",
      "title": "Jugendstil Riga Project",
      "category": "3D",
      "thumbnail": "/portfolio/3D/jugendstil_riga_project/images/img1.jpg",
      "images": ["img1.jpg", "img2.jpg", "img3.jpg"]
    }
  ]
}
```

---

## Design Evolution

### The Font Journey

**Choosing the right font is like choosing the right voice for your message.**

We tried several fonts before finding the perfect one:

1. **Anton** - Too bold and aggressive
2. **Space Grotesk** - Nice but too trendy/techy
3. **PT Sans** - Good but too common
4. **Titillium Web** ✅ - Just right!

**Why Titillium Web won:**
- **Modern but Professional**: Contemporary without being flashy
- **Excellent Readability**: Clear at all sizes
- **Multiple Weights**: Can create hierarchy (bold titles, light body text)
- **Geometric Feel**: Matches the precision of 3D art
- **Free & Open Source**: From Google Fonts

### The Layout Philosophy

**Mobile-First Design:**
We designed for phones first, then adapted for larger screens.

**Why?**
- More people browse on phones than ever before
- Easier to expand a mobile design than shrink a desktop one
- Forces focus on essential content

**Responsive Breakpoints:**
- **Mobile** (< 600px): Single column, larger touch targets
- **Tablet** (600px - 900px): Two columns, more breathing room
- **Desktop** (> 900px): Multiple columns, more content visible

**Example:**
- **Mobile**: Show 2 project cards per row
- **Tablet**: Show 3 project cards per row
- **Desktop**: Show 4-5 project cards per row

### The Navigation Strategy

**Keep it simple:**
- **Logo/Name**: Links to homepage
- **Home**: Browse all work
- **About**: Learn about Yarik and contact

**Why so minimal?**
- Portfolio work is the star, navigation shouldn't distract
- Fewer options = less decision fatigue
- Faster to find what you need

---

## Making It Work

### The Homepage Experience

**Goal:** Show breadth of work without overwhelming visitors

**How we achieved it:**

1. **Hero Section**: Brief introduction
   - Name and title in large, bold text
   - One-sentence bio
   - Establishes who Yarik is immediately

2. **Category Previews**: Horizontal scrolling sections
   - Each category shows a preview of projects
   - "View All" link to see complete category
   - Sorted by number of projects (show biggest categories first)

**Design Decision: Why horizontal scrolling?**
- **More Content Visible**: See more projects at a glance
- **Familiar Pattern**: Used by Netflix, App Store, etc.
- **Encourages Exploration**: Invites swiping/scrolling
- **Mobile-Friendly**: Natural swipe gesture on phones

### The Category Page with Lightbox

**User Flow:**
1. Click a category from homepage (e.g., "3D")
2. See all projects in that category (full grid view)
3. Click a project
4. Lightbox opens with all project images
5. Swipe through images in carousel
6. Click outside or press "X" to close

**Key Feature: Smart Mobile Behavior**

**The Problem:**
Lightbox (full-screen image viewer) can be clunky on phones:
- Harder to swipe images
- Confusing navigation
- Accidental closes

**The Solution:**
We disabled the lightbox on mobile devices!

**On Mobile:**
- Click project → Scroll to see all images on the page
- Simpler, more predictable behavior
- Better for touch navigation

**On Desktop:**
- Click project → Lightbox opens
- Full-screen image viewing
- Carousel navigation with arrow keys

**The Code Logic (simplified):**
```javascript
// Detect if screen is mobile-sized
const isMobile = window.width < 600px;

// Only open lightbox on desktop
if (!isMobile) {
  openLightbox();
}
```

### The About Page

**Content Strategy:**
- Personal story and background
- Education and skills
- Contact information (email, Instagram)

**Design Approach:**
- Clean, readable layout
- Links to social profiles
- Professional but personal tone

---

## Challenges and Solutions

### Challenge 1: Project IDs with Special Characters

**The Problem:**
Some project folder names had special characters:
- "No_tears_for_the_creatures_of_the_night"
- "ĀDAŽI" (with special Latvian character)

When used in URLs, these could break:
```
/category/3D#No_tears_for_the_creatures_of_the_night  ❌ Breaks
```

**The Solution: Escaping Special Characters**

We created utility functions to safely convert IDs:
```javascript
// Before using in URL
escapeProjectId("ĀDAŽI") → "ĀDAŽI"  // Safe for URLs

// When reading from URL
unescapeProjectId("ĀDAŽI") → "ĀDAŽI"  // Original name
```

**Why this matters:**
- URLs work correctly
- No broken links
- Project names can use any characters

### Challenge 2: Card Hover Effects Not Showing

**The Problem:**
We wanted project cards to glow pink when you hover over them, but the glow was being cut off.

**The Cause:**
CSS property `overflow: hidden` was clipping the shadow effect

**Visual explanation:**
```
Without fix:              With fix:
┌────────────┐           ┌────────────┐
│   Card     │ ← Shadow  │   Card     │
│            │   cut off │            │
└────────────┘           │  ◠◠◠◠◠◠◠◠  │ ← Shadow visible
                         └────────────┘
```

**The Solution:**
Removed `overflow: hidden` from the card container

**Lesson Learned:**
CSS properties interact in complex ways. Sometimes a style meant to fix one thing breaks another. Test thoroughly!

### Challenge 3: Animation Performance

**The Problem:**
Initial animations felt janky or stuttered on some devices

**Diagnosis:**
- Too many elements animating at once
- Animations triggering layout recalculations

**The Solutions:**
1. **Use CSS Transform**: Instead of animating `top/left`, use `transform: translate()`
   - Transform is GPU-accelerated (faster)
   - Doesn't trigger layout recalculation

2. **Reduce Simultaneous Animations**: Don't animate every card at once
   - Stagger animations with delays
   - Only animate what's visible

3. **Simplify Hover Effects**: Keep transitions smooth but simple
   - Focus on shadow and scale changes
   - Avoid complex color transitions

### Challenge 4: Optimizing for GitHub Pages

**The Problem:**
GitHub Pages serves from a subdirectory: `/portfolio_yarik/`

**The Issue:**
If you don't configure correctly:
```
Image path: /images/photo.jpg
Actual location: /portfolio_yarik/images/photo.jpg
Result: 404 Not Found ❌
```

**The Solution:**
Configure Vite with the base path:

```javascript
// vite.config.js
export default {
  base: '/portfolio_yarik/'
}
```

Now when building:
```
Image path: /portfolio_yarik/images/photo.jpg ✅
```

**Lesson Learned:**
Deployment environments differ from local development. Always configure for production reality.

---

## The Deployment Process

### Understanding Automated Deployment

**The Old Way (Manual):**
1. Write code
2. Build the website on your computer
3. Upload built files to server
4. Repeat for every change

**Problems:**
- Time-consuming
- Error-prone (forget a file? Website breaks)
- Can't collaborate easily

**The New Way (Automated with GitHub Actions):**
1. Write code
2. Push to GitHub
3. **GitHub automatically builds and deploys**
4. Website updates in minutes

### How GitHub Actions Works

Think of GitHub Actions like a robot assistant:

**The Workflow (in simple terms):**

```
You push code to GitHub
        ↓
GitHub robot wakes up
        ↓
Robot gets a fresh copy of your code
        ↓
Robot installs all necessary tools (Node.js, dependencies)
        ↓
Robot runs: "npm run generate-data"
   (Scans portfolio folders, creates data.json)
        ↓
Robot runs: "npm run build"
   (Compiles React app into HTML/CSS/JS)
        ↓
Robot packages the built files
        ↓
Robot deploys to GitHub Pages
        ↓
Your website is live!
```

**The Magic File: `.github/workflows/deploy.yml`**

This file contains instructions for the GitHub robot:

```yaml
# When to wake up
on:
  push:
    branches: [main]  # Any push to main branch

# What to do
jobs:
  build:
    - Install dependencies
    - Generate data
    - Build website

  deploy:
    - Take built files
    - Publish to GitHub Pages
```

**Benefits:**
- **Consistent**: Same process every time
- **Fast**: Deploys in 2-3 minutes
- **Automatic**: No manual work
- **Auditable**: Can see logs of every deployment

### Deployment Timeline

**Example Deployment:**

- **0:00** - Developer pushes code to GitHub
- **0:05** - GitHub Actions starts (slight delay)
- **0:30** - Dependencies installed
- **1:00** - Portfolio data generated
- **1:30** - Website built
- **2:00** - Deployed to GitHub Pages
- **2:30** - Website live! 🎉

---

## What We Learned

### Technical Lessons

**1. Build Systems Matter**
- Vite's speed makes development enjoyable
- Fast feedback loop = faster iteration
- Modern build tools are worth learning

**2. Component Architecture is Powerful**
- Build once, reuse everywhere
- Easier to maintain and update
- Forces thinking about structure upfront

**3. Automation Saves Time**
- Auto-generating data.json eliminated hours of manual work
- Automated deployment removes deployment stress
- Initial setup time pays off quickly

**4. Mobile Requires Different Thinking**
- What works on desktop may not work on mobile
- Test on real devices, not just browser resize
- Sometimes the solution is disabling features on mobile (like our lightbox)

**5. Performance is About Tradeoffs**
- More features = more complexity = slower site
- Balance visual appeal with load time
- Lazy loading and code splitting help

### Design Lessons

**1. Constraints Drive Creativity**
- Dark theme made color choices easier
- Limited navigation forced focus on essentials
- Mobile-first approach created cleaner design

**2. Consistency Matters**
- Using a design system (Material-UI) ensured visual consistency
- Consistent spacing and typography make site feel professional
- Small inconsistencies are very noticeable

**3. Font Choice Impacts Perception**
- Tried 4 different fonts before finding the right one
- Font affects the entire feel of the site
- Worth taking time to get it right

**4. User Experience Trumps Features**
- Disabled lightbox on mobile for better UX
- Sometimes less is more
- Test with real users if possible

### Process Lessons

**1. Document Decisions**
- Commit messages help remember why changes were made
- Documentation helps onboard new contributors
- Future you will thank past you

**2. Version Control is Essential**
- Git allows experimentation without fear
- Can always revert bad changes
- Enables collaboration

**3. Incremental Development Works**
- Build features one at a time
- Test each piece before moving on
- Easier to debug small changes

**4. Iterate on Feedback**
- Initial designs are rarely perfect
- Be willing to change course
- Test early, test often

---

## Looking Forward

### Planned Improvements

**1. Image Optimization**
- **Current State**: Images uploaded as-is (JPG/PNG)
- **Future Plan**: Auto-convert to WebP format (50-80% smaller files)
- **Benefit**: Faster loading, better user experience
- **Implementation**: Integrate optimize-images.js script into GitHub Actions

**2. Search and Filtering**
- **Current State**: Browse by category only
- **Future Plan**: Search bar to find projects by name or description
- **Benefit**: Easier to find specific work
- **Bonus**: Tag system (e.g., "architecture", "jewelry", "digital art")

**3. Blog Section**
- **Purpose**: Share process, behind-the-scenes, work-in-progress
- **Implementation**: Markdown files for posts, simple blog listing
- **Benefit**: More dynamic content, better SEO, engage visitors

**4. Analytics**
- **Purpose**: Understand who visits and what they view
- **Tool**: Privacy-friendly analytics (Plausible or similar)
- **Benefit**: Know which projects resonate with visitors

**5. Contact Form**
- **Current State**: Email and Instagram links only
- **Future Plan**: Form directly on website
- **Implementation**: Service like Formspree (free tier)
- **Benefit**: Lower barrier to contact

**6. Accessibility Enhancements**
- Keyboard navigation improvements
- Better screen reader support
- More descriptive alt text for images
- Higher contrast options

**7. Performance Enhancements**
- Code splitting (load only what's needed per page)
- Image lazy loading (load images as you scroll)
- Service worker for offline access

### Scaling Considerations

**If the portfolio grows significantly:**

**Challenge: Hundreds of projects**
- **Solution**: Pagination (show 20 projects per page)
- **Solution**: Virtual scrolling (only render visible items)

**Challenge: Very large images**
- **Solution**: Image CDN (Cloudflare, Cloudinary)
- **Solution**: Progressive image loading (blur → full quality)

**Challenge: Multiple administrators**
- **Solution**: CMS (Content Management System) like Strapi or Sanity
- **Solution**: Admin panel for adding projects without touching code

### Potential Features

**Portfolio Enhancements:**
- Video support (in addition to images)
- 3D model viewer (interactive rotation)
- Before/after sliders for process work
- Client testimonials section

**Engagement Features:**
- Like/favorite projects (stored locally)
- Share buttons for social media
- Email newsletter signup
- RSS feed for updates

**Professional Features:**
- Downloadable CV/resume
- Case studies for featured projects
- Pricing/commission information
- Booking/inquiry system

---

## Conclusion

### What We Built

Starting from an empty folder, we created:
- A professional portfolio website
- An automated deployment system
- A scalable content management approach
- A beautiful, responsive user experience

### The Real Achievement

Beyond the code, we learned:
- How modern web development works
- The importance of planning and architecture
- How to make technical tradeoffs
- The value of automation and documentation

### Final Thoughts

Building this portfolio website was about more than creating a place to display art. It was about:
- **Understanding the Web**: How browsers, servers, and code work together
- **Problem-Solving**: Every feature presented challenges to overcome
- **User Empathy**: Designing for how people actually use websites
- **Professional Growth**: Creating something that represents Yarik's work and skills

The website is live, functional, and ready to showcase Yarik's incredible work. But it's also a living project - it will evolve as his career grows, new technologies emerge, and user needs change.

**That's the beauty of web development: it's never truly "done," just continuously improving.**

---

## Glossary for Non-Technical Readers

**API (Application Programming Interface)**: A way for different programs to talk to each other
**Build Process**: Converting source code into a website browsers can display
**CDN (Content Delivery Network)**: Servers worldwide that deliver website files faster
**CI/CD**: Continuous Integration/Continuous Deployment - automating testing and deployment
**Component**: A reusable piece of UI (like a button or card)
**CSS**: Code that controls how websites look (colors, layout, fonts)
**Deployment**: Publishing a website so people can visit it
**Git**: Version control system - tracks changes to code over time
**GitHub**: Website for storing and sharing code
**GitHub Actions**: Automation tool built into GitHub
**HTML**: The structure/content of web pages
**JavaScript**: Programming language that makes websites interactive
**Lightbox**: Full-screen image viewer overlay
**Node.js**: JavaScript runtime for running code outside browsers
**NPM**: Package manager - installs tools and libraries
**React**: Library for building user interfaces
**Repository**: Folder containing all project files and history
**Responsive Design**: Website that adapts to different screen sizes
**SEO (Search Engine Optimization)**: Making websites appear in Google search
**SPA (Single Page Application)**: Website that loads once, updates dynamically
**UI (User Interface)**: What users see and interact with
**UX (User Experience)**: How easy and pleasant a website is to use
**Vite**: Modern build tool for web development
**WebP**: Modern image format (smaller file sizes than JPG/PNG)

---

**Author**: Development team for YarVol Portfolio
**Date**: November 2025
**Purpose**: Educational documentation for non-technical audiences
**Status**: Living document - will be updated as project evolves

---

*This development story was created to help non-technical people understand the process, decisions, and learnings from building a modern web portfolio. We hope it demystifies web development and shows that behind every website is a story of problem-solving, iteration, and creativity.*
