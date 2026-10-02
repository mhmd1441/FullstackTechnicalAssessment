function StatusBadge({ status }) {
  const label = status === 'InProgress' ? 'In Progress' : status

  return (
    <span className={`status-badge status-${status.toLowerCase()}`}>
      {label}
    </span>
  )
}

export default StatusBadge