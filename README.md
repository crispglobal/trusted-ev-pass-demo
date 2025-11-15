# Trusted EV Pass Demo

React application demonstrating voice-controlled EV charging station navigation and verification flows presenting Denso DID concept

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v16 or higher) and **npm** installed
- Recommended: [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

### Installation & Running Locally

```sh
# Step 1: Clone the repository
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory
cd trusted-ev-pass-demo

# Step 3: Install dependencies
npm install

# Step 4: Start the development server
npm run dev
```

The application will be available at `http://localhost:5173`

### Available Scripts

- **`npm run dev`** - Start development server with hot-reload
- **`npm run build`** - Build for production
- **`npm run build:dev`** - Build in development mode
- **`npm run preview`** - Preview production build locally
- **`npm run lint`** - Run ESLint to check code quality

## 🛠️ Tech Stack

This project is built with modern web technologies:

- **[Vite](https://vitejs.dev/)** - Fast build tool and dev server
- **[React 18](https://react.dev/)** - UI library
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety
- **[shadcn/ui](https://ui.shadcn.com/)** - Beautiful UI components
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[React Router](https://reactrouter.com/)** - Client-side routing
- **[Lucide React](https://lucide.dev/)** - Icon library

## 📁 Project Structure

```
trusted-ev-pass-demo/
├── public/              # Static assets
│   └── mapBackground.png
├── src/
│   ├── components/      # Reusable components
│   │   ├── ui/         # shadcn/ui components
│   │   ├── MapPanel.tsx
│   │   ├── VoiceAssistant.tsx
│   │   └── VerificationFlow.tsx
│   ├── pages/          # Page components
│   │   ├── Home.tsx
│   │   ├── Scenario1.tsx
│   │   └── Scenario2.tsx
│   ├── lib/            # Utility functions
│   └── main.tsx        # Application entry point
└── package.json
```

## 🚢 Deployment

### Build for Production

```sh
npm run build
```

The built files will be in the `dist/` directory, ready to be deployed to any static hosting service:

- **Vercel**: `vercel deploy`
- **Netlify**: Drag and drop the `dist` folder
- **GitHub Pages**: Configure with GitHub Actions
- **AWS S3**: Upload `dist` folder to S3 bucket

### Preview Production Build

```sh
npm run preview
```

## 📝 Features

- **Scenario 1**: Voice-controlled EV charging station navigation
- **Scenario 2**: Identity verification flow
- Interactive map with charging station markers
- Real-time voice assistant simulation
- Modern, responsive UI design

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is available for demonstration purposes.
