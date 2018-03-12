class AddNameToUsers < ActiveRecord::Migration
  def change
    add_column :users, :name, :string
    add_index :users, :name, unique: false
  end
end
