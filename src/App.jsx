import { useState } from "react";

function App() {
  const [formData, setFormData] = useState({
    completionRate: "",
    dropOffStep: "",
    deviceType: "",
    frictionTags: [],
  });

  const [results, setResults] = useState([]);

  const frictionOptions = [
    "Map confusing",
    "Too many fields",
    "No progress indicator",
    "Slow loading",
    "Unclear instructions",
    "Weak CTA",
    "Mobile layout issues",
  ];

  const handleTagChange = (tag) => {
    setFormData((prev) => ({
      ...prev,
      frictionTags: prev.frictionTags.includes(tag)
        ? prev.frictionTags.filter((t) => t !== tag)
        : [...prev.frictionTags, tag],
    }));
  };

  const handleAnalyze = () => {
    const issues = [];

    if (
      formData.dropOffStep === "Map Location" &&
      formData.frictionTags.includes("Map confusing")
    ) {
      issues.push({
        title: "Location selection friction",
        priority: "High",
        recommendation:
          "Simplify the map interaction and add address search or clearer guidance.",
      });
    }

    if (formData.frictionTags.includes("No progress indicator")) {
      issues.push({
        title: "Unclear form progression",
        priority: "High",
        recommendation:
          "Add a progress bar or step tracker so users know how much is left.",
      });
    }

    if (
      formData.deviceType === "Mobile" &&
      formData.frictionTags.includes("Too many fields")
    ) {
      issues.push({
        title: "High input burden on mobile",
        priority: "Medium",
        recommendation:
          "Reduce fields, shorten typing effort, and simplify the mobile flow.",
      });
    }

    if (formData.frictionTags.includes("Weak CTA")) {
      issues.push({
        title: "Submission intent not supported",
        priority: "Medium",
        recommendation:
          "Make the submit action more prominent and clearer.",
      });
    }

    if (
      formData.frictionTags.includes("Slow loading") ||
      formData.frictionTags.includes("Unclear instructions")
    ) {
      issues.push({
        title: "Task clarity and trust may be dropping",
        priority: "Medium",
        recommendation:
          "Clarify instructions and reduce friction caused by waiting or uncertainty.",
      });
    }

    if (issues.length === 0) {
      issues.push({
        title: "No major friction pattern detected",
        priority: "Low",
        recommendation:
          "Collect more step-level user signals to refine the diagnosis.",
      });
    }

    setResults(issues.slice(0, 3));
  };

  const getPriorityStyle = (priority) => {
    if (priority === "High") {
      return {
        backgroundColor: "#fee2e2",
        color: "#991b1b",
      };
    }
    if (priority === "Medium") {
      return {
        backgroundColor: "#fef3c7",
        color: "#92400e",
      };
    }
    return {
      backgroundColor: "#dcfce7",
      color: "#166534",
    };
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f8fafc",
        padding: "40px 20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "760px",
          margin: "0 auto",
          background: "white",
          borderRadius: "16px",
          padding: "32px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
        }}
      >
        <h1
          style={{
            fontSize: "48px",
            marginBottom: "10px",
            textAlign: "center",
            color: "#0f172a",
          }}
        >
          BikeSpace Form UX Analyzer
        </h1>

        <p
          style={{
            textAlign: "center",
            color: "#475569",
            marginBottom: "32px",
            fontSize: "18px",
          }}
        >
          Diagnose form submission friction in a civic issue-reporting flow.
        </p>

        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", fontWeight: "bold", marginBottom: "8px" }}>
            Completion Rate (%)
          </label>
          <input
            type="number"
            value={formData.completionRate}
            onChange={(e) =>
              setFormData({ ...formData, completionRate: e.target.value })
            }
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "10px",
              border: "1px solid #cbd5e1",
              fontSize: "16px",
              boxSizing: "border-box",
            }}
            placeholder="e.g. 42"
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", fontWeight: "bold", marginBottom: "8px" }}>
            Drop-off Step
          </label>
          <select
            value={formData.dropOffStep}
            onChange={(e) =>
              setFormData({ ...formData, dropOffStep: e.target.value })
            }
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "10px",
              border: "1px solid #cbd5e1",
              fontSize: "16px",
              boxSizing: "border-box",
            }}
          >
            <option value="">Select</option>
            <option>Map Location</option>
            <option>Description</option>
            <option>Upload Photo</option>
            <option>Review & Submit</option>
          </select>
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", fontWeight: "bold", marginBottom: "8px" }}>
            Device Type
          </label>
          <select
            value={formData.deviceType}
            onChange={(e) =>
              setFormData({ ...formData, deviceType: e.target.value })
            }
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "10px",
              border: "1px solid #cbd5e1",
              fontSize: "16px",
              boxSizing: "border-box",
            }}
          >
            <option value="">Select</option>
            <option>Mobile</option>
            <option>Desktop</option>
          </select>
        </div>

        <div style={{ marginBottom: "24px" }}>
          <label style={{ display: "block", fontWeight: "bold", marginBottom: "12px" }}>
            Friction Tags
          </label>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "10px",
            }}
          >
            {frictionOptions.map((tag) => (
              <label
                key={tag}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  background: "#f8fafc",
                  border: "1px solid #e2e8f0",
                  borderRadius: "10px",
                  padding: "10px 12px",
                }}
              >
                <input
                  type="checkbox"
                  checked={formData.frictionTags.includes(tag)}
                  onChange={() => handleTagChange(tag)}
                />
                <span>{tag}</span>
              </label>
            ))}
          </div>
        </div>

        <button
          onClick={handleAnalyze}
          style={{
            width: "100%",
            padding: "14px",
            borderRadius: "12px",
            border: "none",
            background: "#2563eb",
            color: "white",
            fontSize: "16px",
            fontWeight: "bold",
            cursor: "pointer",
            marginBottom: "28px",
          }}
        >
          Analyze UX Friction
        </button>

        {results.length > 0 && (
          <div>
            <h2 style={{ color: "#0f172a", marginBottom: "16px" }}>Top UX Issues</h2>

            {results.map((r, i) => (
              <div
                key={i}
                style={{
                  border: "1px solid #e2e8f0",
                  borderRadius: "14px",
                  padding: "18px",
                  marginBottom: "14px",
                  background: "#ffffff",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "10px",
                  }}
                >
                  <h3 style={{ margin: 0, color: "#0f172a" }}>{r.title}</h3>
                  <span
                    style={{
                      ...getPriorityStyle(r.priority),
                      padding: "6px 10px",
                      borderRadius: "999px",
                      fontSize: "12px",
                      fontWeight: "bold",
                    }}
                  >
                    {r.priority}
                  </span>
                </div>
                <p style={{ margin: 0, color: "#475569", lineHeight: "1.5" }}>
                  {r.recommendation}
                </p>
              </div>
            ))}

            <div
              style={{
                marginTop: "24px",
                padding: "20px",
                borderRadius: "14px",
                background: "#eff6ff",
                border: "1px solid #bfdbfe",
              }}
            >
              <h3 style={{ marginTop: 0, color: "#1e3a8a" }}>Suggested 1-Week Sprint</h3>
              <p style={{ marginBottom: "8px", color: "#1e3a8a" }}>
                <strong>Days 1–2:</strong> Diagnose the highest-friction step and simplify the flow.
              </p>
              <p style={{ marginBottom: "8px", color: "#1e3a8a" }}>
                <strong>Days 3–4:</strong> Improve guidance, form clarity, and submission confidence.
              </p>
              <p style={{ marginBottom: 0, color: "#1e3a8a" }}>
                <strong>Day 5:</strong> Validate the revised experience with quick user feedback.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;