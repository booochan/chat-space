class MessagesController < ApplicationController

  def index
    @group = Group.find(params[:group_id])
  end

  def create
    @message = Message.new(message_params)
    if @message.save
      redirect_to group_messages_path(@message.group_id)
    else
      render :index
  end

  private
  def massage_params
    params.require(:message).permit(:text, :image).merge(user_id: current_user.id, group_id: params[:group_id])
  end
end
