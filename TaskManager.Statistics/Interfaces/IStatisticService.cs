using TaskManager.Notification.Entities;
using TaskManager.Statistics.Model;

namespace TaskManager.Statistics.Interfaces;

public interface IStatisticService
{
    Task<List<ProjectTaskStatsResponse>> ProjectTaskStats(int projectID);
    Task<IEnumerable<PublicTask>> SortByPriorityAndUser(int projectID, int userId, string sortType);
    Task<List<ProjectTaskStatsResponse>> ProjectTaskStatsByUser(int projectId, int userId);
}