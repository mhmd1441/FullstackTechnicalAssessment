using ClientRequests.Models;
using System.ComponentModel.DataAnnotations;

namespace ClientRequests.DTOs;

public class RequestQueryParameters
{
    [Range(1, int.MaxValue)]
    public int Page { get; set; } = 1;

    [Range(1, 100)]
    public int PageSize { get; set; } = 20;

    public RequestStatus? Status { get; set; }
}