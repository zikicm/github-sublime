#!/bin/sh
 
echo " *** Executing post merge hook *** "

echo "\nStep 1: Bower update"
bower update

echo "\nStep 2: Npm update"
npm update
