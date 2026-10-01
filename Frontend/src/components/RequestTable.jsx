function RequestTable({ requests }) {
  return (
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
        {requests.map((request) => (
          <tr key={request.id}>
            <td>{request.ticketNumber}</td>
            <td>{request.clientName}</td>
            <td>{request.title}</td>
            <td>{request.status}</td>
            <td>{new Date(request.createdAt).toLocaleDateString()}</td>
            <td>—</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default RequestTable