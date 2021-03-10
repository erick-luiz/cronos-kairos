# cronos-kairos
Plugin para gerar relatório de Horas do Mês no Kairos (dimepkairos)

# Como instalar

* Antes de mais nada, é preciso ter a extensão Tampermonkey instalada no navegador. [link para chrome](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo?hl=en)

* Acesse o [openuserjs](https://openuserjs.org/scripts/erickLFLopes/Cronos_Kairos) e clique no botão instalar. Sugiro esta, pois é a forma que acompanha as atualizações do Plugin. 

* Você pode instalar o cronos-kairos através do link: [userScript](https://raw.githubusercontent.com/erickLFLopes/cronos-kairos/master/cronos.user.js)

* Ou, Você pode fazer uma instalação manual do projeto: 
  - Abra o navegador
  - Clique no icone do tampermonkey e create a new script 
  - Substitua o header contido no editor por este [header](https://raw.githubusercontent.com/erickLFLopes/cronos-kairos/master/cronos-install.txt)
  - ```ctrl + s``` para salvar. 


# Funcionamento 

O plugin gera o relatório de horas por semana dos ultimos três meses - incluindo o atual. Como o desenvolvimento tem como base a cidade de Rio Grande, nesta primeira fase, apenas os feriados da cidade serão considerados neste relatório, os mesmos estarão marcados de laranja.

Ao acessar a página teremos três botões disponiveis para uso.

![Menu da Aplicação](https://raw.githubusercontent.com/erickLFLopes/cronos-kairos/master/doc/img/menu_v3.png)

Após escolher o mês para geração do relatório a aplicação abrirá um modal de configurações, com as seguintes opções: 

![Modal de seleção](https://raw.githubusercontent.com/erickLFLopes/cronos-kairos/master/doc/img/modal_selecao_v2.png)

1 - Dias para exclusão: caso algum dia do mês não deva ser considerado para o cálculo de horas da semana, será possível informa-lo através deste primeiro campo. os dias neste campo devem estar separados por espaços, exemplo: 

* Remover dias: 12 22 (estes dois dias serão excluídos do cálculo)
* Remover dias: 12 35 (apenas o dia 12 será excluído do cálculo)

2 - Configuração de carga horária: sabendo que alguns colegas possuem a carga horária de 44, ou mesmo outros com carga horária reduzidas podem fazer 30, deixamos uma opção de seleção que terá a possibilidade de seleção para as carga horarias semanais de: 44, 40 e 30.

3 - caso o relatório já tenha sido buscado em algum momento, será possível utilizar a opção **Não, use da busca anterior** , caso não tenha os dados ainda é necessário fazer uma nova consulta. 

* Note que: as configurações para uma nova busca são salvas, logo o relatório quando já tiver sido gerado não aceitará uma nova configuração de carga horaria ou exclusão de dias. 

Após as configurações, a aplicação abre um loader e da inicio a consulta do relatório. 

![Loader](https://raw.githubusercontent.com/erickLFLopes/cronos-kairos/master/doc/img/loader_v1.PNG)

Assim que a consulta terminar, será aberta uma janela onde você terá o mês dividido em semanas e com as horas de determinada semana contabilizadas, como a exibida a seguir: 

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
