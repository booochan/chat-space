class GroupsController < ApplicationController
  # before_action :authenticate_user!, only: [:new, :create, :edit, :update]
  before_action :set_gruop, only: [:edit, :update]

  def new
  end

  def create
    @group = Group.new(group_params)
    if @group.save(group_params)
      redirect_to group_messages_path(@group.id)
    else
      render :new
    end
  end

  def edit
  end

  def update
  end

  def set_group
    @group = Group.find(params[:id])
  end

  def group_params
    params.require(:group).permit(:name)
  end
end
