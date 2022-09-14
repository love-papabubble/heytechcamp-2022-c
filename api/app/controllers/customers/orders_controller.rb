class Customers::OrdersController < ApplicationController

  private

  def create_order_params
    params[:order].permit(:delivery_time).merge(customer_id: 1, is_delivered: false)
  end

  def create_order_detail_params
    params[:items]
  end

  public

  def index
    orders = Order.where(customer_id: 1)
    render json: orders, status: :ok
  end

  def create
    logger.debug(create_order_params[:delivery_time])
    order = Order.new(delivery_time: create_order_params[:delivery_time], customer_id: create_order_params[:customer_id], is_delivered: create_order_params[:is_delivered])
    order.save
    create_order_detail_params.each do |item|
      order_detail = order.order_details.new(customer_id: 1, item_id: item[:item_id], amount: item[:amount])
      order_detail.save!
    end
    render json: { order: order, order_details: order.order_details }, status: :created
  end

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
end
