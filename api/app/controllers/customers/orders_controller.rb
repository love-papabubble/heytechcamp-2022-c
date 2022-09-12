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
    order = Order.new(delivery_time: create_order_params[:delivery_time], customer_id: create_order_params[:customer_id], is_delivered: create_order_params[:is_delivered])
    order.save
    create_order_detail_params.each do |item|
      order_detail = order.order_details.new(customer_id: 1, item_id: item[:item_id], amount: item[:amount])
      order_detail.save!
    end
    render json: { order: order, order_details: order.order_details }, status: :created
  end

  def show
  end
end
