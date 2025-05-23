# Profile Explorer

Profile Explorer is a modern web application for browsing professional profiles and visualizing their locations on an interactive map.

## Features

- List and search professional profiles
- Interactive map view using OpenStreetMap (Leaflet)
- Detailed profile pages with contact and social links
- Admin dashboard for managing profiles (add, edit, delete)
- Responsive design for all devices
- Filter by name, role, company, location, and skills

## Tech Stack

- React + TypeScript
- Vite
- Tailwind CSS
- Leaflet (OpenStreetMap)
- React Router
- Lucide Icons

## Getting Started

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yash12000/profile-explorer.git
   cd profile-explorer
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open** [http://localhost:5173](http://localhost:5173) **in your browser.**

## Project Structure

```
src/
  assets/
  components/
    admin/
      AdminDashboard.tsx
      ProfileForm.tsx
    layout/
      Navbar.tsx
      Footer.tsx
    map/
      MapView.tsx
      MapMarker.tsx
    profile/
      ProfileList.tsx
      ProfileCard.tsx
      ProfileFilter.tsx
  contexts/
    ProfileContext.tsx
  data/
    profiles.ts
  pages/
    Home.tsx
    Admin.tsx
    ProfileDetails.tsx
    NotFound.tsx
  types/
    index.ts
  index.css
  App.tsx
  main.tsx
```

## Available Scripts

- `npm run dev` — Start development server
- `npm run build` — Build for production
- `npm run preview` — Preview production build
- `npm run lint` — Run ESLint

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.