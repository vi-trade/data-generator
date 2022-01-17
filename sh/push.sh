#!/bin/bash

echo "Введите комментарий к коммиту:"
read msg
echo "Комментарий = $msg."
echo 

echo "Теги:"
git tag

echo "Введите тег:"
read tag
echo "Новый тег = $tag."
echo 

echo "ENTER для продолжения или CTRL-C"
read

git add -A .
git commit -m "$msg."
git tag "$tag"

git push origin --all #master
git push gitlab --all #master
git push github --all #master


git push origin --tags 
git push gitlab --tags 
git push github --tags 
