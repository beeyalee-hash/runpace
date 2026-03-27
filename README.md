# RunPace

RunPace is a pace calculator app for runners. The web app is built with Next.js and can also be packaged as an Android app through Capacitor.

## Features

- Marathon goal time to average pace and split times
- Pace to finish time calculator for custom distances
- 400m track workout calculator with 100m/200m/300m/400m splits
- Static export setup for mobile app packaging

## Tech Stack

- Next.js 16
- React 19
- Tailwind CSS 4
- Capacitor 8 (Android)

## Project Structure

- `app/`: App Router pages, layout, and global styles
- `components/`: calculator UI components
- `lib/`: pace calculation utilities
- `android/`: Capacitor Android project

## Local Development

Install dependencies:

```bash
npm install
```

Run the web app in development mode:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Quality Checks

Run lint:

```bash
npm run lint
```

Create a production build:

```bash
npm run build
```

This project uses `next build --webpack` for production builds so the build works reliably in restricted local environments as well.

## Android App

Capacitor app settings:

- App name: `RunPace`
- App ID: `com.runningbk.runpace`
- Web output directory: `out`

After generating a static web build, sync it into the Android project with Capacitor if needed:

```bash
npx cap sync android
```

Then open the Android project in Android Studio:

```bash
npx cap open android
```

## Current Status

- Core calculator features are implemented
- Web lint and production build are passing
- Android project is present and connected through Capacitor
- README now reflects the real app instead of the default Next.js template
