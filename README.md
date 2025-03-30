# SideProject.com

An innovative online hub where aspiring entrepreneurs can share ideas, find collaborators, and bring their side projects to life.

## Features

- 🚀 Share and discover side project ideas
- 👥 Connect with potential co-founders and collaborators
- 💡 Get community feedback on your concepts
- 📊 Track project metrics and growth
- 🤝 Engage with a supportive entrepreneur community

## Tech Stack

- **Frontend:** React, TypeScript, Tailwind CSS, Radix UI
- **Backend:** Express.js, Node.js
- **Database:** PostgreSQL (via NeonDB)
- **Build Tools:** Vite, ESBuild
- **Development:** Hot Module Replacement (HMR)

## Getting Started

### Prerequisites

- Node.js 20.x
- PostgreSQL 16
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd sideproject
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:
   Create a `.env` file in the root directory with:

```
DATABASE_URL=your_database_url
```

4. Push database schema:

```bash
npm run db:push
```

### Development

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5000`

### Building for Production

1. Build the application:

```bash
npm run build
```

2. Start the production server:

```bash
npm run start
```

## Project Structure

```
├── client/               # Frontend React application
│   ├── src/
│   │   ├── components/   # React components
│   │   ├── pages/       # Page components
│   │   └── types/       # TypeScript types
├── server/              # Backend Express application
│   ├── routes.ts        # API routes
│   └── storage.ts       # Data storage logic
├── shared/              # Shared types and utilities
└── attached_assets/     # Project assets
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run check` - Type check with TypeScript
- `npm run db:push` - Push database schema changes

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
