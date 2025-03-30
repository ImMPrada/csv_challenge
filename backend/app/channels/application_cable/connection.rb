module ApplicationCable
  class Connection < ActionCable::Connection::Base
    identified_by :current_user

    def connect
      self.current_user = find_verified_user
    end

    private

    def find_verified_user
      # For now, we return nil since we do not have authentication
      # When you implement authentication, here you should verify the token
      nil
    end
  end
end
