# MyApp - React TypeScript Application

A modern web application built with React, TypeScript, and Tailwind CSS, featuring drag-and-drop functionality and responsive design.

## 🚀 Features

- **Modern Tech Stack**: Built with React 19 and TypeScript
- **Styling**: Tailwind CSS for responsive and modern UI
- **Drag and Drop**: Implemented using @dnd-kit for interactive user experiences
- **Routing**: React Router for seamless navigation
- **Type Safety**: Full TypeScript support for better development experience
- **Testing**: Jest and React Testing Library for comprehensive testing

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- npm (v6 or higher)

## 🛠️ Installation

1. Clone the repository:
```bash
git clone [https://github.com/mahsaseiri/sibirani]
cd myapp
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The application will open in your default browser at [http://localhost:3000](http://localhost:3000).

## 📦 Available Scripts

In the project directory, you can run:

### `npm start`
- Runs the app in development mode
- Open [http://localhost:3000](http://localhost:3000) to view it in the browser
- The page will reload if you make edits
- You will also see any lint errors in the console

### `npm test`
- Launches the test runner in interactive watch mode
- See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information

### `npm run build`
- Builds the app for production to the `build` folder
- It correctly bundles React in production mode and optimizes the build for the best performance
- The build is minified and the filenames include the hashes
- Your app is ready to be deployed!

### `npm run eject`
**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

## 🏗️ Project Structure

```
myapp/
├── public/          # Static files
├── src/            # Source files
├── package.json    # Project dependencies and scripts
├── tsconfig.json   # TypeScript configuration
├── tailwind.config.js  # Tailwind CSS configuration
└── postcss.config.js   # PostCSS configuration
```

## 📊 Data Structure

The application uses TypeScript interfaces to define its core data structures:

### TranslationItem
```typescript
interface TranslationItem {
  id: string;          // Unique identifier for each translation item
  keyword: string;     // The key/word to be translated
  translations: {      // Map of language codes to translations
    [language: string]: string;
  };
}
```

### TranslationState
```typescript
interface TranslationState {
  items: TranslationItem[];     // Array of translation items
  languages: string[];           // Available languages
  selectedLanguage: string;     // Currently selected language
}
```

## 🔄 Implementation Logic

### Core Features

1. **Translation Management**
   - Add new keywords with translations
   - Update existing translations
   - Support for multiple languages
   - Drag-and-drop reordering of translation items

2. **State Management**
   - Uses React Context for global state management
   - Maintains translation items, languages, and selected language
   - Provides methods for CRUD operations on translations

3. **Data Persistence**
   - Implements localStorage for persistent data storage
   - Automatically saves translation state on every change
   - Handles data recovery on page reload
   - Includes error handling for storage operations
   - Maintains data consistency across browser sessions

4. **Component Architecture**
   - `ManagementDashboard`: Main interface for translation management
   - `TranslationItem`: Individual translation entry component
   - `CustomSelect`: Reusable language selector component
   - `AddKeyword`: Form component for adding new translations
   - `PublicView`: Read-only view of translations
   - `Navigation`: Application navigation component

5. **Drag and Drop Implementation**
   - Utilizes @dnd-kit for smooth drag-and-drop functionality
   - Maintains order of translation items
   - Provides visual feedback during drag operations

6. **Type Safety**
   - Full TypeScript implementation
   - Strict type checking for all components and functions
   - Interface-based data structure definitions

## 🔧 Technologies Used

- **React**: ^19.1.0
- **TypeScript**: ^4.9.5
- **Tailwind CSS**: ^3.3.0
- **React Router**: ^7.5.0
- **@dnd-kit**: ^6.3.1 (for drag and drop functionality)
- **Testing Libraries**: Jest, React Testing Library

## 📚 Learn More

To learn more about the technologies used in this project:

- [React Documentation](https://reactjs.org/)
- [TypeScript Documentation](https://www.typescriptlang.org/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [@dnd-kit Documentation](https://docs.dnd-kit.com/)
- [React Router Documentation](https://reactrouter.com/)

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Authors

- Mahsa Seiri - Initial work

## 🙏 Acknowledgments

- Create React App team for the initial project setup
- All contributors who have helped shape this project
