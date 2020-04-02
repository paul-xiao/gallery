#!bin/bash

# curl --header "Content-Type: application/json" \
#   --request POST \
#   --data '{"username":"xyz","password":"xyz"}' \
#   http://localhost:8000/signin/



# edit user



# list all user


# upload file



# add new post

curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"title":"23332", "link": "updated"}' \
  http://localhost:3001/post/edit/5e85864075f6bb26c75ef16d