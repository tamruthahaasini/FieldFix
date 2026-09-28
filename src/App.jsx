import { useState } from 'react'
import './App.css'

const defaultMemory = {
  symptom: 'Motor overheating',
  failedAction: 'Coolant inspection',
  successfulAction: 'Fan inspection',
  successCount: 1,
}

function App() {
  const [machine, setMachine] = useState('')
  const [symptom, setSymptom] = useState('')
  const [caseCreated, setCaseCreated] = useState(false)
  const [outcome, setOutcome] = useState('')
  const [memory, setMemory] = useState(() => {
    const saved = localStorage.getItem('fieldfix_memory')
    return saved ? JSON.parse(saved) : defaultMemory
  })

  const createCase = () => {
    if (!machine || !symptom) {
      alert('Please enter machine and failure symptom')
      return
    }

    setCaseCreated(true)
    setOutcome('')
  }

  const recordOutcome = (result) => {
    setOutcome(result)

    const updatedMemory = {
      ...memory,
      symptom,
      successfulAction:
        result === 'fixed'
          ? 'Fan inspection'
          : memory.successfulAction,
      successCount:
        result === 'fixed'
          ? memory.successCount + 1
          : memory.successCount,
    }

    setMemory(updatedMemory)
    localStorage.setItem(
      'fieldfix_memory',
      JSON.stringify(updatedMemory)
    )
  }

  return (
    <div className="app">

      <header className="header">
        <div>
          <h1>FieldFix</h1>
          <p>Experience-Learning Service Agent</p>
        </div>

        <div className="status">
          ● Hindsight Connected
        </div>
      </header>

      <main className="container">

        <section className="welcome">
          <h2>Service Troubleshooting</h2>
          <p>
            Use past repair experiences to solve today's machine failures.
          </p>
        </section>

        <section className="card">
          <h3>Create Service Case</h3>

          <label>Machine</label>
          <input
            type="text"
            placeholder="Example: Industrial Motor M-204"
            value={machine}
            onChange={(e) => setMachine(e.target.value)}
          />

          <label>Failure / Symptom</label>
          <input
            type="text"
            placeholder="Example: Motor overheating"
            value={symptom}
            onChange={(e) => setSymptom(e.target.value)}
          />

          <button onClick={createCase}>
            Create Case
          </button>
        </section>

        {caseCreated && (
          <section className="card">

            <h3>Current Service Case</h3>

            <div className="case-info">
              <p>
                <strong>Machine:</strong> {machine}
              </p>

              <p>
                <strong>Symptom:</strong> {symptom}
              </p>
            </div>

            <div className="memory-box">

              <h3>🧠 Hindsight Memory</h3>

              <p>
                Similar breakdown found in company repair history.
              </p>

              <div className="experience">

                <strong>Previous Experience</strong>

                <p>
                  Failure: {memory.symptom}
                </p>

                <p>
                  ❌ {memory.failedAction} — Failed
                </p>

                <p>
                  ✅ {memory.successfulAction} — Fixed
                </p>

                <p>
                  Successful repairs remembered: {memory.successCount}
                </p>

              </div>
            </div>

            <div className="recommendation">

              <h3>🔧 Recommended Next Action</h3>

              <p>
                Based on previous successful repairs:
              </p>

              <strong>
                Inspect the cooling fan before replacing components.
              </strong>

              <div className="outcome-buttons">

                <button
                  className="success-btn"
                  onClick={() => recordOutcome('fixed')}
                >
                  ✓ Fixed
                </button>

                <button
                  className="failed-btn"
                  onClick={() => recordOutcome('failed')}
                >
                  ✕ Failed
                </button>

              </div>

              {outcome === 'fixed' && (
                <div className="learning-message">

                  <h3>🧠 Hindsight Learned</h3>

                  <p>
                    Fan inspection successfully resolved this failure.
                  </p>

                  <strong>
                    This experience is now stored for future cases.
                  </strong>

                </div>
              )}

              {outcome === 'failed' && (
                <div className="learning-message failed-message">

                  <h3>🧠 Hindsight Updated</h3>

                  <p>
                    This troubleshooting action did not resolve the failure.
                  </p>

                  <strong>
                    The failed experience is remembered for future cases.
                  </strong>

                </div>
              )}

            </div>

          </section>
        )}

      </main>

    </div>
  )
}

export default App