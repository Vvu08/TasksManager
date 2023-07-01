using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace TaskManager.Notification.Entities;

public  class role
{
    [Key]
    public int id { get; set; }

    [StringLength(255)]
    public string type { get; set; } = null!;

    [ForeignKey("role_id")]
    [InverseProperty("roles")]
    public virtual ICollection<user> users { get; set; } = new List<user>();
}
