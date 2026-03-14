using System;
using System.Collections.Generic;

namespace PetAdvisorSystem.Infrastructure.Persistence.Entities;

/// <summary>
/// Owner tu ghi lich su kham. AI tham khao khi tu van.
/// </summary>
public partial class MedicalHistory
{
    public Guid Id { get; set; }

    public Guid PetId { get; set; }

    public DateOnly VisitDate { get; set; }

    public string? ClinicName { get; set; }

    public string? Reason { get; set; }

    public string? Diagnosis { get; set; }

    public string? Treatment { get; set; }

    public DateOnly? FollowUpDate { get; set; }

    public string? Notes { get; set; }

    public DateTimeOffset CreatedAt { get; set; }

    public DateTimeOffset UpdatedAt { get; set; }

    public virtual Pet Pet { get; set; } = null!;
}
