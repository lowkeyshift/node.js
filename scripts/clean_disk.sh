#!/bin/bash

# Docker clean up

function docker_clean {
    docker volume prune -f && docker system prune -f 
}


function compose_reboot {
    cd ~/node.js/
    docker-compose down && docker-compose up --build -d
}
# System Clean Up

DISK_PERC=$(df -h /dev/xvda1 | awk  'FNR == 2 {print $5}')
var=$(( ${DISK_PERC::-1} ))
#echo $DISK_PERC
#echo $var
function system_clean {
    if [ $var -gt 70 ]
    then
      echo "Deleting all existing Docker Volumes & System bits."
      sudo apt-get clean && sudo apt-get autoremove
      docker_clean
      compose_reboot
      echo "Completed clean up, Disk is now at ${DISK_PERC}."
    else
      echo "Disk space is at ${DISK_PERC}, nothing to do."
    fi
}
system_clean

