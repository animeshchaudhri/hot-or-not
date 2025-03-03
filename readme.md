# Hot or Not - Chintu University Edition

A web application for rating and comparing people from your university, built with Next.js (frontend) and NestJS (backend).

## Overview

This application allows users to:
- Compare two people and vote on who's more attractive
- View a leaderboard of the most popular individuals
- Skip comparisons if desired

## Project Structure

The project is divided into two main parts:

### Frontend
- Built with Next.js
- Uses Shadcn UI components
- Features a responsive design for mobile and desktop

### Backend
- Built with NestJS
- MongoDB integration using Mongoose
- RESTful API endpoints

## Getting Started

### Prerequisites
- Node.js
- yarn

### Backend Setup

```bash
cd Backend
yarn install
cp .env.example .env
# Update the .env file with your MongoDB connection details
yarn run start:dev
```

### Frontend Setup

```bash
cd Frontend
yarn install
yarn run dev
```

## Features

- **Comparison Screen**: Vote between two people to determine who's more attractive
- **Leaderboard**: See rankings based on user votes
- **Responsive Design**: Works on both mobile and desktop devices

## Creators

Made with not ❤️ by <Link href="https://x.com/animesh_xd" className="text-primary">Animesh</Link> and <Link href="https://x.com/Shreverrr" className="text-primary">Shreshth</Link>
