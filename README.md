# PUC-TECH Admissions Form

This repository contains the web application used for managing the admissions process for PUC-TECH, the technology academic league of PUC-SP. It provides a guided, step-by-step form for prospective members to apply, and directly integrates with Google Sheets to securely store the applicant responses.

## Key Features

- **Multi-Step Application Form**: A 5-step form flow covering personal information, academic details, interests, skills, and expectations. Built with client-side validation to ensure clean data entry.
- **Google Sheets Integration**: Automatically appends new applications directly into a configured Google Sheet using Google Service Account credentials.
- **Dynamic Admissions Toggle (Kill Switch)**: Uses a server-side environment variable (`ADMISSIONS_OPEN`) to instantly toggle the website between an active application form and an "Admissions Closed" state, avoiding the need for manual code deployment when deadlines pass.
- **FAQ Component**: An accessible, persistent Frequently Asked Questions section available on both the open form and the closed state page.

## Tech Stack

- Next.js (App Router)
- React
- Tailwind CSS
- TypeScript

## Local Development

1. **Clone the repository**
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Configure Environment Variables**:
   Copy the example environment file and fill in your actual credentials.
   ```bash
   cp .env.local.example .env.local
   ```
   You will need a Google Service Account with Editor access to your specific Google Sheet. The credentials and Sheet ID must be placed in `.env.local`. 

4. **Run the development server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` in your browser. To test the closed state, set `ADMISSIONS_OPEN=false` in your `.env.local` file.

## Deployment

The application is built for Vercel. Ensure you define all environment variables in your Vercel project settings prior to deployment. Remember that changing `ADMISSIONS_OPEN` in the Vercel dashboard will apply the open or closed state instantly to the live environment.
