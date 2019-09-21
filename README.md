# README

## groups_usersテーブル

|Column|Type|Options|
|------|----|-------|
|user|references| foreign_key: true|
|group|references| foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user

#### groups テーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false|

##### Association
- has many :users, thorough: :group_users
- has many :group_users
- has many :messages

####### users テーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false|

######## Association
- has many :groups, thorough: :group_users
- has many :group_users
- has many :messages

######## messages テーブル
|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|
|image|string|null: false|
|text|text|null: false|

######### Association
- belongs_to :group
- belongs_to :user