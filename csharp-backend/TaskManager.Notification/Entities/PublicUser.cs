using System;
using System.Collections.Generic;

namespace TaskManager.Notification.Entities;

public  class PublicUser
{
    public int Id { get; set; }

    public string Username { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string Password { get; set; } = null!;

    public string JobTitle { get; set; } = null!;

    public virtual ICollection<PublicMessage> PublicMessageReceivers { get; set; } = new List<PublicMessage>();

    public virtual ICollection<PublicMessage> PublicMessageSenders { get; set; } = new List<PublicMessage>();

    public virtual ICollection<PublicTask> PublicTasks { get; set; } = new List<PublicTask>();

    public virtual ICollection<PublicProject> Projects { get; set; } = new List<PublicProject>();

    public virtual ICollection<PublicRole> Roles { get; set; } = new List<PublicRole>();
}
