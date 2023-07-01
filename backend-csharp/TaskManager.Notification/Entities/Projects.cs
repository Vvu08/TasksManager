using System;
using System.Collections.Generic;

namespace TaskManager.Notification.Entities;

public partial class Projects
{
    public int Id { get; set; }

    public string Status { get; set; } = null!;

    public string Title { get; set; } = null!;

    public virtual ICollection<Stories> Stories { get; set; } = new List<Stories>();
}
