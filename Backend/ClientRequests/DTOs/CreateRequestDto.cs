using System.ComponentModel.DataAnnotations;

namespace ClientRequests.DTOs;

public class CreateRequestDto
{
    [Required]
    [MaxLength(100)]
    public string ClientName { get; set; } = string.Empty;

    [Required]
    [MaxLength(200)]
    public string Title { get; set; } = string.Empty;

    [Required]
    [MaxLength(2000)]
    public string Description { get; set; } = string.Empty;
}