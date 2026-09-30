using ClientRequests.DTOs;

namespace ClientRequests.Services;

public interface IClientRequestService
{
    Task<PagedResult<RequestResponseDto>> GetAllAsync(
        RequestQueryParameters parameters,
        CancellationToken cancellationToken = default);

    Task<RequestResponseDto> CreateAsync(
        CreateRequestDto dto,
        CancellationToken cancellationToken = default);

    Task<RequestResponseDto?> UpdateStatusAsync(
        int id,
        UpdateRequestStatusDto dto,
        CancellationToken cancellationToken = default);
}