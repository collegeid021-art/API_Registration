import { useState } from "react";

const initialApis = [
  //{ id: 1, name: "Weather API (v1.0)", user: "John Doe", status: "Pending", requests: 1230, created: "2024-04-20" },
  //{ id: 2, name: "Payment API (v2.3)", user: "Alice Smith", status: "Active", requests: 2900, created: "2024-04-18" },
  //{ id: 3, name: "News API (v1.1)", user: "David Brown", status: "Suspended", requests: 534, created: "2024-04-16" }
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("API Management"); // Track which sidebar link is active
  const [apis, setApis] = useState(initialApis);
  const [search, setSearch] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("role");
    window.location.href = "/";
  };

  const filteredApis = apis.filter(api =>
    api.name.toLowerCase().includes(search.toLowerCase())
  );

  const updateStatus = (id, newStatus) => {
    setApis(prev =>
      prev.map(api => (api.id === id ? { ...api, status: newStatus } : api))
    );
  };

  return (
    <div style={{ display: "flex", fontFamily: "Segoe UI", minHeight: "100vh" }}>
      {/* Sidebar */}
      <aside style={{ width: "220px", background: "#fff", padding: "20px", boxShadow: "2px 0 5px rgba(0,0,0,0.1)" }}>
        <h2 style={{ fontSize: "20px", marginBottom: "20px" }}>Admin Dashboard</h2>
        <nav style={{ display: "flex", flexDirection: "column", gap: "12px", color: "#555" }}>
          {["API Management", "User Management"].map(tab => (
            <span
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                fontWeight: activeTab === tab ? "600" : "400",
                color: activeTab === tab ? "#2575fc" : "#555",
                cursor: "pointer"
              }}
            >
              {tab}
            </span>
          ))}
        </nav>
        <button
          onClick={handleLogout}
          style={{
            marginTop: "30px",
            padding: "10px 20px",
            background: "#2575fc",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer"
          }}
        >
          Logout
        </button>
      </aside>

      {/* Main content */}
      <main style={{ flex: 1, padding: "40px", background: "#f5f5f5" }}>
        <h1 style={{ fontSize: "24px", marginBottom: "10px" }}>{activeTab}</h1>

        {activeTab === "API Management" && (
          <>
            {/* Stats */}
            <div style={{ display: "flex", gap: "20px", marginBottom: "30px" }}>
              <StatCard label="Total APIs" value={apis.length} />
              <StatCard label="Pending Approval" value={apis.filter(a => a.status === "Pending").length} />
              <StatCard label="Active APIs" value={apis.filter(a => a.status === "Active").length} />
              <StatCard label="Suspended APIs" value={apis.filter(a => a.status === "Suspended").length} />
            </div>

            {/* Search */}
            <div style={{ marginBottom: "20px" }}>
              <input
                type="text"
                placeholder="Search APIs..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ padding: "8px 12px", width: "250px", borderRadius: "6px", border: "1px solid #ccc" }}
              />
            </div>

            {/* Table */}
            <div style={{ background: "#fff", borderRadius: "10px", padding: "20px", overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>
                <thead style={{ color: "#777", textAlign: "left", borderBottom: "2px solid #eee" }}>
                  <tr>
                    <th style={{ padding: "8px" }}>API Name</th>
                    <th style={{ padding: "8px" }}>Created By</th>
                    <th style={{ padding: "8px" }}>Status</th>
                    <th style={{ padding: "8px" }}>Requests</th>
                    <th style={{ padding: "8px" }}>Created</th>
                    <th style={{ padding: "8px" }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredApis.map(api => (
                    <tr key={api.id} style={{ borderBottom: "1px solid #eee" }}>
                      <td style={{ padding: "8px", fontWeight: "500" }}>{api.name}</td>
                      <td style={{ padding: "8px" }}>{api.user}</td>
                      <td style={{ padding: "8px" }}>
                        <span
                          style={{
                            padding: "2px 8px",
                            borderRadius: "12px",
                            fontSize: "12px",
                            color:
                              api.status === "Active" ? "green" :
                              api.status === "Pending" ? "orange" : "red",
                            backgroundColor:
                              api.status === "Active" ? "#d4edda" :
                              api.status === "Pending" ? "#fff3cd" : "#f8d7da"
                          }}
                        >
                          {api.status}
                        </span>
                      </td>
                      <td style={{ padding: "8px" }}>{api.requests}</td>
                      <td style={{ padding: "8px" }}>{api.created}</td>
                      <td style={{ padding: "8px", display: "flex", gap: "6px" }}>
                        <button style={{ padding: "4px 6px", borderRadius: "4px", border: "1px solid #ccc" }}>View</button>
                        {api.status === "Pending" && (
                          <>
                            <button
                              style={{ padding: "4px 6px", borderRadius: "4px", background: "green", color: "white" }}
                              onClick={() => updateStatus(api.id, "Active")}
                            >
                              Approve
                            </button>
                            <button
                              style={{ padding: "4px 6px", borderRadius: "4px", background: "red", color: "white" }}
                              onClick={() => updateStatus(api.id, "Suspended")}
                            >
                              Reject
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {activeTab === "User Management" && <p>Here you can manage users...</p>}
        
      </main>
    </div>
  );
}

function StatCard({ label, value }) {
  return (
    <div style={{ flex: 1, background: "#fff", borderRadius: "10px", padding: "15px", boxShadow: "0 1px 4px rgba(0,0,0,0.1)" }}>
      <p style={{ fontSize: "12px", color: "#777" }}>{label}</p>
      <p style={{ fontSize: "18px", fontWeight: "600" }}>{value}</p>
    </div>
  );
}
