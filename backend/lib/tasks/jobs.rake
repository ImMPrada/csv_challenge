namespace :jobs do
  desc "Start a delayed_job worker"
  task :work => :environment do
    Delayed::Worker.new.start
  end

  desc "Start multiple delayed_job workers"
  task :workers, [:count] => :environment do |t, args|
    count = (args[:count] || 1).to_i
    count.times do
      pid = fork do
        Delayed::Worker.new.start
      end
      Process.detach(pid)
    end
  end
end 