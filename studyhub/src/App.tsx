import { Suspense, lazy, Component, useState } from "react";
import type { ReactNode } from "react";
import './App.css'
import AppRoutes from "./routes/AppRoutes";


const StudyHubApp = lazy(() => import("./app/StudyHubApp"));

class ErrorBoundary extends Component<
  { children: ReactNode },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center h-screen bg-red-500 text-white p-8">
          <h1 className="text-3xl font-bold mb-4">Error in App</h1>
          <p className="text-xl whitespace-pre-wrap">
            {this.state.error?.toString()}
          </p>
          <p className="text-lg mt-4">{this.state.error?.message}</p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default function App() {
  return (
    <ErrorBoundary>
      <Suspense
        fallback={
          <div className="flex items-center justify-center h-screen">
            Loading...
          </div>
        }
      >
        <AppRoutes/>
      </Suspense>
    </ErrorBoundary>
  );
}
