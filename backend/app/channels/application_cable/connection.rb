module ApplicationCable
  class Connection < ActionCable::Connection::Base
    def connect
      # Allow all connections for now
    end
  end
end
