ssh "ubuntu@ec2-65-1-144-62.ap-south-1.compute.amazonaws.com" "cd app/zomato-proj-master-shapeai && git pull origin master && sudo docker-compose up --build && exit"