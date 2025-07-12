# Pack My Bag – Smart Travel List Generator

Pack My Bag is a smart travel checklist generator that creates personalized packing lists based on your destination, travel dates, weather, and trip type. Whether you're heading to the beach, a business trip, or an adventure trek, this app helps ensure you never forget anything important.

## Features

### Core Inputs
- Destination (e.g., Goa, Paris, Tokyo)
- Travel dates (start and end)
- Trip type (leisure, work, adventure, wedding)
- Travel style (minimalist, luxury, backpacker)
- Optional preferences: gender, children, pets, medications

### Smart Logic
- Weather integration to suggest clothing based on forecast
- Duration-based calculations (e.g., number of outfits)
- Trip-type logic
  - Wedding → ethnic wear, formal shoes
  - Beach → swimwear, sunscreen, flip-flops
  - Work → laptop, chargers, formal clothes

### Output
- Dynamic checklist (editable by user)
- Categorized suggestions:
  - Clothing
  - Toiletries
  - Gadgets
  - Medical
  - Extras / Fun
- Interactive checkbox UI

## Optional Enhancements
- Dark mode toggle
- Save for later (localStorage or synced via Firebase)
- Drag-and-drop list items
- Export to PDF
- Shareable list URL
- Mobile-first PWA support
- Multi-language support

## UI Flow
1. Welcome screen prompting destination and trip details
2. User fills out travel information
3. Weather API and logic engine process inputs
4. Personalized packing list is displayed
5. Users can check off, edit, reorder, or add custom items
6. List can be saved, exported, or shared

## Use Cases
- Frequent travelers or digital nomads
- Students returning home or to hostels
- Group trip planners
- Last-minute packers
- Specialized trips (trekking, work, vacation, weddings)

## Tech Stack

### Frontend
- HTML, CSS (optionally Tailwind)
- JavaScript (Vanilla or React)

### APIs
- OpenWeatherMap API (for weather forecasts)
- Optional: Country-specific power adapter type API

### Storage
- localStorage (for quick local save)
- Firebase or Supabase (for sync between devices)

##  Live Demo

Check out the deployed project here:  
[https://pack-my-bag-ten.vercel.app/](https://pack-my-bag-ten.vercel.app/)


This project is a **work in progress** and will be continuously improved for better **performance, UI/UX, and efficiency**.
