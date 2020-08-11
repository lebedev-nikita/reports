> npm install  
npm run dev

http://localhost:33333

**Если возникли проблемы с подключением к БД:**  
1. Откройте файл web/src/server/services/pg.js 
2. Закомментируйте строку
  > host: 'localhost',

3. Раскомментируйте строку
  > // host: 'dad-datamart1.consultant.ru',

**Чтобы увидеть панель выгрузок:**  
В файле history.js закомментируйте строку
> AND '${login}' = ANY(owners)
