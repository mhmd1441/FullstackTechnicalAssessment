using ClientRequests.Data;
using ClientRequests.DTOs;
using ClientRequests.Models;
using Microsoft.EntityFrameworkCore;

namespace ClientRequests.Services;

public class ClientRequestService : IClientRequestService
{
    private readonly AppDbContext _context;

    public ClientRequestService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<PagedResult<RequestResponseDto>> GetAllAsync(
        RequestQueryParameters parameters,
        CancellationToken cancellationToken = default)
    {
        var query = _context.ClientRequests
            .AsNoTracking()
            .AsQueryable();

        if (parameters.Status.HasValue)
        {
            query = query.Where(r => r.Status == parameters.Status.Value);
        }

        var totalCount = await query.CountAsync(cancellationToken);

        var items = await query
            .OrderByDescending(r => r.CreatedAt)
            .Skip((parameters.Page - 1) * parameters.PageSize)
            .Take(parameters.PageSize)
            .Select(r => new RequestResponseDto
            {
                Id = r.Id,
                TicketNumber = r.TicketNumber,
                ClientName = r.ClientName,
                Title = r.Title,
                Description = r.Description,
                Status = r.Status,
                CreatedAt = r.CreatedAt,
                UpdatedAt = r.UpdatedAt
            })
            .ToListAsync(cancellationToken);

        return new PagedResult<RequestResponseDto>
        {
            Items = items,
            Page = parameters.Page,
            PageSize = parameters.PageSize,
            TotalCount = totalCount,
            TotalPages = (int)Math.Ceiling(
                totalCount / (double)parameters.PageSize)
        };
    }

    public async Task<RequestResponseDto> CreateAsync(
     CreateRequestDto dto,
     CancellationToken cancellationToken = default)
    {
        var sequenceNumber = await _context.Database
            .SqlQuery<int>($"""SELECT nextval('"ClientRequestTicketSequence"')::int AS "Value" """)
            .SingleAsync(cancellationToken);

        var now = DateTime.UtcNow;

        var request = new ClientRequest
        {
            TicketNumber = $"REQ-{now.Year}-{sequenceNumber:D5}",
            ClientName = dto.ClientName.Trim(),
            Title = dto.Title.Trim(),
            Description = dto.Description.Trim(),
            Status = RequestStatus.New,
            CreatedAt = now
        };

        _context.ClientRequests.Add(request);
        await _context.SaveChangesAsync(cancellationToken);

        return new RequestResponseDto
        {
            Id = request.Id,
            TicketNumber = request.TicketNumber,
            ClientName = request.ClientName,
            Title = request.Title,
            Description = request.Description,
            Status = request.Status,
            CreatedAt = request.CreatedAt,
            UpdatedAt = request.UpdatedAt
        };
    }

    public async Task<RequestResponseDto?> UpdateStatusAsync(
    int id,
    UpdateRequestStatusDto dto,
    CancellationToken cancellationToken = default)
    {
        var request = await _context.ClientRequests
            .FirstOrDefaultAsync(r => r.Id == id, cancellationToken);

        if (request is null)
            return null;

        var isValidTransition =
            (request.Status == RequestStatus.New &&
             dto.Status == RequestStatus.InProgress) ||
            (request.Status == RequestStatus.InProgress &&
             dto.Status == RequestStatus.Done);

        if (!isValidTransition)
            throw new InvalidOperationException(
                $"Cannot change status from {request.Status} to {dto.Status}.");

        request.Status = dto.Status;
        request.UpdatedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync(cancellationToken);

        return new RequestResponseDto
        {
            Id = request.Id,
            TicketNumber = request.TicketNumber,
            ClientName = request.ClientName,
            Title = request.Title,
            Description = request.Description,
            Status = request.Status,
            CreatedAt = request.CreatedAt,
            UpdatedAt = request.UpdatedAt
        };
    }
}