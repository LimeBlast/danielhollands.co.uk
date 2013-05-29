#!/bin/sh
git co master
middleman build --clean
git addr
git ci -m 'Built for deployment'
git push
git ftp push -v
