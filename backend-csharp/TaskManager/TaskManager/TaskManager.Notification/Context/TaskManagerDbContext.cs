using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using TaskManager.Notification.Entities;

namespace TaskManager.Notification.Context;

public partial class TaskManagerDbContext : DbContext
{
    public TaskManagerDbContext()
    {
    }

    public TaskManagerDbContext(DbContextOptions<TaskManagerDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<PublicMessage> PublicMessages { get; set; }

    public virtual DbSet<PublicProject> PublicProjects { get; set; }

    public virtual DbSet<PublicRole> PublicRoles { get; set; }

    public virtual DbSet<PublicStatus> PublicStatuses { get; set; }

    public virtual DbSet<PublicStory> PublicStories { get; set; }

    public virtual DbSet<PublicTask> PublicTasks { get; set; }

    public virtual DbSet<PublicUser> PublicUsers { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseNpgsql("Host=localhost;Port=5432;Database=task_manager;User Id=postgres;Password=password;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<PublicMessage>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("messages_pk");

            entity.ToTable("public.messages");

            entity.Property(e => e.Id)
                .ValueGeneratedNever()
                .HasColumnName("id");
            entity.Property(e => e.ReceiverId).HasColumnName("receiver_id");
            entity.Property(e => e.SenderId).HasColumnName("sender_id");
            entity.Property(e => e.TaskId).HasColumnName("task_id");
            entity.Property(e => e.Text)
                .HasMaxLength(255)
                .HasColumnName("text");

            entity.HasOne(d => d.Receiver).WithMany(p => p.PublicMessageReceivers)
                .HasForeignKey(d => d.ReceiverId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("messages_fk1");

            entity.HasOne(d => d.Sender).WithMany(p => p.PublicMessageSenders)
                .HasForeignKey(d => d.SenderId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("messages_fk0");

            entity.HasOne(d => d.Task).WithMany(p => p.PublicMessages)
                .HasForeignKey(d => d.TaskId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("messages_fk2");
        });

        modelBuilder.Entity<PublicProject>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("projects_pk");

            entity.ToTable("public.projects");

            entity.Property(e => e.Id)
                .ValueGeneratedNever()
                .HasColumnName("id");
            entity.Property(e => e.Status)
                .HasMaxLength(50)
                .HasColumnName("status");
            entity.Property(e => e.Title)
                .HasMaxLength(100)
                .HasColumnName("title");
        });

        modelBuilder.Entity<PublicRole>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("roles_pk");

            entity.ToTable("public.roles");

            entity.Property(e => e.Id)
                .ValueGeneratedNever()
                .HasColumnName("id");
            entity.Property(e => e.Type)
                .HasMaxLength(20)
                .HasColumnName("type");
        });

        modelBuilder.Entity<PublicStatus>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("status_pk");

            entity.ToTable("public.status");

            entity.Property(e => e.Id)
                .ValueGeneratedNever()
                .HasColumnName("id");
            entity.Property(e => e.Name)
                .HasMaxLength(20)
                .HasColumnName("name");
        });

        modelBuilder.Entity<PublicStory>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("stories_pk");

            entity.ToTable("public.stories");

            entity.Property(e => e.Id)
                .ValueGeneratedNever()
                .HasColumnName("id");
            entity.Property(e => e.Description)
                .HasMaxLength(255)
                .HasColumnName("description");
            entity.Property(e => e.EndDate).HasColumnName("end_date");
            entity.Property(e => e.ProjectId).HasColumnName("project_id");
            entity.Property(e => e.StartDate).HasColumnName("start_date");
            entity.Property(e => e.Title)
                .HasMaxLength(100)
                .HasColumnName("title");

            entity.HasOne(d => d.Project).WithMany(p => p.PublicStories)
                .HasForeignKey(d => d.ProjectId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("stories_fk0");
        });

        modelBuilder.Entity<PublicTask>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("tasks_pk");

            entity.ToTable("public.tasks");

            entity.Property(e => e.Id)
                .ValueGeneratedNever()
                .HasColumnName("id");
            entity.Property(e => e.Description)
                .HasMaxLength(255)
                .HasColumnName("description");
            entity.Property(e => e.Priority).HasColumnName("priority");
            entity.Property(e => e.StoryId).HasColumnName("story_id");
            entity.Property(e => e.Title)
                .HasMaxLength(100)
                .HasColumnName("title");
            entity.Property(e => e.UserId).HasColumnName("user_id");

            entity.HasOne(d => d.Story).WithMany(p => p.PublicTasks)
                .HasForeignKey(d => d.StoryId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("tasks_fk0");

            entity.HasOne(d => d.User).WithMany(p => p.PublicTasks)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("tasks_fk1");

            entity.HasMany(d => d.Statuses).WithMany(p => p.Tasks)
                .UsingEntity<Dictionary<string, object>>(
                    "PublicStatusTask",
                    r => r.HasOne<PublicStatus>().WithMany()
                        .HasForeignKey("StatusId")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("status_tasks_fk1"),
                    l => l.HasOne<PublicTask>().WithMany()
                        .HasForeignKey("TaskId")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("status_tasks_fk0"),
                    j =>
                    {
                        j.HasKey("TaskId", "StatusId").HasName("status_tasks_pk");
                        j.ToTable("public.status_tasks");
                        j.IndexerProperty<int>("TaskId").HasColumnName("task_id");
                        j.IndexerProperty<int>("StatusId").HasColumnName("status_id");
                    });
        });

        modelBuilder.Entity<PublicUser>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("users_pk");

            entity.ToTable("public.users");

            entity.Property(e => e.Id)
                .ValueGeneratedNever()
                .HasColumnName("id");
            entity.Property(e => e.Email)
                .HasMaxLength(255)
                .HasColumnName("email");
            entity.Property(e => e.JobTitle)
                .HasMaxLength(50)
                .HasColumnName("job_title");
            entity.Property(e => e.Password)
                .HasMaxLength(255)
                .HasColumnName("password");
            entity.Property(e => e.Username)
                .HasMaxLength(255)
                .HasColumnName("username");

            entity.HasMany(d => d.Projects).WithMany(p => p.Users)
                .UsingEntity<Dictionary<string, object>>(
                    "PublicUserProject",
                    r => r.HasOne<PublicProject>().WithMany()
                        .HasForeignKey("ProjectId")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("user_projects_fk1"),
                    l => l.HasOne<PublicUser>().WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("user_projects_fk0"),
                    j =>
                    {
                        j.HasKey("UserId", "ProjectId").HasName("user_projects_pk");
                        j.ToTable("public.user_projects");
                        j.IndexerProperty<int>("UserId").HasColumnName("user_id");
                        j.IndexerProperty<int>("ProjectId").HasColumnName("project_id");
                    });

            entity.HasMany(d => d.Roles).WithMany(p => p.Users)
                .UsingEntity<Dictionary<string, object>>(
                    "PublicUserRole",
                    r => r.HasOne<PublicRole>().WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("user_roles_fk1"),
                    l => l.HasOne<PublicUser>().WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("user_roles_fk0"),
                    j =>
                    {
                        j.HasKey("UserId", "RoleId").HasName("user_roles_pk");
                        j.ToTable("public.user_roles");
                        j.IndexerProperty<int>("UserId").HasColumnName("user_id");
                        j.IndexerProperty<int>("RoleId").HasColumnName("role_id");
                    });
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
