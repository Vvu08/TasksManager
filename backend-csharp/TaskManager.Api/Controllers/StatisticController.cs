using Microsoft.AspNetCore.Mvc;
using TaskManager.Notification.Entities;
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
    
    [HttpGet("allProjectTask")]
    public async Task<IActionResult> ProjectTaskStats(int projectId)
    {
       var  responses = await _statisticService.ProjectTaskStats(projectId);
        return Ok(responses);
    }
    
    [HttpGet("sort")]
    public async Task<IActionResult> SortByPriorityAndUser(int projectId, int userId, string sortType)
    {
       var response =  await _statisticService.SortByPriorityAndUser(projectId, userId, sortType);
        return Ok(response);
    }
    
    [HttpGet("allUserProjectTask")]
    public async Task<IActionResult> ProjectTaskStatsByUser(int projectId, int userId)
    {
        var  responses = await _statisticService.ProjectTaskStatsByUser(projectId, userId);
        return Ok(responses);
    }
}