using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace TaskManager.Notification.Entities;

public  class message
{
    [Key]
    public int id { get; set; }

    public int sender_id { get; set; }

    public int receiver_id { get; set; }

    public int task_id { get; set; }

    [StringLength(255)]
    public string text { get; set; } = null!;

    public bool is_read { get; set; }
}
