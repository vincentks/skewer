<!DOCTYPE html>
<html>
	<head>
		<title></title>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0"/>

		<link rel="stylesheet" type="text/css" href="css/jquery.pnotify.default.css" media="all" />                  
		<link rel="stylesheet" type="text/css" href="css/jquery.pnotify.default.icons.css" media="all" />                  
		<link rel="stylesheet" type="text/css" href="css/kickstart.css" media="all" />                  <!-- KICKSTART -->
		<link rel="stylesheet" type="text/css" href="css/style.css" media="all" />                  <!-- KICKSTART -->
		<link rel="stylesheet" type="text/css" href="css/base.css" media="all" />                  <!-- KICKSTART -->

		<script type="text/javascript" src="scripts/prettify.js"></script>
		<script type="text/javascript" src="scripts/jquery-1.9.1.min.js"></script>
		<script type="text/javascript" src="scripts/jquery-ui.min.js"></script>
		<script type="text/javascript" src="scripts/jquery.tinysort.min.js"></script>
		<script type="text/javascript" src="scripts/jquery.bxslider.js"></script>
		<script type="text/javascript" src="scripts/jquery.fancybox.js"></script>
		<script type="text/javascript" src="scripts/jquery.pnotify.js"></script>
		<script type="text/javascript" src="scripts/kickstart.js"></script>                             <!-- KICKSTART -->
		<script type="text/javascript" src="scripts/ES.main.js"></script>                             <!-- KICKSTART -->
		
		<script type="text/javascript">
			$(document).ready(function() {
				ES.client().load();
			});
		</script>
	</head>
<body>

	<ul class="menu">
		<li class="current"><a href="">Clientes</a></li>
		<li><a href="">Pedidos</a></li>
		<li><a href="">Produtos</a></li>
		<li><a href="">Administração</a></li>
	</ul>

	<div class="container client-search-container">
		<form>
			<input id="clientSearchField" name="clientSearchField" type="text" />	
			<button id="searchClientButton">Pesquisar</button>
			<button id="addClientButton">Adicionar</button>
		</form>

		<table class="sortable client-table">
			<thead>
				<th>Nome</th>
				<th class="table-header-phone">Celular</th>
				<th class="table-header-phone">Telefone fixo</th>
			</thead>
			<tbody>
			</tbody>
		</table>
	</div>
	
	<div class="client-details-container hide">
		<h5>Detalhes</h5>
		<form class="vertical client-details-form" id="clientDetailsForm">
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
			
			<button id="saveClientButton">Salvar</button>
			<button id="saveAddClientButton">Salvar & Adicionar</button>
			<button id="deleteClientButton">Excluir</button>
			<button id="hideClientButton">Cancelar</button>
			
		</form>
	</div>

</body>
</html>