# CarbonTrack – AI Carbon Footprint Tracker

## Project Overview
CarbonTrack is a web application that helps users monitor and reduce their carbon footprint. Users can log daily activities (transport, energy, meals) and calculate estimated CO₂ emissions. The app provides AI-generated tips for sustainable actions and visualizes activity trends on a dashboard.

---

## Features
- **User Authentication**: Secure registration and login.
- **Activity Tracking (CRUD)**: Log, edit, delete, and view activities.
- **AI Insights**: Personalized sustainability tips using OpenAI API.
- **Emission Calculator**: Calculates CO₂ for each activity using real-world emission factors or Carbon Interface API.
- **Dashboard & Reports**: Visualizes weekly/monthly emissions and progress.
- **Pagination**: Activity history is paginated for easy navigation.

---

## Technology Stack
- **Frontend:** React, TailwindCSS
- **Backend:** Flask (Python)
- **Database:** PostgreSQL / MongoDB
- **AI API:** OpenAI API
- **Emission Data:** Carbon Interface API
- **Testing:** Pytest (Backend), Jest/RTL (Frontend)
- **Deployment:** Render (Backend), Netlify/Vercel (Frontend)

---

## Installation

### Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Linux/Mac
venv\Scripts\activate     # Windows
pip install -r requirements.txt
flask run
