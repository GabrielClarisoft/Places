# users can describe their trips
class TripsController < ApplicationController
  before_action :authenticate_user!

  def show
    @trip = Trip.find(params[:id])
  end

  def new
    @trip = Trip.new
  end

  def create
    @trip = Trip.new(trip_params)
    @trip.user = current_user

    @trip.save
    redirect_to @trip
  end

  def edit
    @trip = Trip.find(params[:id])

    if @trip.user != current_user
      redirect_to @trip, notice: 'You can\'t change other users trips'
    end
  end

  def update
    @trip = Trip.find(params[:id])

    if @trip.update(trip_params)
      redirect_to @trip
    else
      render 'edit'
    end
  end

  def destroy
    @trip = Trip.find(params[:id])
    if current_user != @trip.user && !current_user.admin?
      redirect_to @trip
    end

    @trip.destroy
    redirect_to root_path
  end

  private

  def trip_params
    params.require(:trip).permit(:title,
                                 :description,
                                 :h_latitude,
                                 :h_longitude,
                                 :d_latitude,
                                 :d_longitude)
  end
end

# AIzaSyBvGpbaHwB8tCQ2O1uBjNc08r9Z8J7a89Y
# my maps key
# get started with maps
# https://developers.google.com/maps/documentation/javascript/