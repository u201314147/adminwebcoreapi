using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace CrudApiTest.Dto
{
    public class EmployeeDto
    {
        [Required]
        public string Names { get; set; }

        [Required]
        public string PaternalSurname { get; set; }

        [Required]
        public string MaternalSurname { get; set; }

        [Required]
        public string DNI { get; set; }

        [Required]
        public int Childrens { get; set; }
    }
}
