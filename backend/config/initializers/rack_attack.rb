# Be sure to restart your server when you modify this file.

class Rack::Attack
  # Block requests with large file uploads
  blocklist('block large file uploads') do |req|
    req.content_length.to_i > 100 * 1024 * 1024 # 100MB
  end
end
