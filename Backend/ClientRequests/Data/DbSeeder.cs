using ClientRequests.Models;
using Microsoft.EntityFrameworkCore;

namespace ClientRequests.Data;

public static class DbSeeder
{
    public static async Task SeedAsync(AppDbContext context)
    {
        if (await context.ClientRequests.AnyAsync())
        {
            return;
        }

        var now = DateTime.UtcNow;

        var requests = new[]
        {
            new ClientRequest
            {
                TicketNumber = "DEMO-001",
                ClientName = "Najahak  Technologies",
                Title = "Account access issue",
                Description = "Client is unable to access the company dashboard.",
                Status = RequestStatus.New,
                CreatedAt = now
            },

            new ClientRequest
            {
                TicketNumber = "DEMO-002",
                ClientName = "Najahak  Solutions",
                Title = "Update company information",
                Description = "Client requested an update to their company information.",
                Status = RequestStatus.InProgress,
                CreatedAt = now.AddMinutes(-30),
                UpdatedAt = now.AddMinutes(-10)
            },

            new ClientRequest
            {
                TicketNumber = "DEMO-003",
                ClientName = "Najahak IO",
                Title = "Report access request",
                Description = "Client requested access to the monthly reports.",
                Status = RequestStatus.Done,
                CreatedAt = now.AddHours(-2),
                UpdatedAt = now.AddHours(-1)
            }
        };

        await context.ClientRequests.AddRangeAsync(requests);
        await context.SaveChangesAsync();
    }
}