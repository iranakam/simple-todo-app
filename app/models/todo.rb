class Todo < ApplicationRecord
  validates :title, presence: true
  validates :deadline, presence: true
  validates :user_id, presence: true
  belongs_to :user
end
