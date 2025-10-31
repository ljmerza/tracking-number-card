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
 * Sort packages based on configuration
 */
export function sortPackages(
  packages: Package[],
  sortBy: string = 'last_updated',
  sortDirection: 'asc' | 'desc' = 'desc'
): Package[] {
  const sorted = [...packages].sort((a, b) => {
    let compareA: any;
    let compareB: any;

    switch (sortBy) {
      case 'first_seen':
        compareA = new Date(a.first_seen).getTime();
        compareB = new Date(b.first_seen).getTime();
        break;
      case 'last_updated':
        compareA = new Date(a.last_updated).getTime();
        compareB = new Date(b.last_updated).getTime();
        break;
      case 'carrier':
        compareA = a.carrier.toLowerCase();
        compareB = b.carrier.toLowerCase();
        break;
      case 'tracking_number':
        compareA = a.tracking_number.toLowerCase();
        compareB = b.tracking_number.toLowerCase();
        break;
      default:
        compareA = new Date(a.last_updated).getTime();
        compareB = new Date(b.last_updated).getTime();
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
