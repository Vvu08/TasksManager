using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace TaskManager.Notification.Entities;

public  class user
{
    [Key]
    public int id { get; set; }

    [StringLength(255)]
    public string email { get; set; } = null!;

    [StringLength(255)]
    public string job_title { get; set; } = null!;

    [StringLength(255)]
    public string password { get; set; } = null!;

    [StringLength(255)]
    public string username { get; set; } = null!;

    [InverseProperty("task_creatorNavigation")]
    public virtual ICollection<task> tasktask_creatorNavigations { get; set; } = new List<task>();

    [InverseProperty("user")]
    public virtual ICollection<task> taskusers { get; set; } = new List<task>();

    [ForeignKey("user_id")]
    [InverseProperty("users")]
    public virtual ICollection<role> roles { get; set; } = new List<role>();
}
