using System;
using System.Collections.Generic;

namespace PetAdvisorSystem.Infrastructure.Persistence.Entities;

/// <summary>
/// Lich tiem phong. Khong soft delete - du lieu y te giu vinh vien.
/// </summary>
public partial class Vaccination
{
    public Guid Id { get; set; }

    public Guid PetId { get; set; }

    public string VaccineName { get; set; } = null!;

    public DateOnly DateGiven { get; set; }

    public DateOnly? NextDoseDate { get; set; }

    public string? StickerImageUrl { get; set; }

    public string? Notes { get; set; }

    public DateTimeOffset CreatedAt { get; set; }

    public DateTimeOffset UpdatedAt { get; set; }

    public virtual Pet Pet { get; set; } = null!;
}
