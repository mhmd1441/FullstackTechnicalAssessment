using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ClientRequests.Migrations
{
    /// <inheritdoc />
    public partial class AddTicketNumberSequence : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateSequence<int>(
                name: "ClientRequestTicketSequence");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropSequence(
                name: "ClientRequestTicketSequence");
        }
    }
}
