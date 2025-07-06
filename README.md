# Bulletproof React - Next.js Application

A production-ready React application showcasing enterprise-grade patterns, best practices, and modern development workflows. This project serves as a reference implementation for building scalable, maintainable React applications.

## 🚀 Features

### **Core Functionality**

- **Authentication System**: JWT-based auth with role-based access control
- **Discussion Management**: Create, read, update, delete discussions with markdown support
- **Comment System**: Nested comments with infinite scrolling
- **User Management**: Profile management and admin user controls
- **Public/Private Content**: Discussions can be public or private
- **Real-time Updates**: Optimistic updates with React Query

### **User Roles & Permissions**

- **ADMIN**: Full access to create, edit, delete discussions and manage users
- **USER**: Can create comments and delete their own comments
- **Role-based UI**: Interface adapts based on user permissions

### **Technical Features**

- **Type Safety**: Full TypeScript implementation
- **Form Validation**: Zod schema validation with React Hook Form
- **Error Handling**: Comprehensive error boundaries and user feedback
- **Testing**: Unit, integration, and E2E tests
- **Component Documentation**: Storybook for isolated component development
- **Code Generation**: Plop.js for scaffolding new components

## 🛠 Tech Stack

### **Frontend Framework**

- **Next.js 14** - React framework with App Router
- **React 18** - UI library with concurrent features
- **TypeScript 5.4** - Type-safe JavaScript

### **State Management**

- **TanStack Query 5** - Server state management with caching
- **Zustand 4.5** - Lightweight client state management
- **React Hook Form 7.5** - Performant form handling

### **UI & Styling**

- **Tailwind CSS 3.4** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **Lucide React** - Icon library
- **Class Variance Authority** - Component variant management

### **Validation & Schema**

- **Zod 3.23** - TypeScript-first schema validation
- **@hookform/resolvers** - Form validation integration

### **Testing**

- **Vitest 2.1** - Fast unit testing
- **Playwright 1.43** - E2E testing
- **Testing Library** - React component testing
- **MSW 2.2** - API mocking

### **Development Tools**

- **ESLint** - Code linting with extensive rules
- **Prettier** - Code formatting
- **Husky** - Git hooks
- **Storybook 8.0** - Component documentation
- **Plop.js** - Code generation

### **Build & Deployment**

- **Next.js** - Build system and optimization
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

## 📦 Dependencies

### **Production Dependencies**

```json
{
  "@tanstack/react-query": "^5.32.0",
  "@tanstack/react-query-devtools": "^5.32.0",
  "next": "^14.2.5",
  "react": "^18.3.1",
  "react-dom": "^18.3.1",
  "react-hook-form": "^7.51.3",
  "zod": "^3.23.4",
  "zustand": "^4.5.2",
  "@radix-ui/react-dialog": "^1.0.5",
  "tailwindcss": "^3.4.3",
  "lucide-react": "^0.378.0"
}
```

### **Development Dependencies**

```json
{
  "typescript": "^5.4.5",
  "vitest": "^2.1.4",
  "@playwright/test": "^1.43.1",
  "storybook": "^8.0.9",
  "eslint": "8",
  "prettier": "^3.2.5",
  "husky": "^9.0.11"
}
```

## 🚀 Getting Started

### **Prerequisites**

- Node.js 20+
- Yarn 1.22+

### **Installation**

1. **Clone the repository**

   ```bash
   git clone https://github.com/alan2207/bulletproof-react.git
   cd bulletproof-react/apps/nextjs-app
   ```

2. **Install dependencies**

   ```bash
   yarn install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env
   ```

4. **Start the mock API server**

   ```bash
   yarn run-mock-server
   ```

5. **Start the development server**

   ```bash
   yarn dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### **Available Scripts**

```bash
# Development
yarn dev              # Start development server
yarn run-mock-server  # Start mock API server

# Building
yarn build            # Build for production
yarn start            # Start production server

# Testing
yarn test             # Run unit tests
yarn test-e2e         # Run E2E tests

# Code Quality
yarn lint             # Run ESLint
yarn check-types      # TypeScript type checking

# Development Tools
yarn storybook        # Start Storybook
yarn generate         # Generate new components
```

## 🏗 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── auth/              # Authentication pages
│   ├── app/               # Protected app pages
│   └── public/            # Public pages
├── components/            # Shared UI components
│   ├── ui/               # Base UI components
│   ├── layouts/          # Layout components
│   └── errors/           # Error handling
├── features/             # Feature-based modules
│   ├── auth/             # Authentication
│   ├── discussions/      # Discussion management
│   ├── comments/         # Comment system
│   └── users/            # User management
├── lib/                  # Core utilities
├── config/               # Configuration files
├── hooks/                # Custom React hooks
├── types/                # TypeScript definitions
└── utils/                # Utility functions
```

## 🔄 Code Flow Example: Create Discussion

Here's a detailed walkthrough of the create discussion feature:

### **1. User Interface**

```tsx
// src/app/app/discussions/_components/discussions.tsx
<CreateDiscussion />
```

### **2. Authorization Check**

```tsx
// src/features/discussions/components/create-discussion.tsx
const user = useUser();
if (!canCreateDiscussion(user?.data)) {
  return null; // Only admins can create discussions
}
```

### **3. Form Implementation**

```tsx
<Form
  onSubmit={(values) => {
    createDiscussionMutation.mutate({ data: values });
  }}
  schema={createDiscussionInputSchema}
>
  {/* Form fields with validation */}
</Form>
```

### **4. API Call**

```tsx
// src/features/discussions/api/create-discussion.ts
export const createDiscussion = ({ data }: { data: CreateDiscussionInput }) => {
  return api.post(endpoints.discussions.create, data);
};
```

### **5. Centralized Endpoints**

```tsx
// src/config/endpoints.ts
export const endpoints = {
  discussions: {
    create: '/discussions',
    get: (id: string) => `/discussions/${id}`,
    // ... other endpoints
  },
};
```

### **6. Cache Management**

```tsx
return useMutation({
  onSuccess: () => {
    queryClient.invalidateQueries({
      queryKey: getDiscussionsQueryOptions().queryKey,
    });
  },
  mutationFn: createDiscussion,
});
```

### **7. User Feedback**

```tsx
addNotification({
  type: 'success',
  title: 'Discussion Created',
});
```

## 🔐 Authentication & Authorization

### **JWT-based Authentication**

- Secure token-based authentication
- Automatic token refresh
- Server-side session validation

### **Role-based Access Control**

```tsx
// src/lib/authorization.ts
export const canCreateDiscussion = (user: User | null | undefined) => {
  return user?.role === 'ADMIN';
};
```

### **Protected Routes**

- Automatic redirect for unauthenticated users
- Role-based component rendering
- Secure API endpoints

## 🧪 Testing Strategy

### **Unit Tests**

```bash
yarn test
```

- Component testing with Testing Library
- Hook testing with custom test utilities
- API function testing

### **E2E Tests**

```bash
yarn test-e2e
```

- Full user journey testing
- Cross-browser compatibility
- Visual regression testing

### **Component Testing**

```bash
yarn storybook
```

- Isolated component development
- Interactive component documentation
- Accessibility testing

## 🎨 UI/UX Features

### **Responsive Design**

- Mobile-first approach
- Adaptive layouts
- Touch-friendly interactions

### **Accessibility**

- WCAG 2.1 compliance
- Screen reader support
- Keyboard navigation
- Focus management

### **Loading States**

- Skeleton loaders
- Optimistic updates
- Error boundaries
- Graceful degradation

## 🔧 Development Workflow

### **Code Generation**

```bash
yarn generate
```

- Scaffold new components
- Generate test files
- Create Storybook stories

### **Pre-commit Hooks**

- Automatic linting
- Type checking
- Test running
- Code formatting

### **Git Workflow**

- Conventional commits
- Branch protection
- Automated testing
- Deployment pipelines

## 🌐 API Integration

### **Mock API Server**

- Development API server
- Realistic data generation
- Network delay simulation
- Error scenario testing

### **Real API Integration**

```bash
# .env
NEXT_PUBLIC_API_URL=https://your-backend.com/api
```

### **API Client Features**

- Automatic error handling
- Request/response interceptors
- Authentication headers
- Retry logic

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [TanStack Query Documentation](https://tanstack.com/query)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Radix UI Documentation](https://www.radix-ui.com/)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

---

**Built with ❤️ using modern React best practices**
