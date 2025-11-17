# Quick Start Guide - For Non-Technical Users

This guide will help you add your portfolio projects without using the command line or any technical tools.

## What You Need

- Your portfolio images (PNG/JPG files)
- Basic project information (title, description)
- A GitHub account
- Your images organized in folders

## Step-by-Step: Adding Your First Project

### 1. Organize Your Files on Your Computer

Create a folder structure like this on your desktop:

```
my-project/
├── metadata.json
└── images/
    ├── photo1.png
    ├── photo2.png
    └── photo3.png
```

### 2. Create the metadata.json File

Open a text editor (Notepad on Windows, TextEdit on Mac) and create a file called `metadata.json` with this content:

```json
{
  "title": "Book of the Damned",
  "description": "My first 3D I've ever made. Starting from objects and materials, i made full scene.",
  "category": "3D"
}
```

**Important:**
- Replace the title and description with your project info
- Make sure `category` matches exactly: `3D`, `WebDesign`, or `Photography`
- Save the file as `metadata.json` (not `metadata.json.txt`!)

**Windows users:** In Notepad, choose "All Files" when saving, not "Text Documents"

### 3. Upload to GitHub

1. **Go to your repository:**
   - Open your browser
   - Go to `https://github.com/Confucii/portfolio_yarik`
   - Log in if needed

2. **Navigate to the portfolio folder:**
   - Click on the `portfolio/` folder
   - Click on your category folder (e.g., `3D/`)

3. **Upload your project:**
   - Click the "Add file" button (top right)
   - Select "Upload files"
   - Drag your entire project folder into the browser window
   - OR click "choose your files" and select all files

4. **Commit the changes:**
   - Scroll down
   - In "Commit message" box, type: `Add new project: [your project name]`
   - Click the green "Commit changes" button

### 4. Wait for Your Site to Update

- GitHub will automatically update your website
- This takes about 2-3 minutes
- You can check progress:
  - Click "Actions" tab at the top
  - You'll see a workflow running
  - Wait for the green checkmark ✓

### 5. View Your Project

- Go to: `https://confucii.github.io/portfolio_yarik/`
- Click on your category
- Your new project should appear!

## Common Issues

### "My metadata.json won't save correctly"

**Problem:** File saves as `metadata.json.txt`

**Solution:**
- **Windows:**
  - In Notepad, choose "Save As"
  - File type: "All Files (*.*)"
  - Type the name: `metadata.json`

- **Mac:**
  - Use TextEdit
  - Format → Make Plain Text
  - Save as `metadata.json`

### "My images are too large to upload"

**Problem:** GitHub says files are too large

**Solution:**
- You can upload files up to 100MB each
- If larger, compress your images first:
  - Use https://tinypng.com (free)
  - Or contact someone technical to use GitHub Releases

### "I don't see my project after uploading"

**Checklist:**
- Did you wait 2-3 minutes?
- Did the GitHub Action complete? (check Actions tab)
- Is your `metadata.json` file formatted correctly?
- Did you put files in the right category folder?

## Editing an Existing Project

### Changing the Title or Description

1. Go to your repository on GitHub
2. Navigate to the project folder
3. Click on `metadata.json`
4. Click the pencil icon (Edit)
5. Make your changes
6. Scroll down and click "Commit changes"
7. Wait 2-3 minutes for the site to update

### Adding More Images

1. Navigate to your project's `images/` folder
2. Click "Add file" → "Upload files"
3. Drag your new images
4. Commit the changes
5. Wait for the site to rebuild

### Deleting a Project

1. Navigate to the project folder
2. Click the project folder name
3. Click the "..." menu (top right)
4. Select "Delete directory"
5. Confirm the deletion
6. Wait for the site to update

## Tips for Best Results

### Image Guidelines

- **Size:** Keep images under 5MB each for fast loading
- **Format:** PNG or JPG (both work!)
- **Dimensions:** Recommended 1920x1080 or similar
- **Number:** 5-15 images per project is ideal

### Writing Descriptions

- **Be concise:** 2-3 sentences is perfect
- **Highlight key points:** What makes this project special?
- **Mention techniques:** What tools or skills did you use?

### Organizing Projects

- **Category names must match exactly:** `3D`, `WebDesign`, `Photography`
- **Project folder names:** Use lowercase, no spaces (use `-` or `_`)
  - Good: `my-awesome-project`
  - Bad: `My Awesome Project`

## Example metadata.json Templates

### For a 3D Project
```json
{
  "title": "Sci-Fi Environment",
  "description": "A futuristic cityscape created in Blender. Features advanced lighting, procedural textures, and particle systems.",
  "category": "3D"
}
```

### For a Web Design Project
```json
{
  "title": "E-Commerce Redesign",
  "description": "Modern redesign of an online store. Focus on user experience, mobile responsiveness, and conversion optimization.",
  "category": "WebDesign"
}
```

### For a Photography Project
```json
{
  "title": "Urban Landscapes",
  "description": "A series of architectural photography capturing the beauty of modern city design. Shot with Canon EOS R5.",
  "category": "Photography"
}
```

## Need Help?

If you run into issues:

1. **Check the main README.md** - Has detailed troubleshooting
2. **Look at existing projects** - See how they're structured
3. **Ask for help** - Open an issue on GitHub with your question

## Video Tutorial (Coming Soon)

A step-by-step video tutorial will be added to help visual learners!

---

**Remember:** Every change you make takes 2-3 minutes to appear on the live site. Be patient! ⏰
