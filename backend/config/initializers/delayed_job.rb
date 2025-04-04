require 'delayed_job_active_record'

Delayed::Worker.backend = :active_record
Delayed::Job = Delayed::Backend::ActiveRecord::Job 