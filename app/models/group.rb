class Group < ApplicationRecord
  has_many :relationships
  has_many :users, through: :relationships
  has_many :messages
  validates :name, uniqueness: true, presence: true

  def show_last_message
    if (last_message = messages.last).present?
      last_message.text? ? last_message.text : '画像が投稿されています'
    else
      'まだメッセージはありません。'
    end
  end
end
