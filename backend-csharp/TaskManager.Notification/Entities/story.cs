using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace TaskManager.Notification.Entities;

public  class story
{
    [Key]
    public int id { get; set; }

    public int project_id { get; set; }

    [Column(TypeName = "timestamp(6) without time zone")]
    public DateTime end_date { get; set; }

    [Column(TypeName = "timestamp(6) without time zone")]
    public DateTime start_date { get; set; }

    [StringLength(255)]
    public string? description { get; set; }

    [StringLength(255)]
    public string title { get; set; } = null!;

    [ForeignKey("project_id")]
    [InverseProperty("stories")]
    public virtual project project { get; set; } = null!;

    [InverseProperty("story")]
    public virtual ICollection<task> tasks { get; set; } = new List<task>();
}
