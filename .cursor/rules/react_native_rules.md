React Native Development Rules
React Native Code Rules
Project Structure

Organize code by feature, not by type (components, screens, hooks in feature folders)
Keep a flat folder structure where possible; avoid deep nesting beyond 3-4 levels
Separate business logic from UI components using custom hooks
Use index files to simplify imports but don't overuse them

Component Guidelines

Prefer functional components over class components
Use TypeScript for type safety across all components
Keep components small and focused (under 200 lines ideally)
Extract reusable UI into shared components
Use composition over inheritance

Styling

Use StyleSheet.create() for all styles, never inline styles in production
Define styles at the bottom of the file or in separate style files
Use consistent naming: container, wrapper, content, header, footer
Leverage Flexbox for layouts; avoid absolute positioning unless necessary
Create a centralized theme file for colors, spacing, typography

Performance

Use React.memo() for expensive components that re-render frequently
Implement useMemo() and useCallback() to prevent unnecessary recalculations
Use FlatList/SectionList for long lists, never map over large arrays
Optimize images: use appropriate formats, compress, and lazy load
Avoid anonymous functions in render methods
Use getItemLayout with FlatList when possible for better performance

Navigation

Use React Navigation as the standard navigation library
Define navigation types for type-safe navigation
Keep navigation logic out of business logic
Use navigation composition for complex flows

API & Data Fetching

Centralize API calls in a dedicated service layer
Use async/await with proper error handling
Implement request cancellation for unmounted components
Add loading and error states for all async operations
Use environment variables for API endpoints

Error Handling

Always wrap async operations in try-catch blocks
Implement error boundaries for graceful error recovery
Log errors appropriately (development vs production)
Provide user-friendly error messages