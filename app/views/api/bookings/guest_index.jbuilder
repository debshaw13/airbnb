json.bookings do
  json.array! @bookings do |booking|
    json.Property booking.property.title
    json.Start booking.start_date
    json.End booking.end_date
    json.Paid? booking.is_paid?
  end
end