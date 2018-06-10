class CreateRelationships < ActiveRecord::Migration[5.0]
  def change
    create_table :relationships do |t|
      t.references :user, foreign_key: true, index: true, null: false
      t.references :group, foreign_key: true, index: true, null: false
      t.timestamps
    end
  end
end
