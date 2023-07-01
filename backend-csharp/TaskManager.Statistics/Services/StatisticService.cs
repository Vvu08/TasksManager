using Microsoft.EntityFrameworkCore;
using TaskManager.Notification.Context;
using TaskManager.Notification.Entities;
using TaskManager.Statistics.Interfaces;
using TaskManager.Statistics.Model;

namespace TaskManager.Statistics.Services;

public class StatisticService : IStatisticService
{
    private readonly TaskManagerDbContext _dataContext;
    
    public StatisticService(TaskManagerDbContext context)
    {
        _dataContext = context;
    }
    public async Task<List<ProjectTaskStatsResponse>> ProjectTaskStats(int projectId)
    {
        var task = _dataContext.StatusTasks
            .Include(s => s.Status)
            .Include(t => t.Task)
            .ThenInclude(p => p.Story.Project);

        var response = task.Where(p => p.Task.Story.ProjectId == projectId)
            .GroupBy(p => p.Status.Name)
            .Select(a => new ProjectTaskStatsResponse(
                a.Key,
                a.Count()));
        
       
        return await response.ToListAsync();
    }
    
    public async Task<List<ProjectTaskStatsResponse>> ProjectTaskStatsByUser(int projectId, int userId)
    {
        var task = _dataContext.StatusTasks
            .Include(s => s.Status)
            .Include(t => t.Task)
            .ThenInclude(p => p.Story.Project);

        var response = task.Where(p => p.Task.Story.ProjectId == projectId
            && p.Task.UserId == userId)
            .GroupBy(p => p.Status.Name)
            .Select(a => new ProjectTaskStatsResponse(
                a.Key,
                a.Count()));
        
       
        return await response.ToListAsync();
    }

    public async  Task<List<Tasks>> SortByPriorityAndUser(int projectId, int userId, string sortType)
    {
        var tasks = _dataContext.Tasks
            .Where(p => p.UserId == userId && p.Story.ProjectId == projectId);
        
        switch (sortType)
        {
            case "desc":
                tasks = tasks.OrderBy(p => p.Priority);
                break;;
            case "asc":
                tasks = tasks.OrderByDescending(p => p.Priority);
                break;
        }

        //List<Tasks> sortedTask = await tasks.ToListAsync();
        return await tasks.ToListAsync();
    }
}