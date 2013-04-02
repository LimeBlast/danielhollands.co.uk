#!/bin/sh
git co master
bash compile.sh
git addr
git ci -m 'Compiled for deployment'
git push
git ftp push
