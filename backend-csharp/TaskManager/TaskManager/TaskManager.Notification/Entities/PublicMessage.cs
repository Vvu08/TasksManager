using System;
using System.Collections.Generic;

namespace TaskManager.Notification.Entities;

public  class PublicMessage
{
    public int Id { get; set; }

    public int SenderId { get; set; }

    public int ReceiverId { get; set; }

    public int TaskId { get; set; }

    public string Text { get; set; } = null!;

    public virtual PublicUser Receiver { get; set; } = null!;

    public virtual PublicUser Sender { get; set; } = null!;

    public virtual PublicTask Task { get; set; } = null!;
}
