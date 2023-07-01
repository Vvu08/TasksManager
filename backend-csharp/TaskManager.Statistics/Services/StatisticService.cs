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
        var tasks = _dataContext.tasks
            .Include(s => s.status)
            .Include(s => s.story)
            .ThenInclude(p => p.project)
            .Where(i => i.story.project.id == projectId)
            .GroupBy(s => s.status.name)
            .Select(n => new ProjectTaskStatsResponse(
                n.Key,
                n.Count()));


        List<ProjectTaskStatsResponse> responses = await tasks.ToListAsync();
        return responses;
    }
    
    public async Task<List<ProjectTaskStatsResponse>> ProjectTaskStatsByUser(int projectId, int userId)
    {
        var tasks = _dataContext.tasks
            .Include(s => s.status)
            .Include(s => s.story)
            .ThenInclude(p => p.project)
            .Where(i => i.story.project.id == projectId && i.user_id == userId)
            .GroupBy(s => s.status.name)
            .Select(n => new ProjectTaskStatsResponse(
                 n.Key,
                n.Count()));


        List<ProjectTaskStatsResponse> responses = await tasks.ToListAsync();
        return responses;
    }

    public async  Task<IEnumerable<task>> SortByPriorityAndUser(int projectId, int userId, string sortType)
    {
        IQueryable<task> tasks =  _dataContext.tasks
            .Include(s => s.story)
            .ThenInclude(p => p.project)
            .Where(i => i.story.project_id == projectId && i.user_id == userId);

        
        switch (sortType)
        {
            case "desc":
                tasks = tasks.OrderByDescending(p => p.priority);
                break;;
            case "asc":
                tasks = tasks.OrderBy(p => p.priority);
                break;
        }

        List<task> sortedTask = await tasks.ToListAsync();
        return sortedTask;
    }
}