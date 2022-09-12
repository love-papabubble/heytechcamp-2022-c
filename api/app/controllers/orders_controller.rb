class OrdersController < ApplicationController
  def index
  end

  def create
    order = Order.new(customer_id: 1, is_delivered: false,delivery_time: params[:delivery_time])
    order.save
    order_details = []
    params[:item_ids].each do |item_id|
      order_detail = OrderDetail.new(order_id: order.id, customer_id: 1, item_id: item_id, amount: item_id["amount"])
      order_detail.save
      order_details.push(order_detail)
    end
    render json: { order: order, order_ids: order_details }, status: :created
  end

  def show
  end
end
