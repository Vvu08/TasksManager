using Microsoft.AspNetCore.Mvc;
using TaskManager.Statistics.Interfaces;

namespace TaskManager.Controllers;


[ApiController]
[Route(Route)]
public class StatisticController : ControllerBase
{
    private const string Route = "api/statistic";

    private readonly IStatisticService _statisticService;

    public StatisticController(IStatisticService service)
    {
        _statisticService = service;
    }
    
    [HttpGet("alltask")]
    public async Task<IActionResult> ProjectTaskStats(int projectId)
    {
        await _statisticService.ProjectTaskStats(projectId);
        return Ok();
    }
    
    [HttpGet("sort")]
    public async Task<IActionResult> SortByPriorityAndUser(int projectId, int userId, string sortType)
    {
        await _statisticService.SortByPriorityAndUser(projectId, userId, sortType);
        return Ok();
    }
    
    [HttpGet("allusertask")]
    public async Task<IActionResult> ProjectTaskStatsByUser(int projectId, int userId)
    {
        await _statisticService.ProjectTaskStatsByUser(projectId, userId);
        return Ok();
    }
}