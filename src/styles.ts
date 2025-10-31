import { css } from 'lit';

export const styles = css`
  :host {
    display: block;
  }

  ha-card {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px;
    border-bottom: 1px solid var(--divider-color);
  }

  .card-header-content {
    display: flex;
    align-items: center;
    gap: 12px;
    flex: 1;
  }

  .card-header ha-icon {
    color: var(--primary-color);
    --mdc-icon-size: 24px;
  }

  .card-title {
    font-size: 20px;
    font-weight: 500;
    color: var(--primary-text-color);
    margin: 0;
  }

  .card-count {
    background: var(--primary-color);
    color: var(--text-primary-color);
    padding: 4px 12px;
    border-radius: 12px;
    font-size: 14px;
    font-weight: 500;
  }

  .card-content {
    flex: 1;
    overflow-y: auto;
    padding: 8px;
  }

  .package-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .package-item {
    background: var(--card-background-color);
    border: 1px solid var(--divider-color);
    border-radius: 8px;
    padding: 12px 16px;
    transition: all 0.2s ease-in-out;
  }

  .package-item:hover {
    background: var(--secondary-background-color);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    transform: translateY(-1px);
  }

  .package-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 8px;
  }

  .package-tracking {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .tracking-link {
    font-size: 16px;
    font-weight: 600;
    color: var(--primary-color);
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    transition: color 0.2s;
  }

  .tracking-link:hover {
    color: var(--accent-color);
    text-decoration: underline;
  }

  .tracking-link ha-icon {
    --mdc-icon-size: 18px;
  }

  .copy-button {
    background: none;
    border: none;
    cursor: pointer;
    padding: 4px;
    color: var(--secondary-text-color);
    display: flex;
    align-items: center;
    border-radius: 4px;
    transition: all 0.2s;
  }

  .copy-button:hover {
    background: var(--divider-color);
    color: var(--primary-text-color);
  }

  .copy-button ha-icon {
    --mdc-icon-size: 18px;
  }

  .package-details {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .package-detail {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 14px;
    color: var(--secondary-text-color);
  }

  .package-detail ha-icon {
    --mdc-icon-size: 16px;
    color: var(--primary-color);
  }

  .package-detail-label {
    font-weight: 500;
    min-width: 80px;
  }

  .package-detail-value {
    flex: 1;
  }

  .card-footer {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 12px 16px;
    border-top: 1px solid var(--divider-color);
    font-size: 12px;
    color: var(--secondary-text-color);
    gap: 6px;
  }

  .card-footer ha-icon {
    --mdc-icon-size: 14px;
  }

  .empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 48px 16px;
    text-align: center;
    color: var(--secondary-text-color);
  }

  .empty-state ha-icon {
    --mdc-icon-size: 64px;
    color: var(--disabled-text-color);
    margin-bottom: 16px;
  }

  .empty-state-title {
    font-size: 18px;
    font-weight: 500;
    margin-bottom: 8px;
    color: var(--primary-text-color);
  }

  .empty-state-description {
    font-size: 14px;
    max-width: 300px;
  }

  .summary-stats {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    padding: 12px 16px;
    background: var(--secondary-background-color);
    border-bottom: 1px solid var(--divider-color);
  }

  .stat-item {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 6px 12px;
    background: var(--card-background-color);
    border-radius: 6px;
    font-size: 13px;
  }

  .stat-item ha-icon {
    --mdc-icon-size: 16px;
    color: var(--primary-color);
  }

  .stat-label {
    color: var(--secondary-text-color);
  }

  .stat-value {
    font-weight: 600;
    color: var(--primary-text-color);
  }

  /* Scrollbar styling */
  .card-content::-webkit-scrollbar {
    width: 6px;
  }

  .card-content::-webkit-scrollbar-track {
    background: transparent;
  }

  .card-content::-webkit-scrollbar-thumb {
    background: var(--divider-color);
    border-radius: 3px;
  }

  .card-content::-webkit-scrollbar-thumb:hover {
    background: var(--secondary-text-color);
  }

  /* Responsive design */
  @media (max-width: 600px) {
    .card-header {
      padding: 12px;
    }

    .card-title {
      font-size: 18px;
    }

    .package-item {
      padding: 10px 12px;
    }

    .tracking-link {
      font-size: 14px;
    }
  }
`;
