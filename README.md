# BlossomOLB Microfrontend

This project is a modern microfrontend based on React 18, TypeScript, Vite, Zustand, Apollo Client, Tailwind, and Module Federation. It follows a feature-first and atomic design architecture, and is ready for integration with BlossomOLB Admin and Bit.dev.

## Main Structure

- `src/components/atoms/` — Atomic components (e.g., Button)
- `src/features/example-feature/` — Example feature with hook, store, and page

## Main Scripts

- `npm run dev` — Development
- `npm run build` — Production build
- `npm run lint` — Linting

## Bit.dev: Sharing and Consuming Components

### Share a component

1. Initialize Bit in the project (once):
   ```sh
   npx bit init
   ```
2. Add the component:
   ```sh
   npx bit add src/components/atoms/Button --main Button.tsx --tests "**/*.test.tsx" --docs Button.docs.mdx
   ```
3. Tag and export:
   ```sh
   npx bit tag --all 1.0.0
   npx bit export
   ```

### Consume a component in another microfrontend

1. Install Bit if you don't have it:
   ```sh
   npm install bit-bin --global
   ```
2. Import the component:
   ```sh
   npx bit import blossomolb.ui/atoms/button
   ```
3. Use the component as usual:
   ```tsx
   import { Button } from 'blossomolb.ui.atoms.button';
   ```

#### Bit.dev Best Practices

- Document all props and examples in comments and `.docs.mdx` files.
- Tag after every relevant change.
- Maintain visual and API consistency.
- Use clear scopes and names for BlossomOLB teams.

## Usage Example

```tsx
import { Button } from './components/atoms/Button';

<Button variant="primary">Hello</Button>;
```

---

## Final Notes and Technical Decisions

### Integration and Communication Between Microfrontends

- **Module Federation** allows exposing and consuming modules/components between microfrontends in a decoupled and efficient way.
- **Bit.dev** is used to share and version reusable UI components, speeding up integration and maintaining visual consistency.
- For communication between microfrontends, it is recommended to:
  - Use browser custom events (`CustomEvent`) for simple cases.
  - Or expose a shared store (e.g., Zustand) if reactive synchronization is needed.
- Each microfrontend can be deployed and versioned independently, facilitating scalability and maintenance.

### Best Practices Implemented

- **Feature-first architecture** and atomic design for maximum scalability and maintainability.
- **Accessibility**: components comply with WCAG 2.1 AA, with visible focus and proper roles.
- **Testing**: minimum 80% coverage and automated E2E tests.
- **Security**: vulnerability analysis, input validation, and XSS/CSRF protection.
- **Performance**: code splitting, lazy loading, and asset optimization.
- **CI/CD**: automated pipelines for quality, build, and deployment.
- **Documentation**: all components and features documented for Bit.dev and in the repo.

### Recommendations

- Keep the Bit.dev workspace updated and tag after every relevant change.
- Review shared dependencies to avoid version conflicts.
- Use the README and Bit.dev documentation as the source of truth for integration and component consumption.

---

## SonarQube: Local Setup and Usage Guide

### 1. Download and Run SonarQube Locally

You can easily run SonarQube using Docker:

```sh
docker run -d --name sonarqube -p 9000:9000 sonarqube:lts
```

- This will start SonarQube at [http://localhost:9000](http://localhost:9000)
- Default credentials: `admin` / `admin` (you will be prompted to change the password on first login)

### 2. Generate a User Token

1. Log in to SonarQube at [http://localhost:9000](http://localhost:9000)
2. Go to your user menu (top right) → **My Account** → **Security**
3. Generate a new token (e.g., `microfrontend-olb`) and copy it (it will only be shown once)

### 3. Configure the Project

1. Open the `sonar-project.properties` file at the project root
2. Add your token at the end:
   ```
   sonar.login=YOUR_GENERATED_TOKEN
   ```

### 4. (Optional) Create the Project in SonarQube

- Go to **Projects** → **Create Project**
- Use the same key as `sonar.projectKey` (e.g., `microfrontend-olb`)
- Choose "Manual" as the analysis method

### 5. Run the Analysis

At the project root, run:

```sh
npx sonar-scanner
```

- Results will be available at [http://localhost:9000/dashboard?id=microfrontend-olb](http://localhost:9000/dashboard?id=microfrontend-olb)

### Troubleshooting

- Make sure Java 11+ is installed (required by SonarQube)
- If you see authentication errors, check your token in `sonar-project.properties`
- If you see connection errors, make sure the Docker container is running and accessible

---

## E2E Testing with Playwright

This microfrontend includes end-to-end (E2E) tests using [Playwright](https://playwright.dev/). E2E tests validate real browser interaction and ensure UI accessibility and functionality.

### How to Run E2E Tests?

1. **Make sure Playwright and browsers are installed:**

   ```bash
   npx playwright install
   ```

2. **Start the Vite dev server on port 3001:**

   ```bash
   npm run dev -- --port=3001
   # or
   yarn dev --port=3001
   ```

3. **In another terminal, run the E2E tests:**

   ```bash
   npx playwright test
   ```

   This will run all E2E tests in Chromium, Firefox, and WebKit.

   To run a specific test (e.g., Button):

   ```bash
   npx playwright test src/components/atoms/Button/Button.e2e.spec.ts
   ```

4. **View the interactive report:**

   After tests finish, open the report:

   ```bash
   npx playwright show-report
   ```

#### Notes & Best Practices

- Ensure the dev server runs on the same port as configured in the tests (default: 3001).
- E2E tests should target routes/pages where components are mounted and accessible.
- Add more E2E tests following the `Button.e2e.spec.ts` example.
- Integrate E2E tests in your CI/CD for continuous quality.

---

## How to Consume this Microfrontend

### 1. Standalone Usage (Independent App)

You can run this microfrontend as a regular React/Vite app for development, testing, or individual deployment.

#### **Local Development**

```bash
npm install
npm run dev -- --port=3001
# or
yarn install
yarn dev --port=3001
```

Open [http://localhost:3001](http://localhost:3001) to view the app.

#### **Production Build**

```bash
npm run build
npm run preview -- --port=3001
```

This generates the `dist/` folder ready to be served in any static environment or Docker.

#### **Docker**

You can build and run the container:

```bash
docker build -t blossomolb-mf .
docker run -p 3001:3001 blossomolb-mf
```

---

### 2. Consuming as a Remote Microfrontend (Module Federation)

This project exposes modules/components via Module Federation to be dynamically consumed by a host (e.g., BlossomOLB Admin or another shell).

#### **Host Configuration (Vite + Module Federation)**

1. **Add the remote in the host's Module Federation config:**

In the host's `vite.config.ts`:

```ts
import { defineConfig } from 'vite';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig({
  plugins: [
    federation({
      remotes: {
        blossomolb: 'http://localhost:3001/assets/remoteEntry.js',
      },
    }),
  ],
});
```

2. **Import exposed modules/components:**

```tsx
// Example: import a remote component
const RemoteButton = React.lazy(() => import('blossomolb/Button'));

function App() {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <RemoteButton>Click</RemoteButton>
    </React.Suspense>
  );
}
```

> Make sure the microfrontend is running and accessible at the configured port.

#### **Notes**

- You can expose more modules by editing the `exposes` section in your `vite.config.ts`.
- The host and microfrontend should share key dependencies (e.g., React) to avoid duplicates.
- See the Module Federation and Vite documentation for advanced details.

---

### 3. Consuming Components via Bit.dev

See the "Bit.dev: Sharing and Consuming Components" section above to import individual components into any compatible React project.
