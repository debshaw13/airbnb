Rails.application.routes.draw do
  root to: 'static_pages#home'

  get '/property/:id' => 'static_pages#property'
  get '/login' => 'static_pages#login'
  get '/properties/new' => 'static_pages#new'
  get '/properties/:id/edit' => 'static_pages#edit'
  get '/bookings' => 'static_pages#bookings'
  get '/booking/:id/success' => 'static_pages#success'

  namespace :api do
    # Add routes below this line
    resources :users, only: [:create]
    resources :sessions, only: [:create] do
      collection do
        delete :destroy
      end
    end
    resources :properties, only: [:index, :show, :create, :update] do
      member do
        get :bookings
        get :host_bookings
      end
      collection do
        get :guest_bookings
      end
    end
    resources :bookings, only: [:create, :show]
    resources :charges, only: [:create]

    get '/authenticated' => 'sessions#authenticated'

    # stripe webhook
    post '/charges/mark_complete' => 'charges#mark_complete'
  end

end
