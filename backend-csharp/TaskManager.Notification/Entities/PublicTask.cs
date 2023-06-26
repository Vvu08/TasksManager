using System;
using System.Collections.Generic;

namespace TaskManager.Notification.Entities;

public  class PublicTask
{
    public int Id { get; set; }

    public int StoryId { get; set; }

    public int UserId { get; set; }

    public string Title { get; set; } = null!;

    public string Description { get; set; } = null!;

    public int Priority { get; set; }

    public virtual ICollection<PublicMessage> PublicMessages { get; set; } = new List<PublicMessage>();

    public virtual PublicStory Story { get; set; } = null!;

    public virtual PublicUser User { get; set; } = null!;

    public virtual ICollection<PublicStatus> Statuses { get; set; } = new List<PublicStatus>();
}
