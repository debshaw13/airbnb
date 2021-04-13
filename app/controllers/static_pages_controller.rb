class StaticPagesController < ApplicationController
  def home
    render 'home'
  end

  def property
    @data = { property_id: params[:id] }.to_json
    render 'property'
  end

  def login
    render 'login'
  end

  def new
    render 'property_form'
  end
  
  def edit
    @data = { property_id: params[:id] }.to_json
    render 'property_form'
  end
end