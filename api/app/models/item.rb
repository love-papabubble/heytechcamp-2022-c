class Item < ApplicationRecord
  belongs_to :order
  has_many :order_details
  has_many :order, through: :order_details
end
