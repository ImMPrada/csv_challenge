module Delayed
  class Job < ActiveRecord::Base
    include Delayed::Backend::ActiveRecord

    # Set default priority
    before_save :set_default_priority

    private

    def set_default_priority
      self.priority ||= 0
    end
  end
end 