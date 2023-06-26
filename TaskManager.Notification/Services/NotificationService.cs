using TaskManager.Notification.Context;
using TaskManager.Notification.Entities;
using TaskManager.Notification.Interfaces;
using TaskManager.Notification.Model;

namespace TaskManager.Notification.Services;

public class NotificationService : INotificationService
{
    private readonly TaskManagerDbContext _dataContext;

    public NotificationService(TaskManagerDbContext context)
    {
        _dataContext = context;
    }
    
    
    public Task<PublicMessage> SendMessage(SendMessageModel messageModel)
    {
        throw new NotImplementedException();
    }

    public Task<bool> ConfirmTaskByMessage()
    {
        throw new NotImplementedException();
    }
}