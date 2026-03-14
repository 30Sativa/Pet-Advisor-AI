using System;
using System.Collections.Generic;

namespace PetAdvisorSystem.Infrastructure.Persistence.Entities;

/// <summary>
/// FCM tokens. Gui push khi reminder trigger hoac AI canh bao.
/// </summary>
public partial class UserDevice
{
    public Guid Id { get; set; }

    public Guid UserId { get; set; }

    public string DeviceToken { get; set; } = null!;

    public string DeviceType { get; set; } = null!;

    public string? DeviceName { get; set; }

    public bool IsActive { get; set; }

    public DateTimeOffset? LastUsedAt { get; set; }

    public DateTimeOffset CreatedAt { get; set; }

    public DateTimeOffset UpdatedAt { get; set; }

    public virtual User User { get; set; } = null!;
}
