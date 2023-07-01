using Microsoft.EntityFrameworkCore;
using TaskManager.Notification.Context;
using TaskManager.Notification.Entities;
using TaskManager.Notification.Interfaces;

namespace TaskManager.Notification.Services;

public class TaskService : ITaskService
{
    private readonly TaskManagerDbContext _dataContext;

    public TaskService(TaskManagerDbContext context)
    {
        _dataContext = context;
    }
    public async Task updateTaskStatusByTaskId(int taskId, int statusId)
    {
        var oldStatus = _dataContext.tasks.Where(i => i.id == taskId).Select(i => i.status.name);
        var newStatus = _dataContext.statuses.Where(i => i.id == statusId).Select(n=>n.name);
        
        var statusTask = _dataContext.status_tasks
            .Where(i => i.task_id == taskId)
            .Select(s => s.status_id == statusId);
        
        

        _dataContext.Update(statusTask);
         await _dataContext.SaveChangesAsync();
    }
}