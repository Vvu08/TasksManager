using Microsoft.AspNetCore.Mvc;
using TaskManager.Notification.Interfaces;

namespace TaskManager.Controllers;

[ApiController]
[Route(Route)]
public class NotificationController : Controller
{
    private const string Route = "api/notification";

    private readonly ITaskService _taskService;

    public NotificationController(ITaskService taskService)
    {
        _taskService = taskService;
    }

    
}