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
        var status = _dataContext.StatusTasks.FirstOrDefault(p => p.TaskId == taskId);
        _dataContext.StatusTasks.Remove(status);
        _dataContext.SaveChangesAsync();
    }
}