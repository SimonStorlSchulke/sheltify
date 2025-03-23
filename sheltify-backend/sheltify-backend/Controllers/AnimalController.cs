using Microsoft.AspNetCore.Mvc;

namespace sheltify_backend.Controllers;

public class AnimalController : Controller
{
    // GET
    public IActionResult Index()
    {
        return View();
    }
}