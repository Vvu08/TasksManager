using TaskManager.Notification.Entities;
using TaskManager.Notification.Model;

namespace TaskManager.Notification.Interfaces;

public interface INotificationService
{
    Task<PublicMessage> SendMessage(SendMessageModel messageModel);
    Task<bool> ConfirmTaskByMessage();
}