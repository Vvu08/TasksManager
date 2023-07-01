using System;
using System.Collections.Generic;

namespace TaskManager.Notification.Entities;

public partial class Tasks
{
    public int Id { get; set; }

    public int Priority { get; set; }

    public int StoryId { get; set; }

    public int? UserId { get; set; }

    public string? Description { get; set; }

    public string Title { get; set; } = null!;

    public int TaskCreator { get; set; }

    public virtual Stories Story { get; set; } = null!;

    public virtual Users TaskCreatorNavigation { get; set; } = null!;

    public virtual Users? User { get; set; }
}
