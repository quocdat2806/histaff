Zustand State Management Rules
Store Setup

Create separate stores for different domains (auth, user, cart, etc.)
Keep stores focused and minimal; avoid one giant store
Use shallow equality checking for subscriptions to prevent unnecessary re-renders

Store Structure
typescript// Good structure
interface StoreState {
  data: DataType;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  fetchData: () => Promise<void>;
  updateData: (data: DataType) => void;
  reset: () => void;
}
Best Practices

Keep actions inside the store - don't create actions outside and pass them in
Use set with functions when updating based on previous state
Avoid nested state - flatten when possible for easier updates
Use selectors to subscribe to specific slices of state
Implement reset functions to clear state when needed (logout, etc.)

Async Operations
typescript// Handle loading and error states
fetchData: async () => {
  set({ isLoading: true, error: null });
  try {
    const data = await api.getData();
    set({ data, isLoading: false });
  } catch (error) {
    set({ error: error.message, isLoading: false });
  }
}
Persistence

Use zustand/middleware/persist for state that needs persistence
Only persist necessary data (tokens, user preferences)
Use AsyncStorage for React Native
Implement versioning for persisted state to handle migrations

Selectors

Use shallow selectors to prevent unnecessary re-renders
Create reusable selector hooks for common patterns
Subscribe to minimal state needed in components

DevTools

Integrate Zustand DevTools in development
Name your stores clearly for debugging
Log state changes in development mode only