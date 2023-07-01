using TaskManager.Notification.Entities;

namespace TaskManager.Notification;
using Microsoft.AspNetCore.SignalR;

public class NotificationHub : Hub
{
    public async Task SendNotification(message msg)
    {
        await Clients.All.SendAsync(msg.receiver_id.ToString(), msg.text);
    }
}