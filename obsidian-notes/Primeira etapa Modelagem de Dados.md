Estrutura de Banco de Dados utilizando Valkey (redis).

ESTRUTURA DE DADOS DO USER

estrutura da chave:
username:ID 

A chave valkey é o username e o ID, por exemplo pedro:12.
Dentro da chave é guardado valores como ID, nome, email e senha em hash.

LOGIN

teremos uma chave especial para procura login pelo email, algo como username:email:exemplo@gmail.com
Assim que o usuario logar, ele vai procurar esse email para obter o id e o username do usuario, e assim obtendo as outras informaçẽos como senha e tarefas.
Após o login der sucesso, um JWT sera enviado pelo navegador, que dara acesso e gerenciamento de suas próprias tarefas e não a de outros usuarios.

TAREFAS

Para buscar as tarefas do usuario, após ler o JWT na sessão do usuario, ele buscara as tarefas algo como. user:userid:tasks

Uma tarefa guardaria dados como id:titulo:descrição:feito

RESUMO DA MODELAGEM DE DADOS 

Usuario Chave -> user:id -> conteudo -> id:name:email:password...
Tipo -> JSON

Auth chave -> user:email -> conteudo -> id
TIPO -> String

Tarefa chave -> task:id -> conteudo -> id:title:description:done 
TIPO -> JSON

Lista de tarefas do usuario chave -> user:userid:tasks -> taskid
TIPO -> SET

