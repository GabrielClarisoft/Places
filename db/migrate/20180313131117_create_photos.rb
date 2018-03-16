class CreatePhotos < ActiveRecord::Migration
  def change
    create_table :photos do |t|
      t.references :trip, index: true

      t.timestamps null: false
    end
    add_foreign_key :photo, :trips
  end
end
