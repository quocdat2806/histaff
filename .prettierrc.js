module.exports = {
  // ==================== Basic Formatting ====================
  // Số khoảng trắng cho indentation
  tabWidth: 2,
  
  // Sử dụng spaces thay vì tabs
  useTabs: false,
  
  // Thêm semicolon ở cuối statements
  semi: true,
  
  // Sử dụng single quotes thay vì double quotes
  singleQuote: true,
  
  // Quotes trong JSX (double quotes theo convention)
  jsxSingleQuote: false,
  
  // ==================== Trailing Commas ====================
  // Thêm trailing comma ở cuối (es5: objects/arrays, all: functions)
  // 'all' tốt hơn cho git diffs và TypeScript
  trailingComma: 'all',
  
  // ==================== Brackets & Spacing ====================
  // Thêm spaces trong object brackets: { foo: bar }
  bracketSpacing: true,
  
  // Đặt > của JSX tag ở cuối dòng
  bracketSameLine: false,
  
  // ==================== Arrow Functions ====================
  // Luôn có parentheses cho arrow function params
  // 'always' tốt hơn cho TypeScript
  arrowParens: 'always',
  
  // ==================== Line Width ====================
  // Độ dài tối đa của 1 dòng (80-120 là best practice)
  printWidth: 80,
  
  // ==================== Prose Wrap ====================
  // Wrap markdown/prose (preserve: giữ nguyên)
  proseWrap: 'preserve',
  
  // ==================== HTML Whitespace ====================
  // Xử lý whitespace trong HTML
  htmlWhitespaceSensitivity: 'css',
  
  // ==================== End of Line ====================
  // Line endings (lf cho Unix/Mac, crlf cho Windows, auto detect)
  endOfLine: 'lf',
  
  // ==================== Embedded Language Formatting ====================
  // Format code trong template literals
  embeddedLanguageFormatting: 'auto',
  
  // ==================== Quote Props ====================
  // Chỉ quote props khi cần thiết
  quoteProps: 'as-needed',
  
  // ==================== Vue/Angular (optional) ====================
  // vueIndentScriptAndStyle: false,
  
  // ==================== Plugin Overrides ====================
  overrides: [
    {
      files: '*.json',
      options: {
        printWidth: 120,
        tabWidth: 2,
      },
    },
    {
      files: '*.md',
      options: {
        proseWrap: 'always',
        printWidth: 80,
      },
    },
    {
      files: ['*.yml', '*.yaml'],
      options: {
        tabWidth: 2,
        singleQuote: false,
      },
    },
  ],
};