# cronos-kairos
Plugin para gerar relatório de Horas do Mês no Kairos (dimepkairos)

# Para usar

* Você pode instalar através do link, para isto: clique em [userScript](https://raw.githubusercontent.com/erickLFLopes/cronos-kairos/master/cronos.user.js)

* Você pode fazer uma instalação manual do projeto: 
  - Abra o kairos e acesse sua página de ponto
  - clique no icone do tampermonkey e create a new script 
  - Substitua o header contido no editor por este [header](https://raw.githubusercontent.com/erickLFLopes/cronos-kairos/master/cronos-install.txt)
  - ```ctrl + s``` para salvar. 


# Funcionamento 

O plugin irá gerar o relatório de horas por semana dos ultimos três meses - incluindo o atual. Como o desenvolvimento tem como base a cidade de Rio Grande nesta primeira fase, os feriados da cidade serão considerados neste relatório, os mesmos estarão marcados de laranja. 

Não é uma atividade simples resgatar os dados mensais dos ultimos três meses de um user, por isso ao acessar a página os botões de relatório estarão desativados, e, assim que o relatório de determinado mês for carregado, o seu respectivo botão se ativa. Note que este processo é assíncrono, e por isso não à ordem definida para o fim do processo. 

![Menu da Aplicação](https://raw.githubusercontent.com/erickLFLopes/cronos-kairos/master/doc/img/menu.png)

Após  clicar em um dos botões para gerar o relatório será aberta uma janela, como a exibida a seguir, onde você terá o mês dividido em semanas e com as horas de determinada semana contabilizadas. 

![Exemplo de relatório da aplicação](https://raw.githubusercontent.com/erickLFLopes/cronos-kairos/master/doc/img/relatorio.png)


# O que o plugin não faz? (Ainda :D )

- Quando o usuário tem três turnos no dia a aplicação considera apenas os dois primeiros. Este caso acontecerá quando você tiver que fazer algum exame no meio do turno e se sentir apto a retornar ao trabalho. 

- Quando você cometer uma infração, o plugin irá considerar os horarios em ordem. 

# Para colaborar com o projeto 

Requisitos: node + npm 

- Clone o projeto (```git clone https://github.com/erickLFLopes/cronos-kairos.git```)
- Na pasta do projeto, execute  ```npm install``` para baixar as dependências 
- Faça as modificações em source
- Rode ```npm run build```, você estará rodando: 
  - ```babel src -d build && node minifier.js```
  - Este comando vai transpilar seu código de ECMA6 Para 5 
  - E, em Seguida, vai minificar o projeto
- O minificado do projeto está na raiz com o nome ```bundle.min.js```
