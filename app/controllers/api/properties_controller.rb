module Api
  class PropertiesController < ApplicationController
    # before_action :session_exists, only: [:create, :update]
    before_action :property_exists, only: [:show, :update]

    def index
      @properties = Property.order(created_at: :desc).page(params[:page]).per(6)
      return render json: { error: 'not_found' }, status: :not_found if !@properties

      render 'api/properties/index', status: :ok
    end

    def show
      render 'api/properties/show', status: :ok
    end

    def create
      token = cookies.signed[:airbnb_session_token]
      session = Session.find_by(token: token)
      return render json: { error: 'user not logged in' }, status: :unauthorized if !session

      @property = session.user.properties.create(property_params)
        if @property.save
          render 'api/properties/show', status: :created
        else 
          render json: { success: false }, status: :bad_request
        end
    end

    def update
      token = cookies.signed[:airbnb_session_token]
      session = Session.find_by(token: token)
      return render json: { error: 'user not logged in' }, status: :unauthorized if !session
      
      @property = session.user.properties.update(property_params)
        if @property.save
          render 'api/properties/show', status: :created
        else 
          render json: { success: false }, status: :bad_request
        end
    end

    private

      def property_params
        params.require(:property).permit(:title, :description, :city, :country, :property_type, 
          :price_per_night, :max_guests, :bedrooms, :beds, :baths, images: [])
      end

      # def session_exists
      #   token = cookies.signed[:airbnb_session_token]
      #   session = Session.find_by(token: token)
      #   return render json: { error: 'user not logged in' }, status: :unauthorized if !session
      # end

      def property_exists
        @property = Property.find_by(id: params[:id])
        return render json: { error: 'not_found' }, status: :not_found if !@property
      end
  end
end