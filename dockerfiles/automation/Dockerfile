FROM ubuntu:latest
MAINTAINER edwin.carrasquillo@datadoghq.com

# Install Python3 & Curl
RUN apt-get update && apt-get install -y python3 curl
RUN apt-get install -y python3-pip && pip3 install requests

# Add python script
RUN mkdir scripts/
ADD delete.py scripts/delete.py

# Add Bash script
Add curl-script.sh scripts/curl-script.sh

# Add crontab file in the cron directory
ADD test-cron /etc/cron.d/test-cron

# Give execution rights on the cron job
RUN chmod 0644 /etc/cron.d/test-cron

# Create the log file to be able to run tail
RUN touch /var/log/cron.log

# Run the command on container startup
CMD cron && tail -f /var/log/cron.log
