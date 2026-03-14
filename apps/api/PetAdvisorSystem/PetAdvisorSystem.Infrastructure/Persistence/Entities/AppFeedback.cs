using System;
using System.Collections.Generic;

namespace PetAdvisorSystem.Infrastructure.Persistence.Entities;

/// <summary>
/// Feedback app tu user. Admin xu ly: new -&gt; reviewed -&gt; resolved.
/// </summary>
public partial class AppFeedback
{
    public Guid Id { get; set; }

    public Guid UserId { get; set; }

    public short? Rating { get; set; }

    public string Category { get; set; } = null!;

    public string? Title { get; set; }

    public string Content { get; set; } = null!;

    public string? ScreenshotUrl { get; set; }

    public string? AppVersion { get; set; }

    public string? DeviceInfo { get; set; }

    public string Status { get; set; } = null!;

    public string? AdminNotes { get; set; }

    public DateTimeOffset? ResolvedAt { get; set; }

    public DateTimeOffset CreatedAt { get; set; }

    public virtual User User { get; set; } = null!;
}
