using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CrudApiTest.Models
{
    public class ApplicationUser : IdentityUser
    {
        public DateTime? BirthDate { get; set; } = DateTime.UtcNow;
    }
}
