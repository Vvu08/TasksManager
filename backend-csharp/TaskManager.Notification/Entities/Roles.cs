using System;
using System.Collections.Generic;

namespace TaskManager.Notification.Entities;

public partial class Roles
{
    public int Id { get; set; }

    public string Type { get; set; } = null!;

    public virtual ICollection<Users> User { get; set; } = new List<Users>();
}
