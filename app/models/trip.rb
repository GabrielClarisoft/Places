class Trip < ActiveRecord::Base
  belongs_to :user

  has_many :photos, dependent: :delete_all
end
