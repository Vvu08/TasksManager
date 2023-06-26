using System;
using System.Collections.Generic;

namespace TaskManager.Notification.Entities;

public  class PublicStory
{
    public int Id { get; set; }

    public int ProjectId { get; set; }

    public string Title { get; set; } = null!;

    public string Description { get; set; } = null!;

    public DateOnly StartDate { get; set; }

    public DateOnly EndDate { get; set; }

    public virtual PublicProject Project { get; set; } = null!;

    public virtual ICollection<PublicTask> PublicTasks { get; set; } = new List<PublicTask>();
}
