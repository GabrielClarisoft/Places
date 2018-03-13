class UserController < ApplicationController

  before_action :authenticate_user!

  def show
    @user = User.find_by_username!(params[:username])
  end
  private

  def user_params
    params.require(:user).permit(:name, :avatar)
  end
end
