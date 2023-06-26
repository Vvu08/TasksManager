using System;
using System.Collections.Generic;

namespace TaskManager.Notification.Entities;

public  class PublicStatus
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public virtual ICollection<PublicTask> Tasks { get; set; } = new List<PublicTask>();
}
