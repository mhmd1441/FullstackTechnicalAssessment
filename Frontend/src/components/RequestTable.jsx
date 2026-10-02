import StatusBadge from './StatusBadge'

function RequestTable({ requests, onStatusUpdate, updatingId }) {
  const getNextStatus = (status) => {
    if (status === 'New') return 'InProgress'
    if (status === 'InProgress') return 'Done'

    return null
  }

  const getButtonLabel = (status) => {
    if (status === 'New') return 'Start'
    if (status === 'InProgress') return 'Mark Done'

    return null
  }

  if (requests.length === 0) {
    return (
      <div className="empty-state">
        <h3>No client requests found</h3>
        <p>There are no requests matching the current filter.</p>
      </div>
    )
  }

  return (
    <div className="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>Ticket</th>
            <th>Client</th>
            <th>Title</th>
            <th>Status</th>
            <th>Created</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {requests.map((request) => {
            const nextStatus = getNextStatus(request.status)

            return (
              <tr key={request.id}>
                <td className="ticket-number">{request.ticketNumber}</td>
                <td>{request.clientName}</td>
                <td>{request.title}</td>

                <td>
                  <StatusBadge status={request.status} />
                </td>

                <td>
                  {new Date(request.createdAt).toLocaleDateString()}
                </td>

                <td>
                  {nextStatus ? (
                    <button
                      className="action-button"
                      type="button"
                      disabled={updatingId === request.id}
                      onClick={() =>
                        onStatusUpdate(request.id, nextStatus)
                      }
                    >
                      {updatingId === request.id
                        ? 'Updating...'
                        : getButtonLabel(request.status)}
                    </button>
                  ) : (
                    <span className="completed-label">Completed</span>
                  )}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default RequestTable