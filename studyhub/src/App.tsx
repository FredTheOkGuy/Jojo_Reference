import { useState } from 'react'
import './App.css'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import { createStudyGroup } from './features/study_groups/sg_database_queries'; // add this

function App() {
  const [count, setCount] = useState(0)

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
          </p>
        </div>
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