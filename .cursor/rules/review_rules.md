Code Review Rules
General Principles

Be kind and constructive; assume good intent
Focus on the code, not the person
Explain the "why" behind suggestions
Offer alternatives when requesting changes
Praise good implementations

What to Review
Architecture & Design

Does the code follow established patterns?
Is the component/module properly scoped?
Are there any design issues or code smells?
Could this be simplified?

Code Quality

Is the code readable and self-documenting?
Are variable and function names clear and descriptive?
Is there unnecessary complexity?
Are there any magic numbers or strings that should be constants?

TypeScript/Types

Are all props, state, and functions properly typed?
Avoid using any - suggest proper types
Are interfaces/types reusable and well-defined?

Performance

Are there unnecessary re-renders?
Are lists properly optimized (FlatList, keys)?
Are heavy computations memoized?
Are images optimized?

State Management

Is state properly managed (local vs global)?
Are Zustand actions handling errors?
Is state properly reset when needed?
Are selectors used efficiently?

Error Handling

Are errors properly caught and handled?
Are loading and error states displayed to users?
Are edge cases considered?

Testing

Are there appropriate tests?
Do tests cover edge cases?
Are tests clear and maintainable?

Security

Are sensitive data (tokens, keys) properly handled?
Are API endpoints secured?
Is user input validated and sanitized?

Accessibility

Are accessibility labels provided?
Is touch target size appropriate (minimum 44x44)?
Is color contrast sufficient?

Review Process

Read through the entire PR first before commenting
Check that CI/CD passes before detailed review
Test the changes locally when possible
Use suggestion mode for small fixes
Block merging only for critical issues (security, breaking changes)
Approve when the code meets standards, even if minor improvements possible

Comment Guidelines

Prefix comments: Use "Nit:", "Optional:", "Question:", "Issue:" to indicate severity
Be specific: Reference line numbers and suggest concrete solutions
Link to documentation when referencing patterns or standards
Acknowledge good work: Comment on clever solutions or improvements

Red Flags

Large PRs (over 500 lines) - suggest breaking them up
No description or context in PR
Commented-out code left in
Console.logs left in production code
Hardcoded sensitive data
Missing error handling
No TypeScript types (using any everywhere)