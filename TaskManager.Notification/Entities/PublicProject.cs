using System;
using System.Collections.Generic;

namespace TaskManager.Notification.Entities;

public  class PublicProject
{
    public int Id { get; set; }

    public string Title { get; set; } = null!;

    public string Status { get; set; } = null!;

    public virtual ICollection<PublicStory> PublicStories { get; set; } = new List<PublicStory>();

    public virtual ICollection<PublicUser> Users { get; set; } = new List<PublicUser>();
}
