#!/bin/sh
cd /home/user/repos/ogledalo
concurrently --kill-others "cd exe && npm start" "cd server && npm start"
