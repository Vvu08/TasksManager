using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace TaskManager.Notification.Entities;

public  class project
{
    [Key]
    public int id { get; set; }

    [StringLength(255)]
    public string status { get; set; } = null!;

    [StringLength(255)]
    public string title { get; set; } = null!;

    [InverseProperty("project")]
    public virtual ICollection<story> stories { get; set; } = new List<story>();
}
