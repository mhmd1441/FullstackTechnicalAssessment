using ClientRequests.Models;

namespace ClientRequests.DTOs;

public class RequestResponseDto
{
    public int Id { get; set; }
    public string TicketNumber { get; set; } = string.Empty;
    public string ClientName { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public RequestStatus Status { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime? UpdatedAt { get; set; }
}