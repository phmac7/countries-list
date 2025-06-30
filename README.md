# Countries Project

A modern web application built with Next.js that displays information about countries using the REST Countries API. The project showcases modern web development practices, including TypeScript, SCSS Modules, automated testing, and comprehensive CI/CD pipelines.

## 🚀 Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: SCSS Modules with responsive design
- **Testing**: Jest + React Testing Library
- **API**: [REST Countries API](https://restcountries.com/) v3.1
- **CI/CD**: GitHub Actions
- **Code Quality**: ESLint, SonarQube
- **Package Manager**: npm

## 🛠️ Development Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📦 Project Structure

```
src/
├── app/             # Next.js App Router pages
├── components/      # Reusable React components
├── contexts/        # React contexts (e.g., ThemeContext)
├── lib/            # Core business logic and API calls
├── styles/         # Global styles and SCSS variables
├── templates/      # Page-level components
└── types/          # TypeScript type definitions
```

## 🧪 Testing

The project maintains high test coverage using Jest and React Testing Library. Tests are automatically checked for existence and run during CI.

```bash
# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

## 🔍 Quality Checks

### Linting
ESLint is configured with strict TypeScript and React rules:
```bash
npm run lint
```

### SonarQube Analysis
SonarQube scans are automatically run on pull requests and main branch pushes to ensure:
- Code quality
- Test coverage
- Security vulnerabilities
- Code duplication
- Best practices

## 🔄 CI/CD Pipeline

GitHub Actions workflow includes:

1. **Lint Check**: Ensures code style consistency
2. **Unit Tests**: Runs all tests and generates coverage report
3. **Build Check**: Verifies the build process
4. **SonarQube Analysis**: Code quality and security analysis

The pipeline runs on:
- Pull requests to main branch
- Direct pushes to main branch

## 📱 Features

- Responsive design for all screen sizes
- Dark/Light theme support
- Country information display:
  - Flags
  - Population
  - Region
  - Capital
- Search and filter capabilities
- Server-side caching for API responses

## 🔧 Configuration

### Environment Variables
No environment variables are required for basic development setup.

### Dependencies
- React 19
- Next.js 15
- TypeScript 5
- SASS 1.89
- Jest 30
- React Testing Library 16.3

## 🤝 Contributing

1. Create a feature branch from `dev`
2. Make your changes
3. Ensure all tests pass and coverage is maintained
4. Create a pull request to `dev`

## 📄 License

This project is private and not licensed for public use.

## 🏗️ Built With

- Modern React features and hooks
- Next.js App Router and server components
- SCSS Modules for component-level styling
- TypeScript for type safety
- Automated testing and quality checks
