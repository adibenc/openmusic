// mengimpor dotenv dan menjalankan konfigurasinya
require('dotenv').config();

const Hapi = require('@hapi/hapi');
const Jwt = require('@hapi/jwt');
const Inert = require('@hapi/inert');

// notes
const notes = require('./api/notes');
const NotesService = require('./services/postgres/NotesService');
const NotesValidator = require('./validator/notes');

const init = async () => {
	// const notesService = new NotesService();

	const server = Hapi.server({
		port: process.env.PORT,
		host: process.env.HOST,
		routes: {
			cors: {
				origin: ['*'],
			},
		},
	});

	// registrasi plugin eksternal
	await server.register([
		{
			plugin: Jwt,
		},
		{
			plugin: Inert,
		},
	]);

	// await server.register([
	// 	{
	// 		plugin: notes,
	// 		options: {
	// 			service: notesService,
	// 			validator: NotesValidator,
	// 		},
	// 	},
	// ]);

	await server.start();
	console.log(`Run @ ${server.info.uri}`);
};

init();
