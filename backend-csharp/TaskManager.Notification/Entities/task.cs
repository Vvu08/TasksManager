using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace TaskManager.Notification.Entities;

public  class task
{
    [Key]
    public int id { get; set; }

    public int priority { get; set; }

    public int story_id { get; set; }

    public int? user_id { get; set; }

    [StringLength(255)]
    public string? description { get; set; }

    [StringLength(255)]
    public string title { get; set; } = null!;

    public int task_creator { get; set; }

    [ForeignKey("story_id")]
    [InverseProperty("tasks")]
    public virtual story story { get; set; } = null!;

    [ForeignKey("task_creator")]
    [InverseProperty("tasktask_creatorNavigations")]
    public virtual user task_creatorNavigation { get; set; } = null!;

    [ForeignKey("user_id")]
    [InverseProperty("taskusers")]
    public virtual user? user { get; set; }
    public virtual status status { get; set; }
}
