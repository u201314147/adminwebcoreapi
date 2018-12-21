using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CrudApiTest.Data;
using CrudApiTest.Dto;
using CrudApiTest.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CrudApiTest.Controllers
{
    [Authorize]
    [Route("api/employees")]
    public class EmployeesController : Controller
    {
        public ApplicationDbContext _context;

        public EmployeesController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var result = await _context.Employees.ToListAsync();
            return Ok(new { data = result });
        }
        
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(Guid id)
        {
            if (id == Guid.Empty)
                return BadRequest($"Id {id} no encontrado.");

            var dbEmployee = await _context.Employees.FindAsync(id);
            var employee = new EmployeeDto
            {
                Names = dbEmployee.Name,
                PaternalSurname = dbEmployee.PaternalSurname,
                MaternalSurname = dbEmployee.MaternalSurname,
                DNI = dbEmployee.DNI,
                Childrens = dbEmployee.Childrens
            };
            return Ok(employee);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] EmployeeDto employeeDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var employee = new Employee
            {
                Name = employeeDto.Names,
                PaternalSurname = employeeDto.PaternalSurname,
                MaternalSurname = employeeDto.MaternalSurname,
                Childrens = employeeDto.Childrens,
                DNI = employeeDto.DNI
            };

            await _context.Employees.AddAsync(employee);
            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Edit(Guid id, [FromBody] EmployeeDto employeeDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            if (id == Guid.Empty)
                return BadRequest($"Id {id} no encontrado.");

            var dbEmployee = await _context.Employees.FindAsync(id);
            dbEmployee.Name = employeeDto.Names;
            dbEmployee.PaternalSurname = employeeDto.PaternalSurname;
            dbEmployee.MaternalSurname = employeeDto.MaternalSurname;
            employeeDto.Childrens = employeeDto.Childrens;
            dbEmployee.DNI = employeeDto.DNI;

            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            if (id == Guid.Empty)
                return BadRequest($"Id {id} no encontrado.");
            var dbEmployee = await _context.Employees.FindAsync(id);
            _context.Employees.Remove(dbEmployee);
            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}