using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using PetAdvisorSystem.Infrastructure.Persistence.Entities;

namespace PetAdvisorSystem.Infrastructure.Persistence;

public partial class PetAdvisorDBV1Context : DbContext
{
    public PetAdvisorDBV1Context()
    {
    }

    public PetAdvisorDBV1Context(DbContextOptions<PetAdvisorDBV1Context> options)
        : base(options)
    {
    }

    public virtual DbSet<AppFeedback> AppFeedbacks { get; set; }

    public virtual DbSet<HealthProfile> HealthProfiles { get; set; }

    public virtual DbSet<MedicalHistory> MedicalHistories { get; set; }

    public virtual DbSet<Notification> Notifications { get; set; }

    public virtual DbSet<Pet> Pets { get; set; }

    public virtual DbSet<Reminder> Reminders { get; set; }

    public virtual DbSet<SubscriptionPlan> SubscriptionPlans { get; set; }

    public virtual DbSet<User> Users { get; set; }

    public virtual DbSet<UserDevice> UserDevices { get; set; }

    public virtual DbSet<UserProfile> UserProfiles { get; set; }

    public virtual DbSet<UserSubscription> UserSubscriptions { get; set; }

    public virtual DbSet<Vaccination> Vaccinations { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Data Source=(local);Database=PetAdvisorDB_V1;Trusted_Connection=True;TrustServerCertificate=True;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<AppFeedback>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__app_feed__3213E83F433E2455");

            entity.ToTable("app_feedbacks", tb => tb.HasComment("Feedback app tu user. Admin xu ly: new -> reviewed -> resolved."));

            entity.HasIndex(e => new { e.Status, e.CreatedAt }, "idx_feedback_status")
                .IsDescending(false, true)
                .HasFilter("([status]<>'resolved')");

            entity.HasIndex(e => e.UserId, "idx_feedback_user");

            entity.Property(e => e.Id)
                .HasDefaultValueSql("(newid())")
                .HasColumnName("id");
            entity.Property(e => e.AdminNotes)
                .HasMaxLength(1000)
                .HasColumnName("admin_notes");
            entity.Property(e => e.AppVersion)
                .HasMaxLength(20)
                .IsUnicode(false)
                .HasColumnName("app_version");
            entity.Property(e => e.Category)
                .HasMaxLength(30)
                .IsUnicode(false)
                .HasColumnName("category");
            entity.Property(e => e.Content)
                .HasMaxLength(2000)
                .HasColumnName("content");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("(sysdatetimeoffset())")
                .HasColumnName("created_at");
            entity.Property(e => e.DeviceInfo)
                .HasMaxLength(200)
                .IsUnicode(false)
                .HasColumnName("device_info");
            entity.Property(e => e.Rating).HasColumnName("rating");
            entity.Property(e => e.ResolvedAt).HasColumnName("resolved_at");
            entity.Property(e => e.ScreenshotUrl)
                .HasMaxLength(500)
                .IsUnicode(false)
                .HasColumnName("screenshot_url");
            entity.Property(e => e.Status)
                .HasMaxLength(20)
                .IsUnicode(false)
                .HasDefaultValue("new")
                .HasColumnName("status");
            entity.Property(e => e.Title)
                .HasMaxLength(200)
                .HasColumnName("title");
            entity.Property(e => e.UserId).HasColumnName("user_id");

            entity.HasOne(d => d.User).WithMany(p => p.AppFeedbacks)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("FK__app_feedb__user___208CD6FA");
        });

        modelBuilder.Entity<HealthProfile>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__health_p__3213E83FEECBF609");

            entity.ToTable("health_profiles", tb =>
                {
                    tb.HasComment("Ho so suc khoe 1:1 voi pet. Sync sang AI service qua conversations.metadata.");
                    tb.HasTrigger("trg_health_updated");
                });

            entity.HasIndex(e => e.PetId, "uq_health_pet").IsUnique();

            entity.Property(e => e.Id)
                .HasDefaultValueSql("(newid())")
                .HasColumnName("id");
            entity.Property(e => e.Allergies)
                .HasMaxLength(500)
                .HasColumnName("allergies");
            entity.Property(e => e.Conditions)
                .HasMaxLength(500)
                .HasColumnName("conditions");
            entity.Property(e => e.CurrentMedications)
                .HasMaxLength(500)
                .HasColumnName("current_medications");
            entity.Property(e => e.Notes)
                .HasMaxLength(1000)
                .HasColumnName("notes");
            entity.Property(e => e.PetId).HasColumnName("pet_id");
            entity.Property(e => e.UpdatedAt)
                .HasDefaultValueSql("(sysdatetimeoffset())")
                .HasColumnName("updated_at");
            entity.Property(e => e.UpdatedBy).HasColumnName("updated_by");
            entity.Property(e => e.WeightKg)
                .HasColumnType("decimal(5, 2)")
                .HasColumnName("weight_kg");

            entity.HasOne(d => d.Pet).WithOne(p => p.HealthProfile)
                .HasForeignKey<HealthProfile>(d => d.PetId)
                .HasConstraintName("FK__health_pr__pet_i__73BA3083");
        });

        modelBuilder.Entity<MedicalHistory>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__medical___3213E83F10D704F1");

            entity.ToTable("medical_histories", tb =>
                {
                    tb.HasComment("Owner tu ghi lich su kham. AI tham khao khi tu van.");
                    tb.HasTrigger("trg_medical_updated");
                });

            entity.HasIndex(e => new { e.PetId, e.VisitDate }, "idx_medical_pet").IsDescending(false, true);

            entity.Property(e => e.Id)
                .HasDefaultValueSql("(newid())")
                .HasColumnName("id");
            entity.Property(e => e.ClinicName)
                .HasMaxLength(200)
                .HasColumnName("clinic_name");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("(sysdatetimeoffset())")
                .HasColumnName("created_at");
            entity.Property(e => e.Diagnosis)
                .HasMaxLength(1000)
                .HasColumnName("diagnosis");
            entity.Property(e => e.FollowUpDate).HasColumnName("follow_up_date");
            entity.Property(e => e.Notes)
                .HasMaxLength(1000)
                .HasColumnName("notes");
            entity.Property(e => e.PetId).HasColumnName("pet_id");
            entity.Property(e => e.Reason)
                .HasMaxLength(500)
                .HasColumnName("reason");
            entity.Property(e => e.Treatment)
                .HasMaxLength(1000)
                .HasColumnName("treatment");
            entity.Property(e => e.UpdatedAt)
                .HasDefaultValueSql("(sysdatetimeoffset())")
                .HasColumnName("updated_at");
            entity.Property(e => e.VisitDate).HasColumnName("visit_date");

            entity.HasOne(d => d.Pet).WithMany(p => p.MedicalHistories)
                .HasForeignKey(d => d.PetId)
                .HasConstraintName("FK__medical_h__pet_i__09A971A2");
        });

        modelBuilder.Entity<Notification>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__notifica__3213E83F22D7BAA8");

            entity.ToTable("notifications", tb => tb.HasComment("Log thong bao. Volume cao nhat - filtered indexes toi uu query."));

            entity.HasIndex(e => e.CreatedAt, "idx_notif_unsent").HasFilter("([is_sent]=(0))");

            entity.HasIndex(e => new { e.UserId, e.CreatedAt }, "idx_notif_user_unread")
                .IsDescending(false, true)
                .HasFilter("([is_read]=(0))");

            entity.Property(e => e.Id)
                .HasDefaultValueSql("(newid())")
                .HasColumnName("id");
            entity.Property(e => e.Body)
                .HasMaxLength(500)
                .HasColumnName("body");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("(sysdatetimeoffset())")
                .HasColumnName("created_at");
            entity.Property(e => e.Data)
                .HasDefaultValue("{}")
                .HasColumnName("data");
            entity.Property(e => e.IsRead).HasColumnName("is_read");
            entity.Property(e => e.IsSent).HasColumnName("is_sent");
            entity.Property(e => e.NotificationType)
                .HasMaxLength(30)
                .IsUnicode(false)
                .HasColumnName("notification_type");
            entity.Property(e => e.PetId).HasColumnName("pet_id");
            entity.Property(e => e.ReadAt).HasColumnName("read_at");
            entity.Property(e => e.SentAt).HasColumnName("sent_at");
            entity.Property(e => e.Title)
                .HasMaxLength(200)
                .HasColumnName("title");
            entity.Property(e => e.UserId).HasColumnName("user_id");

            entity.HasOne(d => d.Pet).WithMany(p => p.Notifications)
                .HasForeignKey(d => d.PetId)
                .HasConstraintName("FK__notificat__pet_i__17F790F9");

            entity.HasOne(d => d.User).WithMany(p => p.Notifications)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("FK__notificat__user___17036CC0");
        });

        modelBuilder.Entity<Pet>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__pets__3213E83F1641B5AF");

            entity.ToTable("pets", tb =>
                {
                    tb.HasComment("Thu cung. Gioi han so luong boi subscription plan, check o application layer.");
                    tb.HasTrigger("trg_pets_updated");
                });

            entity.HasIndex(e => e.UserId, "idx_pets_user").HasFilter("([deleted_at] IS NULL)");

            entity.Property(e => e.Id)
                .HasDefaultValueSql("(newid())")
                .HasColumnName("id");
            entity.Property(e => e.AvatarUrl)
                .HasMaxLength(500)
                .IsUnicode(false)
                .HasColumnName("avatar_url");
            entity.Property(e => e.Birthday).HasColumnName("birthday");
            entity.Property(e => e.Breed)
                .HasMaxLength(100)
                .HasColumnName("breed");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("(sysdatetimeoffset())")
                .HasColumnName("created_at");
            entity.Property(e => e.DeletedAt).HasColumnName("deleted_at");
            entity.Property(e => e.Gender)
                .HasMaxLength(10)
                .HasColumnName("gender");
            entity.Property(e => e.IsArchived).HasColumnName("is_archived");
            entity.Property(e => e.Name)
                .HasMaxLength(100)
                .HasColumnName("name");
            entity.Property(e => e.Species)
                .HasMaxLength(20)
                .IsUnicode(false)
                .HasColumnName("species");
            entity.Property(e => e.UpdatedAt)
                .HasDefaultValueSql("(sysdatetimeoffset())")
                .HasColumnName("updated_at");
            entity.Property(e => e.UserId).HasColumnName("user_id");

            entity.HasOne(d => d.User).WithMany(p => p.Pets)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("FK__pets__user_id__6C190EBB");
        });

        modelBuilder.Entity<Reminder>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__reminder__3213E83FBB83F3B0");

            entity.ToTable("reminders", tb =>
                {
                    tb.HasComment("Nhac lich. next_trigger_at pre-computed cho cron job hieu qua.");
                    tb.HasTrigger("trg_reminders_updated");
                });

            entity.HasIndex(e => e.PetId, "idx_reminders_pet").HasFilter("([is_active]=(1))");

            entity.HasIndex(e => e.NextTriggerAt, "idx_reminders_trigger").HasFilter("([is_active]=(1))");

            entity.HasIndex(e => e.UserId, "idx_reminders_user").HasFilter("([is_active]=(1))");

            entity.Property(e => e.Id)
                .HasDefaultValueSql("(newid())")
                .HasColumnName("id");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("(sysdatetimeoffset())")
                .HasColumnName("created_at");
            entity.Property(e => e.EndDate).HasColumnName("end_date");
            entity.Property(e => e.IsActive)
                .HasDefaultValue(true)
                .HasColumnName("is_active");
            entity.Property(e => e.LastTriggeredAt).HasColumnName("last_triggered_at");
            entity.Property(e => e.NextTriggerAt).HasColumnName("next_trigger_at");
            entity.Property(e => e.Notes)
                .HasMaxLength(500)
                .HasColumnName("notes");
            entity.Property(e => e.PetId).HasColumnName("pet_id");
            entity.Property(e => e.ReminderType)
                .HasMaxLength(30)
                .IsUnicode(false)
                .HasDefaultValue("custom")
                .HasColumnName("reminder_type");
            entity.Property(e => e.RepeatType)
                .HasMaxLength(10)
                .IsUnicode(false)
                .HasDefaultValue("once")
                .HasColumnName("repeat_type");
            entity.Property(e => e.ScheduledTime).HasColumnName("scheduled_time");
            entity.Property(e => e.StartDate).HasColumnName("start_date");
            entity.Property(e => e.Title)
                .HasMaxLength(200)
                .HasColumnName("title");
            entity.Property(e => e.UpdatedAt)
                .HasDefaultValueSql("(sysdatetimeoffset())")
                .HasColumnName("updated_at");
            entity.Property(e => e.UserId).HasColumnName("user_id");

            entity.HasOne(d => d.Pet).WithMany(p => p.Reminders)
                .HasForeignKey(d => d.PetId)
                .HasConstraintName("FK__reminders__pet_i__7E37BEF6");

            entity.HasOne(d => d.User).WithMany(p => p.Reminders)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__reminders__user___7F2BE32F");
        });

        modelBuilder.Entity<SubscriptionPlan>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__subscrip__3213E83FF00FF411");

            entity.ToTable("subscription_plans", tb => tb.HasComment("Goi dich vu. Seed data: free (1 pet), premium (5 pets)."));

            entity.HasIndex(e => e.Name, "UQ__subscrip__72E12F1BB10B4C98").IsUnique();

            entity.Property(e => e.Id)
                .HasDefaultValueSql("(newid())")
                .HasColumnName("id");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("(sysdatetimeoffset())")
                .HasColumnName("created_at");
            entity.Property(e => e.DisplayName)
                .HasMaxLength(100)
                .HasColumnName("display_name");
            entity.Property(e => e.Features)
                .HasDefaultValue("[]")
                .HasColumnName("features");
            entity.Property(e => e.IsActive)
                .HasDefaultValue(true)
                .HasColumnName("is_active");
            entity.Property(e => e.MaxAiChatsPerDay).HasColumnName("max_ai_chats_per_day");
            entity.Property(e => e.MaxPets)
                .HasDefaultValue(1)
                .HasColumnName("max_pets");
            entity.Property(e => e.Name)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("name");
            entity.Property(e => e.PriceMonthly)
                .HasColumnType("decimal(10, 2)")
                .HasColumnName("price_monthly");
            entity.Property(e => e.PriceYearly)
                .HasColumnType("decimal(10, 2)")
                .HasColumnName("price_yearly");
            entity.Property(e => e.SortOrder).HasColumnName("sort_order");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__users__3213E83F7976ECD4");

            entity.ToTable("users", tb =>
                {
                    tb.HasComment("Chu nuoi thu cung. Chi chua auth info. Thong tin ca nhan o user_profiles.");
                    tb.HasTrigger("trg_users_updated");
                });

            entity.HasIndex(e => e.IsActive, "idx_users_active").HasFilter("([deleted_at] IS NULL)");

            entity.HasIndex(e => e.Email, "idx_users_email").HasFilter("([email] IS NOT NULL)");

            entity.HasIndex(e => new { e.AuthProvider, e.AuthProviderId }, "uq_users_auth").IsUnique();

            entity.Property(e => e.Id)
                .HasDefaultValueSql("(newid())")
                .HasColumnName("id");
            entity.Property(e => e.AuthProvider)
                .HasMaxLength(20)
                .IsUnicode(false)
                .HasDefaultValue("firebase")
                .HasColumnName("auth_provider");
            entity.Property(e => e.AuthProviderId)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("auth_provider_id");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("(sysdatetimeoffset())")
                .HasColumnName("created_at");
            entity.Property(e => e.DeletedAt).HasColumnName("deleted_at");
            entity.Property(e => e.Email)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("email");
            entity.Property(e => e.IsActive)
                .HasDefaultValue(true)
                .HasColumnName("is_active");
            entity.Property(e => e.Phone)
                .HasMaxLength(20)
                .IsUnicode(false)
                .HasColumnName("phone");
            entity.Property(e => e.UpdatedAt)
                .HasDefaultValueSql("(sysdatetimeoffset())")
                .HasColumnName("updated_at");
        });

        modelBuilder.Entity<UserDevice>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__user_dev__3213E83FDF78B5C6");

            entity.ToTable("user_devices", tb =>
                {
                    tb.HasComment("FCM tokens. Gui push khi reminder trigger hoac AI canh bao.");
                    tb.HasTrigger("trg_devices_updated");
                });

            entity.HasIndex(e => e.UserId, "idx_devices_user").HasFilter("([is_active]=(1))");

            entity.Property(e => e.Id)
                .HasDefaultValueSql("(newid())")
                .HasColumnName("id");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("(sysdatetimeoffset())")
                .HasColumnName("created_at");
            entity.Property(e => e.DeviceName)
                .HasMaxLength(100)
                .HasColumnName("device_name");
            entity.Property(e => e.DeviceToken)
                .HasMaxLength(500)
                .IsUnicode(false)
                .HasColumnName("device_token");
            entity.Property(e => e.DeviceType)
                .HasMaxLength(10)
                .IsUnicode(false)
                .HasColumnName("device_type");
            entity.Property(e => e.IsActive)
                .HasDefaultValue(true)
                .HasColumnName("is_active");
            entity.Property(e => e.LastUsedAt).HasColumnName("last_used_at");
            entity.Property(e => e.UpdatedAt)
                .HasDefaultValueSql("(sysdatetimeoffset())")
                .HasColumnName("updated_at");
            entity.Property(e => e.UserId).HasColumnName("user_id");

            entity.HasOne(d => d.User).WithMany(p => p.UserDevices)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("FK__user_devi__user___0F624AF8");
        });

        modelBuilder.Entity<UserProfile>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__user_pro__3213E83F22DA2D59");

            entity.ToTable("user_profiles", tb =>
                {
                    tb.HasComment("Ho so ca nhan 1:1 voi users. Gioi tinh: nam/nu/khac, validate o backend.");
                    tb.HasTrigger("trg_profiles_updated");
                });

            entity.HasIndex(e => e.UserId, "idx_profiles_user");

            entity.HasIndex(e => e.UserId, "uq_profile_user").IsUnique();

            entity.Property(e => e.Id)
                .HasDefaultValueSql("(newid())")
                .HasColumnName("id");
            entity.Property(e => e.Address)
                .HasMaxLength(255)
                .HasColumnName("address");
            entity.Property(e => e.AvatarUrl)
                .HasMaxLength(500)
                .IsUnicode(false)
                .HasColumnName("avatar_url");
            entity.Property(e => e.Bio)
                .HasMaxLength(500)
                .HasColumnName("bio");
            entity.Property(e => e.City)
                .HasMaxLength(100)
                .HasColumnName("city");
            entity.Property(e => e.DateOfBirth).HasColumnName("date_of_birth");
            entity.Property(e => e.DisplayName)
                .HasMaxLength(100)
                .HasColumnName("display_name");
            entity.Property(e => e.Gender)
                .HasMaxLength(10)
                .HasColumnName("gender");
            entity.Property(e => e.UpdatedAt)
                .HasDefaultValueSql("(sysdatetimeoffset())")
                .HasColumnName("updated_at");
            entity.Property(e => e.UserId).HasColumnName("user_id");

            entity.HasOne(d => d.User).WithOne(p => p.UserProfile)
                .HasForeignKey<UserProfile>(d => d.UserId)
                .HasConstraintName("FK__user_prof__user___5441852A");
        });

        modelBuilder.Entity<UserSubscription>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__user_sub__3213E83FE2B01CA6");

            entity.ToTable("user_subscriptions", tb =>
                {
                    tb.HasComment("Lich su subscription. Chi 1 active/user tai 1 thoi diem.");
                    tb.HasTrigger("trg_subs_updated");
                });

            entity.HasIndex(e => new { e.UserId, e.Status }, "idx_user_subs_user");

            entity.HasIndex(e => e.UserId, "uq_user_active_sub")
                .IsUnique()
                .HasFilter("([status]='active')");

            entity.Property(e => e.Id)
                .HasDefaultValueSql("(newid())")
                .HasColumnName("id");
            entity.Property(e => e.CancelledAt).HasColumnName("cancelled_at");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("(sysdatetimeoffset())")
                .HasColumnName("created_at");
            entity.Property(e => e.ExpiresAt).HasColumnName("expires_at");
            entity.Property(e => e.PaymentProvider)
                .HasMaxLength(30)
                .IsUnicode(false)
                .HasColumnName("payment_provider");
            entity.Property(e => e.PaymentProviderId)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("payment_provider_id");
            entity.Property(e => e.PlanId).HasColumnName("plan_id");
            entity.Property(e => e.StartedAt)
                .HasDefaultValueSql("(sysdatetimeoffset())")
                .HasColumnName("started_at");
            entity.Property(e => e.Status)
                .HasMaxLength(20)
                .IsUnicode(false)
                .HasDefaultValue("active")
                .HasColumnName("status");
            entity.Property(e => e.UpdatedAt)
                .HasDefaultValueSql("(sysdatetimeoffset())")
                .HasColumnName("updated_at");
            entity.Property(e => e.UserId).HasColumnName("user_id");

            entity.HasOne(d => d.Plan).WithMany(p => p.UserSubscriptions)
                .HasForeignKey(d => d.PlanId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__user_subs__plan___6383C8BA");

            entity.HasOne(d => d.User).WithOne(p => p.UserSubscription)
                .HasForeignKey<UserSubscription>(d => d.UserId)
                .HasConstraintName("FK__user_subs__user___628FA481");
        });

        modelBuilder.Entity<Vaccination>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__vaccinat__3213E83F553FD8F2");

            entity.ToTable("vaccinations", tb =>
                {
                    tb.HasComment("Lich tiem phong. Khong soft delete - du lieu y te giu vinh vien.");
                    tb.HasTrigger("trg_vaccinations_updated");
                });

            entity.HasIndex(e => e.NextDoseDate, "idx_vaccinations_next").HasFilter("([next_dose_date] IS NOT NULL)");

            entity.HasIndex(e => new { e.PetId, e.DateGiven }, "idx_vaccinations_pet").IsDescending(false, true);

            entity.Property(e => e.Id)
                .HasDefaultValueSql("(newid())")
                .HasColumnName("id");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("(sysdatetimeoffset())")
                .HasColumnName("created_at");
            entity.Property(e => e.DateGiven).HasColumnName("date_given");
            entity.Property(e => e.NextDoseDate).HasColumnName("next_dose_date");
            entity.Property(e => e.Notes)
                .HasMaxLength(500)
                .HasColumnName("notes");
            entity.Property(e => e.PetId).HasColumnName("pet_id");
            entity.Property(e => e.StickerImageUrl)
                .HasMaxLength(500)
                .IsUnicode(false)
                .HasColumnName("sticker_image_url");
            entity.Property(e => e.UpdatedAt)
                .HasDefaultValueSql("(sysdatetimeoffset())")
                .HasColumnName("updated_at");
            entity.Property(e => e.VaccineName)
                .HasMaxLength(200)
                .HasColumnName("vaccine_name");

            entity.HasOne(d => d.Pet).WithMany(p => p.Vaccinations)
                .HasForeignKey(d => d.PetId)
                .HasConstraintName("FK__vaccinati__pet_i__787EE5A0");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
