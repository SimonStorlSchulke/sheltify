using Microsoft.AspNetCore.Mvc;

namespace sheltify_backend.Controllers;

[ApiController]
[Route("api/v1/animals")]
public class AnimalController : ControllerBase
{
    [HttpGet("/all")]
    public string GetAnimals()
    {
        return "All animals";
    }
}