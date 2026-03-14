using System;
using System.Collections.Generic;

namespace PetAdvisorSystem.Infrastructure.Persistence.Entities;

/// <summary>
/// Nhac lich. next_trigger_at pre-computed cho cron job hieu qua.
/// </summary>
public partial class Reminder
{
    public Guid Id { get; set; }

    public Guid PetId { get; set; }

    public Guid UserId { get; set; }

    public string Title { get; set; } = null!;

    public string ReminderType { get; set; } = null!;

    public string? Notes { get; set; }

    public string RepeatType { get; set; } = null!;

    public TimeOnly ScheduledTime { get; set; }

    public DateOnly StartDate { get; set; }

    public DateOnly? EndDate { get; set; }

    public DateTimeOffset? NextTriggerAt { get; set; }

    public DateTimeOffset? LastTriggeredAt { get; set; }

    public bool IsActive { get; set; }

    public DateTimeOffset CreatedAt { get; set; }

    public DateTimeOffset UpdatedAt { get; set; }

    public virtual Pet Pet { get; set; } = null!;

    public virtual User User { get; set; } = null!;
}
