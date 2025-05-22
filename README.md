# Profile Explorer

A modern web application that allows users to view and explore profiles with their locations on an interactive map.

## Features

- View a list of profiles with essential information
- Interactive map integration with Google Maps
- Profile details view with comprehensive information
- Admin dashboard for managing profiles
- Search and filter functionality
- Responsive design for all devices

## Tech Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- Google Maps API
- React Router

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/profile-explorer.git
cd profile-explorer
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add your Google Maps API key:
```
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
```

4. Start the development server:
```bash
npm run dev
```

5. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Project Structure

```
src/
  ├── app/              # Main application pages
  ├── components/       # Reusable components
  ├── services/        # API and other services
  ├── types/           # TypeScript type definitions
  └── assets/          # Static assets
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
