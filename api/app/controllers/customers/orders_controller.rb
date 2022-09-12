class Customers::OrdersController < ApplicationController
  def index
  end

  def create
  end

  def show
    order = Order.find(params[:id])
    order_details = order.order_details
    items = []
    order_details.each do |order_detail|
      item = order_detail.item
      amaunt = order_detail.amount
      order_item = {item: item, amaunt: order_detail.amount}
      items << order_item
    end
    customer = order.customer
    render json: { id: order.id, is_delivered: order.is_delivered, delivery_time: order.delivery_time, customer: customer, order_details: items, status: :ok }
  end
end
