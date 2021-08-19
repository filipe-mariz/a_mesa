import { google } from 'googleapis'

/**
 * Create an instance of the Google Calendar Handler to deal with the external API integration
 */
export class GoogleCalendarHandler {
  /**
   * Lists the next 10 events on the user's primary calendar.
   */
  _list10() {
    const calendar = google.calendar({ version: 'v3' })
    calendar.events.list(
      {
        calendarId: 'primary',
        timeMin: new Date().toISOString(),
        maxResults: 10,
        singleEvents: true,
        orderBy: 'startTime',
      },
      (err, res) => {
        if (err)
          return console.log('===> THERE WAS AN ERROR CONTACTING THE CALENDAR SERVICE ❌: ' + err)

        if (res) {
          const events = res.data.items

          if (events) {
            if (events.length) {
              console.log('Upcoming 10 events:')
              events.map((event) => {
                if (event.start) {
                  const start = event.start.dateTime || event.start.date
                  console.log(`${start} - ${event.summary}`)
                }
              })
            } else {
              console.log('No upcoming events found.')
            }
          }
        }
      }
    )
  }

  _create(event: any, index = 0) {
    const calendar = google.calendar({ version: 'v3' })

    setTimeout(() => {
      calendar.events.insert(
        {
          calendarId: 'primary',
          requestBody: event,
        },
        (err) => {
          if (err) {
            this._create(event, index + 1000)
            console.log('===> THERE WAS AN ERROR CONTACTING THE CALENDAR SERVICE ❌: ' + err)
            return
          }
          console.log("===> EVENT CREATED ON USER'S CALENDAR ✅")
        }
      )
    }, index)
  }

  /**
   * Creates a new event on the user's primary calendar.
   * @param {Array<Object>} eventsArrays An array of events following the Google Calendar pattern.
   */
  async createEventOnCalendar(event) {
    this._create(event)
  }
}
