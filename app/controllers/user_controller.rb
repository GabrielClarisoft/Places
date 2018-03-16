class UserController < ApplicationController
  before_action :authenticate_user!

  def show
    @user = User.find_by_username!(params[:username])
  end

  def edit_avatar
    @user = User.find_by_username!(params[:username]);
  end

  def update_avatar
    @user = User.find_by_username!(params[:username]);
    if @user.id != current_user.id
      flash[:notice] = 'You don\'t have the right to edit this user avatar'
      redirect_to user_path(@user.username)
    end

    if @user.update_attributes(user_avatar)
      flash[:notice] = 'Successfully updated avatar.'
      redirect_to user_path(@user.username)
    else
      render action: 'edit_avatar'
    end
  end

  def destroy
    @user = User.find_by_username!(params[:username])
    if current_user.admin?
      @user.destroy
    end
  end

  def find
    render 'user/search_user'
  end

  def search_user
    # @users = User.where('name LIKE ?', params[:query])
    #              .where('username LIKE ?', params[:query])

    @users = User.where('lower(name) LIKE ? or lower(username) LIKE ?',
                        "%#{params[:query].downcase}%",
                        "%#{params[:query].downcase}%")

    render json: @users.as_json
  end

  private

  def user_avatar
    params.require(:user).permit(:avatar)
  end

  def user_params
    params.require(:user).permit(:name)
  end
end
