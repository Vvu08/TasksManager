using TaskManager.Notification.Entities;

namespace TaskManager.Notification;
using Microsoft.AspNetCore.SignalR;

public class NotificationHub : Hub
{
    public async Task SendNotification(Messages msg)
    {
        await Clients.All.SendAsync(msg.ReceiverId.ToString(), msg.Text);
    }
}