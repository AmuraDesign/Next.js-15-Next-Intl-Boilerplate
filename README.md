# Next.js 15 + Next-Intl Boilerplate

This repository serves as a boilerplate for creating a multilingual Next.js 15 project using the [`next-intl`](https://next-intl.vercel.app/) library for internationalization. The boilerplate also integrates **Tailwind CSS** for styling and includes a basic project setup for rapid development.

## Features

- **Multilingual Support:**
  - Preconfigured with multiple locales (e.g., `en-US`, `de-DE`, `fr-FR`, etc.).
  - Dynamic routing for each locale.
  - Locale switcher component.
- **Next.js 15:** Built on the latest version of Next.js for optimal performance and features.
- **React 19 (RC):** Uses the latest release candidate of React for future-proof development.
- **Tailwind CSS Integration:** Preconfigured for utility-first styling.
- **ESLint & TypeScript:** For code quality and type safety.
- **Modern Directory Structure:** Organizes components, pages, and internationalization logic for clarity and scalability.

---

## Getting Started

### Prerequisites

Ensure you have the following installed on your development machine:

- **Node.js** (v18 or higher recommended)
- **npm**, **yarn**, **pnpm**, or **bun**

### Installation

Clone the repository and install dependencies:

```bash
git clone <repository-url>
cd nextjs
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

### Running the Development Server

Start the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open your browser and visit [http://localhost:3000](http://localhost:3000) to see the application.

---

## Directory Structure

Here’s an overview of the key files and directories in the project:

```
nextjs/
├── messages/             # JSON files for locale translations
├── src/
│   ├── app/              # Next.js app directory
│   │   ├── [locale]/     # Dynamic locale-based routing
│   │   ├── components/   # Reusable UI components
│   │   └── globals.css   # Tailwind CSS global styles
│   ├── i18n/             # Internationalization logic (next-intl)
│   ├── middleware.ts     # Middleware for locale-based routing
│   └── pages/            # (Optional) Custom Next.js pages (if required)
├── .eslintrc.json        # ESLint configuration
├── next.config.ts        # Next.js configuration with next-intl plugin
├── tailwind.config.ts    # Tailwind CSS configuration
├── tsconfig.json         # TypeScript configuration
└── README.md             # You are here!
```

---

## Internationalization (i18n)

This boilerplate uses **next-intl** for i18n support. Here’s how it works:

### Adding Translations

1. Translation files are located in the `messages/` directory.
2. Each locale has its own JSON file (e.g., `en-US.json`, `de-DE.json`).
3. Add your translations to these files:

```json
{
  "HomePage": {
    "title": "Welcome!",
    "about": "Go to the about page"
  },
  "Header": {
    "navigation": {
      "home": "Home",
      "about": "About"
    }
  }
}
```

### Dynamic Routing for Locales

The `[locale]` dynamic route handles locale-based routing. For example:

- `/en-US/` for English (US)
- `/de-DE/` for German (Germany)

#### Middleware Configuration

The `middleware.ts` file ensures only supported locales are routed:

```typescript
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  matcher: ["/", "/(de-DE|en-US|fr-FR|...)/:path*"],
};
```

### Locale Switcher

The `LocaleSwitcher` component allows users to toggle between locales:

```tsx
<Menu.Items>
  {routing.locales.map((locale) => (
    <Menu.Item key={locale}>
      <button onClick={() => router.replace(pathname, { locale })}>
        {localeNames[locale]}
      </button>
    </Menu.Item>
  ))}
</Menu.Items>
```

---

## Styling with Tailwind CSS

The project includes **Tailwind CSS** for utility-first styling.

### Customization

Modify `tailwind.config.ts` to extend the default theme or add custom configurations:

```typescript
export default {
  theme: {
    extend: {
      colors: {
        background: "#f0f0f0",
        foreground: "#333",
      },
    },
  },
};
```

Global styles are defined in `globals.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

---

## Scripts

The following npm scripts are available:

- **`npm run dev`**: Start the development server.
- **`npm run build`**: Build the project for production.
- **`npm run start`**: Start the production server.
- **`npm run lint`**: Run ESLint checks.

---

## Deployment

Deploy the project easily using **Vercel**:

1. Link your repository to Vercel.
2. Push your code to the main branch.
3. Vercel will automatically build and deploy your project.

---

## Tech Stack

- **Next.js 15**: React framework for production-ready apps.
- **Next-Intl**: Seamless i18n integration.
- **React 19 RC**: Latest React features and improvements.
- **Tailwind CSS**: Utility-first CSS framework.
- **TypeScript**: For type-safe development.

---

## Contributing

Contributions are welcome! If you find a bug or have an idea for a new feature:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature/my-feature`.
3. Commit your changes: `git commit -m "Add my feature"`.
4. Push the branch: `git push origin feature/my-feature`.
5. Open a pull request.

---

## Troubleshooting

### Common Issues

- **Module Not Found**: Run `npm install` to install missing dependencies.
- **Tailwind CSS Not Working**: Ensure your `tailwind.config.ts` includes the correct `content` paths.
- **Invalid Locale**: Verify that the locale is defined in `messages/` and `routing.ts`.

### Debugging

Use `console.log` or debugging tools like **VS Code Debugger** or **Chrome DevTools**.

---

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Next-Intl Documentation](https://next-intl.vercel.app/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

---

## License

This project is licensed under the MIT License.
