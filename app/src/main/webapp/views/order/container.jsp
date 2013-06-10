<%@ taglib prefix="fwTags" tagdir="/WEB-INF/tags" %>

<!DOCTYPE html>
<html>
	<head>
		<title></title>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0"/>

		<jsp:include page="/views/include.jsp"></jsp:include>
		
		<link rel="stylesheet" type="text/css" href="css/order/order.css" media="all" />                   
		<script type="text/javascript" src="scripts/order/SK.order.js"></script>                 
		
		<script type="text/javascript">
			$(document).ready(function() {
				SK.order().init();
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
						<th>Data</th>
						<th>Cliente</th>
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
		
					<label for="name">Data</label>
					<input class="input-small datepicker" type="text" name="date" id="date">
					
					<label for="cell">Cliente</label>
					<input type="text" class="input-large" name="client" id="client">

					<label class="products-label">Produtos</label>
					<div class="well products-container">

					</div>					

					<label for="cell">Total</label>
					<div class="input-prepend input-append">
						<span class="add-on">$</span>
						<input class="span2 input-medium text-right" name="total" id="total" type="text">
						<span class="add-on">.00</span>
					</div>

				</form>
				<fwTags:detailsFormButtons />
			</div>
		</div>
	</div>

	<script type="text/x-jquery-tmpl" id="emptyTableTemplate">
		<tr class="warning"><td colspan="3">Nenhum pedido encontrado.</td></tr>
	</script>

	<script type="text/x-jquery-tmpl" id="tableRowTemplate">
		<tr data-id="{{id}}">
			<td>{{id}}</td>
			<td>{{date}}</td>
			<td>{{getClient}}</td>
		</tr>
	</script>
	
	<script type="text/x-jquery-tmpl" id="productRowTemplate">
		<div class="product-row">
			<input type="text" class="input-mini product-quantity" name="quantity" id="quantity" placeholder="Qtd.">
			<input type="text" class="input-medium product-id" name="product" id="product" placeholder="Produto">
			<a class="btn button-add-product" href="#"><i class="icon-plus"></i> Adicionar</a>
			<a class="btn button-remove-product" style="display: none;" href="#"><i class="icon-remove"></i> Remover</a>
		</div>
	</script>

</body>
</html>