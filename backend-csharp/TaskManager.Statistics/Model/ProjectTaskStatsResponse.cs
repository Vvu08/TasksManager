using TaskManager.Notification.Entities;

namespace TaskManager.Statistics.Model;

public class ProjectTaskStatsResponse
{
    public string Status { get; set; }
    public int Count { get; set; }

    public ProjectTaskStatsResponse(string stats, int cnt)
    {
        Status = stats;
        Count = cnt;
    }
}