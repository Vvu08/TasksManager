using System;
using System.Collections.Generic;

namespace TaskManager.Notification.Entities;

public partial class UserProjects
{
    public int ProjectId { get; set; }

    public int UserId { get; set; }

    public virtual Projects Project { get; set; } = null!;

    public virtual Users User { get; set; } = null!;
}
