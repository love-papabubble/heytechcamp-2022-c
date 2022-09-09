class CreateOrders < ActiveRecord::Migration[6.0]
  def change
    create_table :orders do |t|
      t.boolean :is_delivered
      t.datetime :delivery_time
      t.references :customer, null: false, foreign_key: true

      t.timestamps
    end
  end
end
