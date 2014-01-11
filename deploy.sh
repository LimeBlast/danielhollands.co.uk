#!/bin/sh
git co master
bundle exec middleman build --clean
git addr
git ci -m 'Built for deployment'
git push
git ftp push -v
