using Microsoft.AspNetCore.Mvc;
using TaskManager.Notification.Entities;
using TaskManager.Notification.Interfaces;
using TaskManager.Statistics.Interfaces;

namespace TaskManager.Controllers;


[ApiController]
[Route(Route)]
public class StatisticController : ControllerBase
{
    private const string Route = "api/statistic";

    private readonly IStatisticService _statisticService;
    private readonly ITaskService _taskService;

    public StatisticController(IStatisticService service, ITaskService taskService)
    {
        _statisticService = service;
        _taskService = taskService;
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
    public async Task<IActionResult> ProjectTaskStatsByUser(int userId)
    {
        var  responses = await _statisticService.ProjectTaskStatsByUser(userId);
        return Ok(responses);
    }

    [HttpGet("projectTasks")]

    public async Task<IActionResult> ProjectTasks(int projectId)
    {
        var response = await _statisticService.ProjectTasks(projectId);
        return Ok(response);
    }
    
    [HttpPut("changeTaskStatus")]
    public async Task<IActionResult> changeTaskStatus(int taskId, int statusId)
    {
        await _taskService.updateTaskStatusByTaskId(taskId, statusId);

        return Ok();
    }
    
    
}