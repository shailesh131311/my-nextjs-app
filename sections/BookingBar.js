import { useRef, useState, useEffect } from 'react'

export default function BookingBar() {
  const pad = (n) => String(n).padStart(2, '0')

  const formatISO = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`

  const addDaysISO = (isoDate, days) => {
    const [y, m, d] = isoDate.split('-').map(Number)
    const dt = new Date(y, m - 1, d) // local-time construction, no UTC round-trip
    dt.setDate(dt.getDate() + days)
    return formatISO(dt)
  }

  const now = new Date()
  const today = formatISO(now)
  const tomorrow = addDaysISO(today, 1)

  const formRef = useRef(null)
  const arrRef = useRef(null)
  const depRef = useRef(null)

  const [checkOutMin, setCheckOutMin] = useState(tomorrow)

  useEffect(() => {
    const handlePageShow = (event) => {
      if (event.persisted) {
        window.location.reload()
      }
    }
    window.addEventListener('pageshow', handlePageShow)
    return () => window.removeEventListener('pageshow', handlePageShow)
  }, [])

  // yyyy-mm-dd -> dd/mm/yyyy (ResAvenue's exact expected format)
  const toResAvenueDate = (isoDate) => {
    if (!isoDate) return ''
    const [y, m, d] = isoDate.split('-')
    return `${d}/${m}/${y}`
  }

  const handleCheckInChange = () => {
    const arrVal = arrRef.current.value
    if (!arrVal) return

    const nextDayIso = addDaysISO(arrVal, 1)
    setCheckOutMin(nextDayIso)

    if (depRef.current.value && depRef.current.value <= arrVal) {
      depRef.current.value = nextDayIso
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const arrVal = arrRef.current.value
    const depVal = depRef.current.value

    if (!arrVal || !depVal) {
      alert('Please select both check-in and check-out dates.')
      return
    }

    if (depVal <= arrVal) {
      alert('Check-out date must be after check-in date.')
      return
    }

    formRef.current.querySelector('input[name="arr_date"]').value = toResAvenueDate(arrVal)
    formRef.current.querySelector('input[name="dep_date"]').value = toResAvenueDate(depVal)

    formRef.current.submit()
  }

  return (
    <div className="booking-bar" id="booking-bar">
      <div className="containerWrapper">
        <form
          ref={formRef}
          className="booking-inner"
          action="https://bookings.resavenue.com/resBooking4/searchRooms"
          method="get"
          onSubmit={handleSubmit}
        >
          <input type="hidden" name="targetTemplate" value="4" />
          <input type="hidden" name="arr_date" defaultValue="" />
          <input type="hidden" name="dep_date" defaultValue="" />
          <input type="hidden" name="regCode" value="TTEC0622" />
          <input type="hidden" name="curr" value="INR" />

          <div className="bk-field">
            <div className="bk-label">Check In</div>
            <input
              type="date"
              id="checkIn"
              ref={arrRef}
              min={today}
              defaultValue={today}
              onChange={handleCheckInChange}
              required
            />
          </div>

          <div className="bk-field">
            <div className="bk-label">Check Out</div>
            <input
              type="date"
              id="checkOut"
              ref={depRef}
              min={checkOutMin}
              defaultValue={tomorrow}
              required
            />
          </div>

          <button className="btn-bk-submit" type="submit">Check Availability</button>
        </form>
      </div>
    </div>
  )
}