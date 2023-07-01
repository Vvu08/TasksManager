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

    public virtual DbSet<message> messages { get; set; }

    public virtual DbSet<project> projects { get; set; }

    public virtual DbSet<role> roles { get; set; }

    public virtual DbSet<status> statuses { get; set; }

    public virtual DbSet<status_task> status_tasks { get; set; }

    public virtual DbSet<story> stories { get; set; }

    public virtual DbSet<task> tasks { get; set; }

    public virtual DbSet<user> users { get; set; }

    public virtual DbSet<user_project> user_projects { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseNpgsql("Host=localhost;Port=5432;Database=task_manager;User Id=postgres;Password=password;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<message>(entity =>
        {
            entity.HasKey(e => e.id).HasName("messages_pk");

            entity.Property(e => e.id).ValueGeneratedNever();
        });

        modelBuilder.Entity<project>(entity =>
        {
            entity.HasKey(e => e.id).HasName("projects_pkey");
        });

        modelBuilder.Entity<role>(entity =>
        {
            entity.HasKey(e => e.id).HasName("roles_pkey");
        });

        modelBuilder.Entity<status>(entity =>
        {
            entity.HasKey(e => e.id).HasName("status_pkey");
        });

        modelBuilder.Entity<status_task>(entity =>
        {
            entity.HasOne(d => d.status).WithMany()
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fkphbjl15elp7s4jxqxjtoe0gct");

            entity.HasOne(d => d.task).WithMany()
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fkjoqmm3bnnswq4qpnnwke8ym88");
        });

        modelBuilder.Entity<story>(entity =>
        {
            entity.HasKey(e => e.id).HasName("stories_pkey");

            entity.HasOne(d => d.project).WithMany(p => p.stories)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk40bgbra9e1bmchul1vskdq8hq");
        });

        modelBuilder.Entity<task>(entity =>
        {
            entity.HasKey(e => e.id).HasName("tasks_pkey");

            entity.HasOne(d => d.story).WithMany(p => p.tasks)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk4htjkrms846vp5xcb3vlvvucn");

            entity.HasOne(d => d.task_creatorNavigation).WithMany(p => p.tasktask_creatorNavigations)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("tasks_users_id_fk");

            entity.HasOne(d => d.user).WithMany(p => p.taskusers).HasConstraintName("fk6s1ob9k4ihi75xbxe2w0ylsdh");
        });

        modelBuilder.Entity<user>(entity =>
        {
            entity.HasKey(e => e.id).HasName("users_pkey");

            entity.HasMany(d => d.roles).WithMany(p => p.users)
                .UsingEntity<Dictionary<string, object>>(
                    "user_role",
                    r => r.HasOne<role>().WithMany()
                        .HasForeignKey("role_id")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("fkh8ciramu9cc9q3qcqiv4ue8a6"),
                    l => l.HasOne<user>().WithMany()
                        .HasForeignKey("user_id")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("fkhfh9dx7w3ubf1co1vdev94g3f"),
                    j =>
                    {
                        j.HasKey("user_id", "role_id").HasName("user_roles_pk");
                        j.ToTable("user_roles");
                    });
        });

        modelBuilder.Entity<user_project>(entity =>
        {
            entity.HasOne(d => d.project).WithMany()
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fkof7c4wufgerxtl9moqol6c516");

            entity.HasOne(d => d.user).WithMany()
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fkr25ilmlcm8ugp8i3rogl6jp0l");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
