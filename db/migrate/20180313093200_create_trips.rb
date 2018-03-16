class CreateTrips < ActiveRecord::Migration
  def change
    create_table :trips do |t|
      t.references :user, index: true
      t.string :title
      t.text :description
      t.decimal :d_latitude
      t.decimal :d_longitude
      t.decimal :h_latitude
      t.decimal :h_longitude

      t.timestamps null: false
    end
    add_foreign_key :trips, :users
  end
end
