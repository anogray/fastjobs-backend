

APIS

Here {{backend}} is http:/localhost:4000

Get All Pets/Documents
{{backend}}/api/pet

Get Pet/Document by a specified Pet Id
{{backend}}/api/pet/62d5b98811ab0530ac193763

Post all pet documents from csv
{{backend}}/api/pet
FormData is needed to pass with the csv documents with they key as dogFileCsv

Patch Pet/Document by a specified Pet Id
{{backend}}/api/pet/62d5b98811ab0530ac193763

Delete Pet/Document by a specified Pet Id
{{backend}}/api/pet/62d5b98811ab0530ac193763


Libraries/Tools

express:Backend framework to handle all routes
mongoose : It is an ORM, For saving the data to mongodb  
csvtojson : Used to convert the csv data to json array
dotenv:Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env
multer:Multer is a node.js middleware for handling multipart/form-data , which is primarily used for uploading files