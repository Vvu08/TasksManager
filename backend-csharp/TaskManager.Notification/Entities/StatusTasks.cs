using System;
using System.Collections.Generic;

namespace TaskManager.Notification.Entities;

public partial class StatusTasks
{
    public int StatusId { get; set; }

    public int TaskId { get; set; }

    public virtual Status Status { get; set; } = null!;

    public virtual Tasks Task { get; set; } = null!;
}
