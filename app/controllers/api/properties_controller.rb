module Api
  class PropertiesController < ApplicationController
    def index
      @properties = Property.order(created_at: :desc).page(params[:page]).per(6)
      return render json: { error: 'not_found' }, status: :not_found if !@properties

      render 'api/properties/index', status: :ok
    end

    def show
      @property = Property.find_by(id: params[:id])
      return render json: { error: 'not_found' }, status: :not_found if !@property

      render 'api/properties/show', status: :ok
    end

    def create
      token = cookies.signed[:airbnb_session_token]
      session = Session.find_by(token: token)
      return render json: { error: 'user not logged in' }, status: :unauthorized if !session

      begin
        @property = Property.create(property_params)
        @property.image.attach(params[:property][:image])
        render 'api/properties/show', status: :created
      rescue 
        render json: { error: e.message }, status: :bad_request
      end
    end

    private

      def property_params
        params.require(:property).permit(:title, :description, :city, :country, :property_type, 
          :price_per_night, :max_guests, :bedrooms, :beds, :baths, :image)
      end
  end
end