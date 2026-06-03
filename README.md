# PlaceMate

> **Your Personal Placement & Internship Journey Companion**

PlaceMate is a modern cross-platform mobile application built for students and job seekers to manage every aspect of their placement and internship preparation journey. From tracking job applications and interview schedules to monitoring daily study progress and preparation consistency, PlaceMate provides a centralized workspace to stay organized and focused throughout the recruitment process. 

---

## 🚀 Features

### 📊 Smart Dashboard

* Personalized welcome greeting
* Live placement statistics

  * Total Applications
  * Active Applications
  * Offers Received
  * Rejected Applications
* Recent activity feed
* Monthly application trend visualization
* Quick action shortcuts

### 💼 Application Tracker

* Add, update, and delete applications
* Track complete application lifecycle

  * Applied
  * Online Assessment (OA)
  * Interview
  * Offer
  * Rejected
* Search applications by company or role
* Filter applications by status
* Dynamic timestamps
* Automatic company logo fetching via Icon Horse API

### 📚 Study & Preparation Reports

* Log daily preparation activities
* Track:

  * DSA questions solved
  * Study hours
  * Topics covered
  * Notes and challenges
* Historical progress timeline
* Rest-day tracking

### 👤 User Profile Management

* Secure authentication with Clerk
* Profile image upload
* Editable user details
* Personalized experience

### 🔒 Security & Data Privacy

* User-specific data isolation
* JWT-based authentication
* Row-Level Security (RLS)
* Secure session handling
* Input validation and error handling

---

## 🏗️ Tech Stack

| Category         | Technology                  |
| ---------------- | --------------------------- |
| Frontend         | React Native                |
| Framework        | Expo SDK 50+                |
| Navigation       | Expo Router                 |
| Styling          | NativeWind / Tailwind CSS   |
| Authentication   | Clerk                       |
| Database         | Supabase (PostgreSQL)       |
| State Management | React Context API           |
| Image Handling   | Expo Image Picker           |
| Secure Storage   | Expo Secure Store           |
| Date Picker      | React Native DateTimePicker |
| Slider Component | React Native Slider         |

---

## 📱 Screens

### Home Dashboard

* Statistics overview
* Monthly trends chart
* Recent applications
* Quick action cards

### Applications

* Application listing
* Search & filter
* Status tracking
* Add/Edit/Delete functionality

### Reports

* Daily preparation logs
* Study analytics
* Historical timeline

### Profile

* User information
* Profile image management
* Account settings

---

## 🗄️ Database Schema

### Applications Table

| Field       | Type   |
| ----------- | ------ |
| id          | String |
| user_id     | String |
| company     | String |
| role        | String |
| status      | String |
| salary      | String |
| event_date  | String |
| date        | String |
| icon        | String |
| iconBg      | String |
| statusColor | String |

### Reports Table

| Field     | Type   |
| --------- | ------ |
| id        | String |
| user_id   | String |
| dsa_count | String |
| hours     | String |
| topics    | String |
| notes     | String |
| date      | String |

---

## ⚙️ Installation

### Prerequisites

* Node.js (v18+)
* npm or yarn
* Expo CLI
* Supabase Project
* Clerk Account

### Clone Repository

```bash
git clone https://github.com/yourusername/placemate.git

cd placemate
```

### Install Dependencies

```bash
npm install
```

### Configure Environment Variables

Create a `.env` file:

```env
EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_key

EXPO_PUBLIC_SUPABASE_URL=your_supabase_url

EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Run Application

```bash
npx expo start
```

---

## 🔐 Authentication Flow

1. User registers or logs in using Clerk.
2. Clerk generates a secure session token.
3. JWT token is passed to Supabase.
4. Supabase Row-Level Security validates requests.
5. Users can access only their own data.

---

## 📈 Future Enhancements

* Push notifications for interviews and assessments
* Resume parsing and analysis
* Job description auto-fill via URL
* AI-powered preparation insights
* Dark mode support
* Calendar integration
* Export reports as PDF
* Placement analytics dashboard
* Multi-device synchronization

---

## 🎯 Target Users

* College students preparing for placements
* Internship seekers
* Fresh graduates
* Job applicants tracking multiple opportunities

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome.

```bash
# Create feature branch
git checkout -b feature/new-feature

# Commit changes
git commit -m "Add new feature"

# Push changes
git push origin feature/new-feature
```

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

**Abhijeet Singh**

Building tools that help students stay consistent, organized, and successful throughout their placement journey. 🚀
