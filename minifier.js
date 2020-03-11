var minifier = require('minifier')

var input =  [
	'./build/resetJs.js',
	'./build/ResetStyle.js',
	'./build/templates/ConfirmationModalTemplate.js',
	'./build/templates/LoaderTemplate.js',
	'./build/DataAdapter.js',
	'./build/PeriodManager.js',
	'./build/EvaluatorHolidays.js',
	'./build/PDF.js',
	'./build/PeriodUtils.js',
	'./build/CronosUtils.js',
	'./build/ViewManager.js',
	'./build/Cronos.js',
	'./build/Main.js',]

minifier.on('error', function(err) {
	console.log('Erro na minificação dos arquivos JS!')
})

minifier.minify(input, {output:'./bundle.min.js'})