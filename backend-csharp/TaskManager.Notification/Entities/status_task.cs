using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace TaskManager.Notification.Entities;

[Keyless]
[Index("status_id", "task_id", Name = "status_tasks_id_key", IsUnique = true)]
public  class status_task
{
    public int status_id { get; set; }

    public int task_id { get; set; }

    [ForeignKey("status_id")]
    public virtual status status { get; set; } = null!;

    [ForeignKey("task_id")]
    public virtual task task { get; set; } = null!;
}
