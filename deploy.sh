# // sh deploy.sh   

set -e
npm run build
cd dist
git init 
git config --local user.name strange15
git config --local user.email strange66666666@gmail.com
git add -A
git commit -m 'deploy'
git push -f git@github.com:strange15/meetup-vue3-fb.git master:gh-pages
cd -