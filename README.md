# Sujal Malaviya - AI & Data Science Portfolio

A premium, modern, high-end personal portfolio website built with HTML5, CSS3, and Vanilla JavaScript. Designed specifically for an aspiring Data Scientist and AI/ML Engineer.

## Folder Structure

```
Portfolio/
│
├── index.html          # Main HTML structure
├── README.md           # Documentation
├── css/
│   └── style.css       # Custom styling (variables, layout, animations)
├── js/
│   └── script.js       # Interactivity (Modal, Chatbot, Validation, Animations)
└── assets/             # **YOU MUST CREATE THIS FOLDER**
    ├── images/         # Place your project and OG images here
    ├── icons/          # Place any custom icons here
    └── resume.pdf      # Place your actual resume PDF here
```

## Setup & Running Locally

1. **Prerequisites:** 
   - A code editor like [Visual Studio Code (VS Code)](https://code.visualstudio.com/).
   - The [Live Server Extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) installed in VS Code.

2. **How to run:**
   - Open the `Portfolio` folder in VS Code.
   - Right-click on `index.html` and select **"Open with Live Server"**.
   - Your default browser will open and display the website. It will automatically reload when you make changes.

## Customization Guide

### 1. Adding Your Real Links
Open `index.html` and search for `ADD_GITHUB_URL`. Replace this placeholder with your actual GitHub profile URL (e.g., `https://github.com/sujalmalaviya`).

### 2. Adding Your Resume
1. Create a folder named `assets` in the same directory as `index.html`.
2. Place your resume PDF file inside `assets` and name it exactly `resume.pdf` (so the path is `assets/resume.pdf`).
3. The "Download Resume" buttons are pre-configured to look for this file.

### 3. Adding Project Images
Currently, the projects use nice FontAwesome icon placeholders. To add real images:
1. Place your images in `assets/images/`.
2. In `index.html`, replace the `<div class="img-placeholder">...</div>` with an `<img>` tag:
   ```html
   <img src="./assets/images/project1.jpg" alt="Project 1">
   ```

### 4. Contact Form Configuration
The contact form uses [FormSubmit](https://formsubmit.co). 
- It is already configured with your email: `sujalmalaviya720@gmail.com`.
- **Important:** The very first time someone sends a message, FormSubmit will send an activation email to your address. You must click the activation link in that email to start receiving messages.
- No backend code is required!

## Deployment Instructions

### Option 1: Deploy on GitHub Pages (Recommended)
1. Create a new repository on GitHub (e.g., `portfolio`).
2. Upload all the files (`index.html`, `css/`, `js/`, `assets/`) to the repository.
3. Go to the repository **Settings** > **Pages**.
4. Under "Build and deployment", select the **main** branch and click **Save**.
5. Wait a few minutes, and your site will be live at `https://<your-username>.github.io/<repo-name>/`.

### Option 2: Deploy on Vercel
1. Create a free account on [Vercel](https://vercel.com/).
2. Click **Add New** > **Project**.
3. Import your GitHub repository containing the portfolio.
4. Leave all build settings as default (since it's plain HTML/CSS/JS).
5. Click **Deploy**. Vercel will provide a live URL instantly.

## Features Included
- **Fully Responsive:** Adapts to all screen sizes (mobile, tablet, desktop).
- **No Dependencies:** Built with Vanilla HTML/CSS/JS for maximum performance.
- **Sujal AI Chatbot:** A lightweight local chatbot built into the UI.
- **Dynamic Project Filtering & Modals:** View project details cleanly.
- **Intersection Observer Animations:** Elements animate smoothly as you scroll.
- **Dark Mode Premium UI:** Uses a luxurious dark/gold aesthetic with glassmorphism.
