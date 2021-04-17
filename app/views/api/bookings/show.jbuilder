json.booking do
  json.Title @booking.property.title
  json.City @booking.property.city
  json.Country @booking.property.country
  json.Type @booking.property.property_type
  json.Start @booking.start_date
  json.End @booking.end_date
end