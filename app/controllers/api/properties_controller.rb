module Api
  class PropertiesController < ApplicationController
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
      
      @property =  session.user.properties.find(params[:id])
      return render json: { error: 'cannot find property' }, status: :not_found if !@property

      if @property.update(property_params)
        render 'api/properties/show', status: :created
      else 
        render json: { success: false }, status: :bad_request
      end
    end

    def bookings
      token = cookies.signed[:airbnb_session_token]
      session = Session.find_by(token: token)
      return render json: { error: 'user not logged in' }, status: :unauthorized if !session

      property =  Property.find_by(id: params[:id])
      return render json: { error: 'cannot find property' }, status: :not_found if !property

      @bookings = property.bookings.where("end_date > ? ", Date.today)
      render 'api/bookings/index'
    end

    def guest_bookings
      token = cookies.signed[:airbnb_session_token]
      session = Session.find_by(token: token)
      return render json: { error: 'user not logged in' }, status: :unauthorized if !session

      @bookings = session.user.bookings.where("end_date > ? ", Date.today)
      render 'api/bookings/guest_index'
    end

    def host_bookings
      token = cookies.signed[:airbnb_session_token]
      session = Session.find_by(token: token)
      return render json: { error: 'user not logged in' }, status: :unauthorized if !session

      property =  session.user.properties.find(params[:id])
      return render json: { error: 'cannot find property' }, status: :not_found if !property

      @bookings = property.bookings.where("end_date > ? ", Date.today)
      render 'api/bookings/host_index'
    end

    private

      def property_params
        params.require(:property).permit(:title, :description, :city, :country, :property_type, 
          :price_per_night, :max_guests, :bedrooms, :beds, :baths, images: [])
      end

      def property_exists
        @property = Property.find_by(id: params[:id])
        return render json: { error: 'not_found' }, status: :not_found if !@property
      end
  end
end