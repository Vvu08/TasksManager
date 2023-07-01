using TaskManager.Notification.Entities;
using TaskManager.Notification.Model;

namespace TaskManager.Notification.Interfaces;

public interface INotificationService
{
    Task SendNotification(Messages msg);

}