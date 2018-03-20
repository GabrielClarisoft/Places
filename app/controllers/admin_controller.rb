# contains functionality of admin page
class AdminController < ApplicationController
  before_action :check_admin

  def show
    @users = User.all
  end

  def new_user
    @user = User.new
  end

  def create_user
    @user = User.new(user_params)

    if @user.save
      redirect_to admin_path
    else

      flash[:error] = []

      flash[:error] << 'email taken' if User.find_by_email(params[:email]).nil?

      flash[:error] << 'username taken' if User.find_by_email(params[:username]).nil?

      flash[:error] << 'password don\'t match' if params[:password] != params[:password_confirmation]

      return redirect_to admin_new_user_path
    end
  end

  def delete_user
    @user = User.find_by_username!(params[:username])

    @user.destroy
    ##  @user.delete

  end

  private

  def user_params
    params.require(:user).permit(:email,
                                 :name,
                                 :username,
                                 :password,
                                 :password_confirmation,
                                 :role)
  end

  def check_admin
    redirect_to root_path unless current_user.admin?
  end
end
