using TaskManager.Notification.Entities;
using TaskManager.Statistics.Model;

namespace TaskManager.Statistics.Interfaces;

public interface IStatisticService
{
    Task<List<ProjectTaskStatsResponse>> ProjectTaskStats(int projectID);
    Task<IEnumerable<task>> SortByPriorityAndUser(int projectID, int userId, string sortType);
    Task<List<ProjectTaskStatsResponse>> ProjectTaskStatsByUser(int projectId, int userId);
}