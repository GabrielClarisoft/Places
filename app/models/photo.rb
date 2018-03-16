class Photo < ActiveRecord::Base

  belongs_to :trip

  mount_uploader :image, ImageUploader
end
