<<<<<<< Updated upstream
import { Suspense, lazy, Component, ReactNode } from "react";
=======
<<<<<<< HEAD
import { Suspense, lazy, Component } from "react";
import type { ReactNode } from "react";
=======
import { useState } from 'react'
import './App.css'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import { createStudyGroup } from './features/study_groups/sg_database_queries'; // add this
>>>>>>> 8b53bd5d09052429efb76c48d7b6d392e441a7ef
>>>>>>> Stashed changes

const StudyHubApp = lazy(() => import("./app/StudyHubApp"));

<<<<<<< HEAD
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
=======
  // add this
  const handleCreate = async () => {
    try {
      await createStudyGroup(
        "Algorithm Masters",
        "COMP",
        "352",
        "Alex Johnson",
        "Hall Building H-521",
        new Date("2025-06-10T17:00:00"),
        10
      );
      console.log("success");
    } catch (err) {
      console.error("Failed:", err);
    }
  };

  return (
    <>
      <section id="center">
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>
        <div>
          <h1>Get started</h1>
          <p>
            Edit <code>src/App.tsx</code> and save to test <code>HMR</code>
>>>>>>> 8b53bd5d09052429efb76c48d7b6d392e441a7ef
          </p>
          <p className="text-lg mt-4">{this.state.error?.message}</p>
        </div>
<<<<<<< HEAD
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
        <StudyHubApp />
      </Suspense>
    </ErrorBoundary>
  );
}
=======
        <button
          type="button"
          className="counter"
          onClick={() => setCount((count) => count + 1)}
        >
          Count is {count}
        </button>

        {/* add this */}
        <button type="button" onClick={handleCreate}>
          Create Test Group
        </button>

      </section>
      {/* ... rest of your code unchanged ... */}
    </>
  )
}

export default App
>>>>>>> 8b53bd5d09052429efb76c48d7b6d392e441a7ef
