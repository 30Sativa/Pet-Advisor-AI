using System;
using System.Collections.Generic;

namespace PetAdvisorSystem.Infrastructure.Persistence.Entities;

/// <summary>
/// Ho so suc khoe 1:1 voi pet. Sync sang AI service qua conversations.metadata.
/// </summary>
public partial class HealthProfile
{
    public Guid Id { get; set; }

    public Guid PetId { get; set; }

    public decimal? WeightKg { get; set; }

    public string? Allergies { get; set; }

    public string? Conditions { get; set; }

    public string? CurrentMedications { get; set; }

    public string? Notes { get; set; }

    public DateTimeOffset UpdatedAt { get; set; }

    public Guid? UpdatedBy { get; set; }

    public virtual Pet Pet { get; set; } = null!;
}
