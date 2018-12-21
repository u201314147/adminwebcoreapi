using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace CrudApiTest.Migrations
{
    public partial class Employee : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Employees",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    Name = table.Column<string>(nullable: true),
                    PaternalSurname = table.Column<string>(nullable: true),
                    MaternalSurname = table.Column<string>(nullable: true),
                    Childrens = table.Column<int>(nullable: false),
                    DNI = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Employees", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Employees");
        }
    }
}
