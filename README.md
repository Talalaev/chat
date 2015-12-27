##Чат

####Для работы приложения у вас должно быть установленно:
1. NodeJS
2. MongoDB (и запущенно)
3. Redis (и запущенно)

####Как запустить:
1. Скачать и в корне проекта выполнить команду _npm i_
2. Запустить MongoDB и Redis, если не запущены
3. В корне проекта выполнить команду _gulp db:load --from fixtures/users.js_
4. В корне проекта выполнить команду _node index.js_
5. Открыть в браузере http://localhost:3000
    
После выполнения выше указанных действий в приложении появятся 3 пользователя
1. name: "user 1", email: "mk@javascript.ru", password: "123456"
2. name: "user 2", email: "bob@javascript.ru", password: "123456"
3. name: "user 3", email: "mike@javascript.ru", password: "123456"
