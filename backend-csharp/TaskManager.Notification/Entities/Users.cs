using System;
using System.Collections.Generic;

namespace TaskManager.Notification.Entities;

public partial class Users
{
    public int Id { get; set; }

    public string Email { get; set; } = null!;

    public string JobTitle { get; set; } = null!;

    public string Password { get; set; } = null!;

    public string Username { get; set; } = null!;

    public virtual ICollection<Tasks> TasksTaskCreatorNavigation { get; set; } = new List<Tasks>();

    public virtual ICollection<Tasks> TasksUser { get; set; } = new List<Tasks>();

    public virtual ICollection<Roles> Role { get; set; } = new List<Roles>();
}
