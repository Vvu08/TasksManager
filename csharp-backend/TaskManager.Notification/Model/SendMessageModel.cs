namespace TaskManager.Notification.Model;

public class SendMessageModel
{
    public int senderId { get; set; }
    public int receiverId { get; set; }
    public int taskId { get; set; }
    public string text { get; set; }
}