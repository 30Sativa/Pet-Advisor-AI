using System;
using System.Collections.Generic;

namespace PetAdvisorSystem.Infrastructure.Persistence.Entities;

/// <summary>
/// Chu nuoi thu cung. Chi chua auth info. Thong tin ca nhan o user_profiles.
/// </summary>
public partial class User
{
    public Guid Id { get; set; }

    public string AuthProvider { get; set; } = null!;

    public string AuthProviderId { get; set; } = null!;

    public string? Email { get; set; }

    public string? Phone { get; set; }

    public bool IsActive { get; set; }

    public DateTimeOffset CreatedAt { get; set; }

    public DateTimeOffset UpdatedAt { get; set; }

    public DateTimeOffset? DeletedAt { get; set; }

    public virtual ICollection<AppFeedback> AppFeedbacks { get; set; } = new List<AppFeedback>();

    public virtual ICollection<Notification> Notifications { get; set; } = new List<Notification>();

    public virtual ICollection<Pet> Pets { get; set; } = new List<Pet>();

    public virtual ICollection<Reminder> Reminders { get; set; } = new List<Reminder>();

    public virtual ICollection<UserDevice> UserDevices { get; set; } = new List<UserDevice>();

    public virtual UserProfile? UserProfile { get; set; }

    public virtual UserSubscription? UserSubscription { get; set; }
}
