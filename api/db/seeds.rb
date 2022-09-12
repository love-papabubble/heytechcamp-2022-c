# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# insert customers
# 1
customer = Customer.create!(
  name: 'Darwin Kusuma',
  email: 'darwin@gmail.com',
  password_digest: '123456',
)
# 2
# insert orders
order = Order.create!(
  is_delivered: false,
  delivery_time: '2022-09-30 08:24:53',
  customer_id: customer.id,
)
# insert items
item = Item.create!(
  title: 'Burger',
  description: 'Burger with cheese',
  price: 10000,
  item_image: 'https://i.ibb.co/9s0sH1j/burger.png',
)
# 2
# insert order_details
# 1
OrderDetail.create!(
  order_id: order.id,
  customer_id: customer.id,
  item_id: item.id,
)