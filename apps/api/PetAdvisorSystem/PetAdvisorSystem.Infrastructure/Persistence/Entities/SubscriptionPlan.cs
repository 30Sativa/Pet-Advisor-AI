using System;
using System.Collections.Generic;

namespace PetAdvisorSystem.Infrastructure.Persistence.Entities;

/// <summary>
/// Goi dich vu. Seed data: free (1 pet), premium (5 pets).
/// </summary>
public partial class SubscriptionPlan
{
    public Guid Id { get; set; }

    public string Name { get; set; } = null!;

    public string DisplayName { get; set; } = null!;

    public int MaxPets { get; set; }

    public int? MaxAiChatsPerDay { get; set; }

    public decimal PriceMonthly { get; set; }

    public decimal? PriceYearly { get; set; }

    public string? Features { get; set; }

    public bool IsActive { get; set; }

    public int SortOrder { get; set; }

    public DateTimeOffset CreatedAt { get; set; }

    public virtual ICollection<UserSubscription> UserSubscriptions { get; set; } = new List<UserSubscription>();
}
