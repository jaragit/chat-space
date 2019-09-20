# README

## groups_usersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user

#### groups テーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false, foreign_key: true|

##### Association
- has many :users, thorough: :group_users
- has many :group_users

####### users テーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false, foreign_key: true|

######## Association
- has many :groups, thorough: :group_users
- has many :group_users

######## message テーブル
|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|
|image|string|null: false, foreign_key: true|
|text|text|null: false, foreign_key: true|

######### Association
- belongs_to :group
- belongs_to :user