using ClientRequests.Models;
using System.ComponentModel.DataAnnotations;

namespace ClientRequests.DTOs;

public class UpdateRequestStatusDto
{
    [Required]
    [EnumDataType(typeof(RequestStatus))]
    public RequestStatus Status { get; set; }
}