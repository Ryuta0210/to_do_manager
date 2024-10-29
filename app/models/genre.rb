class Genre < ActiveHash::Base
  self.data = [
    { id: 1, name: '---' },
    { id: 2, name: '単発' },
    { id: 3, name: 'ルーティーン' },
    { id: 4, name: 'プロジェクト' }
  ]
  include ActiveHash::Associations
  has_many :todos
end
