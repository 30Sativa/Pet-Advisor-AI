using System;
using System.Collections.Generic;

namespace PetAdvisorSystem.Infrastructure.Persistence.Entities;

/// <summary>
/// Ho so ca nhan 1:1 voi users. Gioi tinh: nam/nu/khac, validate o backend.
/// </summary>
public partial class UserProfile
{
    public Guid Id { get; set; }

    public Guid UserId { get; set; }

    public string DisplayName { get; set; } = null!;

    public string? AvatarUrl { get; set; }

    public DateOnly? DateOfBirth { get; set; }

    public string? Gender { get; set; }

    public string? Address { get; set; }

    public string? City { get; set; }

    public string? Bio { get; set; }

    public DateTimeOffset UpdatedAt { get; set; }

    public virtual User User { get; set; } = null!;
}
