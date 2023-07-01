using System;
using System.Collections.Generic;

namespace TaskManager.Notification.Entities;

public partial class Stories
{
    public int Id { get; set; }

    public int ProjectId { get; set; }

    public DateTime EndDate { get; set; }

    public DateTime StartDate { get; set; }

    public string? Description { get; set; }

    public string Title { get; set; } = null!;

    public virtual Projects Project { get; set; } = null!;

    public virtual ICollection<Tasks> Tasks { get; set; } = new List<Tasks>();
}
