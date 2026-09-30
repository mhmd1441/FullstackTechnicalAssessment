using ClientRequests.DTOs;
using ClientRequests.Services;
using Microsoft.AspNetCore.Mvc;

namespace ClientRequests.Controllers;

[ApiController]
[Route("api/requests")]
public class ClientRequestsController : ControllerBase
{
    private readonly IClientRequestService _service;

    public ClientRequestsController(IClientRequestService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<ActionResult<PagedResult<RequestResponseDto>>> GetAll(
        [FromQuery] RequestQueryParameters parameters,
        CancellationToken cancellationToken)
    {
        var result = await _service.GetAllAsync(parameters, cancellationToken);

        return Ok(result);
    }

    [HttpPost]
    public async Task<ActionResult<RequestResponseDto>> Create(
        [FromBody] CreateRequestDto dto,
        CancellationToken cancellationToken)
    {
        var request = await _service.CreateAsync(dto, cancellationToken);

        return StatusCode(StatusCodes.Status201Created, request);
    }

    [HttpPatch("{id:int}/status")]
    public async Task<ActionResult<RequestResponseDto>> UpdateStatus(
        int id,
        [FromBody] UpdateRequestStatusDto dto,
        CancellationToken cancellationToken)
    {
        try
        {
            var request = await _service.UpdateStatusAsync(
                id,
                dto,
                cancellationToken);

            if (request is null)
            {
                return NotFound();
            }

            return Ok(request);
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }
}