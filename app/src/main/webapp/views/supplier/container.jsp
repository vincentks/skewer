<%@ taglib prefix="fwTags" tagdir="/WEB-INF/tags" %>

<!DOCTYPE html>
<html>
	<head>
		<title></title>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0"/>

		<jsp:include page="/views/include.jsp"></jsp:include>
		
		<link rel="stylesheet" type="text/css" href="css/supplier/supplier.css" media="all" />                   
		<script type="text/javascript" src="scripts/supplier/SK.supplier.js"></script>                 
		
		<script type="text/javascript">
			$(document).ready(function() {
				SK.supplier().init();
			});
		</script>
	</head>
<body>

	<jsp:include page="/views/header.jsp"></jsp:include>

	<div class="row">

		<div class="span8">
			<div class="search-container">
				<form class="form-search">
					<input class="search-query" id="tableSearchField" name="tableSearchField" type="text" />	
					<button class="btn btn-primary" id="searchButton">Pesquisar</button>
					<button class="btn" id="addButton">Adicionar</button>
				</form>
	
				<table class="table table-striped table-bordered table-hover">
					<thead>
						<th>Id</th>
						<th>Nome</th>
						<th class="table-header-phone">Celular</th>
						<th class="table-header-phone">Telefone fixo</th>
					</thead>
					<tbody>
					</tbody>
				</table>
			</div>
		</div>
		<div class="span6">
			<div class="details-container hide">
				<h5>Detalhes</h5>
				<form class="vertical details-form">
					<input type="hidden" name="id" id="id" value="">
					
					<label for="name">Nome</label>
					<input class="input-large" type="text" name="name" id="name">
					
					<label for="cell">Celular</label>
					<input class="input-medium" type="text" name="cell" id="cell">
					
					<label for="cell">Telefone fixo</label>
					<input class="input-medium" type="text" name="phone" id="phone">
					
					<label for="name">E-mail</label>
					<input class="input-large" type="text" name="email" id="email">
					
					<label for="address">Endereço</label>
					<textarea class="input-large" rows="4" name="address" id="address"></textarea>
				</form>
				<fwTags:detailsFormButtons />
			</div>
		</div>
	</div>

	<script type="text/x-jquery-tmpl" id="emptyTableTemplate">
		<tr class="warning"><td colspan="4">Nenhum fornecedor encontrado.</td></tr>
	</script>

	<script type="text/x-jquery-tmpl" id="tableRowTemplate">
		<tr data-id="{{id}}">
			<td>{{id}}</td>
			<td>{{name}}</td>
			<td>{{cell}}</td>
			<td>{{phone}}</td>
		</tr>
	</script>

</body>
</html>