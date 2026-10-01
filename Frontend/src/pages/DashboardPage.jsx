import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getRequests } from "../services/requestsApi";
import RequestTable from "../components/RequestTable";

function DashboardPage({ onLogout }) {
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    async function loadRequests() {
      try {
        const data = await getRequests();
        setRequests(data.items);
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    }

    loadRequests();
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("isAuthenticated");
    onLogout();
    navigate("/login");
  };

  return (
    <div>
      <h1>Client Requests Dashboard</h1>
      <RequestTable requests={requests} />
      <button type="button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default DashboardPage;
