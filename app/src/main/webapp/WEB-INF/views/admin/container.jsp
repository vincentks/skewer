<!DOCTYPE html>
<html>
	<head>
		<title></title>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0"/>

		<jsp:include page="/WEB-INF/views/include.jsp"></jsp:include>
		
		<link rel="stylesheet" type="text/css" href="resources/css/admin/admin.css" media="all" />                   
		<script type="text/javascript" src="resources/scripts/admin/SK.admin.js"></script>                 
		
		<script type="text/javascript">
			$(document).ready(function() {
				SK.admin().init();
			});
		</script>
	</head>
<body>

	<jsp:include page="/WEB-INF/views/header.jsp"></jsp:include>

	<div class="row">
		<div class="span4">
			<button class="btn" id="addIDsToExistingClients">Adicionar chave aos clientes existentes</button>
		</div>
	</div>

</body>
</html>