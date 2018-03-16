# photo of trips
class PhotosController < ApplicationController
  def new
    @photo = Photo.new(trip_id: params[:trip_id])
  end

  def create
    @photo = Photo.new(photo_params)
    if @photo.save
      flash[:notice] = 'Successfully created photo.'
      redirect_to @photo.trip
    else
      render action: 'new'
    end
  end

  def edit
    @photo = Photo.find(params[:id])
  end

  def update
    @photo = Photo.find(params[:id])
    if @photo.update_attributes(photo_params)
      flash[:notice] = 'Successfully updated photo.'
      redirect_to @photo.trip
    else
      render action: 'edit'
    end
  end

  def destroy
    @photo = Photo.find(params[:id])
    @photo.destroy
    flash[:notice] = 'Successfully destroyed photo.'
    respond_to do |format|
      format.html { redirect_to @photo.trip }
      format.js
    end
  end

  def photo_params
    params.require(:photo).permit(:trip_id,
                                  :image,
                                  :remote_image_url)
  end
end
