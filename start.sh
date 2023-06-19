#!/bin/sh
concurrently --kill-others "cd exe && npm start" "cd server && npm start"
