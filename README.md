# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...

## usersテーブル

|Column|Type|Options|Index|Unique|
|------|----|-------|-----|------|
|name|string|null: false|-|◯|
|email|string|null: false|-|◯|
|password|string|null: false|-|-|

### Association
- has_many :relationships
- has_many :groups, through: :relationships
- has_many :messages

## groupsテーブル

|Column|Type|Options|Index|Unique|
|------|----|-------|-----|------|
|name|string|null: false|◯|◯|

- has_many :relationships
- has_many :users, through: :relationships
- has_many :messages

## relationshipsテーブル

|Column|Type|Options|Index|Unique|
|------|----|-------|-----|------|
|user_id|reference|null: false, foreign_key: true|◯|-|
|group_id|reference|null: false, foreign_key: true|◯|-|

### Association
- belongs_to :group
- belongs_to :user

## messagesテーブル

|Column|Type|Options|Index|Unique|
|------|----|-------|-----|------|
|text|text|-|-|-|
|image|string|-|-|-|
|user_id|reference|null: false, foreign_key: true|◯|-|
|group_id|reference|null: false, foreign_key: true|◯|-|

### Association
- belongs_to :group
- belongs_to :user
