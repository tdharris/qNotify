#!/bin/bash
cp ./rc/qnotify /etc/init.d
ln -s /etc/init.d/qnotify /sbin/rcqnotify
exit 0
