class Users::OrdersController < ApplicationController
  def show
    order = Order.find(params[:id])
    order_details = order.order_details
    customer = order.customer

    items = []
    sum_price = 0

    order_details.each do |order_detail|
      item = order_detail.item
      amount = order_detail.amount
      order_item = {item: {id: item.id, title: item.title, description: item.description.truncate(20), price: item.price, item_image: item.item_image}, amount: order_detail.amount}
      items << order_item

      sum_price += amount * item.price
    end

    render json: { id: order.id, is_delivered: order.is_delivered, sum_price: sum_price, delivery_time: order.delivery_time, customer: customer, order_details: items, status: :ok }
  end

  # 受け取り済みにする
  def update
    order = Order.find(params[:id])
    if order.update!(is_delivered: true)
      render status: :no_content
    else
      render json: { message: '受け取り情報の更新に失敗しました。' }, status: :bad_request
    end
  end
end
