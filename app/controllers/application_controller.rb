class ApplicationController < ActionController::Base
  before_action :configure_permitted_parameters, if: :devise_controller?
  before_action :set_fullname

  private
  def set_fullname
    return unless params[:user]
    params[:user][:full_name] = "#{params[:user][:family_name]} #{params[:user][:first_name]}".strip
  end


  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up,
                                      keys: [:first_name, :family_name, :full_name])
  end

end
