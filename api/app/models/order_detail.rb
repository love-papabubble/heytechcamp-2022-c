class OrderDetail < ApplicationRecord
  belongs_to :order
  belongs_to :item
  belongs_to :customer
end
