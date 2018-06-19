class UsersController < ApplicationController
  before_action :set_user, only: [:edit, :update]
  before_action :authenticate_user!, only: [:index]

  def index
    @users = User.where('name LIKE(?) AND name != (?)', "%#{params[:search_name]}%", current_user.name)
    respond_to do |format|
      format.html
      format.json
    end
  end

  def edit
  end

  def update
    if @user.update(user_params)
      redirect_to root_path, notice: 'ユーザー情報を更新しました'
    elsif
      render :edit
    end
  end

  # def search
  #   @users = User.where('name LIKE(?)', "%#{params[:keyword]}%").not(id: current_user.id)
  #   respond_to do |format|
  #     format.html
  #     format.json
  #   end
  # end

  private

  def set_user
    @user = User.find(params[:id])
  end

  def user_params
    params.require(:user).permit(
      :name,
      :email,
      )
  end
end
