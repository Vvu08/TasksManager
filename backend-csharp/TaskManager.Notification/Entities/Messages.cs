using System;
using System.Collections.Generic;

namespace TaskManager.Notification.Entities;

public partial class Messages
{
    public int Id { get; set; }

    public int SenderId { get; set; }

    public int ReceiverId { get; set; }

    public int TaskId { get; set; }

    public string Text { get; set; } = null!;

    public bool IsRead { get; set; }
}
