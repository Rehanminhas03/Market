# Calendar Timezone Implementation

## Overview

The booking calendar on the contact page automatically converts business hours from **Central Time (CT)** to the user's local timezone. This ensures clients across the US and Canada see appointment times in their own timezone.

## How It Works

### Business Hours (Central Time)
Your available booking slots are defined in Central Time:
- **Start**: 9:00 AM CT
- **End**: 5:00 PM CT
- **Interval**: 30 minutes

### Automatic Timezone Conversion

When a user visits the booking page:

1. **Detection**: The system detects the user's timezone using `Intl.DateTimeFormat().resolvedOptions().timeZone`

2. **Conversion**: All time slots are converted from CT to the user's local time

3. **Display**: Times are shown with the user's timezone abbreviation (e.g., "10:00 AM EST")

### Examples

| User Location | CT Time | User Sees |
|---------------|---------|-----------|
| New York (ET) | 9:00 AM CT | 10:00 AM EST |
| Los Angeles (PT) | 9:00 AM CT | 7:00 AM PST |
| Denver (MT) | 9:00 AM CT | 8:00 AM MST |
| Toronto (ET) | 9:00 AM CT | 10:00 AM EST |
| Phoenix (AZ) | 9:00 AM CT | 7:00 AM MST |

## User Experience

### What Users See

1. **Time Selection Step**:
   - Header: "Select a time"
   - Subtext: "Times shown in your timezone (EST)" (or their timezone)
   - Time buttons display local times

2. **Booking Confirmation**:
   - Shows selected time in user's timezone
   - Displays user's timezone name (e.g., "America/New_York")

3. **Success Screen**:
   - Confirms booking with local time display

## Booking Submission Data

When a booking is submitted, the email includes:

```
Discovery Call Booking

Date: Tue, Jan 7, 2025
Time: 10:00 AM CT (Client's local time: 11:00 AM EST)
Client Timezone: America/New_York

Interest: Lead Generation
Question: ...
```

This gives you:
- **CT Time**: For your scheduling (always in your business timezone)
- **Client's Local Time**: For reference when communicating with the client
- **Client's Timezone**: Full timezone identifier

## Technical Implementation

### Key Functions

```typescript
// Business timezone constant
const BUSINESS_TIMEZONE = "America/Chicago"; // Central Time

// Convert CT to user's local time
convertCTToLocal(hour, minute, date) → Date

// Format time for display with timezone abbreviation
formatLocalTime(hour, minute, date) → "10:00 AM"

// Get user's timezone abbreviation
getUserTimezoneAbbr() → "EST" | "PST" | "MST" | etc.

// Format time in CT for submission
formatCTTime(hour, minute) → "10:00 AM CT"
```

### Business Hours Configuration

To modify available time slots, edit the `businessHoursCT` array in `src/app/contact/page.tsx`:

```typescript
const businessHoursCT = [
  { hour: 9, minute: 0 },   // 9:00 AM CT
  { hour: 9, minute: 30 },  // 9:30 AM CT
  { hour: 10, minute: 0 },  // 10:00 AM CT
  // ... add or remove slots as needed
  { hour: 17, minute: 0 },  // 5:00 PM CT
];
```

### Changing Business Timezone

To change your business timezone (e.g., to Eastern Time):

```typescript
const BUSINESS_TIMEZONE = "America/New_York"; // Eastern Time
```

Common timezone identifiers:
- `America/New_York` - Eastern Time
- `America/Chicago` - Central Time
- `America/Denver` - Mountain Time
- `America/Los_Angeles` - Pacific Time

## Daylight Saving Time

The implementation automatically handles Daylight Saving Time (DST) changes:
- Uses JavaScript's native `Intl` APIs which account for DST
- Offsets are calculated dynamically based on the selected date
- No manual DST adjustments needed

## Browser Support

This implementation uses standard JavaScript APIs supported in all modern browsers:
- `Intl.DateTimeFormat`
- `Date.toLocaleString()`
- `Date.toLocaleTimeString()`

## File Location

The calendar timezone logic is implemented in:
```
src/app/contact/page.tsx
```

Lines 31-97 contain the timezone utility functions.
