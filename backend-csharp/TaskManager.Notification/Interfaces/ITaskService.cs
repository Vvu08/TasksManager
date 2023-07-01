namespace TaskManager.Notification.Interfaces;

public interface ITaskService
{
    Task updateTaskStatusByTaskId(int taskId, int statusId);
}