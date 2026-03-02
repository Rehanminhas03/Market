# Marketlyn Website - Client Setup Guide

## Overview

To enable the full functionality of your Marketlyn website (onboarding form submissions, data storage, and Google Sheets integration), we need you to set up a few services and provide us with the credentials.

**Don't worry — this guide will walk you through everything step by step!**

---

## What You'll Be Setting Up

| Service | Purpose | Time Required |
|---------|---------|---------------|
| MongoDB Atlas | Store all form submissions in a database | ~10 minutes |
| Google Sheets API | Automatically add submissions to a spreadsheet | ~15 minutes |
| Email (Optional) | Send confirmation emails from your own address | ~5 minutes |

---

## Part 1: MongoDB Atlas Setup (Database)

MongoDB Atlas is a free cloud database that will store all your onboarding form submissions.

### Step 1: Create a MongoDB Atlas Account

1. Go to **https://www.mongodb.com/cloud/atlas**
2. Click **"Try Free"** or **"Start Free"**
3. Sign up with your email or Google account
4. Verify your email address

### Step 2: Create Your First Project

1. After logging in, you'll be prompted to create an organization
   - Organization Name: `Marketlyn` (or your company name)
   - Click **"Next"**
2. Create a project
   - Project Name: `Marketlyn Website`
   - Click **"Create Project"**

### Step 3: Build a Database (Cluster)

1. Click **"Build a Database"**
2. Choose **"M0 FREE"** (the free tier - perfect for starting out)
3. Select your cloud provider:
   - **AWS** is recommended
   - Choose the region closest to your users (e.g., `us-east-1` for US East Coast)
4. Cluster Name: `marketlyn-cluster` (or leave as default)
5. Click **"Create Deployment"**

### Step 4: Create a Database User

A popup will appear asking you to create a database user:

1. **Authentication Method**: Password
2. **Username**: `marketlyn_admin` (or your preferred username)
3. **Password**: Click **"Autogenerate Secure Password"**
4. **⚠️ IMPORTANT**: Click the **"Copy"** button to save the password!
5. Click **"Create Database User"**

📝 **Write this down:**
```
Database Username: ____________________
Database Password: ____________________
```

### Step 5: Configure Network Access

1. In the same popup (or go to **Network Access** in the left sidebar)
2. Click **"Add IP Address"**
3. Click **"Allow Access from Anywhere"** (this adds `0.0.0.0/0`)
   - This is required for your website hosted on Vercel to connect
4. Click **"Confirm"**

### Step 6: Get Your Connection String

1. Go to **"Database"** in the left sidebar
2. Click the **"Connect"** button on your cluster
3. Select **"Connect to your application"** (or "Drivers")
4. Make sure **Node.js** is selected and version is **5.5 or later**
5. You'll see a connection string like this:
   ```
   mongodb+srv://marketlyn_admin:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
6. **Copy this connection string**
7. Replace `<password>` with your actual password (from Step 4)
8. Add your database name before the `?`:
   ```
   mongodb+srv://marketlyn_admin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/marketlyn?retryWrites=true&w=majority
   ```

📝 **Your MongoDB Connection String:**
```
MONGODB_URI=mongodb+srv://________________:________________@________________.mongodb.net/marketlyn?retryWrites=true&w=majority
```

---

## Part 2: Google Sheets API Setup

This allows your website to automatically add new submissions to a Google Spreadsheet.

### Step 1: Create a Google Cloud Project

1. Go to **https://console.cloud.google.com/**
2. Sign in with your Google/Gmail account
3. At the top, click **"Select a project"** → **"New Project"**
4. Project Name: `Marketlyn Onboarding`
5. Click **"Create"**
6. Wait for the project to be created (takes a few seconds)
7. Make sure your new project is selected in the top dropdown

### Step 2: Enable Google Sheets API

1. In your Google Cloud project, go to the left sidebar
2. Click **"APIs & Services"** → **"Library"**
3. In the search box, type **"Google Sheets API"**
4. Click on **"Google Sheets API"** in the results
5. Click the blue **"Enable"** button
6. Wait for it to enable

### Step 3: Create a Service Account

A service account is like a robot user that can access your spreadsheet.

1. Go to **"APIs & Services"** → **"Credentials"** (in the left sidebar)
2. Click **"+ Create Credentials"** at the top
3. Select **"Service Account"**
4. Fill in the details:
   - Service Account Name: `marketlyn-sheets-bot`
   - Service Account ID: (auto-filled)
   - Description: `Bot for adding onboarding submissions to Google Sheets`
5. Click **"Create and Continue"**
6. **Skip the optional steps** - just click **"Done"**

### Step 4: Generate the Service Account Key

1. You should now see your service account listed
2. Click on the service account email (looks like: `marketlyn-sheets-bot@your-project.iam.gserviceaccount.com`)
3. Go to the **"Keys"** tab
4. Click **"Add Key"** → **"Create new key"**
5. Select **"JSON"** format
6. Click **"Create"**
7. **A JSON file will automatically download** - keep this file safe!

📝 **Open the downloaded JSON file** and find these two values:

```
"client_email": "marketlyn-sheets-bot@your-project.iam.gserviceaccount.com"
"private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADA....long string....\n-----END PRIVATE KEY-----\n"
```

**Copy these exactly as they appear in the file.**

### Step 5: Create Your Google Spreadsheet

1. Go to **https://sheets.google.com**
2. Click the **"+"** to create a new blank spreadsheet
3. Name it: **"Marketlyn Onboarding Submissions"** (click "Untitled spreadsheet" at top-left)
4. In **Row 1**, add these column headers (copy exactly):

| A | B | C | D | E | F | G | H | I | J | K | L | M | N | O | P | Q |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Timestamp | First Name | Last Name | Email | Phone | MLS | License Number | City | State | Primary Area | Primary Radius | Secondary Area | Secondary Radius | Account Manager | Selected Plan | Billing Address | Shipping Address |

5. **Get the Spreadsheet ID** from the URL:
   - Your URL looks like: `https://docs.google.com/spreadsheets/d/1ABC123xyz789DEF/edit`
   - The Spreadsheet ID is the part between `/d/` and `/edit`
   - In this example: `1ABC123xyz789DEF`

### Step 6: Share the Spreadsheet with Your Service Account

1. In your Google Spreadsheet, click the **"Share"** button (top right)
2. In the "Add people and groups" field, paste your **service account email**
   - (The `client_email` from your JSON file)
3. Make sure it's set to **"Editor"**
4. **Uncheck** "Notify people" (the service account doesn't have a real email)
5. Click **"Share"**
6. You might see a warning that it couldn't send an email - that's fine, click **"Share anyway"**

📝 **Your Google Sheets Credentials:**
```
GOOGLE_SHEETS_CLIENT_EMAIL=________________________________@________________________________.iam.gserviceaccount.com

GOOGLE_SHEETS_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n________________________________\n-----END PRIVATE KEY-----\n"

GOOGLE_SHEETS_SPREADSHEET_ID=________________________________
```

---

## Part 3: Email Configuration (Optional)

Your website is already configured to send emails. However, if you want confirmation emails to come from YOUR email address instead of ours, follow these steps.

### For Gmail Users:

#### Step 1: Enable 2-Factor Authentication

1. Go to **https://myaccount.google.com/**
2. Click **"Security"** in the left sidebar
3. Under "Signing in to Google", find **"2-Step Verification"**
4. If it's not enabled, enable it and follow the prompts

#### Step 2: Generate an App Password

1. Go back to **https://myaccount.google.com/security**
2. Under "Signing in to Google", click **"App passwords"**
   - (If you don't see this, make sure 2-Step Verification is enabled)
3. You may need to sign in again
4. At the bottom, click **"Select app"** and choose **"Mail"**
5. Click **"Select device"** and choose **"Other (Custom name)"**
6. Type: `Marketlyn Website`
7. Click **"Generate"**
8. **You'll see a 16-character password** (like: `abcd efgh ijkl mnop`)
9. **Copy this password** (remove the spaces)

📝 **Your Email Credentials:**
```
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=abcdefghijklmnop
```

---

## Summary: What to Send Back to Us

Please copy and fill in the following, then send it back to us:

```
============================================
MARKETLYN WEBSITE CREDENTIALS
============================================

# MongoDB Atlas Database
MONGODB_URI=

# Google Sheets API
GOOGLE_SHEETS_CLIENT_EMAIL=
GOOGLE_SHEETS_PRIVATE_KEY=
GOOGLE_SHEETS_SPREADSHEET_ID=

# Email (Optional - only if you want to use your own)
EMAIL_USER=
EMAIL_PASS=

============================================
```

### ⚠️ Important Security Notes:

1. **Never share these credentials publicly** (don't post on social media, forums, etc.)
2. **Send these to us securely** (email directly to your developer)
3. **The Google Sheets private key is very long** - copy the ENTIRE thing including `-----BEGIN PRIVATE KEY-----` and `-----END PRIVATE KEY-----`
4. **Keep your downloaded JSON file** in a safe place as a backup

---

## Troubleshooting

### MongoDB Issues:
- **"Authentication failed"**: Double-check your username and password
- **"Network error"**: Make sure you added `0.0.0.0/0` to Network Access
- **"Invalid connection string"**: Make sure you replaced `<password>` with your actual password

### Google Sheets Issues:
- **"Permission denied"**: Make sure you shared the spreadsheet with the service account email
- **"API not enabled"**: Go back to Google Cloud Console and enable the Sheets API
- **"Invalid credentials"**: Make sure you copied the entire private key including the BEGIN/END lines

### Email Issues:
- **"Authentication failed"**: Make sure you're using an App Password, not your regular password
- **"Less secure apps"**: You don't need to enable this if you're using App Passwords

---

## Questions?

If you run into any issues or have questions, please reach out to your developer. We're happy to help!

---

**Document Version**: 1.0
**Last Updated**: March 2026
**For**: Marketlyn Website Onboarding System
