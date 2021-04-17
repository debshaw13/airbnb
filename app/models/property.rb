class Property < ApplicationRecord
  belongs_to :user
  has_many :bookings

  has_many_attached :images

  validates :title, presence: true, length: { maximum: 70 }
  validates :description, presence: true, length: { maximum: 2000 }
  validates :city, presence: true, length: { maximum: 200 }
  validates :country, presence: true, length: { maximum: 200 }
  validates :property_type, presence: true, length: { maximum: 200 }
  validates :price_per_night, presence: true, numericality: { only_integer: true, greater_than: 0, less_than: 99999 } # in USD
  validates :max_guests, presence: true, numericality: { only_integer: true, greater_than: 0, less_than: 20 }
  validates :bedrooms, presence: true, numericality: { only_integer: true, less_than: 20 }
  validates :beds, presence: true, numericality: { only_integer: true, less_than: 20 }
  validates :baths, presence: true, numericality: { only_integer: true, less_than: 20 }
  validates :user, presence: true

  before_save :add_image_url

  private

  def add_image_url
    if self.images.any?
      self.image_url = "https://airbnb-image-clone.s3.amazonaws.com/" + self.images.last.key
    else
      errors.add(:images, "image is required")
    end
  end
end