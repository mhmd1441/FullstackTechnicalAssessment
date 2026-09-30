namespace ClientRequests.Models
{
    public class ClientRequest
    {
        public int Id { get; set; }

        public string TicketNumber { get; set; } = string.Empty;

        public string ClientName { get; set; } = string.Empty;

        public string Title { get; set; } = string.Empty;

        public string Description { get; set; } = string.Empty;

        public RequestStatus Status { get; set; } = RequestStatus.New;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public DateTime? UpdatedAt { get; set; }
    }
}
