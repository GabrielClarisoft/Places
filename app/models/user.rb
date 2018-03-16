# user class
class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  validates_presence_of :username
  validates_presence_of :name

  validates_uniqueness_of :username

  has_many :trips

  enum role: %i[user vip admin]
  after_initialize :set_default_role

  def set_default_role
    self.role ||= :user
  end

  mount_uploader :avatar, AvatarUploader
end

# /etc/init.d/postgresql restart