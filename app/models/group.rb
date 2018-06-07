class Group < ApplicationRecord
  has_many :relationships
  has_many :users, through: :relationships
  has_many :messages
  validates :name, uniqueness: true, presence: true
end
