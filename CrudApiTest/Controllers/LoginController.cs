﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace CrudApiTest.Controllers
{
    [Route("login")]
    public class LoginController : Controller
    {
        public IActionResult Login() => View();
    }
}