using TaskManager.Notification.Entities;

namespace TaskManager.Statistics.Model;

public class ProjectTaskStatsResponse
{
    public ICollection<PublicStatus> TaskType { get; set; }
    public int TaskCounter { get; set; }

    public ProjectTaskStatsResponse(ICollection<PublicStatus> taskType, int taskCounter)
    {
        TaskType = taskType;
        TaskCounter = taskCounter;
    }
}