using System;
using System.Collections.Generic;

namespace PetAdvisorSystem.Infrastructure.Persistence.Entities;

/// <summary>
/// Log thong bao. Volume cao nhat - filtered indexes toi uu query.
/// </summary>
public partial class Notification
{
    public Guid Id { get; set; }

    public Guid UserId { get; set; }

    public Guid? PetId { get; set; }

    public string Title { get; set; } = null!;

    public string Body { get; set; } = null!;

    public string NotificationType { get; set; } = null!;

    public string? Data { get; set; }

    public bool IsRead { get; set; }

    public DateTimeOffset? ReadAt { get; set; }

    public bool IsSent { get; set; }

    public DateTimeOffset? SentAt { get; set; }

    public DateTimeOffset CreatedAt { get; set; }

    public virtual Pet? Pet { get; set; }

    public virtual User User { get; set; } = null!;
}
