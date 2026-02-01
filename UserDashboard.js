import { useState } from "react";

export default function UserDashboard() {
  const [fields, setFields] = useState([
    { key: "api_name", value: "" },
  ]);

  const addField = () => setFields([...fields, { key: "", value: "" }]);
  const updateField = (index, field, value) => {
    const updated = [...fields];
    updated[index][field] = value;
    setFields(updated);
  };
  const removeField = (index) =>
    setFields(fields.filter((_, i) => i !== index));

  const jsonPreview = fields.reduce((acc, cur) => {
    if (cur.key) acc[cur.key] = cur.value;
    return acc;
  }, {});

  const handleLogout = () => {
    localStorage.removeItem("role");
    window.location.href = "/";
  };

  return (
    <div style={{ padding: "40px", fontFamily: "Segoe UI" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <h1>User Dashboard</h1>
          <p> </p>
        </div>
        <button
          onClick={handleLogout}
          style={{
            padding: "10px 20px",
            background: "#2575fc",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </div>

      <div style={{ display: "flex", gap: "20px", marginTop: "30px" }}>
        {/* API Form */}
        <div style={{ flex: 1, border: "1px solid #ccc", padding: "20px", borderRadius: "10px" }}>
          <h2>API Fields</h2>
          {fields.map((field, index) => (
            <div key={index} style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
              <input
                placeholder="Field name"
                value={field.key}
                onChange={(e) => updateField(index, "key", e.target.value)}
              />
              <input
                placeholder="Field value"
                value={field.value}
                onChange={(e) => updateField(index, "value", e.target.value)}
              />
              <button onClick={() => removeField(index)}>Delete</button>
            </div>
          ))}
          <button onClick={addField}>Add Field</button>
          <button style={{ marginTop: "10px" }}>Register API</button>
        </div>

        {/* JSON Preview */}
        <div style={{ flex: 1, border: "1px solid #ccc", padding: "20px", borderRadius: "10px" }}>
          <h2>Preview</h2>
          <pre style={{ background: "#000", color: "#0f0", padding: "10px" }}>
            {JSON.stringify(jsonPreview, null, 2)}
          </pre>
        </div>

        
      </div>

      
    </div>
  );
}

