#!/bin/sh
 
echo " *** Executing post merge hook *** "

echo "\nStep 1: Bower update"
cd ..
bower update