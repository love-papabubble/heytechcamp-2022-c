class CreateItems < ActiveRecord::Migration[6.0]
  def change
    create_table :items do |t|
      t.string :title
      t.text :description
      t.integer :price
      t.string :item_image

      t.timestamps
    end
  end
end
