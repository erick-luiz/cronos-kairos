var minifier = require('minifier')

var input =  [
	'./build/config/resetJs.js',
	'./build/config/ResetStyle.js',
	'./build/template/ConfirmationModalTemplate.js',
	'./build/template/LoaderTemplate.js',
	'./build/config/DateAdapter.js',
	'./build/service/PeriodService.js',
	'./build/service/HolidaysService.js',
	'./build/Order.js',
	'./build/service/pdfService.js',
	'./build/util/PeriodUtils.js',
	'./build/util/CronosUtils.js',
	'./build/template/ReportTemplate.js',
	'./build/template/ViewManager.js',
	'./build/service/ReportConfigService.js',
	'./build/service/CronosService.js',
	'./build/app.js',]

minifier.on('error', function(err) {
	console.log('Erro na minificação dos arquivos JS!')
})

minifier.minify(input, {output:'./bundle.min.js'})