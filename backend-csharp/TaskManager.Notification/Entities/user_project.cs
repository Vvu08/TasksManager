using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace TaskManager.Notification.Entities;

[Keyless]
public  class user_project
{
    public int project_id { get; set; }

    public int user_id { get; set; }

    [ForeignKey("project_id")]
    public virtual project project { get; set; } = null!;

    [ForeignKey("user_id")]
    public virtual user user { get; set; } = null!;
}
