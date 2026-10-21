import { Package } from './types';

/**
 * Format a date string to a relative time (e.g., "2 hours ago")
 */
export function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);

  if (diffSec < 60) {
    return 'just now';
  } else if (diffMin < 60) {
    return `${diffMin} minute${diffMin !== 1 ? 's' : ''} ago`;
  } else if (diffHour < 24) {
    return `${diffHour} hour${diffHour !== 1 ? 's' : ''} ago`;
  } else if (diffDay < 7) {
    return `${diffDay} day${diffDay !== 1 ? 's' : ''} ago`;
  } else {
    return date.toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
    });
  }
}

/**
 * Format a date string to a readable format
 */
export function formatDateTime(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleString(undefined, {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit'
  });
}

/**
 * Parse a date string, treating date-only values (e.g. "2026-07-10") as a
 * local calendar date. `new Date('YYYY-MM-DD')` parses as UTC midnight, which
 * lands on the previous day in timezones west of UTC.
 */
export function parseLocalDate(dateString: string): Date {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(dateString.trim());
  if (match) {
    return new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
  }
  return new Date(dateString);
}

/**
 * Format a timestamp the integration stores as naive UTC (e.g. first_seen
 * "2026-10-21T00:41:08") as a short local date. Without a timezone suffix
 * `new Date()` would read it as local time and can land on the wrong day.
 */
export function formatUtcDate(dateString: string): string {
  const hasZone = /(Z|[+-]\d{2}:?\d{2})$/i.test(dateString.trim());
  const date = new Date(hasZone ? dateString : `${dateString.trim()}Z`);
  if (!Number.isFinite(date.getTime())) {
    return dateString;
  }
  const now = new Date();
  return date.toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
  });
}

/**
 * Format a date-only string (e.g. "2026-07-10") to a short readable date.
 * Falls back to the original string if it can't be parsed.
 */
export function formatDate(dateString: string): string {
  const date = parseLocalDate(dateString);
  if (!Number.isFinite(date.getTime())) {
    return dateString;
  }
  const now = new Date();
  return date.toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
  });
}

/**
 * Map a TrackingMore delivery_status enum to a chip CSS class and icon.
 * Unknown/absent statuses get a neutral default.
 */
export function getStatusMeta(deliveryStatus?: string): { className: string; icon: string } {
  switch ((deliveryStatus ?? '').toLowerCase()) {
    case 'delivered':
      return { className: 'status-delivered', icon: 'mdi:check-circle' };
    case 'out_for_delivery':
      return { className: 'status-out-for-delivery', icon: 'mdi:truck-delivery' };
    case 'transit':
    case 'pickup':
      return { className: 'status-transit', icon: 'mdi:truck-fast' };
    case 'pending':
    case 'inforeceived':
      return { className: 'status-pending', icon: 'mdi:clock-outline' };
    case 'exception':
    case 'undelivered':
      return { className: 'status-exception', icon: 'mdi:alert-circle' };
    case 'notfound':
    case 'expired':
      return { className: 'status-unknown', icon: 'mdi:help-circle' };
    default:
      return { className: 'status-default', icon: 'mdi:information-outline' };
  }
}

/**
 * A package counts as delivered once a "Delivered" email set delivered_date
 * or the carrier reports delivery_status "delivered".
 */
export function isDelivered(pkg: Package): boolean {
  return !!pkg.delivered_date || (pkg.delivery_status ?? '').toLowerCase() === 'delivered';
}

/**
 * Local-midnight timestamp of the package's estimated delivery date, or
 * undefined when it has none (or it can't be parsed).
 */
function getEstimatedDeliveryDay(pkg: Package): number | undefined {
  if (!pkg.estimated_delivery) {
    return undefined;
  }
  const date = parseLocalDate(pkg.estimated_delivery);
  if (!Number.isFinite(date.getTime())) {
    return undefined;
  }
  return new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
}

/**
 * Order by estimated delivery: soonest first, then packages without an
 * estimate, then delivered packages. Ties keep the incoming order.
 */
function sortByEstimatedDelivery(packages: Package[]): Package[] {
  const rank = (pkg: Package): [number, number] => {
    if (isDelivered(pkg)) {
      return [2, 0];
    }
    const eta = getEstimatedDeliveryDay(pkg);
    return eta === undefined ? [1, 0] : [0, eta];
  };

  return [...packages].sort((a, b) => {
    const [groupA, etaA] = rank(a);
    const [groupB, etaB] = rank(b);
    return groupA !== groupB ? groupA - groupB : etaA - etaB;
  });
}

/**
 * Sort packages based on configuration
 */
export function sortPackages(
  packages: Package[],
  sortBy: string = 'first_seen',
  sortDirection: 'asc' | 'desc' = 'desc'
): Package[] {
  if (sortBy === 'estimated_delivery') {
    // Ties within the same estimated-delivery group fall back to first-seen order.
    return sortByEstimatedDelivery(sortPackages(packages, 'first_seen', sortDirection));
  }

  const resolveTimestamp = (...dates: Array<string | undefined>): number => {
    for (const date of dates) {
      if (!date) {
        continue;
      }

      const value = new Date(date).getTime();
      if (Number.isFinite(value)) {
        return value;
      }
    }

    return 0;
  };

  const resolveText = (value: string | undefined): string => {
    return (value ?? '').toLowerCase();
  };

  const sorted = [...packages].sort((a, b) => {
    let compareA: any;
    let compareB: any;

    switch (sortBy) {
      case 'first_seen':
        compareA = resolveTimestamp(a.first_seen, a.last_updated);
        compareB = resolveTimestamp(b.first_seen, b.last_updated);
        break;
      case 'last_updated':
        compareA = resolveTimestamp(a.last_updated, a.first_seen);
        compareB = resolveTimestamp(b.last_updated, b.first_seen);
        break;
      case 'carrier':
        compareA = resolveText(a.carrier);
        compareB = resolveText(b.carrier);
        break;
      case 'tracking_number':
        compareA = resolveText(a.tracking_number);
        compareB = resolveText(b.tracking_number);
        break;
      default:
        compareA = resolveTimestamp(a.first_seen, a.last_updated);
        compareB = resolveTimestamp(b.first_seen, b.last_updated);
    }

    if (compareA < compareB) return sortDirection === 'asc' ? -1 : 1;
    if (compareA > compareB) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  return sorted;
}

/**
 * Copy text to clipboard
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    } else {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      const success = document.execCommand('copy');
      textArea.remove();
      return success;
    }
  } catch (err) {
    console.error('Failed to copy text:', err);
    return false;
  }
}

/**
 * Get carrier icon based on carrier name
 */
export function getCarrierIcon(carrier: string): string {
  const carrierLower = carrier.toLowerCase();

  // Map of carrier names to Material Design Icons
  const iconMap: Record<string, string> = {
    'ups': 'mdi:package-variant',
    'usps': 'mdi:email',
    'fedex': 'mdi:truck-fast',
    'dhl': 'mdi:airplane',
    'amazon': 'mdi:amazon',
    'ui.com': 'mdi:package-variant-closed',
  };

  // Check for matches
  for (const [key, icon] of Object.entries(iconMap)) {
    if (carrierLower.includes(key)) {
      return icon;
    }
  }

  // Default icon
  return 'mdi:package';
}
