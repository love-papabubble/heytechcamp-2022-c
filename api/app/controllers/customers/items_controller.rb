class Customers::ItemsController < ApplicationController
  def index
    items = Item.all
    render json: items, status: :ok
  end
end
