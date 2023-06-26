using System;
using System.Collections.Generic;

namespace TaskManager.Notification.Entities;

public  class PublicRole
{
    public int Id { get; set; }

    public string Type { get; set; } = null!;

    public virtual ICollection<PublicUser> Users { get; set; } = new List<PublicUser>();
}
