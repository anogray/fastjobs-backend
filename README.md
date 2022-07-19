

APIS<br /><br />

Here {{backend}} is http:/localhost:4000<br />

Get All Pets/Documents<br />
{{backend}}/api/pet<br />

Get Pet/Document by a specified Pet Id<br />
{{backend}}/api/pet/62d5b98811ab0530ac193763<br />

Post all pet documents from csv<br />
{{backend}}/api/pet<br />
FormData is needed to pass with the csv documents with they key as dogFileCsv<br />

Patch Pet/Document by a specified Pet Id<br />
{{backend}}/api/pet/62d5b98811ab0530ac193763<br />

Delete Pet/Document by a specified Pet Id<br />
{{backend}}/api/pet/62d5b98811ab0530ac193763<br />


Libraries/Tools<br /><br />

express:Backend framework to handle all routes<br />
mongoose : It is an ORM, For saving the data to mongodb  <br />
csvtojson : Used to convert the csv data to json array<br />
dotenv:Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env<br />
multer:Multer is a node.js middleware for handling multipart/form-data , which is primarily used for uploading files