import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RequestTable from "../components/RequestTable";
import CreateRequestModal from "../components/CreateRequestModal";
import {
  createRequest,
  getRequests,
  updateRequestStatus,
} from "../services/requestsApi";

function DashboardPage({ onLogout }) {
  const navigate = useNavigate();

  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [updatingId, setUpdatingId] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchRequests() {
      try {
        const data = await getRequests(page, 10, status, controller.signal);

        if (controller.signal.aborted) return;

        setRequests(data.items);
        setTotalPages(data.totalPages);
        setTotalCount(data.totalCount);
        setError("");
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchRequests();

    return () => {
      controller.abort();
    };
  }, [page, status]);

  const handleStatusChange = async (id, nextStatus) => {
    try {
      setUpdatingId(id);
      setError("");

      const updatedRequest = await updateRequestStatus(id, nextStatus);

      setRequests((current) =>
        current.map((request) =>
          request.id === id ? updatedRequest : request,
        ),
      );
    } catch (err) {
      setError(err.message);
    } finally {
      setUpdatingId(null);
    }
  };

  const handleCreate = async (form) => {
    const createdRequest = await createRequest(form);

    setStatus("");
    setPage(1);

    setRequests((current) => {
      const updated = [createdRequest, ...current];
      return updated.slice(0, 10);
    });

    const newTotal = totalCount + 1;
    setTotalCount(newTotal);
    setTotalPages(Math.max(1, Math.ceil(newTotal / 10)));
  };

  const handleStatusFilter = (event) => {
    setLoading(true);
    setStatus(event.target.value);
    setPage(1);
  };

  const handlePreviousPage = () => {
    setLoading(true);
    setPage((current) => current - 1);
  };

  const handleNextPage = () => {
    setLoading(true);
    setPage((current) => current + 1);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("isAuthenticated");
    onLogout();
    navigate("/login");
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div>
          <span className="brand">Najahak</span>
          <h1>Client Requests</h1>
          <p>Manage and track incoming client requests.</p>
        </div>

        <button
          type="button"
          className="secondary-button"
          onClick={handleLogout}
        >
          Logout
        </button>
      </header>

      <main className="dashboard-content">
        <div className="dashboard-summary">
          <div>
            <span>Total Requests</span>
            <strong>{totalCount}</strong>
          </div>
        </div>

        <section className="requests-section">
          <div className="section-header">
            <div>
              <h2>Requests</h2>
              <p>Review and update client request statuses.</p>
            </div>

            <div className="section-actions">
              <select value={status} onChange={handleStatusFilter}>
                <option value="">All statuses</option>
                <option value="New">New</option>
                <option value="InProgress">In Progress</option>
                <option value="Done">Done</option>
              </select>

              <button
                type="button"
                className="primary-button"
                onClick={() => setShowCreateModal(true)}
              >
                + New Request
              </button>
            </div>
          </div>

          {error && <div className="error-message">{error}</div>}

          {loading ? (
            <div className="loading-state">Loading requests...</div>
          ) : (
            <RequestTable
              requests={requests}
              onStatusUpdate={handleStatusChange}
              updatingId={updatingId}
            />
          )}

          {!loading && totalPages > 1 && (
            <div className="pagination">
              <button
                type="button"
                disabled={page === 1}
                onClick={handlePreviousPage}
              >
                Previous
              </button>

              <span>
                Page {page} of {totalPages}
              </span>

              <button
                type="button"
                disabled={page === totalPages}
                onClick={handleNextPage}
              >
                Next
              </button>
            </div>
          )}
        </section>
      </main>

      {showCreateModal && (
        <CreateRequestModal
          onClose={() => setShowCreateModal(false)}
          onCreate={handleCreate}
        />
      )}
    </div>
  );
}

export default DashboardPage;
