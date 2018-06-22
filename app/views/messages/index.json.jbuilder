json.array! @new_messages do |message|
  json.user_name  message.user.name
  json.created_at  message.created_at.to_s
  json.id  message.id
  json.text  message.text
  json.image  message.image.url
end
