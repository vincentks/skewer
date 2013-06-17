<%@ taglib prefix="fwTags" tagdir="/WEB-INF/tags" %>

<!DOCTYPE html>
<html>
	<head>
		<title></title>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0"/>

		<jsp:include page="/WEB-INF/views/include.jsp"></jsp:include>
		
		<link rel="stylesheet" type="text/css" href="resources/css/product/product.css" media="all" />                   
		<script type="text/javascript" src="resources/scripts/product/SK.product.js"></script>                 
		
		<script type="text/javascript">
			$(document).ready(function() {
				SK.product().init();
			});
		</script>
	</head>
<body>

	<jsp:include page="/WEB-INF/views/header.jsp"></jsp:include>

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
					
					<label for="address">Descrição</label>
					<textarea class="input-large" rows="4" name="description" id="description"></textarea>
				</form>
				<fwTags:detailsFormButtons />
			</div>
		</div>
	</div>

	<script type="text/x-jquery-tmpl" id="emptyTableTemplate">
		<tr class="warning"><td colspan="2">Nenhum produto encontrado.</td></tr>
	</script>

	<script type="text/x-jquery-tmpl" id="tableRowTemplate">
		<tr data-id="{{id}}">
			<td>{{id}}</td>
			<td>{{name}}</td>
		</tr>
	</script>

</body>
</html>