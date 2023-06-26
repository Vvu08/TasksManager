using Microsoft.EntityFrameworkCore;
using TaskManager.Notification.Context;
using TaskManager.Notification.Entities;
using TaskManager.Statistics.Interfaces;
using TaskManager.Statistics.Model;

namespace TaskManager.Statistics.Services;

public class StatisricService : IStatisticService
{
    private readonly TaskManagerDbContext _dataContext;
    
    public StatisricService(TaskManagerDbContext context)
    {
        _dataContext = context;
    }
    public async Task<List<ProjectTaskStatsResponse>> ProjectTaskStats(int projectId)
    {
        var tasks = _dataContext.PublicTasks
            .Include(s => s.Story)
            .ThenInclude(p => p.Project)
            .Where(i => i.Story.ProjectId == projectId)
            .GroupBy(t => t.Statuses)
            .Select(n => new ProjectTaskStatsResponse(n.Key, n.Count()));
        
        List<ProjectTaskStatsResponse> responses = await tasks.ToListAsync();
        return responses;
    }
    
    public async Task<List<ProjectTaskStatsResponse>> ProjectTaskStatsByUser(int projectId, int userId)
    {
        var tasks = _dataContext.PublicTasks
            .Include(s => s.Story)
            .ThenInclude(p => p.Project)
            .Where(i => i.Story.Project.Id == projectId && i.UserId == userId)
            .GroupBy(t => t.Statuses)
            .Select(n => new ProjectTaskStatsResponse(n.Key, n.Count()));
        
        List<ProjectTaskStatsResponse> responses = await tasks.ToListAsync();
        return responses;
    }

    public async  Task<IEnumerable<PublicTask>> SortByPriorityAndUser(int projectId, int userId, string sortType)
    {
        IQueryable<PublicTask> tasks =  _dataContext.PublicTasks
            .Include(s => s.Story)
            .ThenInclude(p => p.Project)
            .Where(i => i.Story.ProjectId == projectId && i.UserId == userId);

        
        switch (sortType)
        {
            case "desc":
                tasks = tasks.OrderByDescending(p => p.Priority);
                break;;
            case "asc":
                tasks = tasks.OrderBy(p => p.Priority);
                break;
        }

        List<PublicTask> sortedTask = await tasks.ToListAsync();
        return sortedTask;
    }
}