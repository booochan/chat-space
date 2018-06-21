json.array! @new_messages do |message|
  json.user_name  message.user.name
  json.created_at  message.created_at.to_s
  json.ignore_nil!
  json.text  message.text
  json.image  message.image.url
  json.id  message.id
end
