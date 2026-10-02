using ClientRequests.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ClientRequests.Data.Configurations;

public class ClientRequestConfiguration : IEntityTypeConfiguration<ClientRequest>
{
    public void Configure(EntityTypeBuilder<ClientRequest> builder)
    {
        builder.ToTable("ClientRequests");

        builder.HasKey(r => r.Id);

        builder.Property(r => r.TicketNumber)
            .IsRequired()
            .HasMaxLength(30);

        builder.HasIndex(r => r.TicketNumber)
            .IsUnique();

        builder.HasIndex(r => r.CreatedAt);

        builder.HasIndex(r => new
        {
            r.Status,
            r.CreatedAt
        });


        builder.Property(r => r.ClientName)
            .IsRequired()
            .HasMaxLength(100);

        builder.Property(r => r.Title)
            .IsRequired()
            .HasMaxLength(200);

        builder.Property(r => r.Description)
            .IsRequired()
            .HasMaxLength(2000);

        builder.Property(r => r.Status)
            .HasConversion<string>()
            .IsRequired()
            .HasMaxLength(20);

        builder.Property(r => r.CreatedAt)
            .IsRequired();
    }
}