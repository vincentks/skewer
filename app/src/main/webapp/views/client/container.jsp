<!DOCTYPE html>
<html>
	<head>
		<title></title>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0"/>

		<jsp:include page="/views/include.jsp"></jsp:include>
		
		<link rel="stylesheet" type="text/css" href="css/client/client.css" media="all" />                   
		<script type="text/javascript" src="scripts/client/SK.client.js"></script>                 
		
		<script type="text/javascript">
			$(document).ready(function() {
				SK.client().load();
			});
		</script>
	</head>
<body>

	<jsp:include page="/views/header.jsp"></jsp:include>

	<div class="container search-container">
		<form>
			<input id="tableSearchField" name="tableSearchField" type="text" />	
			<button id="searchButton">Pesquisar</button>
			<button id="addButton">Adicionar</button>
		</form>
	
		<table class="sortable data-table">
			<thead>
				<th>Nome</th>
				<th class="table-header-phone">Celular</th>
				<th class="table-header-phone">Telefone fixo</th>
			</thead>
			<tbody>
			</tbody>
		</table>
	</div>
	
	<div class="details-container hide">
		<h5>Detalhes</h5>
		<form class="vertical client-details-form">
			<label for="name">Nome</label>
			<input class="medium" type="text" name="name" id="name">
			
			<label for="cell">Celular</label>
			<input class="small" type="text" name="cell" id="cell">
			
			<label for="cell">Telefone fixo</label>
			<input class="small" type="text" name="phone" id="phone">
			
			<label for="name">E-mail</label>
			<input class="medium" type="text" name="email" id="email">
			
			<label for="address">Endereço</label>
			<textarea class="medium" name="address" id="address"></textarea>
			
			<button id="saveButton">Salvar</button>
			<button id="saveAddButton">Salvar & Adicionar</button>
			<button id="deleteButton">Excluir</button>
			<button id="hideDetailsButton">Cancelar</button>
			
		</form>
	</div>

	<script type="text/x-jquery-tmpl" id="emptyTableTemplate">
		<tr class="warning"><td colspan="3">Nenhum cliente encontrado.</td></tr>
	</script>

	<script type="text/x-jquery-tmpl" id="tableRowTemplate">
		<tr data-row-index="{{index}}">
			<td>{{name}}</td>
			<td>{{cell}}</td>
			<td>{{phone}}</td>
		</tr>
	</script>

</body>
</html>