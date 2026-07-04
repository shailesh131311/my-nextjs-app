export default function BookingBar() {
  const today = new Date().toISOString().split('T')[0]

  return (
    <div className="booking-bar" id="booking-bar">
      <div className="containerWrapper">
        <div className="booking-inner">

          <div className="bk-field">
            <div className="bk-label">Check In</div>
            <input type="date" id="checkIn" min={today} />
          </div>

          <div className="bk-field">
            <div className="bk-label">Check Out</div>
            <input type="date" id="checkOut" min={today} />
          </div>

          <div className="bk-field">
            <div className="bk-label">Guests</div>
            <select defaultValue="2 Guests">
              <option>1 Guest</option>
              <option>2 Guests</option>
              <option>3 Guests</option>
              <option>4+ Guests</option>
            </select>
          </div>

          <div className="bk-field">
            <div className="bk-label">Room Type</div>
            <select>
              <option>Any Room</option>
              <option>Deluxe Room</option>
              <option>Luxury Suite</option>
              <option>Heritage Suite</option>
            </select>
          </div>

          <button className="btn-bk-submit">Check Availability</button>

        </div>
      </div>
    </div>
  )
}
