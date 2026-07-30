export class DateUtils {

  /**
   * Converts API date into HTML date input format.
   *
   * Example:
   * 2026-07-30T15:01:51.444Z
   * becomes
   * 2026-07-30
   */
  static toInputDate(date: string | null | undefined): string {
    if (!date || this.isDefaultDate(date)) {
      return '';
    }

    return date.substring(0, 10);
  }


  /**
   * Converts HTML date input value into ISO date format.
   *
   * Example:
   * 2026-07-30
   * becomes
   * 2026-07-30T00:00:00.000Z
   */
  static toIsoDate(date: string | null | undefined): string {
    if (!date) {
      return '';
    }

    return new Date(`${date}T00:00:00`).toISOString();
  }


  /**
   * Converts date into readable display format.
   *
   * Example:
   * 2026-07-30T15:01:51.444Z
   * becomes
   * 30 Jul 2026
   */
  static toDisplayDate(date: string | null | undefined): string {
    if (!date || this.isDefaultDate(date)) {
      return '-';
    }

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return '-';
    }

    return parsedDate.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  }


  /**
   * Converts date into readable date and time format.
   *
   * Example:
   * 30 Jul 2026, 08:31 PM
   */
  static toDisplayDateTime(
    date: string | null | undefined
  ): string {
    if (!date || this.isDefaultDate(date)) {
      return '-';
    }

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return '-';
    }

    return parsedDate.toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  }


  /**
   * Checks for the default .NET DateTime value.
   */
  static isDefaultDate(
    date: string | null | undefined
  ): boolean {
    return !date || date.startsWith('0001-01-01');
  }


  /**
   * Returns today's date for an HTML date input.
   *
   * Example:
   * 2026-07-30
   */
  static today(): string {
    const today = new Date();

    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }
}